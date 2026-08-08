import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, ArrowRight, ChevronDown, ChevronUp, X, Play, Image as ImageIcon } from 'lucide-react';

interface Rodada {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  videoUrl?: string;
  gallery?: string[];
}

const INITIAL_RODADAS: Rodada[] = [
  {
    id: '1',
    title: "Donatón de Regalos Jamundí",
    date: "10/12/2023",
    location: "Jamundí, Valle del Cauca",
    description: "Nuestros motores rugieron llevando alegría. Una rodada cargada de solidaridad para los niños de Jamundí.",
    image: "/images/rodadas/obras_sociales/donaton_regalos_2025/donaton_portada.jpeg",
    gallery: [
      "/images/rodadas/obras_sociales/donaton_regalos_2025/2.jpeg",
      "/images/rodadas/obras_sociales/donaton_regalos_2025/4.jpeg",
      "/images/rodadas/obras_sociales/donaton_regalos_2025/6.jpeg",
      "/images/rodadas/obras_sociales/donaton_regalos_2025/7.jpg",
      "/images/rodadas/obras_sociales/donaton_regalos_2025/8.jpg",
      "/images/rodadas/obras_sociales/donaton_regalos_2025/vid1.mp4"
    ]
  },
  {
    id: '2',
    title: "Rodada a Medellín y Guatapé",
    date: "12/10/2024",
    location: "Medellín y Guatapé, Antioquia",
    description: "Una aventura inolvidable con la legión conquistando la Ciudad de la Eterna Primavera y la majestuosa Piedra del Peñol en Guatapé.",
    image: "/images/rodadas/destacadas/Rodada-Medellin/guatape.jpg",
    gallery: [
      "/images/rodadas/destacadas/Rodada-Medellin/guatape.jpg",
      "/images/rodadas/destacadas/Rodada-Medellin/Group_medellin.jpg",
      "/images/rodadas/destacadas/Rodada-Medellin/grupo_noche.jpg",
      "/images/rodadas/destacadas/Rodada-Medellin/hotel.jpg",
      "/images/rodadas/destacadas/Rodada-Medellin/motos.jpg",
      "/images/rodadas/destacadas/Rodada-Medellin/infernal_girl.png"
    ]
  },
  {
    id: '3',
    title: "Conquista Puente Piedra Ginebra",
    date: "15/02/2024",
    location: "Ginebra, Valle del Cauca",
    description: "Adrenalina pura en la ruta. Una rodada épica por los paisajes imponentes de Puente Piedra y Ginebra.",
    image: "/images/rodadas/destacadas/ginebra/puente_piedra.jpg",
    gallery: [
      "/images/rodadas/destacadas/ginebra/IMG_7189.mp4",
      "/images/rodadas/destacadas/ginebra/IMG_7218.jpg",
      "/images/rodadas/destacadas/ginebra/IMG_7248.mp4",
      "/images/rodadas/destacadas/ginebra/IMG_7273.jpg",
      "/images/rodadas/destacadas/ginebra/IMG_8084.mp4",
      "/images/rodadas/destacadas/ginebra/MVIMG_20260222_110219.jpg",
      "/images/rodadas/destacadas/ginebra/puente_piedra.jpg"
    ]
  }
];

const EXTRA_RODADAS: Rodada[] = [
  {
    id: '4',
    title: "Útiles para Fundación Yumbo",
    date: "25/01/2024",
    location: "Yumbo, Valle del Cauca",
    description: "Kilómetros de esperanza. Apoyamos con útiles escolares a la Fundación Yumbo, impulsando el futuro de los más pequeños.",
    image: "/images/rodadas/obras_sociales/kits_yumbo/Portada.jpg",
    gallery: [
      "/images/rodadas/obras_sociales/kits_yumbo/IMG_6619.jpg",
      "/images/rodadas/obras_sociales/kits_yumbo/IMG_6622.mp4",
      "/images/rodadas/obras_sociales/kits_yumbo/IMG_6638.jpg",
      "/images/rodadas/obras_sociales/kits_yumbo/IMG_6660.jpg",
      "/images/rodadas/obras_sociales/kits_yumbo/IMG_6671.jpg",
      "/images/rodadas/obras_sociales/kits_yumbo/IMG_6672.jpg",
      "/images/rodadas/obras_sociales/kits_yumbo/IMG_6674.jpg",
      "/images/rodadas/obras_sociales/kits_yumbo/IMG_6675.jpg",
      "/images/rodadas/obras_sociales/kits_yumbo/IMG_6691.jpg",
      "/images/rodadas/obras_sociales/kits_yumbo/IMG_6699.jpg",
    ]
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
  const [selectedRodada, setSelectedRodada] = useState<Rodada | null>(null);

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
            <RodadaCard 
              key={rodada.id} 
              rodada={rodada} 
              index={index} 
              onOpen={() => setSelectedRodada(rodada)}
            />
          ))}
          
          <AnimatePresence>
            {showMore && EXTRA_RODADAS.map((rodada, index) => (
              <RodadaCard 
                key={rodada.id} 
                rodada={rodada} 
                index={index + 3} 
                isExtra 
                onOpen={() => setSelectedRodada(rodada)}
              />
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

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedRodada && (
          <RodadaModal 
            rodada={selectedRodada} 
            onClose={() => setSelectedRodada(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

interface RodadaCardProps {
  key?: string | number;
  rodada: Rodada;
  index: number;
  isExtra?: boolean;
  onOpen: () => void;
}

const RodadaCard = ({ rodada, index, isExtra = false, onOpen }: RodadaCardProps) => {
  return (
    <motion.div
      initial={isExtra ? { opacity: 0, y: 20 } : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileInView={!isExtra ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
      className="group relative h-[450px] rounded-2xl overflow-hidden bg-biker-gray border border-white/5 hover:border-biker-red/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl cursor-pointer"
      onClick={onOpen}
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
            <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest bg-white/5 text-gray-300 px-2.5 py-1 rounded-full border border-white/10">
              <MapPin className="w-3 h-3 text-biker-red" />
              {rodada.location}
            </span>
          </div>

          <h3 className="text-2xl font-display leading-tight group-hover:text-biker-red transition-colors duration-300 uppercase italic">
            {rodada.title}
          </h3>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="flex items-center gap-2 text-biker-red font-bold text-xs uppercase tracking-widest group/btn pt-2"
          >
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

const RodadaModal = ({ rodada, onClose }: { rodada: Rodada; onClose: () => void }) => {
  useEffect(() => {
    // Block scroll on mount
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  const isVideo = (url: string) => {
    return url.toLowerCase().match(/\.(mp4|webm|ogg|mov)$/) !== null;
  };

  const videos = rodada.gallery?.filter(url => isVideo(url)) || [];
  const photos = rodada.gallery?.filter(url => !isVideo(url)) || [];
  
  const mainVideo = videos.length > 0 ? videos[0] : null;
  const otherMedia = [...videos.slice(1), ...photos];
  
  // Target minimum items for the grid to show "subir archivo" slots
  const MIN_GRID_ITEMS = 8;
  const emptySlotsCount = Math.max(0, MIN_GRID_ITEMS - otherMedia.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-biker-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto overscroll-contain bg-biker-gray rounded-3xl border border-white/10 shadow-2xl custom-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 bg-biker-black/50 hover:bg-biker-red text-white rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 lg:p-12">
          {/* Header Info */}
          <div className="mb-12 space-y-6">
            <div className="flex flex-wrap gap-4">
              <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest bg-biker-red/20 text-biker-red px-4 py-2 rounded-full border border-biker-red/30">
                <Calendar className="w-4 h-4" />
                {rodada.date}
              </span>
              <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest bg-white/5 text-gray-300 px-4 py-2 rounded-full border border-white/10">
                <MapPin className="w-4 h-4 text-biker-red" />
                {rodada.location}
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-display italic tracking-tighter uppercase leading-none">
              {rodada.title}
            </h2>

            <div className="h-1 w-20 bg-biker-red" />

            <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light max-w-3xl">
              {rodada.description}
            </p>
          </div>

          {/* Main Video Section */}
          {mainVideo && (
            <div className="mb-12 space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-[0.3em] text-biker-red border-l-2 border-biker-red pl-4">Video de Presentación</h3>
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/5">
                <video 
                  src={mainVideo} 
                  controls 
                  className="w-full h-full object-contain"
                  poster={rodada.image}
                />
              </div>
            </div>
          )}

          {/* Gallery Grid */}
          <div className="space-y-8">
            <h3 className="text-sm font-mono uppercase tracking-[0.3em] text-biker-red border-l-2 border-biker-red pl-4">Galería de la Legión</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {otherMedia.map((url, i) => (
                <div key={i} className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-biker-red/50 transition-all duration-500 shadow-lg">
                  {isVideo(url) ? (
                    <video 
                      src={url} 
                      controls 
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <img 
                      src={url} 
                      alt={`Gallery ${i}`} 
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110" 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=800';
                      }}
                    />
                  )}
                </div>
              ))}
              
              {/* Empty Slots */}
              {Array.from({ length: emptySlotsCount }).map((_, i) => (
                <div key={`empty-${i}`} className="flex flex-col items-center justify-center h-64 bg-white/[0.02] rounded-xl border border-dashed border-white/10 group hover:border-biker-red/30 transition-colors cursor-pointer">
                  <div className="p-3 rounded-full bg-white/5 mb-3 group-hover:bg-biker-red/10 transition-colors">
                    <ImageIcon className="w-6 h-6 text-gray-600 group-hover:text-biker-red/50" />
                  </div>
                  <p className="text-gray-600 font-mono text-[10px] uppercase tracking-widest group-hover:text-gray-400 transition-colors">subir archivo</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-8">
              <a href="https://www.facebook.com/share/1CWoxt5ztS/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-biker-red transition-colors">
                Facebook
              </a>
              <a href="https://www.instagram.com/infernals_bikers?igsh=NW4zMTI0YTU4aHJw" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-biker-red transition-colors">
                Instagram
              </a>
              <a href="https://www.tiktok.com/@infernals.bikers?_r=1&_t=ZS-94MnFdyDQj1" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-biker-red transition-colors">
                TikTok
              </a>
            </div>
            <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest italic">
              Infernal's Bikers • Hermandad por Siempre • {rodada.location}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
