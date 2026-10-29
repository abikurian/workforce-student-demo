import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EmployerConsole from './pages/EmployerConsole';
import WorkerApp from './pages/WorkerApp';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page with [ENTER AS EMPLOYER] and [ENTER AS WORKER] */}
        <Route path="/" element={<LandingPage />} />

        {/* Employer Web Console (Desktop-optimized) */}
        <Route path="/employer" element={<EmployerConsole />} />

        {/* Worker Mobile App Simulator (max-width: 400px, centered) */}
        <Route path="/worker" element={<WorkerApp />} />

        {/* Catch-all redirect to Landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
