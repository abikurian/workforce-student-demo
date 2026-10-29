# QuickStaff — Two-Sided Event Staffing Marketplace
### Real-Time Socket.io Synchronization & Presentation-Ready UI

A high-fidelity two-sided event staffing marketplace built with **Vite**, **React**, **Tailwind CSS**, and **Socket.io**.

---

## 🚀 Running the App

### 1. Start the Backend Socket.io Server (Port 3001)
```powershell
node server.js
```
The server runs on `http://0.0.0.0:3001`.

### 2. Start the Frontend Vite Development Server (Port 5173)
```powershell
npm run dev
```

Visit `http://localhost:5173` in your browser. 
- Open `/employer` on your desktop/laptop.
- Open `/worker` on your smartphone (connected to the same Wi-Fi using your local IP `http://<YOUR_IP>:5173/worker`).

---

## ⚡ Socket Connection & Reset Logic

- **Dynamic Host IP Binding**:
  ```javascript
  const socket = io('http://' + window.location.hostname + ':3001');
  ```
  Works seamlessly across devices on the local network.
- **Immediate UI Load**: No blocking `isLoading` spinner state; both portals immediately render empty states while synchronizing data in the background.
- **Reset Demo**:
  - Employer Dashboard contains a subtle red **`[ Reset Demo ]`** button at the bottom.
  - Clicking emits `socket.emit('resetDemo')`, resetting `gigs` and `applications` to empty arrays across all connected client screens.
