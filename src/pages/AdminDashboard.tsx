import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../AuthContext';
import { Users, Calendar, ShoppingBag, TrendingUp, AlertCircle } from 'lucide-react';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    members: 124,
    events: 8,
    orders: 45,
    revenue: 12450
  });

  if (user?.role !== 'admin' && user?.role !== 'officer') {
    return (
      <div className="pt-32 text-center">
        <AlertCircle className="w-16 h-16 text-biker-red mx-auto mb-4" />
        <h2 className="text-2xl">Access Denied</h2>
        <p className="text-gray-500">Only club officers can access this panel.</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="flex flex-col mb-2">
          <span className="logo-text-infernals text-2xl leading-none">CENTRO DE MANDO</span>
          <span className="logo-text-bikers text-4xl leading-none">DE OFICIALES</span>
        </h1>
        <p className="text-gray-500">Gestiona las operaciones, logística e inteligencia del club.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Miembros', value: stats.members, icon: Users, color: 'text-blue-500' },
          { label: 'Eventos Activos', value: stats.events, icon: Calendar, color: 'text-biker-red' },
          { label: 'Pedidos Pendientes', value: stats.orders, icon: ShoppingBag, color: 'text-purple-500' },
          { label: 'Ingresos Mensuales', value: `$${stats.revenue}`, icon: TrendingUp, color: 'text-emerald-500' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="biker-card p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-gray-500 uppercase font-mono tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="biker-card p-8">
          <h3 className="text-xl mb-6">Solicitudes Recientes</h3>
          <div className="space-y-4">
            {[
              { name: 'Mike "Ghost" Miller', bike: 'Indian Scout', date: 'hace 2 horas' },
              { name: 'Sarah "Blade" Connor', bike: 'Ducati Monster', date: 'hace 5 horas' },
              { name: 'Jax Teller', bike: 'Harley Dyna', date: 'hace 1 día' },
            ].map((app, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div>
                  <p className="font-bold">{app.name}</p>
                  <p className="text-xs text-gray-500">{app.bike}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs rounded-lg border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors">Aprobar</button>
                  <button className="px-3 py-1 bg-biker-red/10 text-biker-red text-xs rounded-lg border border-biker-red/20 hover:bg-biker-red/20 transition-colors">Denegar</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="biker-card p-8">
          <h3 className="text-xl mb-6">Alerta de Logística</h3>
          <div className="p-4 bg-biker-red/10 border border-biker-red/20 rounded-xl">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-biker-red shrink-0" />
              <div>
                <p className="font-bold text-biker-red">Inventario Bajo</p>
                <p className="text-sm text-gray-400">"Chaleco de Cuero Clásico" tiene solo 2 unidades. Se requiere reabastecimiento antes del Rally de Fundadores.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
