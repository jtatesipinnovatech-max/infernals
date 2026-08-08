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
import { AdminEvents } from './pages/AdminEvents';
import { Members } from './pages/Members';
import { RoleGuard } from './components/RoleGuard';
import { Instagram, Facebook, Music2 as Tiktok } from 'lucide-react';

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
              <Route path="/dashboard" element={
                <RoleGuard requiredPath="/dashboard">
                  <Dashboard />
                </RoleGuard>
              } />
              <Route path="/admin" element={
                <RoleGuard allowedRoles={['admin', 'lider_general', 'officer']} requiredPath="/admin">
                  <AdminDashboard />
                </RoleGuard>
              } />
              <Route path="/admin/eventos" element={
                <RoleGuard allowedRoles={['admin', 'lider_general', 'director_operativo', 'officer', 'coordinador_redes']} requiredPath="/admin/eventos">
                  <AdminEvents />
                </RoleGuard>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/members" element={<Members />} />
            </Routes>
          </main>
          
          <footer className="bg-biker-black border-t border-white/5 py-16 mt-24">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-8">
              <div className="flex items-center gap-8">
                <a href="https://www.tiktok.com/@infernals.bikers?_r=1&_t=ZS-94MnFdyDQj1" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-biker-red transition-all hover:scale-110">
                  <Tiktok className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/infernals_bikers?igsh=NW4zMTI0YTU4aHJw" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-biker-red transition-all hover:scale-110">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://www.facebook.com/share/1CWoxt5ztS/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-biker-red transition-all hover:scale-110">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm font-mono uppercase tracking-widest mb-2">
                  © 2026 Infernal's Bikers • Hermandad por Siempre
                </p>
                <p className="text-[10px] text-gray-700 font-mono uppercase tracking-[0.3em]">
                  Valle del Cauca, Colombia
                </p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}
