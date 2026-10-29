import React from 'react';
import { Sparkles, RotateCcw, Play, Zap, GraduationCap, ArrowLeftRight } from 'lucide-react';

export default function DemoHeader({ onReset, onAutoDemo }) {
  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-3.5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Title and Academic context */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-extrabold text-white tracking-tight">
                QuickStaff <span className="text-indigo-400 font-semibold">Campus</span>
              </h1>
              <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                Wizard of Oz Prototype
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Two-Sided University Event Staffing Platform Simulation (Live Client-Side Sync)
            </p>
          </div>
        </div>

        {/* Live sync pill & actions */}
        <div className="flex items-center flex-wrap gap-2.5">
          <div className="hidden lg:flex items-center space-x-1.5 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-lg text-xs text-slate-300">
            <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span className="text-slate-400">Employer Web</span>
            <span className="text-emerald-400 font-semibold">↔</span>
            <span className="text-slate-400">Worker Mobile</span>
          </div>

          <button
            onClick={onAutoDemo}
            className="text-xs bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm hover:border-indigo-400"
            title="Auto-trigger a demo application & acceptance cycle"
          >
            <Play className="w-3.5 h-3.5 fill-indigo-400 text-indigo-400" />
            <span>1-Click Presentation Run</span>
          </button>

          <button
            onClick={onReset}
            className="text-xs bg-slate-800 hover:bg-slate-700 active:bg-slate-850 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 cursor-pointer"
            title="Reset to default initial state"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Demo</span>
          </button>
        </div>

      </div>
    </header>
  );
}

