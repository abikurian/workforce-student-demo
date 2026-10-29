import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Calendar, Clock, AlertCircle } from 'lucide-react';

export default function PostGigView({ onBack, onSubmitJob }) {
  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [wage, setWage] = useState('');
  const [error, setError] = useState('');

  const quickPresets = [
    { title: 'Catering Staff', wage: '250', time: 'Tomorrow • 10:00 AM' },
    { title: 'Stage Setup', wage: '300', time: 'This Friday • 4:00 PM' },
    { title: 'Registration Desk', wage: '200', time: 'Saturday • 9:00 AM' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a job title.');
      return;
    }
    if (!wage.trim()) {
      setError('Please enter an hourly wage in ₹.');
      return;
    }

    const formattedWage = wage.startsWith('₹') ? wage : `₹${wage}`;

    onSubmitJob({
      id: Date.now(),
      title: title.trim(),
      dateTime: dateTime.trim() || 'Flexible Schedule',
      wage: formattedWage,
      createdAt: new Date().toISOString(),
      isDispatched: false,
    });
  };

  const applyPreset = (preset) => {
    setTitle(preset.title);
    setWage(preset.wage);
    setDateTime(preset.time);
    setError('');
  };

  return (
    <div className="flex-1 flex flex-col p-4 animate-fade-in">
      {/* Header with Back button */}
      <div className="flex items-center space-x-3 pt-2 pb-4 border-b border-slate-200">
        <button
          type="button"
          onClick={onBack}
          className="min-h-[44px] min-w-[44px] rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-100 transition-all cursor-pointer shadow-sm"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Post a New Gig
          </h1>
          <p className="text-xs text-slate-500">
            Find matched student workers instantly
          </p>
        </div>
      </div>

      {/* Quick Suggestion Chips */}
      <div className="mt-4 mb-2">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center space-x-1">
          <Sparkles className="w-3 h-3 text-indigo-500" />
          <span>Quick Autofill Templates</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickPresets.map((preset) => (
            <button
              key={preset.title}
              type="button"
              onClick={() => applyPreset(preset)}
              className="text-xs bg-white border border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 px-3 py-1.5 rounded-lg shadow-2xs font-medium transition-all cursor-pointer"
            >
              {preset.title} • <span className="font-bold text-emerald-600">₹{preset.wage}/hr</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="mt-3 flex-1 flex flex-col justify-between space-y-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-4">
          
          {/* Job Title Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Job Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              placeholder="e.g., Catering Staff, Stage Setup"
              className="w-full min-h-[46px] px-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>

          {/* Date / Time Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Date / Time
            </label>
            <div className="relative">
              <input
                type="text"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                placeholder="e.g., Tomorrow, 10:00 AM - 2:00 PM"
                className="w-full min-h-[46px] px-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Hourly Wage Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Hourly Wage (₹) <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-lg font-bold text-indigo-600 pointer-events-none">
                ₹
              </span>
              <input
                type="number"
                value={wage.replace('₹', '')}
                onChange={(e) => {
                  setWage(e.target.value);
                  setError('');
                }}
                placeholder="250"
                min="50"
                className="w-full min-h-[46px] pl-9 pr-14 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-mono"
              />
              <span className="absolute right-3.5 text-xs text-slate-400 font-medium pointer-events-none">
                / hour
              </span>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Primary Submit Button */}
        <div className="pt-4 pb-2">
          <button
            type="submit"
            className="w-full min-h-[50px] bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-base rounded-xl shadow-md shadow-indigo-200 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-indigo-200" />
            <span>Find Matches</span>
          </button>
        </div>
      </form>
    </div>
  );
}

