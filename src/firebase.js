import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  updateDoc, 
  doc, 
  serverTimestamp, 
  query, 
  orderBy 
} from 'firebase/firestore';

// 1. Firebase Configuration from .env or inline
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

// Check if valid Firebase credentials are provided
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.apiKey !== 'your_api_key_here'
);

let app = null;
let db = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log('[Firebase] Successfully initialized with Firestore project:', firebaseConfig.projectId);
  } catch (err) {
    console.warn('[Firebase] Initialization error, falling back to local real-time sync:', err);
  }
}

export { db, collection, addDoc, onSnapshot, updateDoc, doc, serverTimestamp, query, orderBy };

// --- Real-time Local Broadcast Channel Fallback (if Firebase keys not yet configured) ---
// This allows immediate cross-tab/cross-window real-time testing even before Firebase credentials are added.
const LOCAL_GIGS_KEY = 'quickstaff_gigs_local';
const LOCAL_APPS_KEY = 'quickstaff_apps_local';
const channel = typeof window !== 'undefined' && 'BroadcastChannel' in window 
  ? new BroadcastChannel('quickstaff_sync_channel') 
  : null;

const getLocalData = (key, defaultVal) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultVal;
  } catch {
    return defaultVal;
  }
};

const setLocalData = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
    if (channel) {
      channel.postMessage({ type: 'SYNC_UPDATE', key });
    }
  } catch (e) {
    console.error('Local sync write error', e);
  }
};

// Seed initial gig for demo if empty
if (!isFirebaseConfigured) {
  const existingGigs = getLocalData(LOCAL_GIGS_KEY, null);
  if (!existingGigs || existingGigs.length === 0) {
    setLocalData(LOCAL_GIGS_KEY, [
      {
        id: 'default-1',
        title: 'Catering Staff',
        wage: '₹500/hr',
        date: 'Today • 6:00 PM',
        status: 'open',
        createdAt: new Date().toISOString(),
      }
    ]);
  }
}

// ----------------------------------------------------
// UNIFIED REAL-TIME DATA ACCESS (Firestore + Fallback)
// ----------------------------------------------------

/**
 * Subscribe to the 'gigs' collection in real-time
 */
export function subscribeToGigs(callback) {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'gigs'), orderBy('createdAt', 'desc'));
      return onSnapshot(
        q,
        (snapshot) => {
          const gigs = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          }));
          callback(gigs);
        },
        (error) => {
          console.error('[Firestore] Gigs onSnapshot error:', error);
        }
      );
    } catch (e) {
      console.warn('[Firestore] query error, using fallback:', e);
    }
  }

  // Fallback real-time local sync (broadcast channel + storage listener)
  const notify = () => {
    const list = getLocalData(LOCAL_GIGS_KEY, []);
    callback(list);
  };

  notify();

  const handleChannelMsg = (e) => {
    if (e.data && e.data.type === 'SYNC_UPDATE' && e.data.key === LOCAL_GIGS_KEY) {
      notify();
    }
  };

  const handleStorageEvent = (e) => {
    if (e.key === LOCAL_GIGS_KEY) notify();
  };

  if (channel) channel.addEventListener('message', handleChannelMsg);
  window.addEventListener('storage', handleStorageEvent);

  return () => {
    if (channel) channel.removeEventListener('message', handleChannelMsg);
    window.removeEventListener('storage', handleStorageEvent);
  };
}

/**
 * Subscribe to the 'applications' collection in real-time
 */
export function subscribeToApplications(callback) {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
      return onSnapshot(
        q,
        (snapshot) => {
          const apps = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          }));
          callback(apps);
        },
        (error) => {
          console.error('[Firestore] Applications onSnapshot error:', error);
        }
      );
    } catch (e) {
      console.warn('[Firestore] query error, using fallback:', e);
    }
  }

  // Fallback real-time local sync
  const notify = () => {
    const list = getLocalData(LOCAL_APPS_KEY, []);
    callback(list);
  };

  notify();

  const handleChannelMsg = (e) => {
    if (e.data && e.data.type === 'SYNC_UPDATE' && e.data.key === LOCAL_APPS_KEY) {
      notify();
    }
  };

  const handleStorageEvent = (e) => {
    if (e.key === LOCAL_APPS_KEY) notify();
  };

  if (channel) channel.addEventListener('message', handleChannelMsg);
  window.addEventListener('storage', handleStorageEvent);

  return () => {
    if (channel) channel.removeEventListener('message', handleChannelMsg);
    window.removeEventListener('storage', handleStorageEvent);
  };
}

/**
 * Post a new gig to the 'gigs' collection
 * Schema: { title, wage, date, status: 'open' | 'filled', createdAt }
 */
export async function createGig({ title, wage, date }) {
  const formattedWage = wage.startsWith('₹') ? wage : `₹${wage}`;

  if (isFirebaseConfigured && db) {
    return await addDoc(collection(db, 'gigs'), {
      title,
      wage: formattedWage,
      date: date || 'Flexible Schedule',
      status: 'open',
      createdAt: serverTimestamp(),
    });
  }

  // Local fallback
  const current = getLocalData(LOCAL_GIGS_KEY, []);
  const newGig = {
    id: `gig-${Date.now()}`,
    title,
    wage: formattedWage,
    date: date || 'Flexible Schedule',
    status: 'open',
    createdAt: new Date().toISOString(),
  };
  setLocalData(LOCAL_GIGS_KEY, [newGig, ...current]);
  return newGig;
}

/**
 * Worker applies for a gig
 * Schema: { gigId, workerName: 'Student Worker', status: 'pending' | 'accepted' }
 */
export async function createApplication({ gigId, workerName = 'Student Worker' }) {
  if (isFirebaseConfigured && db) {
    return await addDoc(collection(db, 'applications'), {
      gigId,
      workerName,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
  }

  // Local fallback
  const current = getLocalData(LOCAL_APPS_KEY, []);
  const newApp = {
    id: `app-${Date.now()}`,
    gigId,
    workerName,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  setLocalData(LOCAL_APPS_KEY, [newApp, ...current]);
  return newApp;
}

/**
 * Employer accepts an applicant
 * Updates application status to 'accepted' and marks gig as 'filled'
 */
export async function acceptApplication(applicationId, gigId) {
  if (isFirebaseConfigured && db) {
    const appRef = doc(db, 'applications', applicationId);
    await updateDoc(appRef, {
      status: 'accepted',
    });

    if (gigId) {
      try {
        const gigRef = doc(db, 'gigs', gigId);
        await updateDoc(gigRef, {
          status: 'filled',
        });
      } catch (err) {
        console.warn('Could not update gig status:', err);
      }
    }
    return;
  }

  // Local fallback
  const apps = getLocalData(LOCAL_APPS_KEY, []);
  const updatedApps = apps.map((a) =>
    a.id === applicationId ? { ...a, status: 'accepted' } : a
  );
  setLocalData(LOCAL_APPS_KEY, updatedApps);

  if (gigId) {
    const gigs = getLocalData(LOCAL_GIGS_KEY, []);
    const updatedGigs = gigs.map((g) =>
      g.id === gigId ? { ...g, status: 'filled' } : g
    );
    setLocalData(LOCAL_GIGS_KEY, updatedGigs);
  }
}

