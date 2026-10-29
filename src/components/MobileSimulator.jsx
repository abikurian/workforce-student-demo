import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Navigation, 
  Wifi, 
  Battery, 
  Signal, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight, 
  X,
  Compass,
  Calendar
} from 'lucide-react';

export default function MobileSimulator({ gigs, applications, onApply }) {
  const [gpsModalOpen, setGpsModalOpen] = useState(false);
  const [activeCheckInGig, setActiveCheckInGig] = useState(null);
  const [checkedInIds, setCheckedInIds] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'my-shifts'

  const handleOpenGpsModal = (gig) => {
    setActiveCheckInGig(gig);
    setGpsModalOpen(true);
  };

  const handleSimulateCheckIn = (gigId) => {
    if (!checkedInIds.includes(gigId)) {
      setCheckedInIds([...checkedInIds, gigId]);
    }
  };

  const myApplications = applications.map(a => a.gigId);
  const filteredGigs = activeFilter === 'my-shifts' 
    ? gigs.filter(g => myApplications.includes(g.id))
    : gigs;

  // Real-time formatted clock for the simulated mobile status bar
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex flex-col items-center justify-center p-2">
      {/* Phone Case Outer Rim */}
      <div className="w-[380px] h-[760px] bg-slate-950 rounded-[48px] border-[10px] border-slate-800 phone-shadow relative flex flex-col overflow-hidden ring-1 ring-slate-700/50 shadow-2xl">
        
        {/* Physical buttons simulation on side */}
        <div className="absolute -left-[14px] top-28 w-[4px] h-12 bg-slate-700 rounded-l-md pointer-events-none"></div>
        <div className="absolute -left-[14px] top-44 w-[4px] h-12 bg-slate-700 rounded-l-md pointer-events-none"></div>
        <div className="absolute -right-[14px] top-32 w-[4px] h-16 bg-slate-700 rounded-r-md pointer-events-none"></div>

        {/* Dynamic Island / Camera Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 pt-2 pb-1">
          <div className="w-32 h-5 bg-black rounded-full flex items-center justify-between px-3 shadow-inner">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-blue-900/60"></div>
            </div>
            <div className="w-10 h-1 bg-slate-900 rounded-full"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse"></div>
          </div>
        </div>

        {/* Mobile Status Bar */}
        <div className="w-full h-11 bg-slate-900/90 backdrop-blur-md pt-2 px-6 flex items-center justify-between text-[11px] text-slate-300 select-none z-20 border-b border-slate-800/60">
          <span className="font-semibold tracking-tight">{currentTime}</span>
          <div className="flex items-center space-x-1.5 text-slate-300">
            <Signal className="w-3 h-3 text-slate-300" />
            <span className="text-[10px] font-bold">5G</span>
            <Wifi className="w-3 h-3 text-slate-300" />
            <Battery className="w-3.5 h-3.5 text-slate-200" />
          </div>
        </div>

        {/* Mobile App Header */}
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between z-10">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-indigo-400/30">
              RS
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-bold text-white">Rahul Sharma</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="flex items-center space-x-1 text-[10px] text-indigo-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Verified Student Worker</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-medium">
            Campus ID: #7821
          </div>
        </div>

        {/* Subheader / Tabs */}
        <div className="bg-slate-900/90 px-4 py-2 flex items-center justify-between border-b border-slate-800/60 text-xs">
          <div className="flex space-x-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 w-full">
            <button
              onClick={() => setActiveFilter('all')}
              className={`flex-1 py-1 rounded-md text-center font-medium transition-all ${
                activeFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Explore Gigs ({gigs.length})
            </button>
            <button
              onClick={() => setActiveFilter('my-shifts')}
              className={`flex-1 py-1 rounded-md text-center font-medium transition-all ${
                activeFilter === 'my-shifts'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              My Shifts ({myApplications.length})
            </button>
          </div>
        </div>

        {/* Scrollable Job Feed with Smooth Transitions */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-400">
              {activeFilter === 'all' ? 'Available Event Gigs' : 'Your Applications'}
            </span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
              Live Feed
            </span>
          </div>

          {filteredGigs.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 rounded-full bg-slate-800/80 mx-auto flex items-center justify-center text-slate-500 mb-3">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-slate-300">No gigs to show</p>
              <p className="text-xs text-slate-500 mt-1">
                {activeFilter === 'my-shifts' 
                  ? 'You have not applied to any shifts yet.' 
                  : 'Post a gig from the Employer Console on the left.'}
              </p>
            </div>
          ) : (
            filteredGigs.map((gig) => {
              const application = applications.find((a) => a.gigId === gig.id);
              const isApplied = !!application;
              const isAccepted = application && application.status === 'accepted';
              const isCheckedIn = checkedInIds.includes(gig.id);

              return (
                <div
                  key={gig.id}
                  className="animate-slide-in bg-slate-850/90 rounded-2xl p-4 border border-slate-700/60 shadow-lg hover:border-indigo-500/40 transition-all relative overflow-hidden backdrop-blur-sm"
                >
                  {/* Status Indicator Pill */}
                  {isAccepted && (
                    <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-bl-xl flex items-center space-x-1 shadow-md">
                      <Sparkles className="w-3 h-3 fill-slate-950" />
                      <span>Hired</span>
                    </div>
                  )}

                  {/* Header info of Gig */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="pr-12">
                      <h4 className="font-bold text-white text-base leading-snug tracking-tight">
                        {gig.title}
                      </h4>
                      <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-1">
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 text-indigo-400 mr-0.5" />
                          Auditorium Hall A
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 text-slate-400 mr-0.5" />
                          4 hrs
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* High Visibility Wage Display */}
                  <div className="my-3 py-2 px-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Guaranteed Payout</div>
                      <div className="text-xl font-extrabold text-emerald-400 tracking-tight flex items-center">
                        <span className="text-2xl font-black mr-0.5">₹</span>
                        <span>{gig.wage.replace('₹', '')}</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-md font-semibold">
                      Instant UPI
                    </span>
                  </div>

                  {/* Action Button Area */}
                  <div className="mt-3">
                    {!isApplied ? (
                      <button
                        onClick={() => onApply(gig.id)}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer hover:shadow-indigo-500/30"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : !isAccepted ? (
                      <button
                        disabled
                        className="w-full bg-slate-800 text-amber-300/90 font-medium text-xs py-2.5 px-4 rounded-xl border border-amber-500/30 cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        <Clock className="w-3.5 h-3.5 animate-spin" />
                        <span>Applied - Awaiting Employer Acceptance</span>
                      </button>
                    ) : (
                      /* Accepted: Green GPS Check-in Button */
                      <div className="space-y-1.5">
                        <button
                          onClick={() => handleOpenGpsModal(gig)}
                          className={`w-full font-bold text-xs py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                            isCheckedIn
                              ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-300'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white animate-pulse-glow'
                          }`}
                        >
                          <Navigation className="w-4 h-4 animate-bounce" />
                          <span>
                            {isCheckedIn
                              ? '✓ Clocked In (GPS Verified)'
                              : 'Shift Confirmed - GPS Check-in Ready'}
                          </span>
                        </button>
                        <p className="text-[10px] text-center text-emerald-400 font-medium">
                          {isCheckedIn 
                            ? 'Attendance recorded on campus geofence' 
                            : 'Tap above to simulate worker GPS check-in'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Mobile Simulated Home Indicator Bar */}
        <div className="h-6 bg-slate-950 flex items-center justify-center">
          <div className="w-32 h-1 bg-slate-600 rounded-full"></div>
        </div>

        {/* Simulated GPS Check-in Modal Overlay */}
        {gpsModalOpen && activeCheckInGig && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm z-40 flex items-end justify-center p-3">
            <div className="w-full bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl animate-slide-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h5 className="font-bold text-white text-sm">Campus GPS Check-In</h5>
                </div>
                <button
                  onClick={() => setGpsModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 space-y-3">
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400">Shift Name</div>
                  <div className="text-sm font-bold text-white">{activeCheckInGig.title}</div>
                  <div className="text-xs text-emerald-400 font-mono mt-0.5">
                    {activeCheckInGig.wage}
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-emerald-300">Geofence Radius: 12m</div>
                    <div className="text-[10px] text-slate-400">Main Campus Event Hall (Auditorium)</div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 text-center">
                  Live verification prevents buddy punching & guarantees instant UPI settlement on shift close.
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => {
                    handleSimulateCheckIn(activeCheckInGig.id);
                    setGpsModalOpen(false);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Geofence Clock-In</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

