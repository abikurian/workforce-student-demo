# QuickStaff — Two-Sided Event Staffing Marketplace
### Real-Time Socket.io Synchronization & Minimalist Presentation UI

A high-fidelity two-sided event staffing marketplace built with **Vite**, **React**, **Tailwind CSS**, and **Socket.io**. Designed for presentation demos with instant bi-directional updates between the **Employer Web Console** and the **Worker Mobile App**.

---

## 🚀 Running the App

### 1. Start the Backend Socket.io Server (Port 5000)
```powershell
node server.js
# Or: npm run server
```

### 2. Start the Frontend Vite Development Server (Port 5173)
```powershell
npm run dev
```

Visit `http://localhost:5173` in your browser. Open `/employer` on your desktop and `/worker` in a mobile viewport (or on a smartphone) to test real-time synchronization.

---

## ⚡ Socket.io Real-Time Synchronization Events

### Backend (`server.js`)
- `connection`: Transmits the initial `updateGigs` and `updateApplications` arrays to connecting clients.
- `postGig`: Prepends the newly created gig and broadcasts `io.emit('updateGigs', gigs)` to all connected devices.
- `applyGig`: Creates a pending application and broadcasts `io.emit('updateApplications', applications)`.
- `acceptApplicant`: Updates the application status to `'accepted'`, updates the gig status to `'filled'`, and broadcasts `io.emit('updateGigs', gigs)` and `io.emit('updateApplications', applications)`.

### Frontend Clients
- **Employer (`src/pages/EmployerConsole.jsx`)**: Listens to `updateGigs` and `updateApplications`; emits `postGig` and `acceptApplicant`.
- **Worker (`src/pages/WorkerApp.jsx`)**: Listens to `updateGigs` and `updateApplications`; emits `applyGig`. Unlocks green `[Shift Confirmed - GPS Track Active]` when employer accepts.
