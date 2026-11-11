import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) checkPremium(session.user.id);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) checkPremium(session.user.id);
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const checkPremium = async (userId) => {
    const { data } = await supabase.from('profiles').select('is_premium').eq('id', userId).single();
    if (data) setIsPremium(data.is_premium);
  };

  const handleBuyVIP = () => {
    alert("Redirection vers le paiement sécurisé Stripe (1.99€)...");
    // Simulation d'achat VIP réussi
    if (user) {
      supabase.from('profiles').update({ is_premium: true }).eq('id', user.id).then(() => {
        setIsPremium(true);
        alert("Félicitations ! Vous êtes VIP. Les publicités sont définitivement désactivées.");
      });
    } else {
      alert("Veuillez vous connecter pour acheter le Pass VIP.");
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans">
      {/* HEADER */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-black tracking-wider text-amber-500 hover:text-amber-400">
            🎲 RANDOM CHESS
          </Link>
          <div className="flex items-center gap-4">
            {!isPremium && (
              <button 
                onClick={handleBuyVIP}
                className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg hover:brightness-110 transition"
              >
                ⭐ Retirer les pubs (1.99€)
              </button>
            )}
            {user ? (
              <Link to="/profile" className="text-sm font-semibold bg-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-700">
                Mon Profil {isPremium && "👑"}
              </Link>
            ) : (
              <Link to="/profile" className="text-sm font-semibold bg-amber-600 px-3 py-1.5 rounded-lg hover:bg-amber-500">
                Connexion
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* PUBLICITÉ HEADER (Si non VIP) */}
      {!isPremium && (
        <div className="w-full flex justify-center py-2 bg-slate-900/50 border-b border-slate-800">
          {/* <!-- ADSPACE --> */}
          <div className="w-[728px] h-[90px] bg-slate-800 border border-slate-700 flex flex-col items-center justify-center text-xs text-slate-400 rounded">
            <span>PUBLICITÉ (728x90)</span>
            <span className="text-[10px] text-slate-500">Passez VIP à 1,99€ pour masquer les annonces</span>
          </div>
        </div>
      )}

      {/* CONTENU PRINCIPAL */}
      <main className="flex-grow max-w-6xl w-full mx-auto p-4 md:p-6">
        {children}
      </main>

      {/* PUBLICITÉ FOOTER (Si non VIP) */}
      {!isPremium && (
        <div className="w-full flex justify-center py-2 bg-slate-900/50 border-t border-slate-800">
          {/* <!-- ADSPACE --> */}
          <div className="w-[728px] h-[90px] bg-slate-800 border border-slate-700 flex flex-col items-center justify-center text-xs text-slate-400 rounded">
            <span>PUBLICITÉ (728x90)</span>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © 2026 Random Chess — Jeu d'échecs expérimental et chaotique. Tous droits réservés.
      </footer>
    </div>
  );
}