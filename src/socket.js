import { io } from 'socket.io-client';

// Dynamically use the host's IP and port 3001
export const socket = io('http://' + (typeof window !== 'undefined' ? window.location.hostname : 'localhost') + ':3001', {
  transports: ['websocket', 'polling'],
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});

socket.on('connect', () => {
  console.log('[Socket.io Client] Connected to server at http://' + window.location.hostname + ':3001');
});

socket.on('connect_error', (err) => {
  console.warn('[Socket.io Client] Connection error:', err.message);
});
