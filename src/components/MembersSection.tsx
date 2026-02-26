import React from 'react';
import { motion } from 'motion/react';
import { Bike, Instagram, Facebook } from 'lucide-react';

interface Member {
  name: string;
  role: string;
  alias: string;
  bike: string;
  phrase: string;
  image: string;
  socials: {
    instagram?: string;
    facebook?: string;
  };
}

const MEMBERS: Member[] = [
  {
    name: "Jenni",
    role: "Lideresa",
    alias: "La Matriarca",
    bike: "Gixxer 150 SF",
    phrase: "Rebelde por naturaleza, liderando con el corazón.",
    image: "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/admins/Jenni.jpeg",
    socials: { instagram: "#", facebook: "#" }
  },
  {
    name: "Juanse",
    role: "Co-Lider",
    alias: "El Estratega",
    bike: "Yamaha MT-03",
    phrase: "Solidario por convicción, trazando cada ruta con honor.",
    image: "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/admins/me.png",
    socials: { instagram: "#", facebook: "#" }
  },
  {
    name: "Jhoana",
    role: "Admin",
    alias: "Logística y Orden",
    bike: "Yamaha MT03 v2",
    phrase: "La hermandad se construye con disciplina y lealtad.",
    image: "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/admins/jhoana.jpeg",
    socials: { instagram: "#", facebook: "#" }
  },
  {
    name: "Angie",
    role: "Admin",
    alias: "Relaciones Públicas",
    bike: "Gixxer 250",
    phrase: "Nuestra potencia se traduce en ayuda y unión.",
    image: "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/admins/Angie.jpeg",
    socials: { instagram: "#", facebook: "#" }
  },
  {
    name: "Yael",
    role: "Admin",
    alias: "Aux Redes",
    bike: "Yamaha R15",
    phrase: "Rodamos para dejar huella, no solo humo.",
    image: "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/admins/yael.jpeg",
    socials: { instagram: "#", facebook: "#" }
  },
  {
    name: "Edward",
    role: "Admin",
    alias: "Manager de redes",
    bike: "Pulsar 160",
    phrase: "Código de acero, alma de león en cada kilómetro.",
    image: "https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/admins/Edward.jpeg",
    socials: { instagram: "#", facebook: "#" }
  }
];

export const MembersSection = () => {
  return (
    <section className="py-32 bg-[#080808] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-biker-red/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-biker-red/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {MEMBERS.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              {/* Glow Effect behind card */}
              <div className="absolute inset-0 bg-biker-red/0 group-hover:bg-biker-red/10 blur-[40px] transition-all duration-500 rounded-2xl" />
              
              <div className="relative z-10 h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-all duration-500 group-hover:scale-[1.05] group-hover:border-biker-red/50 overflow-hidden">
                
                {/* Fire border effect on hover */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex flex-col h-full">
                  {/* Top Half: Image with Overlay */}
                  <div className="relative h-64 -mx-8 -mt-8 mb-6 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-biker-black via-biker-black/40 to-transparent" />
                    
                    {/* Superimposed Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                      <div className="inline-block bg-biker-red text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-lg">
                        {member.role}
                      </div>
                      <h3 className="text-3xl font-display group-hover:text-biker-red transition-colors leading-none mb-1">
                        {member.name}
                      </h3>
                      <p className="text-biker-red/90 font-mono text-[10px] uppercase tracking-widest italic">
                        "{member.alias}"
                      </p>
                    </div>
                  </div>

                  {/* Bottom Half: Bike and Phrase */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex flex-col items-start gap-1 bg-white/5 py-3 px-4 rounded-xl border border-white/5 group-hover:border-biker-red/30 transition-colors">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500">La Máquina</span>
                        <div className="flex items-center gap-2">
                          <Bike className="w-4 h-4 text-biker-red" />
                          <span className="text-sm font-mono uppercase tracking-wider text-white">{member.bike}</span>
                        </div>
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed italic group-hover:text-gray-200 transition-colors px-1">
                        {member.phrase}
                      </p>
                    </div>

                    {/* Socials */}
                    <div className="flex items-center gap-4 pt-6 mt-6 border-t border-white/5 w-full justify-start">
                      <a href={member.socials.instagram} className="text-gray-500 hover:text-biker-red transition-all hover:scale-110">
                        <Instagram className="w-5 h-5" />
                      </a>
                      <a href={member.socials.facebook} className="text-gray-500 hover:text-biker-red transition-all hover:scale-110">
                        <Facebook className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-biker-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
