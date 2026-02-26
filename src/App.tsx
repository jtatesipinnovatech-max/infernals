import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Events } from './pages/Events';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { Members } from './pages/Members';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-biker-black text-white">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/events" element={<Events />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/members" element={<Members />} />
            </Routes>
          </main>
          
          <footer className="bg-biker-black border-t border-white/5 py-12 mt-24">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-gray-600 text-sm font-mono uppercase tracking-widest">
                © 2026 Infernal's Bikers • Hermandad por Siempre
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}
