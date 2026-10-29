import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Smartphone, ArrowRight, Sparkles, ShieldCheck, Zap, Laptop } from 'lucide-react';
import FirebaseStatusBanner from '../components/FirebaseStatusBanner';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Inter',sans-serif]">
      <FirebaseStatusBanner />

      <div className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 md:py-16 flex flex-col justify-center items-center text-center">
        
        {/* Main Badge */}
        <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full text-indigo-400 text-xs font-semibold mb-6">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Real-Time Firebase Firestore Two-Sided Marketplace</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight max-w-3xl leading-tight">
          On-Demand Event Staffing <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">In Real-Time</span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
          Open this app across two different devices (e.g. laptop for employer, smartphone for worker) 
          or in two split browser tabs. Data syncs instantaneously via Firebase Firestore.
        </p>

        {/* Two Massive Action Buttons */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          
          {/* Button 1: ENTER AS EMPLOYER */}
          <button
            onClick={() => navigate('/employer')}
            className="group relative bg-gradient-to-b from-slate-900 to-slate-950 hover:from-slate-850 hover:to-slate-900 border-2 border-indigo-500/40 hover:border-indigo-500 rounded-3xl p-8 text-left transition-all duration-300 shadow-xl hover:shadow-indigo-500/20 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Laptop className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30">
                Desktop Portal
              </span>
            </div>

            <div>
              <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
                Portal 1 • Event Organizer
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                ENTER AS EMPLOYER
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Post shifts in ₹, view real-time applicant feeds, and dispatch student workers with 1-click acceptance.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center text-sm font-bold text-indigo-400 group-hover:text-indigo-300">
              <span>Launch Desktop Console</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </button>

          {/* Button 2: ENTER AS WORKER */}
          <button
            onClick={() => navigate('/worker')}
            className="group relative bg-gradient-to-b from-slate-900 to-slate-950 hover:from-slate-850 hover:to-slate-900 border-2 border-emerald-500/40 hover:border-emerald-500 rounded-3xl p-8 text-left transition-all duration-300 shadow-xl hover:shadow-emerald-500/20 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Smartphone className="w-7 h-7" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30">
                Mobile View
              </span>
            </div>

            <div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                Portal 2 • Student Gig App
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                ENTER AS WORKER
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Browse available campus shifts, tap Apply, and receive real-time GPS shift confirmation.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center text-sm font-bold text-emerald-400 group-hover:text-emerald-300">
              <span>Launch Worker Smartphone App</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </button>

        </div>

        {/* Demonstration guidance note */}
        <div className="mt-12 p-4 max-w-xl bg-slate-900/60 border border-slate-800 rounded-2xl text-xs text-slate-400 flex items-center space-x-3 text-left">
          <Zap className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <span className="font-semibold text-slate-300">Multi-Device Tip:</span> Open the <span className="text-indigo-400">Employer</span> link on your computer and the <span className="text-emerald-400">Worker</span> link on your mobile phone (or side-by-side tabs) to experience the live instant synchronization!
          </div>
        </div>

      </div>

      <footer className="py-4 border-t border-slate-900 text-center text-xs text-slate-500">
        QuickStaff Platform • Powered by React, Vite, Tailwind CSS & Firebase Firestore
      </footer>
    </div>
  );
}

