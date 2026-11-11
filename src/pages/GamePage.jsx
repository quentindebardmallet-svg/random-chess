import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { EVENTS_LIST } from '../data/eventsData';
import { supabase } from '../lib/supabase';

export default function GamePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state || { eventsEnabled: true, frequency: 3 };

  const [game, setGame] = useState(new Chess());
  const [turnCount, setTurnCount] = useState(1);
  const [nextEvent, setNextEvent] = useState(null);
  const [activeEvents, setActiveEvents] = useState([]);
  const [history, setHistory] = useState([]);
  const [gameOver, setGameOver] = useState(null);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    checkUserPremium();
    prepareNextEvent();
  }, []);

  const checkUserPremium = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const { data } = await supabase.from('profiles').select('is_premium').eq('id', session.user.id).single();
      if (data) setIsPremium(data.is_premium);
    }
  };

  const prepareNextEvent = () => {
    if (!config.eventsEnabled) return;
    const available = EVENTS_LIST.filter(e => !config.activeEventsList || config.activeEventsList.includes(e.id));
    const randomEv = available[Math.floor(Math.random() * available.length)];
    setNextEvent(randomEv);
  };

  const triggerEvent = (event) => {
    setHistory(prev => [`[Événement] ${event.name} : ${event.desc}`, ...prev]);
    
    // Logique simplifiée d'exécution d'événements
    if (event.type.includes("Temporaire")) {
      setActiveEvents(prev => [...prev, { ...event, turnsLeft: 3 }]);
    }
  };

  const makeAMove = (move) => {
    try {
      const newGame = new Chess(game.fen());
      const result = newGame.move(move);

      if (result) {
        setGame(newGame);
        setHistory(prev => [`Coup : ${result.san}`, ...prev]);

        // VERIFICATION RÈGLE ANTI-MATCH NUL
        if (newGame.isDraw() || newGame.isStalemate() || newGame.isThreefoldRepetition()) {
          setHistory(prev => ["⚠️ RÈGLE ANTI-MATCH NUL : Match nul bloqué ! Prolongation du Chaos !", ...prev]);
          // Forcer un événement de crise
          const panicEvent = EVENTS_LIST.find(e => e.id === 11) || EVENTS_LIST[0]; // Balayage ou autre
          triggerEvent(panicEvent);
          return;
        }

        // Gestion du déclenchement d'événements par fréquence
        const nextTurn = turnCount + 1;
        setTurnCount(nextTurn);

        if (config.eventsEnabled && nextTurn % config.frequency === 0 && nextEvent) {
          triggerEvent(nextEvent);
          prepareNextEvent();
        }

        // Vérification fin de partie
        if (newGame.isGameOver()) {
          setGameOver(newGame.isCheckmate() ? "Victoire par Échec et Mat !" : "Partie terminée.");
        }
      }
    } catch (e) {
      console.error("Coup invalide", e);
    }
  };

  const onDrop = (sourceSquare, targetSquare) => {
    makeAMove({ from: sourceSquare, to: targetSquare, promotion: 'q' });
    return true;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* SECTION ÉCHIQUIER */}
      <div className="lg:col-span-2 flex flex-col items-center space-y-4">
        <div className="w-full flex justify-between items-center bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs md:text-sm">
          <span>Tour : <b className="text-amber-400">{turnCount}</b></span>
          <span>Trait aux : <b className="text-slate-200">{game.turn() === 'w' ? 'Blancs' : 'Noirs'}</b></span>
        </div>

        <div className="w-full max-w-[500px] aspect-square rounded-xl overflow-hidden shadow-2xl border-4 border-slate-800">
          <Chessboard position={game.fen()} onPieceDrop={onDrop} boardOrientation="white" />
        </div>
      </div>

      {/* PANNEAU LATÉRAL DROIT */}
      <div className="space-y-4">
        {/* Prochain évènement */}
        {config.eventsEnabled && nextEvent && (
          <div className="bg-amber-950/40 border border-amber-600/50 p-4 rounded-xl space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">Prochain Événement (dans {config.frequency - (turnCount % config.frequency)} tours)</span>
            <h4 className="font-bold text-amber-300">{nextEvent.name}</h4>
            <p className="text-xs text-amber-200/80">{nextEvent.desc}</p>
          </div>
        )}

        {/* Événements actifs */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase">Événements en cours</h4>
          {activeEvents.length === 0 ? (
            <p className="text-xs text-slate-500 italic">Aucun effet actif.</p>
          ) : (
            activeEvents.map((ev, idx) => (
              <div key={idx} className="text-xs bg-slate-950 p-2 rounded border border-slate-800 flex justify-between">
                <span>{ev.name}</span>
                <span className="text-amber-400 font-bold">{ev.turnsLeft}T</span>
              </div>
            ))
          )}
        </div>

        {/* Historique */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase">Journal de Partie</h4>
          <div className="h-36 overflow-y-auto text-xs space-y-1 pr-1">
            {history.map((log, i) => (
              <p key={i} className={log.startsWith('[Événement]') ? 'text-amber-400 font-semibold' : 'text-slate-300'}>{log}</p>
            ))}
          </div>
        </div>

        {/* PUBLICITÉ PANNEAU DROIT (300x250) (Si non VIP) */}
        {!isPremium && (
          <div className="w-full flex justify-center py-2">
            {/* <!-- ADSPACE --> */}
            <div className="w-[300px] h-[250px] bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-xs text-slate-500 rounded">
              <span>PUBLICITÉ (300x250)</span>
            </div>
          </div>
        )}

        <button onClick={() => navigate('/')} className="w-full py-2 bg-red-900/40 hover:bg-red-900/60 border border-red-800 text-red-300 font-semibold text-xs rounded-lg transition">
          Abandonner / Quitter
        </button>
      </div>

      {/* POPUP DE FIN DE PARTIE */}
      {gameOver && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full text-center space-y-4">
            <h3 className="text-2xl font-black text-amber-400">FIN DE PARTIE</h3>
            <p className="text-slate-200">{gameOver}</p>
            
            {!isPremium && (
              <div className="my-4 flex justify-center">
                {/* <!-- ADSPACE --> */}
                <div className="w-[300px] h-[250px] bg-slate-950 border border-slate-800 flex items-center justify-center text-xs text-slate-500 rounded">
                  PUBLICITÉ FIN DE PARTIE
                </div>
              </div>
            )}

            <button onClick={() => navigate('/')} className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl">
              Retour au menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}