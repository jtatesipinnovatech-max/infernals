import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Calendar, ShoppingBag, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Eventos', path: '/events', icon: Calendar },
    { name: 'Tienda', path: '/shop', icon: ShoppingBag },
    { name: 'Miembros', path: '/members', icon: Shield },
  ];

  if (isAuthenticated) {
    navLinks.push({ name: 'Panel', path: '/dashboard', icon: LayoutDashboard });
    if (user?.role === 'admin' || user?.role === 'officer') {
      navLinks.push({ name: 'Admin', path: '/admin', icon: Shield });
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-biker-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center group">
            <div className="h-12 transition-transform group-hover:scale-105">
              <img 
                src="https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/logos/only_name2.png" 
                alt="Infernal's Bikers" 
                className="h-full w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://www.svgrepo.com/show/415020/skull.svg';
                  (e.target as HTMLImageElement).style.filter = 'invert(1) sepia(1) saturate(5) hue-rotate(-50deg)';
                }}
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium uppercase tracking-widest transition-colors hover:text-biker-red ${
                  location.pathname === link.path ? 'text-biker-red' : 'text-gray-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <button onClick={logout} className="text-gray-400 hover:text-biker-red transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            ) : (
              <Link to="/login" className="biker-btn biker-btn-primary py-2 px-4 text-sm">
                Unirse al Club
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-biker-gray border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-gray-300 hover:text-biker-red"
                >
                  {link.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-biker-red"
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
