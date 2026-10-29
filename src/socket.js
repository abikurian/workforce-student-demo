import { io } from 'socket.io-client';

// Determine socket server URL
// When running with Vite dev proxy, connecting to origin or window.location.hostname:5000 works seamlessly
const SOCKET_URL = 
  import.meta.env.VITE_SOCKET_URL || 
  (typeof window !== 'undefined' 
    ? `${window.location.protocol}//${window.location.hostname}:5000` 
    : 'http://localhost:5000');

export const socket = io(SOCKET_URL, {
  transports: ['websocket', 'polling'],
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});

socket.on('connect', () => {
  console.log('[Socket.io Client] Connected to server at', SOCKET_URL);
});

socket.on('connect_error', (err) => {
  console.warn('[Socket.io Client] Connection error:', err.message);
});

