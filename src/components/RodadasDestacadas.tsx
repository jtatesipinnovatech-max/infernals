import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

interface Rodada {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

const INITIAL_RODADAS: Rodada[] = [
  {
    id: '1',
    title: "Donatón de Regalos Jamundí",
    date: "10/12/2023",
    location: "Jamundí, Valle del Cauca",
    description: "Nuestros motores rugieron llevando alegría. Una rodada cargada de solidaridad para los niños de Jamundí.",
    image: "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/rodadas/obras_sociales/donaton_portada.jpeg"
  },
  {
    id: '2',
    title: "Útiles para Fundación Yumbo",
    date: "25/01/2024",
    location: "Yumbo, Valle del Cauca",
    description: "Kilómetros de esperanza. Apoyamos con útiles escolares a la Fundación Yumbo, impulsando el futuro de los más pequeños.",
    image: "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/rodadas/obras_sociales/Portada.jpg"
  },
  {
    id: '3',
    title: "Conquista Puente Piedra Ginebra",
    date: "15/02/2024",
    location: "Ginebra, Valle del Cauca",
    description: "Adrenalina pura en la ruta. Una rodada épica por los paisajes imponentes de Puente Piedra y Ginebra.",
    image: "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/rodadas/obras_sociales/puente_piedra.jpg"
  }
];

const EXTRA_RODADAS: Rodada[] = [
  {
    id: '4',
    title: "Ruta del Sol Nocturna",
    date: "05/03/2024",
    location: "Vía Cali - Palmira",
    description: "Bajo la luna y el rugir de los escapes. Una rodada nocturna para probar la resistencia de la manada.",
    image: "https://images.unsplash.com/photo-1614165933026-0750fcd503e8?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '5',
    title: "Aniversario Infernal's",
    date: "20/04/2024",
    location: "Lago Calima",
    description: "Celebrando un año más de hermandad. El asfalto se tiñó de rojo en nuestra rodada de aniversario.",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: '6',
    title: "Misión Guajira",
    date: "15/05/2024",
    location: "Riohacha, La Guajira",
    description: "Cruzando el desierto por una causa. Llevamos suministros vitales a las comunidades más alejadas.",
    image: "https://images.unsplash.com/photo-1469033011854-477fd0fe7150?auto=format&fit=crop&q=80&w=800"
  }
];

export const RodadasDestacadas = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="py-32 bg-biker-black relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-biker-red/5 blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-orange-500/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display mb-4 tracking-tighter italic"
          >
            ASALTO AL <span className="text-biker-red">ASFALTO</span>
          </motion.h2>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-biker-red to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INITIAL_RODADAS.map((rodada, index) => (
            <RodadaCard key={rodada.id} rodada={rodada} index={index} />
          ))}
          
          <AnimatePresence>
            {showMore && EXTRA_RODADAS.map((rodada, index) => (
              <RodadaCard key={rodada.id} rodada={rodada} index={index + 3} isExtra />
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 flex justify-center">
          <button
            onClick={() => setShowMore(!showMore)}
            className="group flex flex-col items-center gap-2 text-biker-red font-display tracking-widest hover:text-white transition-colors duration-300"
          >
            <span className="text-sm font-bold">
              {showMore ? 'VER MENOS' : 'VER MÁS ASALTO AL ASFALTO'}
            </span>
            <motion.div
              animate={{ y: showMore ? 0 : [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="p-2 rounded-full border border-biker-red/30 group-hover:border-white/50 transition-colors"
            >
              {showMore ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </motion.div>
          </button>
        </div>
      </div>
    </section>
  );
};

interface RodadaCardProps {
  key?: string | number;
  rodada: Rodada;
  index: number;
  isExtra?: boolean;
}

const RodadaCard = ({ rodada, index, isExtra = false }: RodadaCardProps) => {
  return (
    <motion.div
      initial={isExtra ? { opacity: 0, y: 20 } : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileInView={!isExtra ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
      className="group relative h-[500px] rounded-2xl overflow-hidden bg-biker-gray border border-white/5 hover:border-biker-red/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
    >
      {/* Image Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={rodada.image} 
          alt={rodada.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-biker-black via-biker-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest bg-biker-red/20 text-biker-red px-2.5 py-1 rounded-full border border-biker-red/30">
              <Calendar className="w-3 h-3" />
              {rodada.date}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest bg-white/5 text-gray-300 px-2.5 py-1 rounded-full border border-white/10">
              <MapPin className="w-3 h-3" />
              {rodada.location}
            </span>
          </div>

          <h3 className="text-2xl font-display leading-tight group-hover:text-biker-red transition-colors duration-300">
            {rodada.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">
            {rodada.description}
          </p>

          <button className="flex items-center gap-2 text-biker-red font-bold text-xs uppercase tracking-widest group/btn pt-2">
            Ver Historia 
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-2" />
          </button>
        </div>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-biker-red to-transparent shadow-[0_0_20px_rgba(255,0,0,0.6)]" />
      </div>
    </motion.div>
  );
};
