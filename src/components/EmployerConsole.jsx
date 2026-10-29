import React, { useState } from 'react';
import { 
  Briefcase, 
  PlusCircle, 
  IndianRupee, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Send, 
  Building2, 
  Sparkles,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

export default function EmployerConsole({ 
  gigs, 
  applications, 
  onPostGig, 
  onAcceptApplicant 
}) {
  const [title, setTitle] = useState('');
  const [wage, setWage] = useState('');
  const [category, setCategory] = useState('Event Crew');
  const [formError, setFormError] = useState('');

  const quickPresets = [
    { title: 'Stage Setup Crew', wage: '800', category: 'Logistics' },
    { title: 'Event Photography', wage: '1500', category: 'Media' },
    { title: 'Guest Registration Desk', wage: '600', category: 'Hospitality' },
    { title: 'Sound & Audio Technician', wage: '1200', category: 'Tech' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Please enter a job title');
      return;
    }
    if (!wage.trim()) {
      setFormError('Please specify the shift wage');
      return;
    }

    // Format wage with ₹ symbol if not present
    const formattedWage = wage.startsWith('₹') ? wage : `₹${wage}/shift`;

    onPostGig({
      title: title.trim(),
      wage: formattedWage,
      category,
    });

    setTitle('');
    setWage('');
    setFormError('');
  };

  const handleApplyPreset = (preset) => {
    setTitle(preset.title);
    setWage(preset.wage);
    setCategory(preset.category);
    setFormError('');
  };

  // Metrics calculations
  const totalGigs = gigs.length;
  const appliedCount = applications.filter(a => a.status === 'applied').length;
  const filledCount = gigs.filter(g => g.status === 'filled').length;

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900/90 text-slate-100 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
      {/* Top Console Navigation */}
      <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-white tracking-tight">Employer Web Console</h2>
              <span className="bg-indigo-500/10 text-indigo-400 text-xs px-2.5 py-0.5 rounded-full font-medium border border-indigo-500/20">
                Live Admin Mode
              </span>
            </div>
            <p className="text-xs text-slate-400">Campus Event Coordination & On-demand Student Dispatch</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 text-slate-300">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Instant State Dispatch</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Quick KPI stats row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 backdrop-blur-sm">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-medium uppercase tracking-wider">Total Gigs</span>
              <Briefcase className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-white">{totalGigs}</div>
            <div className="text-xs text-slate-400 mt-1">Live in marketplace feed</div>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 backdrop-blur-sm relative overflow-hidden">
            {appliedCount > 0 && (
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            )}
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-medium uppercase tracking-wider">Action Needed</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-300">{appliedCount}</div>
            <div className="text-xs text-amber-300/80 mt-1">Applicants awaiting accept</div>
          </div>

          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 backdrop-blur-sm">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-medium uppercase tracking-wider">Filled Shifts</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400">{filledCount}</div>
            <div className="text-xs text-emerald-400/80 mt-1">GPS check-in verified</div>
          </div>
        </div>

        {/* Post a Gig Card */}
        <div className="bg-slate-800/60 rounded-xl p-5 border border-indigo-500/20 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                <PlusCircle className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-white text-base">Post a New Campus Gig</h3>
            </div>
            <span className="text-xs text-slate-400">Publishes instantly to mobile feed</span>
          </div>

          {/* Quick preset chips for rapid professor demoing */}
          <div className="mb-4">
            <div className="text-xs text-slate-400 mb-2 flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>Quick Demo Templates (1-click fill):</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickPresets.map((preset) => (
                <button
                  key={preset.title}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-700/60 hover:bg-indigo-600/30 hover:border-indigo-500/40 text-slate-200 border border-slate-600/60 transition-all flex items-center space-x-1"
                >
                  <span>{preset.title}</span>
                  <span className="text-emerald-400 font-semibold">₹{preset.wage}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Job Title <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Stage Setup Crew, Photography"
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Compensation (in ₹) <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-bold">
                    ₹
                  </div>
                  <input
                    type="text"
                    value={wage}
                    onChange={(e) => setWage(e.target.value.replace('₹', ''))}
                    placeholder="800 or 800/shift"
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-lg pl-8 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-mono"
                  />
                </div>
              </div>
            </div>

            {formError && (
              <div className="text-xs text-rose-400 flex items-center space-x-1.5 bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{formError}</span>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg shadow-md hover:shadow-indigo-500/25 transition-all flex items-center space-x-2 group cursor-pointer"
              >
                <span>Broadcast Gig to Students</span>
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </form>
        </div>

        {/* Active Gigs Table */}
        <div className="bg-slate-800/60 rounded-xl border border-slate-700/60 overflow-hidden shadow-md">
          <div className="px-5 py-3.5 border-b border-slate-700/60 flex items-center justify-between bg-slate-850">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <h3 className="font-semibold text-white text-sm">Active Gigs Management</h3>
            </div>
            <span className="text-xs text-slate-400">
              {gigs.length} {gigs.length === 1 ? 'Job' : 'Jobs'} listed
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-700/60">
                <tr>
                  <th className="py-3 px-4">Job Title</th>
                  <th className="py-3 px-4">Shift Wage</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Applicant Status</th>
                  <th className="py-3 px-4 text-right">Employer Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/40">
                {gigs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-slate-500">
                      No gigs posted yet. Use the form above to add one.
                    </td>
                  </tr>
                ) : (
                  gigs.map((gig) => {
                    const app = applications.find((a) => a.gigId === gig.id);
                    const hasApplicant = app && app.status === 'applied';
                    const isAccepted = app && app.status === 'accepted';

                    return (
                      <tr 
                        key={gig.id} 
                        className={`hover:bg-slate-800/40 transition-colors ${
                          hasApplicant ? 'bg-indigo-950/20' : ''
                        }`}
                      >
                        <td className="py-3.5 px-4 font-semibold text-white">
                          <div className="flex items-center space-x-2">
                            <span>{gig.title}</span>
                            {gig.id === 1 && (
                              <span className="text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded font-normal">
                                Default
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-mono font-bold text-emerald-400 text-sm">
                          {gig.wage.startsWith('₹') ? gig.wage : `₹${gig.wage}`}
                        </td>

                        <td className="py-3.5 px-4">
                          {gig.status === 'filled' ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-emerald-400"></span>
                              Filled
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-sky-500/15 text-sky-400 border border-sky-500/30">
                              <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                              Open
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          {hasApplicant && (
                            <div className="inline-flex items-center space-x-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full animate-bounce duration-1000">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                              <span className="font-semibold text-[11px]">Applicant Waiting</span>
                            </div>
                          )}

                          {isAccepted && (
                            <div className="inline-flex items-center space-x-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="font-semibold text-[11px]">Worker Confirmed</span>
                            </div>
                          )}

                          {!app && (
                            <span className="text-slate-500 text-[11px] flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-slate-500" />
                              <span>No applications yet</span>
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          {hasApplicant && (
                            <button
                              onClick={() => onAcceptApplicant(gig.id)}
                              className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg shadow-sm hover:shadow-emerald-500/25 transition-all inline-flex items-center space-x-1.5 cursor-pointer glow-emerald"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Accept Applicant</span>
                            </button>
                          )}

                          {isAccepted && (
                            <span className="text-emerald-400 font-medium text-xs flex items-center justify-end space-x-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Accepted & Locked</span>
                            </span>
                          )}

                          {!hasApplicant && !isAccepted && (
                            <span className="text-slate-500 text-xs italic">
                              Awaiting candidate
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Prototype Explanation for Professors */}
        <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 text-xs text-slate-400 space-y-1.5">
          <div className="font-semibold text-slate-300 flex items-center space-x-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
            <span>Wizard of Oz Demonstration Flow:</span>
          </div>
          <p>
            1. Post a job or click a quick template above. Notice it instantly animates into the mobile phone simulator on the right.
          </p>
          <p>
            2. On the mobile phone, click <span className="text-indigo-400 font-semibold">[Apply Now]</span>. Watch this dashboard immediately pop up an applicant notification badge.
          </p>
          <p>
            3. Click the green <span className="text-emerald-400 font-semibold">[Accept Applicant]</span> button. The phone view immediately unlocks the GPS Shift Check-in button!
          </p>
        </div>
      </div>
    </div>
  );
}

