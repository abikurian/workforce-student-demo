import React, { useState } from 'react';
import { isFirebaseConfigured } from '../firebase';
import { Database, CheckCircle2, AlertCircle, X, ExternalLink } from 'lucide-react';

export default function FirebaseStatusBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className={`px-4 py-2.5 text-xs flex items-center justify-between border-b ${
      isFirebaseConfigured
        ? 'bg-emerald-950/80 text-emerald-200 border-emerald-800/60'
        : 'bg-indigo-950/80 text-indigo-200 border-indigo-800/60'
    }`}>
      <div className="flex items-center space-x-2 max-w-4xl mx-auto w-full">
        {isFirebaseConfigured ? (
          <>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-300">Live Firebase Firestore Connected:</span>
            <span>Real-time cross-device synchronization is active.</span>
          </>
        ) : (
          <>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="font-semibold text-indigo-300">Cross-Tab / Cross-Window Sync Ready:</span>
            <span className="hidden sm:inline">To connect to your own Firebase Firestore, add your project credentials to <code className="bg-slate-900/80 px-1 py-0.5 rounded text-[11px] font-mono text-indigo-200">.env</code>.</span>
          </>
        )}
      </div>
      <button 
        onClick={() => setDismissed(true)} 
        className="text-slate-400 hover:text-white p-1 ml-2 cursor-pointer"
        aria-label="Dismiss banner"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

