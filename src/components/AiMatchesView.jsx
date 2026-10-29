import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Star, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Check, 
  Briefcase,
  AlertCircle 
} from 'lucide-react';

export default function AiMatchesView({ 
  studentWorkers, 
  activeJob, 
  dispatchedWorkerIds, 
  onDispatchWorker, 
  onBackToDashboard 
}) {
  const [successAlert, setSuccessAlert] = useState(null);

  // Ensure workers are sorted descending by aiScore
  const sortedWorkers = [...studentWorkers].sort((a, b) => b.aiScore - a.aiScore);

  const handleDispatch = (worker) => {
    onDispatchWorker(worker.id);
    setSuccessAlert(`Success! ${worker.name} dispatched for ${activeJob ? activeJob.title : 'the shift'}.`);
  };

  return (
    <div className="flex-1 flex flex-col p-4 animate-fade-in">
      {/* Header with Back button */}
      <div className="pt-2 pb-4 border-b border-slate-200">
        <div className="flex items-center space-x-3 mb-2">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="min-h-[44px] min-w-[44px] rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-100 transition-all cursor-pointer shadow-sm"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              AI Candidate Matches
            </h1>
            <p className="text-xs text-slate-500">
              Based on semantic skill matching
            </p>
          </div>
        </div>

        {/* Active Job Context Pill */}
        {activeJob && (
          <div className="mt-2 bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-2 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
              <span className="font-semibold text-indigo-900">{activeJob.title}</span>
            </div>
            <span className="font-mono font-bold text-indigo-700">{activeJob.wage}/hr</span>
          </div>
        )}
      </div>

      {/* Success Alert Banner when a worker is dispatched */}
      {successAlert && (
        <div className="mt-3 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start space-x-3 text-emerald-900 text-xs shadow-sm animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-bold text-emerald-900">Worker Dispatched!</div>
            <div className="text-emerald-700 mt-0.5">{successAlert}</div>
          </div>
        </div>
      )}

      {/* AI Matches List */}
      <div className="flex-1 mt-4 space-y-3.5 pb-4">
        {sortedWorkers.map((worker, index) => {
          const isDispatched = dispatchedWorkerIds.includes(worker.id);

          return (
            <div
              key={worker.id}
              className={`bg-white rounded-2xl p-4 border transition-all shadow-sm ${
                isDispatched
                  ? 'border-emerald-300 ring-1 ring-emerald-200 bg-emerald-50/20'
                  : 'border-slate-200 hover:border-indigo-300'
              }`}
            >
              {/* Top row: Name, verified badge, and AI match score */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center">
                    {worker.name.replace('Student ', 'S-')}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h3 className="font-bold text-slate-900 text-base">
                        {worker.name}
                      </h3>
                      <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-0.5">
                      <div className="flex items-center text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                        <span>{worker.rating}</span>
                      </div>
                      <span>•</span>
                      <span>Verified Student</span>
                    </div>
                  </div>
                </div>

                {/* AI Score Tag */}
                <div className="flex flex-col items-end">
                  <span className="inline-flex items-center space-x-1 text-xs font-extrabold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    <Sparkles className="w-3 h-3 text-indigo-600" />
                    <span>{worker.aiScore}% Match</span>
                  </span>
                  {index === 0 && (
                    <span className="text-[10px] text-indigo-600 font-medium mt-1">
                      Top Recommendation
                    </span>
                  )}
                </div>
              </div>

              {/* Skills pill */}
              <div className="mt-3 flex items-center space-x-2 text-xs">
                <span className="text-slate-400 font-medium">Skill Match:</span>
                <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-semibold text-xs border border-slate-200">
                  {worker.skills}
                </span>
              </div>

              {/* Dispatch Action Button (min 44px tap target height) */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                {isDispatched ? (
                  <button
                    disabled
                    className="w-full min-h-[46px] bg-emerald-600 text-white font-semibold text-sm rounded-xl flex items-center justify-center space-x-2 shadow-sm cursor-default"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Worker Dispatched</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleDispatch(worker)}
                    className="w-full min-h-[46px] bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm rounded-xl shadow-md shadow-emerald-200 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Dispatch</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Back to Dashboard Footer Button (min 44px) */}
      <div className="pt-2 pb-4">
        <button
          onClick={onBackToDashboard}
          className="w-full min-h-[46px] bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl border border-slate-300 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>
    </div>
  );
}

