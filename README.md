# QuickStaff — Two-Sided Event Staffing Marketplace
### Real-Time Multi-Device Platform with Firebase Firestore

A connected two-sided event staffing marketplace built with **Vite**, **React**, **Tailwind CSS**, **react-router-dom**, and **Firebase Firestore**. Synchronizes data in real-time across two distinct portals running on different devices (e.g. desktop/laptop for Employer and smartphone for Worker).

---

## 🚀 Portals & Routing

| Route | View | Description |
|---|---|---|
| `/` | **Landing Page** | Two massive action buttons: `[ENTER AS EMPLOYER]` and `[ENTER AS WORKER]`. |
| `/employer` | **Employer Web Console** | Desktop-optimized admin dashboard layout with real-time `onSnapshot` listeners to post gigs and accept student workers. |
| `/worker` | **Worker Mobile App** | Mobile-constrained layout (`max-width: 400px`, centered) simulating a native smartphone app with bottom navigation, live job feed, and real-time GPS shift confirmation. |

---

## 🗄️ Firestore Schema (`src/firebase.js`)

### 1. `gigs` Collection
```typescript
{
  id: string,
  title: string,       // e.g. "Catering Staff", "Stage Setup"
  wage: string,        // e.g. "₹500/hr"
  date: string,        // e.g. "Tonight • 6:00 PM"
  status: 'open' | 'filled',
  createdAt: timestamp
}
```

### 2. `applications` Collection
```typescript
{
  id: string,
  gigId: string,
  workerName: string,  // Default: "Student Worker"
  status: 'pending' | 'accepted',
  createdAt: timestamp
}
```

---

## ⚡ Real-Time Synchronized Interaction Flow

1. **Employer Posts a Gig** (`/employer`):
   - Enter Job Title, Shift Wage in ₹, and Date/Time (or select a quick preset).
   - Submitting writes a new document to the `gigs` collection.
   - The gig instantly appears on connected worker mobile screens.

2. **Worker Applies** (`/worker`):
   - Worker sees the new gig card and clicks **`[Apply]`**.
   - Creates a document in the `applications` collection (`status: 'pending'`).
   - The button disables and changes to **`"Applied"`**.
   - The Employer console immediately updates the gig card to display **`Applicant Ready: Student Worker`** alongside an **`[Accept]`** button.

3. **Employer Accepts Applicant** (`/employer`):
   - Clicking **`[Accept]`** updates the application document status to `'accepted'` and marks the gig as `'filled'`.
   - On the worker's smartphone, a green celebration modal instantly pops up: **"Shift Confirmed! 🎉"**.
   - The button turns into a glowing green **`[Shift Confirmed - GPS Track Active]`** button with attendance geofence tracking.

---

## 🔑 Firebase Configuration

Create or update `.env` in the root folder with your Firebase web app config:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> **Note**: If `.env` credentials are empty or not yet provided, the app automatically enables a local cross-tab / cross-window `BroadcastChannel` real-time sync mechanism with identical method signatures. You can test cross-window synchronization right away!

---

## 🛠️ Running Locally

```bash
# Start Vite development server
npm run dev

# Build for production
npm run build
```
