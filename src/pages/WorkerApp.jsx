import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Navigation, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  ArrowLeft, 
  User, 
  X,
  Compass
} from 'lucide-react';
import { socket } from '../socket';

export default function WorkerApp() {
  const [gigs, setGigs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mobile Bottom Tab State: 'feed' | 'shifts' | 'profile'
  const [activeTab, setActiveTab] = useState('feed');

  // Green accepted notification popup state
  const [acceptedNotice, setAcceptedNotice] = useState(null);
  const [notifiedAppIds, setNotifiedAppIds] = useState(new Set());

  // GPS Modal State
  const [gpsModalOpen, setGpsModalOpen] = useState(false);
  const [selectedGigForGps, setSelectedGigForGps] = useState(null);

  // Socket.io Real-Time Synchronization Listener
  useEffect(() => {
    socket.on('updateGigs', (updatedGigs) => {
      setGigs(updatedGigs);
      setLoading(false);
    });

    socket.on('updateApplications', (updatedApps) => {
      setApplications(updatedApps);

      // Check if any application just transitioned to 'accepted'
      updatedApps.forEach((app) => {
        if (app.status === 'accepted' && !notifiedAppIds.has(app.id)) {
          setNotifiedAppIds((prev) => new Set(prev).add(app.id));
          setAcceptedNotice({
            appId: app.id,
            gigId: app.gigId,
          });
        }
      });
    });

    return () => {
      socket.off('updateGigs');
      socket.off('updateApplications');
    };
  }, [notifiedAppIds]);

  const handleApply = (gigId) => {
    socket.emit('applyGig', {
      gigId,
      workerName: 'Student Worker',
    });
  };

  const acceptedGig = acceptedNotice 
    ? gigs.find((g) => g.id === acceptedNotice.gigId) 
    : null;

  const myAppliedGigIds = applications.map((a) => a.gigId);
  const myGigs = gigs.filter((g) => myAppliedGigIds.includes(g.id));

  const displayGigs = activeTab === 'shifts' ? myGigs : gigs;

  return (
    <div className="w-full min-h-screen bg-gray-50 text-slate-800 flex flex-col font-['Inter',sans-serif]">
      {/* Native Mobile App Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
        <div className="flex items-center space-x-3">
          <Link
            to="/"
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-slate-600 transition-colors"
            title="Back to Landing"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
            SW
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-bold text-slate-900">Student Worker</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-center space-x-1 text-[11px] text-emerald-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Active & Verified</span>
            </div>
          </div>
        </div>
      </header>

      {/* Real-time Green Accepted Pop-up Notification */}
      {acceptedNotice && (
        <div className="fixed top-16 inset-x-4 z-50 animate-bounce duration-700 max-w-lg mx-auto">
          <div className="bg-emerald-600 text-white rounded-2xl p-4 shadow-2xl border border-emerald-400 flex items-start space-x-3">
            <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5 text-white" />
            <div className="flex-1">
              <div className="font-extrabold text-sm">Shift Confirmed! 🎉</div>
              <div className="text-xs text-emerald-100 mt-0.5">
                The employer accepted your application for{' '}
                <span className="font-bold underline">{acceptedGig ? acceptedGig.title : 'the shift'}</span>. GPS tracking is now active!
              </div>
            </div>
            <button
              onClick={() => setAcceptedNotice(null)}
              className="text-white hover:text-emerald-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Subheader / Tabs Bar */}
      <div className="bg-white px-4 py-2.5 border-b border-gray-200 flex items-center justify-between text-xs sticky top-[57px] z-20">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
          <span>{activeTab === 'shifts' ? 'My Confirmed Shifts' : 'Live Campus Feed'}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping"></span>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">
          {displayGigs.length} {displayGigs.length === 1 ? 'Gig' : 'Gigs'} available
        </span>
      </div>

      {/* Main Native Feed Content */}
      <main className="flex-1 p-4 space-y-3.5 pb-24 max-w-lg mx-auto w-full">
        {loading ? (
          <div className="py-20 text-center text-slate-400">
            <Clock className="w-8 h-8 animate-spin mx-auto mb-2 text-indigo-500" />
            <p className="text-xs font-medium">Connecting to live shifts...</p>
          </div>
        ) : displayGigs.length === 0 ? (
          <div className="py-16 text-center text-slate-400 border border-dashed border-gray-300 rounded-2xl p-6 bg-white">
            <Briefcase className="w-8 h-8 mx-auto mb-2 text-slate-400" />
            <p className="text-sm font-semibold text-slate-700">
              {activeTab === 'shifts' ? 'No applications yet' : 'No active gigs posted'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {activeTab === 'shifts'
                ? 'Explore the Feed tab to apply for upcoming events.'
                : 'Gigs posted by the Employer console will appear here instantly.'}
            </p>
          </div>
        ) : (
          displayGigs.map((gig) => {
            const userApp = applications.find((a) => a.gigId === gig.id);
            const isApplied = Boolean(userApp);
            const isAccepted = userApp && userApp.status === 'accepted';

            return (
              <div
                key={gig.id}
                className={`bg-white rounded-2xl p-4 border transition-all shadow-xs relative ${
                  isAccepted
                    ? 'border-emerald-300 ring-1 ring-emerald-200'
                    : isApplied
                    ? 'border-indigo-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Accepted pill tag */}
                {isAccepted && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-bl-xl flex items-center space-x-1 shadow-xs">
                    <Sparkles className="w-3 h-3 fill-white" />
                    <span>Hired</span>
                  </div>
                )}

                {/* Job Title & Details */}
                <div className="pr-10">
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {gig.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-indigo-500" />
                      {gig.date || 'Today'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      Main Campus
                    </span>
                  </div>
                </div>

                {/* Wage Display */}
                <div className="my-3 py-2 px-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Guaranteed Payout
                  </div>
                  <div className="text-xl font-extrabold text-emerald-600 flex items-center font-mono">
                    <span className="text-lg mr-0.5">₹</span>
                    <span>{gig.wage.replace('₹', '')}</span>
                  </div>
                </div>

                {/* Action Button (Large tap target min 46px) */}
                <div>
                  {!isApplied ? (
                    <button
                      onClick={() => handleApply(gig.id)}
                      className="w-full min-h-[46px] bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>Apply</span>
                    </button>
                  ) : !isAccepted ? (
                    <button
                      disabled
                      className="w-full min-h-[46px] bg-gray-100 text-amber-600 font-semibold text-xs py-3 px-4 rounded-xl border border-amber-200 flex items-center justify-center space-x-2 cursor-not-allowed"
                    >
                      <Clock className="w-4 h-4 animate-spin text-amber-600" />
                      <span>Applied</span>
                    </button>
                  ) : (
                    /* Accepted: [Shift Confirmed - GPS Track Active] */
                    <div className="space-y-1.5">
                      <button
                        onClick={() => {
                          setSelectedGigForGps(gig);
                          setGpsModalOpen(true);
                        }}
                        className="w-full min-h-[48px] bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer ring-2 ring-emerald-300 animate-pulse"
                      >
                        <Navigation className="w-4 h-4 text-white animate-bounce" />
                        <span>Shift Confirmed - GPS Track Active</span>
                      </button>
                      <p className="text-[11px] text-center text-emerald-600 font-medium">
                        Tap to view live geofence verification
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </main>

      {/* Native Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-6 py-2 flex items-center justify-around z-30 max-w-lg mx-auto">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center justify-center min-h-[48px] min-w-[64px] transition-colors cursor-pointer ${
            activeTab === 'feed' ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Briefcase className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Gigs Feed</span>
        </button>

        <button
          onClick={() => setActiveTab('shifts')}
          className={`flex flex-col items-center justify-center min-h-[48px] min-w-[64px] transition-colors cursor-pointer relative ${
            activeTab === 'shifts' ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {myAppliedGigIds.length > 0 && (
            <span className="absolute top-1 right-3 w-4 h-4 rounded-full bg-emerald-600 text-white font-bold text-[9px] flex items-center justify-center">
              {myAppliedGigIds.length}
            </span>
          )}
          <Calendar className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">My Shifts</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center min-h-[48px] min-w-[64px] transition-colors cursor-pointer ${
            activeTab === 'profile' ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Profile</span>
        </button>
      </nav>

      {/* GPS Tracking Modal */}
      {gpsModalOpen && selectedGigForGps && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-3 animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl space-y-4 border border-gray-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">GPS Geofence Tracking</h4>
                  <p className="text-[10px] text-emerald-600 font-medium">Live Attendance Verification</p>
                </div>
              </div>
              <button
                onClick={() => setGpsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                <div className="text-[10px] text-slate-500">Shift Confirmed:</div>
                <div className="text-sm font-bold text-slate-900">{selectedGigForGps.title}</div>
                <div className="text-emerald-600 font-mono font-bold mt-0.5">{selectedGigForGps.wage}</div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Navigation className="w-4 h-4 animate-spin" />
                </div>
                <div>
                  <div className="font-bold text-emerald-900">Geofence Status: Within Radius</div>
                  <div className="text-[10px] text-emerald-700">Main Campus Event Hall • Accuracy 4m</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setGpsModalOpen(false)}
              className="w-full min-h-[46px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
