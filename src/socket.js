import { io } from 'socket.io-client';

// Uses cloud host's URL in production, falls back to local origin for testing
export const socket = io(typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001', {
  transports: ['websocket', 'polling'],
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});

socket.on('connect', () => {
  console.log('[Socket.io Client] Connected via', window.location.origin);
});

socket.on('connect_error', (err) => {
  console.warn('[Socket.io Client] Connection error:', err.message);
});
