import React from 'react';
import { MembersSection } from '../components/MembersSection';
import { motion } from 'motion/react';

export const Members = () => {
  return (
    <div className="pt-20">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/dashboard/bikers_back.jpeg"
            alt="Biker Background"
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-biker-black via-transparent to-biker-black" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display mb-6 italic"
          >
            NUESTRA <span className="text-biker-red">HERMANDAD</span>
          </motion.h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Conoce a los líderes y administradores que mantienen vivo el fuego de Infernal's Bikers.
          </p>
        </div>
      </section>

      <MembersSection />
    </div>
  );
};
