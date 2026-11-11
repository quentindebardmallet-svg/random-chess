import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PlayLocalSetup from './pages/PlayLocalSetup';
import OnlineHub from './pages/OnlineHub';
import OnlineUnrankedSetup from './pages/OnlineUnrankedSetup';
import OnlineRankedSetup from './pages/OnlineRankedSetup';
import GamePage from './pages/GamePage';
import Rules from './pages/Rules';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<PlayLocalSetup />} />
          <Route path="/preplay" element={<OnlineHub />} />
          <Route path="/play1" element={<OnlineUnrankedSetup />} />
          <Route path="/play2" element={<OnlineRankedSetup />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}