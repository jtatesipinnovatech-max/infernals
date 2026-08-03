import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { ClubEvent } from '../types';
import { supabase } from '../lib/supabase';

export const Events = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmingEvent, setConfirmingEvent] = useState<any | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('eventos')
        .select('*')
        .gte('fecha', today)
        .order('fecha', { ascending: true })
        .order('hora', { ascending: true });
      
      if (error) {
        console.error('Error fetching events:', error);
      } else if (data) {
        // Sort in client to be absolutely sure of the order
        const sortedEvents = [...data].sort((a, b) => {
          const dateA = new Date(`${a.fecha}T${a.hora || '00:00:00'}`).getTime();
          const dateB = new Date(`${b.fecha}T${b.hora || '00:00:00'}`).getTime();
          return dateA - dateB;
        });
        setEvents(sortedEvents);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const handleRSVP = async () => {
    if (!confirmingEvent) return;

    const eventId = confirmingEvent.id;
    const currentCount = confirmingEvent.rsvp_count || 0;

    // Redirect to TikTok
    window.open('https://www.tiktok.com/@infernals.bikers?_r=1&_t=ZS-94MnFdyDQj1', '_blank');

    // Increment count in Supabase
    // Note: If this fails, it might be because the column 'rsvp_count' doesn't exist yet.
    const { error } = await supabase
      .from('eventos')
      .update({ rsvp_count: currentCount + 1 })
      .eq('id', eventId);

    if (error) {
      console.error('Error updating RSVP count:', error);
    } else {
      // Update local state
      setEvents(prev => prev.map(e => 
        e.id === eventId ? { ...e, rsvp_count: currentCount + 1 } : e
      ));
    }

    setConfirmingEvent(null);
  };

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-16">
        <span className="text-biker-red font-mono text-sm tracking-widest uppercase mb-2 block">Calendario de Rodadas</span>
        <h1 className="text-5xl mb-4">Próximos Eventos</h1>
        <p className="text-gray-400 max-w-2xl">
          Consulta el calendario para rodadas oficiales del club, rallies y reuniones.
          El registro es obligatorio para todos los miembros con parche.
        </p>
      </div>

      <div className="space-y-6">
        {loading ? (
          <p className="text-gray-500 animate-pulse">Cargando programación...</p>
        ) : events.length === 0 ? (
          <div className="biker-card p-12 text-center">
            <p className="text-gray-500">No hay eventos programados por ahora. ¡Mantente alerta!</p>
          </div>
        ) : (
          events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="biker-card p-8 flex flex-col md:flex-row gap-8 items-center relative group border-white/10 hover:border-biker-red/50"
            >
              {/* Background Image with Transparency */}
              {event.imagen_url && (
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <img 
                    src={event.imagen_url} 
                    alt="" 
                    className="w-full h-full object-cover opacity-15 grayscale group-hover:opacity-30 transition-all duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-biker-black via-biker-black/80 to-transparent" />
                </div>
              )}

              <div className="relative z-10 flex-shrink-0 w-40 h-32 flex flex-col items-center justify-center text-center md:border-r md:border-white/10 md:pr-8">
                <span 
                  className="text-8xl font-display font-bold leading-none tracking-tighter"
                  style={{ 
                    WebkitTextStroke: '2px rgba(255,255,255,0.5)',
                    color: 'transparent'
                  }}
                >
                  {event.fecha.split('-')[2]}
                </span>
                <span className="text-biker-red uppercase text-[10px] tracking-[0.4em] font-black mt-1">
                  {new Date(event.fecha + 'T00:00:00').toLocaleString('es-ES', { month: 'long' })}
                </span>
              </div>

              <div className="relative z-10 flex-grow">
                <div className="flex flex-wrap gap-4 mb-4">
                  <span className="flex items-center gap-2 text-base text-gray-400 font-mono">
                    <Clock className="w-5 h-5 text-biker-red" />
                    {event.hora?.split(':').slice(0, 2).join(':')}
                  </span>
                </div>
                <h3 className="text-3xl mb-2 font-display italic tracking-tighter">{event.titulo}</h3>
                <p className="text-gray-400 line-clamp-2 max-w-2xl">{event.descripcion}</p>
              </div>

              <div className="relative z-10 flex-shrink-0 w-full md:w-auto flex flex-col items-center gap-2">
                <button 
                  onClick={() => setConfirmingEvent(event)}
                  className="biker-btn biker-btn-outline w-full md:w-auto border-white/20 text-white hover:border-biker-red hover:bg-biker-red active:scale-95 transition-transform"
                >
                  <CheckCircle2 className="w-5 h-5" /> Quiero Ir
                </button>
                <div className="flex items-center gap-1.5 text-xs font-mono text-gray-500 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-biker-red animate-pulse" />
                  {event.rsvp_count || 0}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmingEvent && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="biker-card w-full max-w-md p-8 text-center"
            >
              <div className="w-16 h-16 bg-biker-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-biker-red" />
              </div>
              <h2 className="text-2xl mb-4 italic tracking-tighter">¿Deseas asistir?</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Escribenos, dejanos un mensaje en nuestras redes sociales y solicita los detalles del evento, te esperamos.
              </p>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setConfirmingEvent(null)}
                  className="flex-1 px-6 py-3 rounded-lg border border-white/10 text-gray-400 hover:bg-white/5 transition-colors uppercase font-bold text-xs tracking-widest"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleRSVP}
                  className="flex-1 biker-btn biker-btn-primary"
                >
                  Aceptar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
