import React from 'react';
import { Shield, QrCode, Wallet } from 'lucide-react';
import { motion } from 'motion/react';

interface MemberCardProps {
  name: string;
  rank: string;
  memberId: string;
  expiry: string;
}

export const MemberCard: React.FC<MemberCardProps> = ({ name, rank, memberId, expiry }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-biker-gray to-black border border-white/10 rounded-2xl p-6 relative overflow-hidden group shadow-2xl"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      </div>

      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
        <img 
          src="/logo-main.png" 
          alt="Logo Seal" 
          className="w-32 h-32 object-contain grayscale brightness-200"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://www.svgrepo.com/show/415020/skull.svg';
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10">
            <img 
              src="/logo-horizontal.png" 
              alt="Logo Small" 
              className="h-full w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://www.svgrepo.com/show/415020/skull.svg';
              }}
            />
          </div>
          <div className="border-l border-white/20 pl-3">
            <p className="text-[8px] text-gray-500 font-mono uppercase tracking-[0.2em]">Miembro Oficial</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Nombre</p>
            <p className="text-xl font-bold uppercase tracking-tight">{name}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Rango</p>
              <p className="font-bold text-biker-red uppercase text-sm">{rank}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">ID Miembro</p>
              <p className="font-mono text-sm">{memberId}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end pt-4 border-t border-white/5">
          <div>
            <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">Válido Hasta</p>
            <p className="font-mono text-sm">{expiry}</p>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-biker-red hover:text-white transition-colors">
            <Wallet className="w-4 h-4" /> Añadir a Apple Wallet
          </button>
        </div>
      </div>

      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
};
