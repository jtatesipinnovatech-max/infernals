import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Shield, MapPin, Users, X, Phone, User, CreditCard, Bike, Droplets, Heart, Calendar as CalendarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { RodadasDestacadas } from '../components/RodadasDestacadas';

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    id_number: '',
    plate_number: '',
    blood_type: '',
    birth_date: '',
    emergency_contact: '+57 '
  });

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al enviar la solicitud');
        } else {
          // If not JSON, it's likely an HTML error page (404/500)
          const text = await response.text();
          console.error('Server returned non-JSON response:', text);
          throw new Error(`Error del servidor (${response.status}). El servicio de registro podría estar temporalmente fuera de línea.`);
        }
      }

      setIsModalOpen(false);
      setFormData({
        first_name: '',
        last_name: '',
        id_number: '',
        plate_number: '',
        blood_type: '',
        birth_date: '',
        emergency_contact: '+57 '
      });
      
      // Redirect to WhatsApp group
      const whatsappUrl = 'https://chat.whatsapp.com/HZZs9rj3B16DFNkOlcNSx8';
      alert('¡Solicitud enviada con éxito! Ahora serás redirigido al chat de WhatsApp.');
      
      // Use window.location.href for better mobile compatibility as window.open is often blocked
      window.location.href = whatsappUrl;
    } catch (error: any) {
      console.error('Error submitting application to /api/applications:', error);
      alert('Error al enviar la solicitud: ' + error.message + '\n\nSi el problema persiste, por favor contacta a un administrador directamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/dashboard/bikers.jpeg"
            alt="Biker Hero"
            className="w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-biker-black via-transparent to-biker-black/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-center"
          >
            <div className="flex justify-center mb-8">
              <div className="w-48 h-48 md:w-64 md:h-64">
                <img 
                  src="https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/logos/logo_full.PNG" 
                  alt="Infernal's Logo" 
                  className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,0,0,0.4)]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://www.svgrepo.com/show/415020/skull.svg';
                    (e.target as HTMLImageElement).style.filter = 'invert(1) sepia(1) saturate(5) hue-rotate(-50deg)';
                  }}
                />
              </div>
            </div>
            <span className="text-biker-red font-mono text-sm tracking-[0.1em] uppercase mb-6 block italic">
              "Rebeldes por naturaleza, solidarios por conviccion!"
            </span>
            <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-xl font-sans mx-auto text-justify md:text-center">
              La lealtad es nuestro combustible. El respeto es nuestro camino. Únete a la hermandad más temida y respetada sobre dos ruedas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-biker-gray border border-white/10 rounded-2xl p-6 md:p-10 max-h-[90vh] overflow-y-auto shadow-2xl custom-scrollbar"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-display mb-2">Solicitud de Ingreso</h2>
                <p className="text-gray-400">Completa tus datos para iniciar tu camino como Prospecto.</p>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-gray-500">Nombres</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                      type="text"
                      name="first_name"
                      required
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className="w-full bg-biker-black border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-biker-red transition-colors"
                      placeholder="Ej. Juan"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-gray-500">Apellidos</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                      type="text"
                      name="last_name"
                      required
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className="w-full bg-biker-black border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-biker-red transition-colors"
                      placeholder="Ej. Pérez"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-gray-500">Cédula</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                      type="text"
                      name="id_number"
                      required
                      value={formData.id_number}
                      onChange={handleInputChange}
                      className="w-full bg-biker-black border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-biker-red transition-colors"
                      placeholder="Número de identificación"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-gray-500">Número de Placa</label>
                  <div className="relative">
                    <Bike className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                      type="text"
                      name="plate_number"
                      required
                      value={formData.plate_number}
                      onChange={handleInputChange}
                      className="w-full bg-biker-black border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-biker-red transition-colors"
                      placeholder="Ej. ABC-123"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-gray-500">Tipo de Sangre</label>
                  <div className="relative">
                    <Droplets className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <select
                      name="blood_type"
                      required
                      value={formData.blood_type}
                      onChange={handleInputChange}
                      className="w-full bg-biker-black border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-biker-red transition-colors appearance-none"
                    >
                      <option value="">Selecciona...</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-gray-500">Fecha de Nacimiento</label>
                  <div className="relative group">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 group-focus-within:text-biker-red transition-colors" />
                    <input
                      type="date"
                      name="birth_date"
                      required
                      value={formData.birth_date}
                      onChange={handleInputChange}
                      onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
                      className="w-full bg-biker-black border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-biker-red transition-colors text-white [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-gray-500">Contacto de Emergencia (Celular)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                      type="tel"
                      name="emergency_contact"
                      required
                      value={formData.emergency_contact}
                      onChange={handleInputChange}
                      className="w-full bg-biker-black border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-biker-red transition-colors"
                      placeholder="+57 300 000 0000"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="biker-btn biker-btn-primary w-full py-4 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar solicitud y entrar al chat:'}
                    {!isSubmitting && <ChevronRight className="w-5 h-5" />}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quienes Somos Section */}
      <section className="py-32 bg-biker-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-biker-red/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display mb-4 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent"
            >
              Quienes Somos
            </motion.h2>
            <div className="h-1 w-24 bg-biker-red mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: Users,
                title: "Hermandad",
                desc: "Rugimos como legión. En el asfalto no hay leones solitarios, solo una familia unida por el fuego y la lealtad."
              },
              {
                icon: Shield,
                title: "Respeto",
                desc: "Código de acero. Honramos los colores, la ruta y la memoria. Rebeldes ante el mundo, leales ante la hermandad."
              },
              {
                icon: Heart,
                title: "Impacto Social",
                desc: "Corazón de león. Nuestra potencia se traduce en ayuda; rodamos para dejar huella donde otros solo dejan humo."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative p-10 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-biker-red/50 transition-all duration-500 hover:-translate-y-4 overflow-hidden"
              >
                {/* Fire gradient border effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
                </div>

                <div className="relative z-10">
                  <div className="mb-8 inline-block p-4 rounded-xl bg-biker-red/10 text-biker-red group-hover:scale-110 group-hover:bg-biker-red group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(255,0,0,0.1)] group-hover:shadow-[0_0_30px_rgba(255,0,0,0.4)]">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-display mb-4 tracking-wider group-hover:text-biker-red transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  {/* Decorative line that grows on hover */}
                  <div className="w-0 group-hover:w-12 h-0.5 bg-biker-red mb-6 transition-all duration-500 ease-out" />
                  
                  <p className="text-gray-400 leading-relaxed text-lg group-hover:text-gray-300 transition-colors duration-300">
                    {feature.desc}
                  </p>
                </div>

                {/* Background glow effect */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-biker-red/5 blur-[80px] group-hover:bg-biker-red/10 transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <RodadasDestacadas />

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://cxcpaumlcrxvlapjjcmf.supabase.co/storage/v1/object/public/club-assets/dashboard/bike_blue.jpg"
            alt="Biker Night"
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl mb-8 text-white">¿Listo para unirte?</h2>
          <p className="text-xl text-gray-400 mb-10">
            Las solicitudes están abiertas para la temporada 2026. Comienza tu viaje de Prospecto a Leyenda.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="biker-btn biker-btn-primary"
            >
              QUIERO UNIRME <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
