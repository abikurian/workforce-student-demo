import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  PlusCircle, 
  Briefcase, 
  Users, 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  Send, 
  Sparkles, 
  AlertCircle,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { socket } from '../socket';

export default function EmployerConsole() {
  const [gigs, setGigs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [title, setTitle] = useState('');
  const [wage, setWage] = useState('');
  const [date, setDate] = useState('');
  const [formError, setFormError] = useState('');
  const [actionNotice, setActionNotice] = useState(null);

  // Socket.io Real-Time Synchronization
  useEffect(() => {
    socket.on('updateGigs', (updatedGigs) => {
      setGigs(updatedGigs);
      setLoading(false);
    });

    socket.on('updateApplications', (updatedApps) => {
      setApplications(updatedApps);
    });

    return () => {
      socket.off('updateGigs');
      socket.off('updateApplications');
    };
  }, []);

  const handlePostGig = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Please enter a job title (e.g. Catering, Stage Setup).');
      return;
    }
    if (!wage.trim()) {
      setFormError('Please specify the hourly/shift wage in ₹.');
      return;
    }

    setFormError('');

    socket.emit('postGig', {
      title: title.trim(),
      wage: wage.trim(),
      date: date.trim() || 'Today • Flexible',
    });

    setTitle('');
    setWage('');
    setDate('');
    setActionNotice('Shift broadcasted live! Workers can now view and apply.');
    setTimeout(() => setActionNotice(null), 3000);
  };

  const handleAcceptApplicant = (applicationId, gigId, applicantName) => {
    socket.emit('acceptApplicant', {
      applicationId,
      gigId,
    });

    setActionNotice(`Accepted ${applicantName}! Shift confirmed on worker's device.`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const quickPresets = [
    { title: 'Catering Staff', wage: '₹500/hr', date: 'Tonight • 6:00 PM' },
    { title: 'Stage Setup', wage: '₹750/hr', date: 'Tomorrow • 10:00 AM' },
    { title: 'Photography', wage: '₹1,200/hr', date: 'Saturday • 3:00 PM' },
    { title: 'Guest Registration', wage: '₹400/hr', date: 'Friday • 9:00 AM' },
  ];

  const pendingAppsCount = applications.filter((a) => a.status === 'pending').length;
  const acceptedAppsCount = applications.filter((a) => a.status === 'accepted').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Inter',sans-serif]">
      {/* Top Navbar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center space-x-1.5 text-xs font-medium"
              title="Return to Portal Select"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Landing</span>
            </Link>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight">Employer Web Console</h1>
                <p className="text-xs text-slate-400">Campus Event Coordination & Student Dispatch</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/worker"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center space-x-1.5 text-xs bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg font-semibold transition-all"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Open Worker Portal in New Tab ↗</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Action Notification Banner */}
      {actionNotice && (
        <div className="bg-indigo-600 text-white text-xs px-4 py-2 text-center font-medium shadow-md animate-fade-in">
          {actionNotice}
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">TOTAL ACTIVE GIGS</span>
              <Briefcase className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{gigs.length}</div>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-md relative overflow-hidden">
            {pendingAppsCount > 0 && (
              <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
            )}
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">AWAITING ACCEPTANCE</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-amber-300">{pendingAppsCount}</div>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-md">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">CONFIRMED SHIFTS</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-400">{acceptedAppsCount}</div>
          </div>
        </div>

        {/* Layout Grid: Form (Left) & Active Gigs Board (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Post Gig Form */}
          <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-indigo-500/20 p-6 shadow-xl">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                <PlusCircle className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-white">Post a New Gig</h2>
            </div>

            {/* Quick Autofill Presets */}
            <div className="mb-4">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span>Quick Presets:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickPresets.map((preset) => (
                  <button
                    key={preset.title}
                    type="button"
                    onClick={() => {
                      setTitle(preset.title);
                      setWage(preset.wage);
                      setDate(preset.date);
                      setFormError('');
                    }}
                    className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600/30 text-slate-200 border border-slate-700 hover:border-indigo-500/50 transition-all cursor-pointer"
                  >
                    <span>{preset.title}</span> • <span className="font-bold text-emerald-400">{preset.wage}</span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handlePostGig} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Job Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Catering Staff, Stage Setup"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Wage in INR (₹) <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-base font-bold text-slate-400 pointer-events-none">
                      ₹
                    </span>
                    <input
                      type="text"
                      value={wage.replace('₹', '')}
                      onChange={(e) => setWage(e.target.value)}
                      placeholder="500 or 500/hr"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3.5 py-2.5 text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Date & Shift Time
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. Tonight • 6:00 PM"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              {formError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full min-h-[48px] bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Post Gig</span>
              </button>
            </form>
          </div>

          {/* Right Column: Active Gigs & Applicants Board */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
              <Briefcase className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base font-bold text-white">Active Gigs & Applicants Board</h2>
            </div>

            {loading ? (
              <div className="py-12 text-center text-slate-500">
                <Clock className="w-8 h-8 animate-spin mx-auto mb-2 text-indigo-400" />
                <p className="text-sm">Loading active gigs...</p>
              </div>
            ) : gigs.length === 0 ? (
              <div className="py-12 text-center text-slate-500 border border-dashed border-slate-800 rounded-xl">
                <Briefcase className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                <p className="text-sm font-semibold text-slate-300">No gigs posted yet</p>
                <p className="text-xs text-slate-500 mt-1">
                  Use the form on the left to post a new gig.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {gigs.map((gig) => {
                  const gigApps = applications.filter((a) => a.gigId === gig.id);
                  const pendingApp = gigApps.find((a) => a.status === 'pending');
                  const acceptedApp = gigApps.find((a) => a.status === 'accepted');

                  return (
                    <div
                      key={gig.id}
                      className={`bg-slate-950 rounded-xl p-4 border transition-all ${
                        pendingApp
                          ? 'border-amber-500/40 bg-slate-950/90'
                          : acceptedApp
                          ? 'border-emerald-500/40'
                          : 'border-slate-800'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-bold text-white text-base">{gig.title}</h3>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              gig.status === 'filled'
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                            }`}>
                              {gig.status === 'filled' ? 'Filled' : 'Open'}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
                            <span className="flex items-center">
                              <Calendar className="w-3.5 h-3.5 mr-1 text-slate-500" />
                              {gig.date || 'Flexible'}
                            </span>
                            <span>•</span>
                            <span className="font-mono font-bold text-emerald-400 text-sm">
                              {gig.wage.startsWith('₹') ? gig.wage : `₹${gig.wage}`}
                            </span>
                          </div>
                        </div>

                        {/* Applicant & Accept Action */}
                        <div className="sm:text-right pt-2 sm:pt-0">
                          {pendingApp ? (
                            <div className="flex items-center sm:justify-end space-x-3">
                              <div className="text-left sm:text-right">
                                <span className="block text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                                  Applicant Ready:
                                </span>
                                <span className="text-xs font-semibold text-white">
                                  {pendingApp.workerName || 'Student Worker'}
                                </span>
                              </div>
                              <button
                                onClick={() => handleAcceptApplicant(pendingApp.id, gig.id, pendingApp.workerName || 'Student Worker')}
                                className="min-h-[40px] px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-md shadow-emerald-600/30 transition-all flex items-center space-x-1.5 cursor-pointer"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Accept</span>
                              </button>
                            </div>
                          ) : acceptedApp ? (
                            <div className="inline-flex items-center space-x-1.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>Worker: {acceptedApp.workerName || 'Student Worker'} (Accepted)</span>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-500 italic">
                              Awaiting candidate apply...
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </main>
    </div>
  );
}
