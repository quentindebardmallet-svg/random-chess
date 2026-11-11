import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EVENTS_LIST } from '../data/eventsData';

export default function PlayLocalSetup() {
  const navigate = useNavigate();
  const [opponent, setOpponent] = useState('local'); // 'local' ou 'ai'
  const [aiElo, setAiElo] = useState(1500);
  const [eventsEnabled, setEventsEnabled] = useState(true);
  const [frequency, setFrequency] = useState(3);
  const [selectedEvents, setSelectedEvents] = useState(EVENTS_LIST.map(e => e.id));

  const toggleEvent = (id) => {
    setSelectedEvents(prev => 
      prev.includes(id) ? prev.filter(eId => eId !== id) : [...prev, id]
    );
  };

  const handleStartGame = () => {
    navigate('/game', {
      state: {
        mode: 'local',
        opponent,
        aiElo,
        eventsEnabled,
        frequency,
        activeEventsList: selectedEvents
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-amber-500 border-b border-slate-800 pb-3">
        Configuration Partie Locale
      </h2>

      {/* Adversaire */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-300">Adversaire</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setOpponent('local')}
            className={`py-3 rounded-lg font-semibold border transition ${opponent === 'local' ? 'bg-amber-600 border-amber-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
          >
            👥 2 Joueurs en local
          </button>
          <button
            onClick={() => setOpponent('ai')}
            className={`py-3 rounded-lg font-semibold border transition ${opponent === 'ai' ? 'bg-amber-600 border-amber-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
          >
            🤖 Contre l'IA
          </button>
        </div>
      </div>

      {/* Elo Bot si IA */}
      {opponent === 'ai' && (
        <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex justify-between text-sm">
            <span className="text-slate-300">Niveau de l'IA (Elo)</span>
            <span className="font-bold text-amber-400">{aiElo} Elo</span>
          </div>
          <input
            type="range"
            min="500"
            max="2500"
            step="100"
            value={aiElo}
            onChange={(e) => setAiElo(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
      )}

      {/* Switch Événements */}
      <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
        <span className="font-semibold text-slate-200">Activer les Événements Aléatoires</span>
        <input
          type="checkbox"
          checked={eventsEnabled}
          onChange={(e) => setEventsEnabled(e.target.checked)}
          className="w-5 h-5 accent-amber-500"
        />
      </div>

      {/* Paramètres Événements */}
      {eventsEnabled && (
        <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Fréquence du Chaos</span>
              <span className="font-bold text-amber-400">Tous les {frequency} tours</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase">Filtre des 43 Événements</label>
            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-2 border border-slate-800 rounded p-2">
              {EVENTS_LIST.map((ev) => (
                <label key={ev.id} className="flex items-center justify-between text-xs bg-slate-900 p-2 rounded hover:bg-slate-850 cursor-pointer">
                  <span className="text-slate-300 font-medium">{ev.id}. {ev.name}</span>
                  <input
                    type="checkbox"
                    checked={selectedEvents.includes(ev.id)}
                    onChange={() => toggleEvent(ev.id)}
                    className="accent-amber-500"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleStartGame}
        className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition"
      >
        Lancer la partie 🚀
      </button>
    </div>
  );
}