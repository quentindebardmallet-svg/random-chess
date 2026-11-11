import React from 'react';
import { EVENTS_LIST } from '../data/eventsData';

export default function Rules() {
  return (
    <div className="space-y-8">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
        <h2 className="text-3xl font-black text-amber-500">Règles Spéciales de Random Chess</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Random Chess applique les règles fondamentales des échecs, mais y injecte du chaos grâce à 43 événements uniques déclenchés régulièrement pendant la partie.
        </p>
        <div className="p-4 bg-amber-950/30 border border-amber-600/30 rounded-xl text-xs text-amber-300">
          ⚠️ <b>RÈGLE ANTI-MATCH NUL :</b> Aucun match nul n'est possible (Pat, répétition, 50 coups). Si un nul se présente, un événement de crise se déclenche immédiatement jusqu'à ce qu'un vainqueur émerge !
        </div>
      </div>

      {/* Grille des 43 Événements */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-200">Catalogue des 43 Événements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EVENTS_LIST.map((ev) => (
            <div key={ev.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
              <div className="flex justify-between items-start">
                <span className="font-bold text-amber-400 text-sm">{ev.id}. {ev.name}</span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-semibold">{ev.type}</span>
              </div>
              <p className="text-xs text-slate-300">{ev.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}