import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../AuthContext';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { Users, Calendar, ShoppingBag, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    members: 124,
    events: 0,
    orders: 45,
    revenue: 12450
  });
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch event count
        const { count, error: eventError } = await supabase
          .from('eventos')
          .select('*', { count: 'exact', head: true });
        
        if (!eventError) {
          setStats(prev => ({ ...prev, events: count || 0 }));
        }

        // Fetch applications
        const response = await fetch('/api/applications');
        if (response.ok) {
          const data = await response.json();
          setApplications(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'admin' || user?.role === 'officer') {
      fetchStats();
    }
  }, [user]);

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
          { label: 'Total Miembros', value: stats.members, icon: Users, color: 'text-blue-500', link: null },
          { label: 'Eventos Activos', value: stats.events, icon: Calendar, color: 'text-biker-red', link: '/admin/eventos' },
          { label: 'Pedidos Pendientes', value: stats.orders, icon: ShoppingBag, color: 'text-purple-500', link: null },
          { label: 'Ingresos Mensuales', value: `$${stats.revenue}`, icon: TrendingUp, color: 'text-emerald-500', link: null },
        ].map((stat, i) => {
          const CardContent = (
            <>
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                {stat.link && (
                  <div className="text-gray-600 group-hover:text-biker-red transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 uppercase font-mono tracking-widest mb-1">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold">{stat.value}</p>
                {stat.link && (
                  <span className="text-[10px] uppercase tracking-tighter text-biker-red opacity-0 group-hover:opacity-100 transition-opacity">
                    Gestionar
                  </span>
                )}
              </div>
            </>
          );

          return stat.link ? (
            <Link
              key={i}
              to={stat.link}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="biker-card p-6 hover:border-biker-red/30 transition-all cursor-pointer h-full"
              >
                {CardContent}
              </motion.div>
            </Link>
          ) : (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="biker-card p-6 h-full"
            >
              {CardContent}
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="biker-card p-8">
          <h3 className="text-xl mb-6">Solicitudes Recientes</h3>
          <div className="space-y-4">
            {loading ? (
              <p className="text-gray-500">Cargando solicitudes...</p>
            ) : applications.length === 0 ? (
              <p className="text-gray-500">No hay solicitudes pendientes.</p>
            ) : (
              applications.map((app, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div>
                    <p className="font-bold">{app.first_name} {app.last_name}</p>
                    <p className="text-xs text-gray-500">{app.plate_number} - {app.blood_type}</p>
                    <p className="text-[10px] text-gray-600 font-mono mt-1">
                      {new Date(app.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs rounded-lg border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors">Aprobar</button>
                    <button className="px-3 py-1 bg-biker-red/10 text-biker-red text-xs rounded-lg border border-biker-red/20 hover:bg-biker-red/20 transition-colors">Denegar</button>
                  </div>
                </div>
              ))
            )}
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
