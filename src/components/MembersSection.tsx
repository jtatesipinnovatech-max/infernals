import React from 'react';
import { motion } from 'motion/react';
import { Bike, Instagram, Facebook, Music2 as Tiktok } from 'lucide-react';

interface Member {
  name: string;
  role: string;
  alias: string;
  bike: string;
  phrase: string;
  image: string;
  socials: {
    tiktok?: string;
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
    image: "/images/admins/jenni.jpeg",
    socials: { 
      tiktok: "https://www.tiktok.com/@jennii0905?_r=1&_t=ZS-94MOGimx5xF", 
      instagram: "https://www.instagram.com/jennii0905?igsh=MWxsaXJlaXdmZXRpOA%3D%3D&utm_source=qr", 
      facebook: "https://www.facebook.com/share/1DQJPC3cCq/?mibextid=wwXIfr" 
    }
  },
  {
    name: "Juanse",
    role: "Co-Lider",
    alias: "El Estratega",
    bike: "Yamaha MT-03",
    phrase: "Solidario por convicción, trazando cada ruta con honor.",
    image: "/images/admins/juanse.png",
    socials: { 
      tiktok: "https://www.tiktok.com/@_juansex?_r=1&_t=ZS-94MKpv2eHY8",
      instagram: "https://www.instagram.com/_juansex?igsh=MTMzbWhwcWhhdTR0ZQ==", 
      facebook: "https://www.facebook.com/share/188bkYxCS1/" 
    }
  },
  {
    name: "Jhoana",
    role: "Admin",
    alias: "Logística y Orden",
    bike: "Yamaha MT03 v2",
    phrase: "La hermandad se construye con disciplina y lealtad.",
    image: "/images/admins/jhoana.jpeg",
    socials: { 
      tiktok: "https://www.tiktok.com/@sagivr_16?_r=1&_t=ZS-94MO0ijScT6", 
      instagram: "https://www.instagram.com/sagivr_16?igsh=MXg3anNqNDRrNDUzaA%3D%3D&utm_source=qr", 
      facebook: "https://www.facebook.com/share/1CPrVzr3JU/?mibextid=wwXIfr" 
    }
  },
  {
    name: "Edward",
    role: "Admin",
    alias: "Manager de redes",
    bike: "Pulsar 160",
    phrase: "Código de acero, alma de león en cada kilómetro.",
    image: "/images/admins/Edward.jpeg",
    socials: { 
      tiktok: "https://www.tiktok.com/@jhonpino8?_r=1&_t=ZS-94MLz4awJwA", 
      instagram: "https://www.instagram.com/jhon_pino24?igsh=MXh5OGszd2VlajZpNg%3D%3D&utm_source=qr", 
      facebook: "https://www.facebook.com/share/1AiREBaAFd/?mibextid=wwXIfr" 
    }
  }
];

const MemberCard = ({ member, index }: { member: Member; index: number; key?: number }) => {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
      onClick={() => setIsActive(!isActive)}
    >
      {/* Glow Effect behind card */}
      <div className={`absolute inset-0 bg-biker-red/0 transition-all duration-500 rounded-2xl ${isActive ? 'bg-biker-red/10 blur-[40px]' : 'group-hover:bg-biker-red/10 group-hover:blur-[40px]'}`} />
      
      <div className={`relative z-10 h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-all duration-500 overflow-hidden ${isActive ? 'scale-[1.05] border-biker-red/50' : 'group-hover:scale-[1.05] group-hover:border-biker-red/50'}`}>
        
        {/* Fire border effect on hover */}
        <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
        
        <div className="flex flex-col h-full">
          {/* Top Half: Image with Overlay */}
          <div className="relative h-64 -mx-8 -mt-8 mb-6 overflow-hidden">
            <img 
              src={member.image} 
              alt={member.name}
              className={`w-full h-full object-cover transition-all duration-700 ${isActive ? 'grayscale-0 scale-110' : 'grayscale group-hover:grayscale-0 group-hover:scale-110'}`}
              referrerPolicy="no-referrer"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-biker-black via-biker-black/40 to-transparent" />
            
            {/* Superimposed Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
              <div className="inline-block bg-biker-red text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2 shadow-lg">
                {member.role}
              </div>
              <h3 className={`text-3xl font-display transition-colors leading-none mb-1 ${isActive ? 'text-biker-red' : 'group-hover:text-biker-red'}`}>
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
              <div className={`flex flex-col items-start gap-1 bg-white/5 py-3 px-4 rounded-xl border border-white/5 transition-colors ${isActive ? 'border-biker-red/30' : 'group-hover:border-biker-red/30'}`}>
                <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500">La Máquina</span>
                <div className="flex items-center gap-2">
                  <Bike className="w-4 h-4 text-biker-red" />
                  <span className="text-sm font-mono uppercase tracking-wider text-white">{member.bike}</span>
                </div>
              </div>

              <p className={`text-gray-400 text-sm leading-relaxed italic transition-colors px-1 ${isActive ? 'text-gray-200' : 'group-hover:text-gray-200'}`}>
                {member.phrase}
              </p>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4 pt-6 mt-6 border-t border-white/5 w-full justify-start">
              {member.socials.tiktok && (
                <a href={member.socials.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-biker-red transition-all hover:scale-110" onClick={(e) => e.stopPropagation()}>
                  <Tiktok className="w-5 h-5" />
                </a>
              )}
              {member.socials.instagram && (
                <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-biker-red transition-all hover:scale-110" onClick={(e) => e.stopPropagation()}>
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {member.socials.facebook && (
                <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-biker-red transition-all hover:scale-110" onClick={(e) => e.stopPropagation()}>
                  <Facebook className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-biker-red/10 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
      </div>
    </motion.div>
  );
};

export const MembersSection = () => {
  return (
    <section className="py-32 bg-[#080808] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-biker-red/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-biker-red/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {MEMBERS.map((member, i) => (
            <MemberCard key={i} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
