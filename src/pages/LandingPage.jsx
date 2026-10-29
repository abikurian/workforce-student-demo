import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Laptop, Smartphone, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-['Inter',sans-serif]">
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 md:py-20 flex flex-col justify-center items-center text-center">
        
        {/* Minimal Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Event Staffing <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Marketplace</span>
        </h1>

        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl">
          On-demand student event workforce platform.
        </p>

        {/* Two Clean, Minimal Action Buttons */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          
          {/* Button 1: ENTER AS EMPLOYER */}
          <button
            onClick={() => navigate('/employer')}
            className="group relative bg-slate-900 hover:bg-slate-850 border border-indigo-500/30 hover:border-indigo-500 rounded-3xl p-8 text-left transition-all duration-200 shadow-xl hover:shadow-indigo-500/20 flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Laptop className="w-7 h-7" />
              </div>
              <ArrowRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1.5 transition-transform" />
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                ENTER AS EMPLOYER
              </div>
            </div>
          </button>

          {/* Button 2: ENTER AS WORKER */}
          <button
            onClick={() => navigate('/worker')}
            className="group relative bg-slate-900 hover:bg-slate-850 border border-emerald-500/30 hover:border-emerald-500 rounded-3xl p-8 text-left transition-all duration-200 shadow-xl hover:shadow-emerald-500/20 flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Smartphone className="w-7 h-7" />
              </div>
              <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1.5 transition-transform" />
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                ENTER AS WORKER
              </div>
            </div>
          </button>

        </div>

      </div>

      <footer className="py-4 border-t border-slate-900 text-center text-xs text-slate-500">
        QuickStaff
      </footer>
    </div>
  );
}
