import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, MapPin, Clock, CheckCircle2, Maximize2, X, Eye, Sparkles } from 'lucide-react';
import { ClubEvent } from '../types';
import { supabase } from '../lib/supabase';

const DEFAULT_AUGUST_EVENTS = [
  {
    id: "1",
    titulo: "Reunión de Líderes y Administradores",
    descripcion: "Reunión interna para coordinar las actividades del club, revisar avances y planificar las próximas actividades.",
    fecha: "2026-08-07",
    hora: "17:00:00",
    location: "Sede Infernal's",
    imagen_url: "/images/dashboard/bikers.jpeg",
    rsvp_count: 12
  },
  {
    id: "2",
    titulo: "Reunión Oficial y Cumpleaños",
    descripcion: "Encuentro oficial del club para compartir con todos los integrantes y celebrar los cumpleaños del mes.",
    fecha: "2026-08-08",
    hora: "20:00:00",
    location: "Punto de Encuentro Oficial",
    imagen_url: "/images/dashboard/bikers_back.jpeg",
    rsvp_count: 24
  },
  {
    id: "3",
    titulo: "Rodada KM 30",
    descripcion: "Rodada oficial nocturna hacia el KM 30 para disfrutar de una salida en grupo.",
    fecha: "2026-08-10",
    hora: "20:30:00",
    location: "KM 30",
    imagen_url: "/images/dashboard/bikers.jpeg",
    rsvp_count: 30
  },
  {
    id: "4",
    titulo: "Día Deportivo - Cerro Tres Cruces",
    descripcion: "Caminata e integración deportiva en el Cerro Tres Cruces.",
    fecha: "2026-08-13",
    hora: "19:00:00",
    location: "Cerro Tres Cruces",
    imagen_url: "/images/dashboard/bikers_back.jpeg",
    rsvp_count: 15
  },
  {
    id: "5",
    titulo: "Día de Jetski",
    descripcion: "Actividad extrema de integración disfrutando una experiencia en Jetski.",
    fecha: "2026-08-17",
    hora: "08:00:00",
    location: "Lago Calima",
    imagen_url: "/images/dashboard/bikers.jpeg",
    rsvp_count: 22
  },
  {
    id: "6",
    titulo: "Fotos y Videos",
    descripcion: "Sesión oficial para capturar fotografías y videos del club y sus integrantes.",
    fecha: "2026-08-20",
    hora: "20:00:00",
    location: "Punto de Encuentro Club",
    imagen_url: "/images/dashboard/bikers_back.jpeg",
    rsvp_count: 19
  },
  {
    id: "7",
    titulo: "Festival de Cometas",
    descripcion: "Actividad recreativa para compartir en grupo disfrutando del Festival de Cometas.",
    fecha: "2026-08-23",
    hora: "10:00:00",
    location: "Cali",
    imagen_url: "/images/dashboard/bikers.jpeg",
    rsvp_count: 28
  },
  {
    id: "8",
    titulo: "Día Deportivo de Tejo",
    descripcion: "Actividad de integración practicando tejo y fortaleciendo la convivencia del club.",
    fecha: "2026-08-26",
    hora: "20:00:00",
    location: "Cancha de Tejo",
    imagen_url: "/images/dashboard/bikers_back.jpeg",
    rsvp_count: 25
  },
  {
    id: "9",
    titulo: "Río Mediacanoa",
    descripcion: "Rodada oficial con destino al Río Mediacanoa para disfrutar de un día de esparcimiento e integración.",
    fecha: "2026-08-30",
    hora: "07:30:00",
    location: "Río Mediacanoa",
    imagen_url: "/images/dashboard/bikers.jpeg",
    rsvp_count: 35
  }
];

export const Events = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmingEvent, setConfirmingEvent] = useState<any | null>(null);
  const [showPosterModal, setShowPosterModal] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      let eventsData: any[] = [];
      try {
        const { data, error } = await supabase
          .from('eventos')
          .select('*');
        if (!error && data && data.length > 0) {
          eventsData = data;
        }
      } catch (e) {
        console.warn('Supabase fetch failed');
      }

      if (eventsData.length === 0) {
        try {
          const res = await fetch('/api/events');
          if (res.ok) {
            eventsData = await res.json();
          }
        } catch (e) {
          console.error('API events fetch error:', e);
        }
      }

      if (!eventsData || eventsData.length === 0) {
        eventsData = DEFAULT_AUGUST_EVENTS;
      }

      const sortedEvents = [...eventsData].sort((a, b) => {
        const dateA = new Date(`${a.fecha || a.date}T${a.hora || '00:00:00'}`).getTime();
        const dateB = new Date(`${b.fecha || b.date}T${b.hora || '00:00:00'}`).getTime();
        return dateA - dateB;
      });
      setEvents(sortedEvents);
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

    try {
      const { error } = await supabase
        .from('eventos')
        .update({ rsvp_count: currentCount + 1 })
        .eq('id', eventId);

      if (error) {
        console.error('Error updating RSVP count:', error);
      }
    } catch (e) {
      // Ignore
    }

    setEvents(prev => prev.map(e => 
      e.id === eventId ? { ...e, rsvp_count: currentCount + 1 } : e
    ));

    setConfirmingEvent(null);
  };

  const formatEventTime = (timeStr: string) => {
    if (!timeStr) return '';
    const parts = timeStr.split(':');
    let hours = parseInt(parts[0], 10);
    const minutes = parts[1] || '00';
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <span className="text-biker-red font-mono text-sm tracking-widest uppercase mb-2 block">Calendario de Rodadas</span>
        <h1 className="text-5xl mb-4">Próximos Eventos</h1>
        <p className="text-gray-400 max-w-2xl">
          Consulta el calendario para rodadas oficiales del club, rallies y reuniones.
          El registro es obligatorio para todos los miembros con parche.
        </p>
      </div>

      {/* Contenedor de la Imagen de Programación Mensual (Vista Parcial 9:16) */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 rounded-2xl border border-biker-red/40 bg-biker-gray/90 overflow-hidden shadow-[0_0_30px_rgba(255,0,0,0.15)] relative group"
      >
        <div className="p-4 sm:p-6 bg-gradient-to-r from-biker-black via-biker-gray to-biker-black border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-biker-red/20 rounded-xl border border-biker-red/40 text-biker-red">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display italic tracking-tight uppercase">
                PROGRAMACIÓN <span className="text-biker-red">MENSUAL AGOSTO 2026</span>
              </h2>
              <p className="text-xs font-mono text-gray-400">
                Formato Afiche (9:16) • Visualización Parcial de la Agenda
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowPosterModal(true)}
            className="biker-btn biker-btn-primary py-2.5 px-5 text-xs sm:text-sm flex items-center justify-center gap-2 self-start sm:self-auto hover:scale-105 transition-transform"
          >
            <Maximize2 className="w-4 h-4" /> Ver Afiche Completo
          </button>
        </div>

        {/* Muestra parcial de la imagen 9:16 */}
        <div className="relative max-h-72 sm:max-h-80 overflow-hidden cursor-pointer" onClick={() => setShowPosterModal(true)}>
          <img 
            src="/images/Cronogramas/cronograma_agosto_v3.png" 
            alt="Programación Mensual Agosto 2026"
            className="w-full h-auto object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-102 transition-all duration-500"
          />

          {/* Sombra / Gradiente para indicar vista parcial */}
          <div className="absolute inset-0 bg-gradient-to-t from-biker-black via-biker-black/40 to-transparent flex flex-col justify-end p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono bg-biker-red/90 text-white px-3 py-1.5 rounded-full font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5" /> Agenda Oficial Infernal's Bikers
              </span>

              <span className="text-xs font-mono text-gray-300 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-biker-red" /> Click para ampliar (9:16)
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tarjetas Individuales por Día */}
      <div className="space-y-6">
        {loading ? (
          <p className="text-gray-500 animate-pulse">Cargando programación...</p>
        ) : events.length === 0 ? (
          <div className="biker-card p-12 text-center">
            <p className="text-gray-500">No hay eventos programados por ahora. ¡Mantente alerta!</p>
          </div>
        ) : (
          events.map((event, i) => {
            const dayNum = event.fecha ? event.fecha.split('-')[2] : '01';
            return (
              <motion.div
                key={event.id || i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="biker-card p-6 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-8 items-center relative group border-white/10 hover:border-biker-red/50"
              >
                {/* Background Image with Transparency */}
                {event.imagen_url && (
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-xl">
                    <img 
                      src={event.imagen_url} 
                      alt="" 
                      className="w-full h-full object-cover opacity-15 grayscale group-hover:opacity-30 transition-all duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-biker-black via-biker-black/80 to-transparent" />
                  </div>
                )}

                <div className="relative z-10 flex-shrink-0 w-36 h-28 flex flex-col items-center justify-center text-center md:border-r md:border-white/10 md:pr-8">
                  <span 
                    className="text-7xl font-display font-bold leading-none tracking-tighter"
                    style={{ 
                      WebkitTextStroke: '2px rgba(255,255,255,0.6)',
                      color: 'transparent'
                    }}
                  >
                    {dayNum}
                  </span>
                  <span className="text-biker-red uppercase text-xs tracking-[0.3em] font-black mt-1">
                    AGOSTO
                  </span>
                </div>

                <div className="relative z-10 flex-grow text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-3">
                    <span className="flex items-center gap-2 text-sm text-gray-300 font-mono bg-white/5 px-3 py-1 rounded-md border border-white/10">
                      <Clock className="w-4 h-4 text-biker-red" />
                      {formatEventTime(event.hora)}
                    </span>
                    {event.location && (
                      <span className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                        <MapPin className="w-3.5 h-3.5 text-biker-red" />
                        {event.location}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl mb-2 font-display italic tracking-tighter text-white">
                    {event.titulo || event.title}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                    {event.descripcion}
                  </p>
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
                    {event.rsvp_count || 0} Confirmados
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Modal Afiche Completo (9:16) */}
      <AnimatePresence>
        {showPosterModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-lg w-full max-h-[90vh] bg-biker-gray border border-biker-red/50 rounded-2xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(255,0,0,0.3)]"
            >
              <div className="p-4 bg-black/80 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-biker-red" />
                  <span className="font-display italic uppercase tracking-wider text-sm sm:text-base">
                    PROGRAMACIÓN AGOSTO 2026 (9:16)
                  </span>
                </div>
                <button 
                  onClick={() => setShowPosterModal(false)}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="overflow-y-auto p-4 flex items-center justify-center bg-black/60 custom-scrollbar">
                <img 
                  src="/images/Cronogramas/cronograma_agosto_v3.png" 
                  alt="Afiche Programación Mensual Completa"
                  className="w-full h-auto object-contain rounded-xl shadow-2xl border border-white/10"
                />
              </div>

              <div className="p-4 bg-black/80 border-t border-white/10 text-center">
                <button 
                  onClick={() => setShowPosterModal(false)}
                  className="biker-btn biker-btn-primary py-2 px-8 text-xs uppercase"
                >
                  Cerrar Afiche
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
              <p className="text-gray-400 mb-8 leading-relaxed text-sm">
                Escríbenos, déjanos un mensaje en nuestras redes sociales y solicita los detalles del evento. ¡Te esperamos!
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

