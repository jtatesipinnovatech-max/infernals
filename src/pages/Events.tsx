import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { ClubEvent } from '../types';
import { supabase } from '../lib/supabase';

export const Events = () => {
  const [events, setEvents] = useState<ClubEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });
      
      if (error) {
        console.error('Error fetching events:', error);
      } else if (data) {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  const displayEvents = events.length > 0 ? events : [
    { id: 1, title: "Carrera Nocturna del Cañón", date: "2026-03-15T22:00:00", location: "Cañones de Malibú", description: "Una rodada nocturna de alta intensidad a través de los sinuosos cañones de Malibú. Solo para pilotos experimentados." },
    { id: 2, title: "Rally Anual de Fundadores", date: "2026-04-02T10:00:00", location: "Sede del Club", description: "Celebrando 28 años de Hermandad. Comida, música y una rodada ceremonial de 100 millas." },
    { id: 3, title: "Crucero por la Carretera Costera", date: "2026-04-20T09:00:00", location: "Muelle de Santa Mónica", description: "Rodada relajada de domingo por la mañana por la PCH. Abierta a todos los miembros y prospectos." },
  ];

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-16">
        <span className="text-biker-red font-mono text-sm tracking-widest uppercase mb-2 block">Calendario de Rodadas</span>
        <h1 className="text-5xl mb-4">Próximos Eventos</h1>
        <p className="text-gray-400 max-w-2xl">
          Consulta el calendario para rodadas oficiales del club, rallies y reuniones.
          El RSVP es obligatorio para todos los miembros con parche.
        </p>
      </div>

      <div className="space-y-6">
        {displayEvents.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="biker-card p-8 flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="flex-shrink-0 w-32 h-32 bg-biker-red/10 border border-biker-red/20 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-biker-red text-3xl font-display font-bold">
                {new Date(event.date).getDate()}
              </span>
              <span className="text-gray-400 uppercase text-xs tracking-widest">
                {new Date(event.date).toLocaleString('default', { month: 'short' })}
              </span>
            </div>

            <div className="flex-grow">
              <div className="flex flex-wrap gap-4 mb-4">
                <span className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4 text-biker-red" />
                  {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="w-4 h-4 text-biker-red" />
                  {event.location}
                </span>
              </div>
              <h3 className="text-2xl mb-2">{event.title}</h3>
              <p className="text-gray-500 line-clamp-2">{event.description}</p>
            </div>

            <div className="flex-shrink-0 w-full md:w-auto">
              <button className="biker-btn biker-btn-outline w-full md:w-auto">
                <CheckCircle2 className="w-5 h-5" /> RSVP Ahora
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
