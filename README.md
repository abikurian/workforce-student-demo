# QuickStaff — Two-Sided Event Staffing Marketplace
### Unified Single-Server Production & Real-Time Socket.io

A full-stack event staffing marketplace built with **React**, **Vite**, **Tailwind CSS**, and **Socket.io**. Configured for 24/7 cloud deployment as a unified single-server Node.js application.

---

## ☁️ Cloud Deployment (Render, Railway, Heroku, Fly.io, etc.)

The app is merged for single-server deployment. The Node.js backend serves both the compiled React frontend (`dist/`) and the real-time WebSocket server on a single port.

### Build & Start Commands:
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start` (or `node server.js`)

The server dynamically binds to the cloud host's port (`process.env.PORT || 3001`).

---

## 📱 Features

1. **Worker Shift Cancellation**:
   - In the Worker App, applied or confirmed shifts feature a **`[ Cancel ]`** button.
   - Tapping it emits `cancelApplication` to the server.
   - The application is removed in real-time, the gig returns to `open` status, and the employer's board immediately reflects the change.

2. **Dynamic WebSocket Origin**:
   - Frontend connects via `io(window.location.origin)`.
   - In production, it connects to the cloud server domain seamlessly without hardcoded hostnames or IPs.
   - In local development, it proxies through Vite to port 3001.

3. **Single-Port React Router SPA Support**:
   - Integrated catch-all route in `server.js` (`app.use` / `app.get`) serves `dist/index.html` on direct refreshes of `/employer`, `/worker`, and `/`.
