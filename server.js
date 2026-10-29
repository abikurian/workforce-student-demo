import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// Serve compiled Vite frontend in production
app.use(express.static(path.join(__dirname, 'dist')));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// In-memory data store for live real-time sync
let gigs = [
  {
    id: 'gig-1',
    title: 'Catering Staff',
    wage: '₹500/hr',
    date: 'Tonight • 6:00 PM',
    status: 'open',
    createdAt: new Date().toISOString(),
  },
];

let applications = [];

io.on('connection', (socket) => {
  console.log(`[Socket.io] Client connected: ${socket.id}`);

  // Send current state immediately on connect
  socket.emit('updateGigs', gigs);
  socket.emit('updateApplications', applications);

  // When employer posts a new gig
  socket.on('postGig', (newGig) => {
    console.log('[Socket.io] New gig posted:', newGig.title);
    const formattedWage = newGig.wage && newGig.wage.startsWith('₹') ? newGig.wage : `₹${newGig.wage}`;
    const gigObj = {
      id: newGig.id || `gig-${Date.now()}`,
      title: newGig.title,
      wage: formattedWage,
      date: newGig.date || 'Flexible',
      status: 'open',
      createdAt: new Date().toISOString(),
    };

    gigs.unshift(gigObj);
    io.emit('updateGigs', gigs); // Broadcast to EVERYONE (Worker + Employer)
  });

  // When worker applies to a gig
  socket.on('applyGig', ({ gigId, workerName }) => {
    console.log(`[Socket.io] Worker applied to gig ${gigId}: ${workerName}`);
    const existing = applications.find((a) => a.gigId === gigId);
    if (!existing) {
      const appObj = {
        id: `app-${Date.now()}`,
        gigId,
        workerName: workerName || 'Student Worker',
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      applications.unshift(appObj);
      io.emit('updateApplications', applications); // Broadcast to EVERYONE
    }
  });

  // When employer accepts an applicant
  socket.on('acceptApplicant', ({ applicationId, gigId }) => {
    console.log(`[Socket.io] Applicant accepted: app=${applicationId}, gig=${gigId}`);
    applications = applications.map((app) =>
      app.id === applicationId ? { ...app, status: 'accepted' } : app
    );

    if (gigId) {
      gigs = gigs.map((gig) =>
        gig.id === gigId ? { ...gig, status: 'filled' } : gig
      );
      io.emit('updateGigs', gigs);
    }

    io.emit('updateApplications', applications); // Broadcast to EVERYONE
  });

  // Worker cancels application (applied or accepted)
  socket.on('cancelApplication', ({ gigId, workerId }) => {
    console.log(`[Socket.io] Worker cancelled application for gig: ${gigId}`);
    applications = applications.filter((app) => app.gigId !== gigId);
    
    // Reopen the gig if it was filled
    gigs = gigs.map((gig) =>
      gig.id === gigId ? { ...gig, status: 'open' } : gig
    );

    io.emit('updateApplications', applications); // Broadcast to EVERYONE
    io.emit('updateGigs', gigs);
  });

  // Reset Demo handler
  socket.on('resetDemo', () => {
    console.log('[Socket.io] Resetting demo state');
    gigs = [];
    applications = [];
    io.emit('updateGigs', gigs);
    io.emit('updateApplications', applications);
  });

  socket.on('disconnect', () => {
    console.log(`[Socket.io] Client disconnected: ${socket.id}`);
  });
});

// React Router fallback catch-all route so all client routes work on refresh
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Fallback for any other unmatched routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`[Server] Production unified server listening on port ${PORT}`);
});
