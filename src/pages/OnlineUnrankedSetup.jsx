import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OnlineUnrankedSetup() {
  const navigate = useNavigate();
  const [eventsEnabled, setEventsEnabled] = useState(true);
  const [frequency, setFrequency] = useState(3);

  return (
    <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-indigo-400 border-b border-slate-800 pb-3">Unranked - Matchmaking</h2>
      <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl">
        <span className="text-sm font-semibold">Mode Événements</span>
        <input type="checkbox" checked={eventsEnabled} onChange={(e) => setEventsEnabled(e.target.checked)} className="w-5 h-5 accent-indigo-500" />
      </div>
      {eventsEnabled && (
        <div className="space-y-2">
          <span className="text-sm text-slate-300">Fréquence : tous les {frequency} tours</span>
          <input type="range" min="1" max="30" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} className="w-full accent-indigo-500" />
        </div>
      )}
      <button onClick={() => navigate('/game', { state: { mode: 'online_unranked', eventsEnabled, frequency } })} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition">
        Rechercher un adversaire 🔍
      </button>
    </div>
  );
}