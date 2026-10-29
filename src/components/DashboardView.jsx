import React from 'react';
import { Plus, Briefcase, Calendar, IndianRupee, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function DashboardView({ jobs, onNavigateToPost, onSelectJobForMatches }) {
  return (
    <div className="flex-1 flex flex-col p-4 animate-fade-in">
      {/* Top Header */}
      <div className="pt-2 pb-5 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Employer Dashboard
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Local Workforce Marketplace
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-xs flex items-center justify-center">
            EM
          </div>
        </div>
      </div>

      {/* Primary Action Button (min 44px height for mobile tap targets) */}
      <div className="my-5">
        <button
          onClick={onNavigateToPost}
          className="w-full min-h-[50px] bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-base rounded-xl shadow-md shadow-indigo-200 transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>Post New Gig</span>
        </button>
      </div>

      {/* Active Jobs Section */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Active Gigs ({jobs.length})
          </h2>
          {jobs.length > 0 && (
            <span className="text-xs text-indigo-600 font-medium">Live</span>
          )}
        </div>

        {jobs.length === 0 ? (
          <div className="flex-1 min-h-[260px] bg-white rounded-2xl border border-dashed border-slate-300 p-8 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="w-14 h-14 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Briefcase className="w-7 h-7" />
            </div>
            <p className="text-base font-semibold text-slate-700">
              No active gigs. Post one to find workers.
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Tap the button above to broadcast your shift and instantly match with verified student workers.
            </p>
          </div>
        ) : (
          <div className="space-y-3 pb-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:border-indigo-300 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {job.title}
                    </h3>
                    <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1.5">
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        {job.dateTime || 'Today • Flexible'}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                    job.isDispatched
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  }`}>
                    {job.isDispatched ? 'Dispatched' : 'Active'}
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center font-bold text-slate-900 text-base">
                    <span className="text-indigo-600 font-extrabold mr-0.5">₹</span>
                    <span>{job.wage.replace('₹', '')}</span>
                    <span className="text-xs font-normal text-slate-500 ml-1">/hr</span>
                  </div>

                  <button
                    onClick={() => onSelectJobForMatches(job)}
                    className="min-h-[44px] px-3.5 bg-slate-50 hover:bg-indigo-50 text-indigo-600 font-semibold text-xs rounded-lg border border-slate-200 hover:border-indigo-300 transition-all flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    <span>View AI Matches</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

