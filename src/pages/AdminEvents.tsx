import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../AuthContext';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plus, Trash2, Edit2, X, Save, AlertCircle, Clock, MapPin, Image as ImageIcon, ArrowLeft } from 'lucide-react';

interface Event {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  imagen_url: string;
  created_at: string;
}

export const AdminEvents = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  // Form state
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('eventos')
      .select('*')
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData = {
      titulo,
      descripcion,
      fecha,
      hora,
      imagen_url: imagenUrl,
    };

    if (editingEvent) {
      const { error } = await supabase
        .from('eventos')
        .update(eventData)
        .eq('id', editingEvent.id);
      
      if (error) {
        console.error('Error al actualizar:', error);
      } else {
        setIsModalOpen(false);
        fetchEvents();
      }
    } else {
      const { error } = await supabase
        .from('eventos')
        .insert([eventData]);
      
      if (error) {
        console.error('Error al crear:', error);
      } else {
        setIsModalOpen(false);
        fetchEvents();
      }
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('eventos')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error al eliminar:', error);
    } else {
      setDeleteConfirm(null);
      fetchEvents();
    }
  };

  const openCreateModal = () => {
    setEditingEvent(null);
    setTitulo('');
    setDescripcion('');
    setFecha('');
    setHora('');
    setImagenUrl('');
    setIsModalOpen(true);
  };

  const openEditModal = (event: Event) => {
    setEditingEvent(event);
    setTitulo(event.titulo);
    setDescripcion(event.descripcion);
    setFecha(event.fecha);
    setHora(event.hora);
    setImagenUrl(event.imagen_url);
    setIsModalOpen(true);
  };

  if (user?.role !== 'admin' && user?.role !== 'officer') {
    return (
      <div className="pt-32 text-center">
        <AlertCircle className="w-16 h-16 text-biker-red mx-auto mb-4" />
        <h2 className="text-2xl">Acceso Denegado</h2>
        <p className="text-gray-500">Solo los oficiales del club pueden acceder a este panel.</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <button 
            onClick={() => navigate('/admin')}
            className="text-gray-500 hover:text-white text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al Panel
          </button>
          <h1 className="flex flex-col mb-2">
            <span className="logo-text-infernals text-2xl leading-none">GESTIÓN DE</span>
            <span className="logo-text-bikers text-4xl leading-none">EVENTOS</span>
          </h1>
          <p className="text-gray-500">Administra las rodadas y reuniones oficiales del club.</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="biker-btn biker-btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Nuevo Evento
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <p className="text-gray-500 animate-pulse">Cargando eventos...</p>
        </div>
      ) : (
        <div className="biker-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-gray-500">Evento</th>
                  <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-gray-500">Fecha y Hora</th>
                  <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-gray-500">Confirmados</th>
                  <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-gray-500">Descripción</th>
                  <th className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-gray-500 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No hay eventos registrados. ¡Crea el primero!
                    </td>
                  </tr>
                ) : (
                  events.map((event) => (
                    <tr key={event.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                            <img 
                              src={event.imagen_url || 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=200'} 
                              alt={event.titulo}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <span className="font-bold text-white">{event.titulo}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col text-xs font-mono text-gray-400">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-biker-red" /> {event.fecha}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-biker-red" /> {event.hora}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono text-biker-red font-bold">{(event as any).rsvp_count || 0}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-500 line-clamp-1 max-w-xs">{event.descripcion}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => openEditModal(event)}
                            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                            title="Editar"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setDeleteConfirm(event.id)}
                            className="p-2 bg-biker-red/10 hover:bg-biker-red/20 border border-biker-red/20 rounded-lg transition-colors text-biker-red"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal for Create/Edit */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="biker-card w-full max-w-2xl p-8 relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h2 className="text-2xl mb-8">{editingEvent ? 'Editar Evento' : 'Nuevo Evento'}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-gray-500">Título del Evento</label>
                    <input
                      type="text"
                      required
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      className="w-full bg-biker-black border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-biker-red transition-colors"
                      placeholder="ej. Rodada Nocturna"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-gray-500">URL de Imagen</label>
                    <div className="relative">
                      <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                      <input
                        type="text"
                        value={imagenUrl}
                        onChange={(e) => setImagenUrl(e.target.value)}
                        className="w-full bg-biker-black border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-biker-red transition-colors"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                    {imagenUrl && (
                      <div className="mt-2 h-20 w-full rounded-lg overflow-hidden border border-white/10">
                        <img src={imagenUrl} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-gray-500">Fecha</label>
                    <input
                      type="date"
                      required
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      className="w-full bg-biker-black border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-biker-red transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-gray-500">Hora</label>
                    <input
                      type="time"
                      required
                      value={hora}
                      onChange={(e) => setHora(e.target.value)}
                      className="w-full bg-biker-black border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-biker-red transition-colors"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-gray-500">Descripción</label>
                  <textarea
                    required
                    rows={4}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="w-full bg-biker-black border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-biker-red transition-colors resize-none"
                    placeholder="Detalles de la ruta, punto de encuentro, etc."
                  />
                </div>

                <button type="submit" className="biker-btn biker-btn-primary w-full py-4 flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" /> {editingEvent ? 'Guardar Cambios' : 'Crear Evento'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="biker-card w-full max-w-md p-8 text-center"
            >
              <AlertCircle className="w-16 h-16 text-biker-red mx-auto mb-4" />
              <h2 className="text-2xl mb-2">¿Eliminar Evento?</h2>
              <p className="text-gray-500 mb-8">Esta acción no se puede deshacer. El evento será eliminado permanentemente.</p>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 biker-btn biker-btn-primary"
                >
                  Eliminar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
