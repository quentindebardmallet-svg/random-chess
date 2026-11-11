import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileData, setProfileData] = useState({ elo: 1200, is_premium: false });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
    });
  }, []);

  const fetchProfile = async (userId) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (data) setProfileData(data);
  };

  const handleAuth = async (isSignUp) => {
    const { data, error } = isSignUp 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) alert(error.message);
    else setUser(data.user);
  };

  return (
    <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-amber-500 border-b border-slate-800 pb-3">Profil Joueur</h2>

      {user ? (
        <div className="space-y-4">
          <div className="p-4 bg-slate-950 rounded-xl space-y-2 text-sm">
            <p><span className="text-slate-400">Email :</span> {user.email}</p>
            <p><span className="text-slate-400">Elo Classé :</span> <b className="text-amber-400">{profileData.elo}</b></p>
            <p><span className="text-slate-400">Statut VIP :</span> {profileData.is_premium ? '⭐ Membre VIP (Sans pubs)' : 'Standard'}</p>
          </div>
          <button onClick={() => supabase.auth.signOut().then(() => setUser(null))} className="w-full py-2 bg-slate-800 text-slate-300 rounded-lg text-sm font-semibold">
            Déconnexion
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm" />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm" />
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => handleAuth(false)} className="py-3 bg-amber-600 font-bold rounded-xl text-sm">Se connecter</button>
            <button onClick={() => handleAuth(true)} className="py-3 bg-slate-800 font-bold rounded-xl text-sm">S'inscrire</button>
          </div>
        </div>
      )}
    </div>
  );
}