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
  Wifi, 
  Battery, 
  Signal, 
  Sparkles, 
  ArrowLeft, 
  User, 
  Check, 
  X,
  Compass,
  AlertCircle
} from 'lucide-react';
import { 
  subscribeToGigs, 
  subscribeToApplications, 
  createApplication,
  isFirebaseConfigured 
} from '../firebase';
import FirebaseStatusBanner from '../components/FirebaseStatusBanner';

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

  // Real-time onSnapshot listeners
  useEffect(() => {
    const unsubGigs = subscribeToGigs((data) => {
      setGigs(data);
      setLoading(false);
    });

    const unsubApps = subscribeToApplications((data) => {
      setApplications(data);

      // Check if any application just transitioned to 'accepted'
      data.forEach((app) => {
        if (app.status === 'accepted' && !notifiedAppIds.has(app.id)) {
          setNotifiedAppIds((prev) => new Set(prev).add(app.id));
          // Trigger the green celebration notification
          setAcceptedNotice({
            appId: app.id,
            gigId: app.gigId,
          });
        }
      });
    });

    return () => {
      if (typeof unsubGigs === 'function') unsubGigs();
      if (typeof unsubApps === 'function') unsubApps();
    };
  }, [notifiedAppIds]);

  const handleApply = async (gigId) => {
    try {
      await createApplication({
        gigId,
        workerName: 'Student Worker',
      });
    } catch (err) {
      console.error('Failed to submit application:', err);
    }
  };

  // Find accepted gig for the popup notice if active
  const acceptedGig = acceptedNotice 
    ? gigs.find((g) => g.id === acceptedNotice.gigId) 
    : null;

  // Filter for 'My Shifts' tab
  const myAppliedGigIds = applications.map((a) => a.gigId);
  const myGigs = gigs.filter((g) => myAppliedGigIds.includes(g.id));

  const displayGigs = activeTab === 'shifts' ? myGigs : gigs;
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Inter',sans-serif]">
      <FirebaseStatusBanner />

      {/* Main Centered Smartphone Container (max-width: 400px) */}
      <div className="flex-1 w-full flex justify-center items-start sm:py-6">
        <div className="w-full max-w-[400px] min-h-screen sm:min-h-[820px] bg-slate-900 sm:rounded-[44px] sm:border-[8px] sm:border-slate-800 shadow-2xl flex flex-col relative overflow-hidden">
          
          {/* Simulated Mobile Status Bar */}
          <div className="w-full h-11 bg-slate-950/90 backdrop-blur-md pt-2 px-5 flex items-center justify-between text-[11px] text-slate-300 select-none z-30 border-b border-slate-800/60">
            <span className="font-semibold">{currentTime}</span>
            <div className="w-20 h-4 bg-black rounded-full mx-auto hidden sm:block"></div>
            <div className="flex items-center space-x-1.5 text-slate-300">
              <Signal className="w-3 h-3" />
              <span className="text-[10px] font-bold">5G</span>
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Mobile App Navigation Header */}
          <header className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between z-20">
            <div className="flex items-center space-x-2.5">
              <Link
                to="/"
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                title="Back to Landing"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-emerald-500/20">
                SW
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-bold text-white">Student Worker</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="flex items-center space-x-1 text-[10px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Active & Verified</span>
                </div>
              </div>
            </div>

            <div className="text-[10px] bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-semibold">
              Live Firestore
            </div>
          </header>

          {/* Real-time Green Accepted Pop-up Notification */}
          {acceptedNotice && (
            <div className="absolute top-16 inset-x-3 z-50 animate-bounce duration-700">
              <div className="bg-emerald-600 text-white rounded-2xl p-4 shadow-2xl border-2 border-emerald-400 flex items-start space-x-3">
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

          {/* Subheader / Tabs */}
          <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
              <span>{activeTab === 'shifts' ? 'My Confirmed Shifts' : 'Live Campus Feed'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></span>
            </div>
            <span className="text-[11px] text-slate-400">
              {displayGigs.length} {displayGigs.length === 1 ? 'Gig' : 'Gigs'} available
            </span>
          </div>

          {/* Scrollable Feed Area */}
          <main className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pb-20">
            {loading ? (
              <div className="py-16 text-center text-slate-500">
                <Clock className="w-8 h-8 animate-spin mx-auto mb-2 text-emerald-400" />
                <p className="text-xs font-medium">Listening for shifts...</p>
              </div>
            ) : displayGigs.length === 0 ? (
              <div className="py-16 text-center text-slate-500 border border-dashed border-slate-800 rounded-2xl p-6">
                <Briefcase className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                <p className="text-sm font-semibold text-slate-300">
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
                // Find user's application for this gig
                const userApp = applications.find((a) => a.gigId === gig.id);
                const isApplied = Boolean(userApp);
                const isAccepted = userApp && userApp.status === 'accepted';

                return (
                  <div
                    key={gig.id}
                    className={`bg-slate-850/90 rounded-2xl p-4 border transition-all shadow-md relative overflow-hidden backdrop-blur-sm ${
                      isAccepted
                        ? 'border-emerald-500/60 ring-1 ring-emerald-500/30'
                        : isApplied
                        ? 'border-indigo-500/40'
                        : 'border-slate-700/60 hover:border-slate-600'
                    }`}
                  >
                    {/* Top Tag */}
                    {isAccepted && (
                      <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-bl-xl flex items-center space-x-1 shadow-md">
                        <Sparkles className="w-3 h-3 fill-slate-950" />
                        <span>Accepted</span>
                      </div>
                    )}

                    {/* Job Details */}
                    <div className="pr-10">
                      <h3 className="font-bold text-white text-base leading-snug">
                        {gig.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs text-slate-400 mt-1">
                        <span className="flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1 text-indigo-400" />
                          {gig.date || 'Today'}
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                          Main Hall
                        </span>
                      </div>
                    </div>

                    {/* Wage Display */}
                    <div className="my-3 py-2 px-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Shift Payout
                      </div>
                      <div className="text-xl font-extrabold text-emerald-400 flex items-center font-mono">
                        <span className="text-lg mr-0.5">₹</span>
                        <span>{gig.wage.replace('₹', '')}</span>
                      </div>
                    </div>

                    {/* Action Button Area (minimum 44px tap target) */}
                    <div>
                      {!isApplied ? (
                        <button
                          onClick={() => handleApply(gig.id)}
                          className="w-full min-h-[46px] bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                        >
                          <Briefcase className="w-4 h-4" />
                          <span>Apply</span>
                        </button>
                      ) : !isAccepted ? (
                        <button
                          disabled
                          className="w-full min-h-[46px] bg-slate-800 text-amber-300 font-semibold text-xs py-3 px-4 rounded-xl border border-amber-500/30 flex items-center justify-center space-x-2 cursor-not-allowed"
                        >
                          <Clock className="w-4 h-4 animate-spin" />
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
                            className="w-full min-h-[48px] bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center space-x-2 cursor-pointer ring-2 ring-emerald-400 animate-pulse"
                          >
                            <Navigation className="w-4 h-4 text-white animate-bounce" />
                            <span>Shift Confirmed - GPS Track Active</span>
                          </button>
                          <p className="text-[10px] text-center text-emerald-400 font-medium">
                            Tap to view live location & attendance verification
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </main>

          {/* Mobile Bottom Navigation Tabs (Large Tap Targets) */}
          <nav className="absolute bottom-0 inset-x-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-6 py-2 flex items-center justify-between z-30">
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex flex-col items-center justify-center min-h-[48px] min-w-[64px] transition-colors cursor-pointer ${
                activeTab === 'feed' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">Gigs Feed</span>
            </button>

            <button
              onClick={() => setActiveTab('shifts')}
              className={`flex flex-col items-center justify-center min-h-[48px] min-w-[64px] transition-colors cursor-pointer relative ${
                activeTab === 'shifts' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {myAppliedGigIds.length > 0 && (
                <span className="absolute top-1 right-3 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 font-bold text-[9px] flex items-center justify-center">
                  {myAppliedGigIds.length}
                </span>
              )}
              <Calendar className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">My Shifts</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center justify-center min-h-[48px] min-w-[64px] transition-colors cursor-pointer ${
                activeTab === 'profile' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <User className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">Profile</span>
            </button>
          </nav>

          {/* GPS Tracking Modal */}
          {gpsModalOpen && selectedGigForGps && (
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-end justify-center p-3 animate-fade-in">
              <div className="w-full bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">GPS Geofence Tracking</h4>
                      <p className="text-[10px] text-emerald-400">Live Attendance Verification</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setGpsModalOpen(false)}
                    className="text-slate-400 hover:text-white p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400">Shift Confirmed:</div>
                    <div className="text-sm font-bold text-white">{selectedGigForGps.title}</div>
                    <div className="text-emerald-400 font-mono mt-0.5">{selectedGigForGps.wage}</div>
                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Navigation className="w-4 h-4 animate-spin" />
                    </div>
                    <div>
                      <div className="font-bold text-emerald-300">Geofence Status: Within Radius</div>
                      <div className="text-[10px] text-slate-400">Main Campus Event Hall • Accuracy 4m</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setGpsModalOpen(false)}
                  className="w-full min-h-[46px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

