import React from 'react';
import { Link } from 'react-router-dom';

export default function OnlineHub() {
  return (
    <div className="max-w-md mx-auto py-8 space-y-6">
      <h2 className="text-3xl font-extrabold text-center text-indigo-400">Mode En Ligne</h2>
      <div className="grid grid-cols-1 gap-4">
        <Link to="/play1" className="p-6 bg-slate-900 border border-slate-800 hover:border-indigo-500 rounded-2xl text-center transition group">
          <h3 className="text-xl font-bold text-slate-100 group-hover:text-indigo-400">🎮 Partie Amicale (Unranked)</h3>
          <p className="text-xs text-slate-400 mt-2">Parties personnalisées sans impact sur votre classement.</p>
        </Link>
        <Link to="/play2" className="p-6 bg-slate-900 border border-slate-800 hover:border-amber-500 rounded-2xl text-center transition group">
          <h3 className="text-xl font-bold text-slate-100 group-hover:text-amber-400">🏆 Partie Classée (Ranked)</h3>
          <p className="text-xs text-slate-400 mt-2">Affrontez des joueurs réels et gagnez des points Elo.</p>
        </Link>
      </div>
    </div>
  );
}