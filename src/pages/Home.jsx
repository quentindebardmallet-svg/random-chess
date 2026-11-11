import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center space-y-8">
      <div className="space-y-3">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 tracking-tight">
          RANDOM CHESS
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base">
          Le jeu d'échecs réinventé avec 43 événements imprévisibles et une règle Anti-Match Nul absolue !
        </p>
      </div>

      <div className="flex flex-col w-full max-w-sm gap-4">
        <Link to="/play" className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-lg shadow-amber-600/20 text-lg transition transform hover:-translate-y-0.5">
          ⚔️ Jouer en local
        </Link>
        <Link to="/preplay" className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 text-lg transition transform hover:-translate-y-0.5">
          🌐 Jouer en ligne
        </Link>
        <Link to="/rules" className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 transition">
          📜 Règles & 43 Événements
        </Link>
      </div>
    </div>
  );
}