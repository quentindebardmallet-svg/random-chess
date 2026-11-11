import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OnlineRankedSetup() {
  const navigate = useNavigate();
  const [frequency, setFrequency] = useState(3);

  return (
    <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-amber-500 border-b border-slate-800 pb-3">Ranked - Matchmaking Officiel</h2>
      <p className="text-xs text-slate-400">Les 43 événements sont obligatoirement activés en mode Ranked.</p>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-300">Fréquence officielle des événements</label>
        <div className="grid grid-cols-4 gap-2">
          {[1, 3, 5, 10].map((f) => (
            <button
              key={f}
              onClick={() => setFrequency(f)}
              className={`py-2 rounded-lg font-bold border transition ${frequency === f ? 'bg-amber-600 border-amber-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
            >
              {f} T
            </button>
          ))}
        </div>
      </div>

      <button onClick={() => navigate('/game', { state: { mode: 'online_ranked', eventsEnabled: true, frequency } })} className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition shadow-lg">
        Lancer la recherche classée 🏆
      </button>
    </div>
  );
}