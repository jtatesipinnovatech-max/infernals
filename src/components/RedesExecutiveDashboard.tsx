import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Share2, Eye, Heart, MessageCircle, Share, Bookmark, 
  TrendingUp, BarChart3, PieChart, Users, Video, Calendar, 
  Sparkles, ExternalLink, Filter, Search, Plus, X, 
  FileSpreadsheet, Check, ArrowUpRight, Award, Compass,
  PhoneCall, ShieldCheck, Film, Music, CheckCircle2, AlertCircle
} from 'lucide-react';

// Tipos de datos para el módulo de redes
export type DataStatus = 'OBSERVADO' | 'CALCULADO' | 'SIMULADO' | 'ESTIMADO' | 'PENDIENTE';
export type ContentCategory = 'Rodadas' | 'Eventos' | 'Comunidad' | 'Experiencias moteras' | 'Promoción' | 'Actividades sociales' | 'Institucional';
export type SocialPlatform = 'TikTok' | 'Instagram';

export interface SocialPost {
  id: string; // e.g., 'TK001'
  platform: SocialPlatform;
  username: string;
  title: string;
  category: ContentCategory;
  format: 'Video / Reel' | 'Carrusel / Fotos' | 'Historia';
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  reach: number;
  profileVisits: number;
  newFollowers: number;
  durationSeconds?: number;
  isPinned?: boolean;
  status: DataStatus;
  publishDate: string;
  url?: string;
  audioTrack?: string;
}

// 1. Los 6 registros individuales observados de TikTok (Anclas reales)
const OBSERVED_TIKTOK_POSTS: SocialPost[] = [
  {
    id: 'TK001',
    platform: 'TikTok',
    username: '@Infernals.bikers',
    title: 'Rodada grupal / actividad en carretera',
    category: 'Rodadas',
    format: 'Video / Reel',
    views: 316100,
    likes: 41200,
    comments: 520,
    shares: 1840,
    saves: 390,
    reach: 295000,
    profileVisits: 3400,
    newFollowers: 280,
    durationSeconds: 42,
    isPinned: true,
    status: 'OBSERVADO',
    publishDate: '15/08/2026',
    url: 'https://www.tiktok.com/@Infernals.bikers',
    audioTrack: 'Motorbike Exhaust Live Sound'
  },
  {
    id: 'TK002',
    platform: 'TikTok',
    username: '@Infernals.bikers',
    title: 'Rodada nocturna / perspectiva del motociclista',
    category: 'Experiencias moteras',
    format: 'Video / Reel',
    views: 273500,
    likes: 35800,
    comments: 480,
    shares: 1590,
    saves: 310,
    reach: 250000,
    profileVisits: 2900,
    newFollowers: 240,
    durationSeconds: 35,
    isPinned: true,
    status: 'OBSERVADO',
    publishDate: '28/08/2026',
    url: 'https://www.tiktok.com/@Infernals.bikers',
    audioTrack: 'Thunderstruck - Live (1991)'
  },
  {
    id: 'TK003',
    platform: 'TikTok',
    username: '@Infernals.bikers',
    title: 'Experiencia motera / recorrido',
    category: 'Experiencias moteras',
    format: 'Video / Reel',
    views: 61600,
    likes: 7900,
    comments: 115,
    shares: 340,
    saves: 85,
    reach: 58000,
    profileVisits: 750,
    newFollowers: 65,
    durationSeconds: 28,
    isPinned: true,
    status: 'OBSERVADO',
    publishDate: '10/09/2026',
    url: 'https://www.tiktok.com/@Infernals.bikers',
    audioTrack: 'Rock Biker Theme'
  },
  {
    id: 'TK004',
    platform: 'TikTok',
    username: '@Infernals.bikers',
    title: 'Encuentro motero / integración',
    category: 'Eventos',
    format: 'Video / Reel',
    views: 35700,
    likes: 4600,
    comments: 72,
    shares: 190,
    saves: 45,
    reach: 33000,
    profileVisits: 410,
    newFollowers: 38,
    durationSeconds: 50,
    isPinned: false,
    status: 'OBSERVADO',
    publishDate: '24/09/2026',
    url: 'https://www.tiktok.com/@Infernals.bikers'
  },
  {
    id: 'TK005',
    platform: 'TikTok',
    username: '@Infernals.bikers',
    title: 'Comunidad / actividad grupal',
    category: 'Comunidad',
    format: 'Video / Reel',
    views: 15700,
    likes: 2100,
    comments: 38,
    shares: 95,
    saves: 22,
    reach: 14800,
    profileVisits: 180,
    newFollowers: 18,
    durationSeconds: 22,
    isPinned: false,
    status: 'OBSERVADO',
    publishDate: '08/10/2026',
    url: 'https://www.tiktok.com/@Infernals.bikers'
  },
  {
    id: 'TK006',
    platform: 'TikTok',
    username: '@Infernals.bikers',
    title: 'Actividad social / encuentro',
    category: 'Actividades sociales',
    format: 'Video / Reel',
    views: 10900,
    likes: 1800,
    comments: 25,
    shares: 60,
    saves: 15,
    reach: 10200,
    profileVisits: 120,
    newFollowers: 12,
    durationSeconds: 30,
    isPinned: false,
    status: 'OBSERVADO',
    publishDate: '20/10/2026',
    url: 'https://www.tiktok.com/@Infernals.bikers'
  }
];

// 2. Base de 24 publicaciones semisintéticas adicionales para completar las 30 según la matriz del informe
const SIMULATED_POSTS: SocialPost[] = [
  // Alto rendimiento (50k - 100k)
  { id: 'TK007', platform: 'TikTok', username: '@Infernals.bikers', title: 'Curvas del Cañón / Rodada Calima', category: 'Rodadas', format: 'Video / Reel', views: 88400, likes: 9800, comments: 140, shares: 480, saves: 110, reach: 82000, profileVisits: 980, newFollowers: 85, durationSeconds: 34, status: 'SIMULADO', publishDate: '02/10/2026' },
  { id: 'TK008', platform: 'TikTok', username: '@Infernals.bikers', title: 'Sonido de escape KTM vs MT03 en túnel', category: 'Experiencias moteras', format: 'Video / Reel', views: 76200, likes: 8400, comments: 190, shares: 520, saves: 140, reach: 71000, profileVisits: 840, newFollowers: 72, durationSeconds: 19, status: 'SIMULADO', publishDate: '05/10/2026' },
  { id: 'IG001', platform: 'Instagram', username: 'infernals_bikers', title: 'Reel Oficial: Caravana Guatapé Piedra del Peñol', category: 'Rodadas', format: 'Video / Reel', views: 54100, likes: 4200, comments: 85, shares: 310, saves: 95, reach: 49000, profileVisits: 620, newFollowers: 45, durationSeconds: 45, status: 'SIMULADO', publishDate: '12/10/2026' },

  // Rendimiento medio (10k - 49.999)
  { id: 'TK009', platform: 'TikTok', username: '@Infernals.bikers', title: 'Cómo entrar al parche: Convocatoria y Filtro', category: 'Promoción', format: 'Video / Reel', views: 42300, likes: 5100, comments: 240, shares: 380, saves: 210, reach: 39000, profileVisits: 1400, newFollowers: 130, durationSeconds: 58, status: 'SIMULADO', publishDate: '14/10/2026' },
  { id: 'TK010', platform: 'TikTok', username: '@Infernals.bikers', title: 'Parada en Mirador Km 18 / Luces de noche', category: 'Comunidad', format: 'Video / Reel', views: 28900, likes: 3400, comments: 45, shares: 120, saves: 40, reach: 26500, profileVisits: 310, newFollowers: 28, durationSeconds: 27, status: 'SIMULADO', publishDate: '16/10/2026' },
  { id: 'IG002', platform: 'Instagram', username: 'infernals_bikers', title: 'Entrega de Parches de Honor y Chalecos', category: 'Institucional', format: 'Carrusel / Fotos', views: 22400, likes: 2100, comments: 64, shares: 90, saves: 80, reach: 20500, profileVisits: 280, newFollowers: 22, status: 'SIMULADO', publishDate: '18/10/2026' },
  { id: 'TK011', platform: 'TikTok', username: '@Infernals.bikers', title: 'Donación de juguetes en Yumbo / Donatón Biker', category: 'Actividades sociales', format: 'Video / Reel', views: 18600, likes: 2600, comments: 55, shares: 140, saves: 35, reach: 17200, profileVisits: 210, newFollowers: 19, durationSeconds: 40, status: 'SIMULADO', publishDate: '21/10/2026' },
  { id: 'IG003', platform: 'Instagram', username: 'infernals_bikers', title: 'Reel: Salida mañanera hacia Ginebra', category: 'Rodadas', format: 'Video / Reel', views: 14500, likes: 1650, comments: 30, shares: 65, saves: 25, reach: 13100, profileVisits: 150, newFollowers: 14, durationSeconds: 32, status: 'SIMULADO', publishDate: '23/10/2026' },

  // Bajo rendimiento (1.000 - 9.999)
  { id: 'TK012', platform: 'TikTok', username: '@Infernals.bikers', title: 'Inspección de presión de llantas antes de rodar', category: 'Institucional', format: 'Video / Reel', views: 8900, likes: 980, comments: 18, shares: 40, saves: 55, reach: 8100, profileVisits: 85, newFollowers: 8, durationSeconds: 25, status: 'SIMULADO', publishDate: '25/10/2026' },
  { id: 'IG004', platform: 'Instagram', username: 'infernals_bikers', title: 'Flyer Convocatoria Q4 en Historias', category: 'Promoción', format: 'Historia', views: 7400, likes: 810, comments: 14, shares: 35, saves: 12, reach: 6800, profileVisits: 140, newFollowers: 11, status: 'SIMULADO', publishDate: '26/10/2026' },
  { id: 'TK013', platform: 'TikTok', username: '@Infernals.bikers', title: 'Bautizo de lluvia en carretera', category: 'Experiencias moteras', format: 'Video / Reel', views: 6700, likes: 720, comments: 22, shares: 30, saves: 14, reach: 6100, profileVisits: 65, newFollowers: 6, durationSeconds: 15, status: 'SIMULADO', publishDate: '27/10/2026' },
  { id: 'IG005', platform: 'Instagram', username: 'infernals_bikers', title: 'Fotos en Mirador Calima al atardecer', category: 'Eventos', format: 'Carrusel / Fotos', views: 5600, likes: 640, comments: 19, shares: 25, saves: 30, reach: 5200, profileVisits: 55, newFollowers: 5, status: 'SIMULADO', publishDate: '28/10/2026' },
  { id: 'TK014', platform: 'TikTok', username: '@Infernals.bikers', title: 'Presentación de la CFMOTO 250nk de Jhoana', category: 'Comunidad', format: 'Video / Reel', views: 4800, likes: 580, comments: 32, shares: 22, saves: 18, reach: 4400, profileVisits: 70, newFollowers: 7, durationSeconds: 24, status: 'SIMULADO', publishDate: '29/10/2026' },
  { id: 'IG006', platform: 'Instagram', username: 'infernals_bikers', title: 'Bienvenida a los nuevos aspirantes de filtro', category: 'Promoción', format: 'Carrusel / Fotos', views: 4100, likes: 490, comments: 16, shares: 18, saves: 10, reach: 3800, profileVisits: 60, newFollowers: 6, status: 'SIMULADO', publishDate: '30/10/2026' },
  { id: 'TK015', platform: 'TikTok', username: '@Infernals.bikers', title: 'La formación en doble columna explicada', category: 'Institucional', format: 'Video / Reel', views: 3500, likes: 420, comments: 12, shares: 15, saves: 20, reach: 3200, profileVisits: 45, newFollowers: 4, durationSeconds: 30, status: 'SIMULADO', publishDate: '01/11/2026' },
  { id: 'IG007', platform: 'Instagram', username: 'infernals_bikers', title: 'Foto grupal en peaje Loboguerrero', category: 'Rodadas', format: 'Carrusel / Fotos', views: 2900, likes: 360, comments: 10, shares: 12, saves: 8, reach: 2700, profileVisits: 35, newFollowers: 3, status: 'SIMULADO', publishDate: '02/11/2026' },
  { id: 'TK016', platform: 'TikTok', username: '@Infernals.bikers', title: 'POV: Bloqueando intersección con seguridad', category: 'Rodadas', format: 'Video / Reel', views: 2200, likes: 280, comments: 8, shares: 10, saves: 6, reach: 2000, profileVisits: 25, newFollowers: 2, durationSeconds: 18, status: 'SIMULADO', publishDate: '03/11/2026' },
  { id: 'IG008', platform: 'Instagram', username: 'infernals_bikers', title: 'Historia: Preparando equipamiento SOS', category: 'Actividades sociales', format: 'Historia', views: 1800, likes: 220, comments: 5, shares: 8, saves: 4, reach: 1650, profileVisits: 20, newFollowers: 2, status: 'SIMULADO', publishDate: '03/11/2026' },

  // Muy bajo rendimiento (100 - 999)
  { id: 'TK017', platform: 'TikTok', username: '@Infernals.bikers', title: 'Clip corto prueba de audio intercomunicador', category: 'Experiencias moteras', format: 'Video / Reel', views: 850, likes: 95, comments: 4, shares: 3, saves: 2, reach: 780, profileVisits: 10, newFollowers: 1, durationSeconds: 12, status: 'SIMULADO', publishDate: '04/11/2026' },
  { id: 'IG009', platform: 'Instagram', username: 'infernals_bikers', title: 'Recordatorio horario de reunión por stories', category: 'Institucional', format: 'Historia', views: 720, likes: 80, comments: 2, shares: 2, saves: 1, reach: 680, profileVisits: 8, newFollowers: 1, status: 'SIMULADO', publishDate: '04/11/2026' },
  { id: 'TK018', platform: 'TikTok', username: '@Infernals.bikers', title: 'Vista rápida del tablero Yamaha', category: 'Experiencias moteras', format: 'Video / Reel', views: 560, likes: 62, comments: 3, shares: 2, saves: 1, reach: 510, profileVisits: 6, newFollowers: 0, durationSeconds: 10, status: 'SIMULADO', publishDate: '05/11/2026' },
  { id: 'IG010', platform: 'Instagram', username: 'infernals_bikers', title: 'Agradecimiento a patrocinadores de aceite', category: 'Institucional', format: 'Carrusel / Fotos', views: 430, likes: 52, comments: 4, shares: 1, saves: 2, reach: 390, profileVisits: 5, newFollowers: 0, status: 'SIMULADO', publishDate: '05/11/2026' },
  { id: 'TK019', platform: 'TikTok', username: '@Infernals.bikers', title: 'Video prueba cámara trasera', category: 'Experiencias moteras', format: 'Video / Reel', views: 320, likes: 38, comments: 1, shares: 1, saves: 0, reach: 290, profileVisits: 4, newFollowers: 0, durationSeconds: 14, status: 'SIMULADO', publishDate: '05/11/2026' },
  { id: 'IG011', platform: 'Instagram', username: 'infernals_bikers', title: 'Foto estática logo en fondo negro', category: 'Institucional', format: 'Carrusel / Fotos', views: 190, likes: 25, comments: 1, shares: 0, saves: 1, reach: 175, profileVisits: 2, newFollowers: 0, status: 'SIMULADO', publishDate: '06/11/2026' },
];

export const RedesExecutiveDashboard: React.FC = () => {
  // Base completa de 30 publicaciones
  const [allPosts, setAllPosts] = useState<SocialPost[]>([...OBSERVED_TIKTOK_POSTS, ...SIMULATED_POSTS]);
  const [activeTab, setActiveTab] = useState<'resumen' | 'ranking' | 'inventario' | 'categorias' | 'simulador' | 'calendario'>('resumen');
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState<'TODOS' | 'TikTok' | 'Instagram'>('TODOS');
  const [categoryFilter, setCategoryFilter] = useState<string>('TODOS');
  const [statusFilter, setStatusFilter] = useState<'TODOS' | 'OBSERVADO' | 'SIMULADO'>('TODOS');

  // Modales
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPostForm, setNewPostForm] = useState({
    title: '',
    platform: 'TikTok' as SocialPlatform,
    category: 'Rodadas' as ContentCategory,
    views: 15000,
    likes: 1800,
    comments: 35,
    shares: 80,
    status: 'OBSERVADO' as DataStatus
  });

  // 1. Métricas Observadas Reales de Instagram y TikTok
  const instagramData = {
    username: 'infernals_bikers',
    displayName: "INFERNAL'S BIKER'S",
    posts: 37,
    followers: 224,
    following: 55,
    contactLink: 'WhatsApp (+57)',
    highlightStories: '4 meses visibles (Julio, Agosto, Septiembre, Octubre)',
    audioProfile: 'Thunderstruck - Live (1991)'
  };

  const tikTokData = {
    displayName: 'Infernals Bikers',
    username: '@Infernals.bikers',
    followers: 3290,
    following: 42,
    totalLikes: 93400,
    identifiableVideos: 6,
    pinnedVideos: 3,
    sampleViews: 713500
  };

  // 2. Ratios e Indicadores Estadísticos Derivados (Calculados)
  const totalCombinedFollowers = tikTokData.followers + instagramData.followers; // 3.514
  const followerRatio = Number((tikTokData.followers / instagramData.followers).toFixed(2)); // 14,69
  const followerDifference = tikTokData.followers - instagramData.followers; // 3.066
  const instagramFollowerShare = Number(((instagramData.followers / totalCombinedFollowers) * 100).toFixed(2)); // 6,37%
  const tikTokFollowerShare = Number(((tikTokData.followers / totalCombinedFollowers) * 100).toFixed(2)); // 93,63%
  const igFollowersPerPost = Number((instagramData.followers / instagramData.posts).toFixed(2)); // 6,05
  const igFollowerFollowingRatio = Number((instagramData.followers / instagramData.following).toFixed(2)); // 4,07
  const ttFollowerFollowingRatio = Number((tikTokData.followers / tikTokData.following).toFixed(2)); // 78,33
  const viewsPerFollowerTikTok = Number((tikTokData.sampleViews / tikTokData.followers).toFixed(2)); // 216,87

  // Estadísticas de los 6 videos observados de TikTok
  const observedStats = {
    totalViews: 713500,
    avgViews: 118916.67,
    medianViews: 48650,
    maxViews: 316100, // TK001
    minViews: 10900,  // TK006
    maxDiff: 305200,  // 316.100 - 10.900
    top2Share: 82.67  // TK001 + TK002 = 589.600 / 713.500 = 82,67%
  };

  // Filtrado de publicaciones
  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.category.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchSearch) return false;
      if (platformFilter !== 'TODOS' && post.platform !== platformFilter) return false;
      if (categoryFilter !== 'TODOS' && post.category !== categoryFilter) return false;
      if (statusFilter !== 'TODOS' && post.status !== statusFilter) return false;
      return true;
    });
  }, [allPosts, searchTerm, platformFilter, categoryFilter, statusFilter]);

  // Ranking Top 10 por Vistas
  const topRankedPosts = useMemo(() => {
    return [...allPosts].sort((a, b) => b.views - a.views).slice(0, 10);
  }, [allPosts]);

  // Desglose por Categoría
  const categoryBreakdown = useMemo(() => {
    const map: Record<string, { count: number; totalViews: number; totalLikes: number }> = {};
    allPosts.forEach(p => {
      if (!map[p.category]) {
        map[p.category] = { count: 0, totalViews: 0, totalLikes: 0 };
      }
      map[p.category].count++;
      map[p.category].totalViews += p.views;
      map[p.category].totalLikes += p.likes;
    });
    return Object.entries(map).map(([category, val]) => ({
      category,
      ...val,
      avgViews: Math.round(val.totalViews / val.count)
    })).sort((a, b) => b.totalViews - a.totalViews);
  }, [allPosts]);

  // Agregar nueva publicación
  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = newPostForm.platform === 'TikTok' ? `TK0${allPosts.length + 1}` : `IG0${allPosts.length + 1}`;
    const newPost: SocialPost = {
      id: newId,
      platform: newPostForm.platform,
      username: newPostForm.platform === 'TikTok' ? '@Infernals.bikers' : 'infernals_bikers',
      title: newPostForm.title,
      category: newPostForm.category,
      format: 'Video / Reel',
      views: Number(newPostForm.views),
      likes: Number(newPostForm.likes),
      comments: Number(newPostForm.comments),
      shares: Number(newPostForm.shares),
      saves: Math.round(Number(newPostForm.likes) * 0.05),
      reach: Math.round(Number(newPostForm.views) * 0.9),
      profileVisits: Math.round(Number(newPostForm.views) * 0.01),
      newFollowers: Math.round(Number(newPostForm.views) * 0.001),
      status: newPostForm.status,
      publishDate: 'Hoy'
    };
    setAllPosts([newPost, ...allPosts]);
    setShowAddModal(false);
  };

  // Exportar a Excel (CSV con formato)
  const handleExportCSV = () => {
    let csv = '\uFEFF';
    csv += 'INFORME DE SOCIAL MEDIA INTELLIGENCE: INFERNAL BIKERS\n\n';
    
    csv += '1. INVENTARIO REAL OBSERVADO (TIKTOK E INSTAGRAM)\n';
    csv += 'Plataforma,Usuario,Seguidores,Siguiendo,Publicaciones/Videos,Likes Totales,Dato Clave\n';
    csv += `TikTok,${tikTokData.username},${tikTokData.followers},${tikTokData.following},${tikTokData.identifiableVideos},${tikTokData.totalLikes},3 Videos Fijados\n`;
    csv += `Instagram,${instagramData.username},${instagramData.followers},${instagramData.following},${instagramData.posts},N/A,Enlace WhatsApp\n\n`;

    csv += '2. INDICADORES CALCULADOS DERIVADOS\n';
    csv += 'Indicador,Valor,Unidad/Descripción\n';
    csv += `Total Seguidores Sumados,${totalCombinedFollowers},Personas\n`;
    csv += `Relación Seguidores TikTok/Instagram,${followerRatio},Veces\n`;
    csv += `Diferencia de Seguidores,${followerDifference},Seguidores a favor de TikTok\n`;
    csv += `Participación TikTok,${tikTokFollowerShare}%,Del total combinado\n`;
    csv += `Participación Instagram,${instagramFollowerShare}%,Del total combinado\n`;
    csv += `Relación Seguidores/Publicaciones IG,${igFollowersPerPost},Seguidores por post\n`;
    csv += `Vistas de 6 Videos / Seguidores TikTok,${viewsPerFollowerTikTok},Ratio reproducciones\n\n`;

    csv += '3. REGISTRO INDIVIDUAL DE PUBLICACIONES (BASE COMPLETA)\n';
    csv += 'ID,Plataforma,Título,Categoría,Visualizaciones,Likes,Comentarios,Compartidos,Alcance,Engagement Rate (%),Estado\n';
    allPosts.forEach(p => {
      const eng = p.views > 0 ? (((p.likes + p.comments + p.shares) / p.views) * 100).toFixed(2) : '0';
      csv += `"${p.id}","${p.platform}","${p.title}","${p.category}",${p.views},${p.likes},${p.comments},${p.shares},${p.reach},${eng}%,"${p.status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Informe_Redes_InfernalBikers_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      
      {/* 1. Header Oficial de Redes & Multimedia */}
      <div className="biker-card p-6 bg-gradient-to-r from-purple-950/40 via-biker-gray to-biker-black border border-purple-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/30 rounded-2xl flex items-center justify-center text-purple-400 shrink-0 shadow-lg shadow-purple-500/10">
            <Share2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                DASHBOARD DE REDES SOCIALES & SOCIAL MEDIA INTELLIGENCE
              </h2>
              <span className="px-2.5 py-0.5 text-[10px] uppercase font-mono tracking-widest bg-purple-500/15 text-purple-300 border border-purple-500/30 rounded-full font-bold">
                Manager de Redes • Edward
              </span>
            </div>
            <p className="text-gray-400 text-xs mt-1">
              Inventario real de TikTok e Instagram, publicaciones virales de rodada, engagement y métricas de crecimiento.
            </p>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Registrar Publicación
          </button>
          <a
            href="https://www.tiktok.com/@Infernals.bikers"
            target="_blank"
            rel="noreferrer"
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all flex items-center justify-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" /> TikTok Oficial
          </a>
          <button
            onClick={handleExportCSV}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-biker-red hover:bg-red-700 text-white transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-biker-red/20"
          >
            <FileSpreadsheet className="w-4 h-4" /> Exportar Métricas
          </button>
        </div>
      </div>

      {/* 2. Tarjetas de Resumen Estadístico (KPIs Oficiales Observados & Calculados) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        {/* Total Seguidores Combinados */}
        <div className="biker-card p-5 border border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-black to-black relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold">Comunidad Sumada</span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              OBSERVADO
            </span>
          </div>
          <p className="text-3xl font-black text-white tracking-tight">{totalCombinedFollowers.toLocaleString('es-CO')}</p>
          <p className="text-[10px] text-gray-400 font-mono mt-1 leading-tight">
            TikTok (3.290) + IG (224)
          </p>
        </div>

        {/* Visualizaciones TikTok Observadas */}
        <div className="biker-card p-5 border border-cyan-500/30 bg-black/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-bold">Vistas TikTok (6 Videos)</span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              OBSERVADO
            </span>
          </div>
          <p className="text-3xl font-black text-cyan-400 tracking-tight">713.500</p>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            Top 2 = 82,67% (589.6k)
          </p>
        </div>

        {/* Me Gusta TikTok */}
        <div className="biker-card p-5 border border-red-500/30 bg-black/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold">Me Gusta TikTok</span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              OBSERVADO
            </span>
          </div>
          <p className="text-3xl font-black text-red-400 tracking-tight">93.400</p>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            Reacciones acumuladas
          </p>
        </div>

        {/* Ratio TikTok vs Instagram */}
        <div className="biker-card p-5 border border-amber-500/30 bg-black/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">Relación TT / IG</span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
              CALCULADO
            </span>
          </div>
          <p className="text-3xl font-black text-amber-300 tracking-tight">{followerRatio}x</p>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            +3.066 seguidores en TikTok
          </p>
        </div>

        {/* Promedio de Vistas por Publicación */}
        <div className="biker-card p-5 border border-emerald-500/30 bg-black/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">Promedio Reproducciones</span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
              CALCULADO
            </span>
          </div>
          <p className="text-2xl font-black text-emerald-400 tracking-tight">118.917</p>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            Mediana: 48.650 vistas
          </p>
        </div>

        {/* Participación de TikTok */}
        <div className="biker-card p-5 border border-purple-500/30 bg-black/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold">Share de Audiencia</span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
              CALCULADO
            </span>
          </div>
          <p className="text-3xl font-black text-purple-400 tracking-tight">{tikTokFollowerShare}%</p>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            TikTok (93.6%) vs IG (6.4%)
          </p>
        </div>

      </div>

      {/* 3. Pestañas de Navegación del Panel de Redes */}
      <div className="flex border-b border-white/10 gap-2 overflow-x-auto pb-1 text-xs font-mono uppercase tracking-wider">
        {[
          { id: 'resumen', name: '📊 Resumen & Comparativo TT vs IG', count: 'Inventario Real' },
          { id: 'ranking', name: '🏆 Top 6 Videos Observados', count: '713.5k Vistas' },
          { id: 'categorias', name: '🗂️ Categorías de Contenido', count: 'Rodadas Líder' },
          { id: 'simulador', name: '📑 Base de 30 Publicaciones', count: `${filteredPosts.length} Registros` },
          { id: 'calendario', name: '📅 Cronograma & Cobertura en Ruta', count: 'Plan Edward' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 border-b-2 font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-purple-500 text-white bg-white/[0.03]'
                : 'border-transparent text-gray-400 hover:text-white hover:bg-white/[0.01]'
            }`}
          >
            <span>{tab.name}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
              activeTab === tab.id ? 'bg-purple-500/20 text-purple-300' : 'bg-white/5 text-gray-500'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* PESTAÑA 1: RESUMEN Y COMPARATIVO ENTRE PLATAFORMAS */}
      {activeTab === 'resumen' && (
        <div className="space-y-8">
          
          {/* Tarjetas Comparativas de Plataformas Oficiales */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* TikTok Oficial */}
            <div className="biker-card p-6 space-y-4 border border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 via-black to-black">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold">
                    TT
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">TikTok • {tikTokData.displayName}</h3>
                    <p className="text-xs font-mono text-cyan-400">{tikTokData.username}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  OBSERVADO
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center py-2">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-gray-400 font-mono block">Seguidores</span>
                  <span className="text-xl font-black font-mono text-white">{tikTokData.followers.toLocaleString('es-CO')}</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-gray-400 font-mono block">Siguiendo</span>
                  <span className="text-xl font-black font-mono text-gray-300">{tikTokData.following}</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-gray-400 font-mono block">Me Gusta</span>
                  <span className="text-xl font-black font-mono text-red-400">{tikTokData.totalLikes.toLocaleString('es-CO')}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono text-gray-300 pt-2 border-t border-white/5">
                <div className="flex justify-between">
                  <span className="text-gray-400">Videos Identificables:</span>
                  <span className="text-white font-bold">{tikTokData.identifiableVideos} publicaciones</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Videos Fijados en Perfil:</span>
                  <span className="text-cyan-400 font-bold">{tikTokData.pinnedVideos} (TK001, TK002, TK003)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ratio Seguidores / Siguiendo:</span>
                  <span className="text-emerald-400 font-bold">{ttFollowerFollowingRatio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Reproducciones / Seguidor:</span>
                  <span className="text-amber-400 font-bold">{viewsPerFollowerTikTok} vistas/follower</span>
                </div>
              </div>
            </div>

            {/* Instagram Oficial */}
            <div className="biker-card p-6 space-y-4 border border-rose-500/30 bg-gradient-to-br from-rose-950/20 via-black to-black">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 font-bold">
                    IG
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Instagram • {instagramData.displayName}</h3>
                    <p className="text-xs font-mono text-rose-400">@{instagramData.username}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  OBSERVADO
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center py-2">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-gray-400 font-mono block">Seguidores</span>
                  <span className="text-xl font-black font-mono text-white">{instagramData.followers}</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-gray-400 font-mono block">Siguiendo</span>
                  <span className="text-xl font-black font-mono text-gray-300">{instagramData.following}</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-gray-400 font-mono block">Publicaciones</span>
                  <span className="text-xl font-black font-mono text-rose-400">{instagramData.posts}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono text-gray-300 pt-2 border-t border-white/5">
                <div className="flex justify-between">
                  <span className="text-gray-400">Enlace de Contacto Bio:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <PhoneCall className="w-3 h-3" /> WhatsApp
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Historias Destacadas:</span>
                  <span className="text-white font-bold">{instagramData.highlightStories}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Audio Asociado al Perfil:</span>
                  <span className="text-amber-400 font-bold truncate max-w-[200px]" title={instagramData.audioProfile}>
                    🎵 {instagramData.audioProfile}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Seguidores / Publicación:</span>
                  <span className="text-blue-400 font-bold">{igFollowersPerPost}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Gráfico de Participación Relativa y Concentración */}
          <div className="biker-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-400" /> Distribución de Audiencia y Concentración de Reproducciones
                </h3>
                <p className="text-xs text-gray-400">
                  TikTok concentra el <strong className="text-cyan-400">93,63%</strong> de la comunidad digital y genera un impacto masivo con los dos videos ancla de carretera.
                </p>
              </div>
              <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-3 py-1 rounded-lg border border-purple-500/20 font-bold">
                Muestra: 713.500 Vistas
              </span>
            </div>

            {/* Barra Comparativa de Audiencia */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                  TikTok (3.290 seguidores) • 93,63%
                </span>
                <span className="text-rose-400 font-bold">
                  Instagram (224 seguidores) • 6,37%
                </span>
              </div>
              <div className="w-full h-4 bg-black/60 rounded-full overflow-hidden flex border border-white/5">
                <div style={{ width: `${tikTokFollowerShare}%` }} className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-full" />
                <div style={{ width: `${instagramFollowerShare}%` }} className="bg-rose-500 h-full" />
              </div>
            </div>

            {/* Concentración de los dos primeros videos */}
            <div className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" /> Concentración Viral del 82,67%
                </p>
                <p className="text-xs text-gray-300">
                  Las publicaciones <strong className="text-cyan-300">TK001 (316.1k)</strong> y <strong className="text-cyan-300">TK002 (273.5k)</strong> suman <strong>589.600 reproducciones</strong>, demostrando que el contenido de rodada en carretera en primera persona (POV) es el motor viral de la legión.
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-2xl font-black font-mono text-amber-400">82,67%</span>
                <span className="block text-[10px] font-mono text-gray-400">Cuota de vistas</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* PESTAÑA 2: RANKING DE LOS 6 VIDEOS OBSERVADOS */}
      {activeTab === 'ranking' && (
        <div className="space-y-6">
          
          <div className="biker-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" /> Registro Individual de Publicaciones Observadas en TikTok
                </h3>
                <p className="text-xs text-gray-400">
                  Datos reales auditados de la cuenta oficial <strong>@Infernals.bikers</strong> (Total: 713.500 vistas).
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20 font-bold self-start sm:self-auto">
                6 Videos Oficiales
              </span>
            </div>

            <div className="space-y-3">
              {OBSERVED_TIKTOK_POSTS.map((video, idx) => {
                const maxViews = 316100;
                const percentage = (video.views / maxViews) * 100;
                return (
                  <div key={video.id} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-lg font-mono font-black text-sm flex items-center justify-center ${
                          idx === 0 ? 'bg-amber-500 text-black' :
                          idx === 1 ? 'bg-gray-300 text-black' :
                          idx === 2 ? 'bg-amber-700 text-white' : 'bg-white/10 text-gray-400'
                        }`}>
                          #{idx + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-cyan-400">{video.id}</span>
                            <span className="font-bold text-sm text-white">{video.title}</span>
                            {video.isPinned && (
                              <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold">
                                📌 Fijado
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 font-mono mt-0.5">
                            Categoría: <strong className="text-gray-300">{video.category}</strong> • Fecha: {video.publishDate}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xl font-black font-mono text-cyan-400">{video.views.toLocaleString('es-CO')}</span>
                        <span className="block text-[10px] font-mono text-gray-500">Visualizaciones</span>
                      </div>
                    </div>

                    {/* Barra de Progresión de Vistas */}
                    <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8 }}
                        className={`h-full rounded-full ${
                          idx === 0 ? 'bg-gradient-to-r from-amber-500 to-cyan-400' :
                          idx === 1 ? 'bg-cyan-400' : 'bg-purple-500'
                        }`}
                      />
                    </div>

                    {/* Métricas Secundarias */}
                    <div className="flex flex-wrap items-center justify-between pt-1 text-xs text-gray-400 font-mono gap-2 border-t border-white/5">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-red-400">
                          <Heart className="w-3.5 h-3.5" /> {video.likes.toLocaleString('es-CO')} likes
                        </span>
                        <span className="flex items-center gap-1 text-gray-300">
                          <MessageCircle className="w-3.5 h-3.5" /> {video.comments} comentarios
                        </span>
                        <span className="flex items-center gap-1 text-blue-400">
                          <Share className="w-3.5 h-3.5" /> {video.shares} compartidos
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {video.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Resumen Estadístico de la Muestra */}
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div>
                <span className="text-gray-500 block">Promedio de Vistas:</span>
                <span className="text-white font-bold text-sm">118.916,67</span>
              </div>
              <div>
                <span className="text-gray-500 block">Mediana de Vistas:</span>
                <span className="text-amber-400 font-bold text-sm">48.650</span>
              </div>
              <div>
                <span className="text-gray-500 block">Diferencia Máx - Mín:</span>
                <span className="text-cyan-400 font-bold text-sm">305.200</span>
              </div>
              <div>
                <span className="text-gray-500 block">Vistas Totales Muestra:</span>
                <span className="text-emerald-400 font-bold text-sm">713.500</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* PESTAÑA 3: CATEGORÍAS DE CONTENIDO */}
      {activeTab === 'categorias' && (
        <div className="space-y-6">
          
          <div className="biker-card p-6 space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" /> Rendimiento por Categoría de Contenido
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Análisis de qué temáticas generan mayor alcance, compartidos e integración con la comunidad motera.
              </p>
            </div>

            <div className="space-y-4">
              {categoryBreakdown.map((cat, idx) => (
                <div key={cat.category} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-sm text-white">{cat.category}</span>
                      <span className="ml-2 text-xs font-mono text-purple-300">({cat.count} publicaciones analizadas)</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono">
                      <span className="text-gray-400">Total vistas: <strong className="text-cyan-400">{cat.totalViews.toLocaleString('es-CO')}</strong></span>
                      <span className="text-gray-400">Promedio: <strong className="text-amber-400">{cat.avgViews.toLocaleString('es-CO')}</strong></span>
                    </div>
                  </div>

                  <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(cat.totalViews / 470000) * 100}%` }}
                      transition={{ duration: 0.7 }}
                      className={`h-full rounded-full ${
                        idx === 0 ? 'bg-gradient-to-r from-purple-500 to-cyan-400' : 'bg-purple-600/70'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Clasificación de Temáticas */}
            <div className="p-4 bg-purple-950/20 border border-purple-500/20 rounded-xl space-y-2 text-xs">
              <p className="font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-purple-400" /> Recomendación Editorial de Edward:
              </p>
              <p className="text-gray-300">
                1. <strong>Rodadas y Experiencias Moteras</strong> concentran más del 85% de las reproducciones virales en TikTok. Mantener cámara en casco y drones en carretera abierta.
              </p>
              <p className="text-gray-300">
                2. <strong>Promoción y Convocatoria</strong> tiene menor alcance orgánico pero la mayor tasa de clics al enlace de WhatsApp en Instagram para captar aspirantes.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* PESTAÑA 4: BASE DE DATOS DE 30 PUBLICACIONES */}
      {activeTab === 'simulador' && (
        <div className="space-y-6">
          
          {/* Barra de Filtros y Búsqueda */}
          <div className="biker-card p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border border-white/10">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por ID, título o categoría..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white outline-none focus:border-purple-500"
                />
              </div>

              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value as any)}
                className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300 outline-none focus:border-purple-500 font-mono"
              >
                <option value="TODOS">Todas las Plataformas</option>
                <option value="TikTok">TikTok ({allPosts.filter(p => p.platform === 'TikTok').length})</option>
                <option value="Instagram">Instagram ({allPosts.filter(p => p.platform === 'Instagram').length})</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300 outline-none focus:border-purple-500 font-mono"
              >
                <option value="TODOS">Todos los Estados</option>
                <option value="OBSERVADO">Observados Reales (6)</option>
                <option value="SIMULADO">Simulados de Prueba (24)</option>
              </select>
            </div>

            <div className="text-xs font-mono text-gray-400">
              Mostrando <strong className="text-purple-300">{filteredPosts.length}</strong> de {allPosts.length} publicaciones
            </div>
          </div>

          {/* Tabla Maestra de Publicaciones */}
          <div className="biker-card overflow-hidden border border-white/10 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-black/80 border-b border-white/10 font-mono text-[11px] text-gray-400 uppercase tracking-wider">
                    <th className="p-3">ID</th>
                    <th className="p-3">Plataforma</th>
                    <th className="p-3 min-w-[220px]">Título Descriptivo</th>
                    <th className="p-3">Categoría</th>
                    <th className="p-3 text-right">Vistas</th>
                    <th className="p-3 text-right">Likes</th>
                    <th className="p-3 text-right">Shares</th>
                    <th className="p-3 text-center">Engagement</th>
                    <th className="p-3 text-center">Calidad Dato</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {filteredPosts.map((p) => {
                    const engagementRate = p.views > 0 ? (((p.likes + p.comments + p.shares) / p.views) * 100).toFixed(1) : '0';
                    return (
                      <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-3 font-bold text-white">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            p.platform === 'TikTok' ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30' : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                          }`}>
                            {p.id}
                          </span>
                        </td>
                        <td className="p-3 text-gray-300">
                          {p.platform}
                        </td>
                        <td className="p-3 font-sans font-medium text-white">
                          <p>{p.title}</p>
                          {p.audioTrack && (
                            <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1 mt-0.5">
                              <Music className="w-3 h-3" /> {p.audioTrack}
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-gray-300">
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">
                            {p.category}
                          </span>
                        </td>
                        <td className="p-3 text-right font-bold text-cyan-400">
                          {p.views.toLocaleString('es-CO')}
                        </td>
                        <td className="p-3 text-right text-red-400">
                          {p.likes.toLocaleString('es-CO')}
                        </td>
                        <td className="p-3 text-right text-blue-400">
                          {p.shares.toLocaleString('es-CO')}
                        </td>
                        <td className="p-3 text-center font-bold text-amber-400">
                          {engagementRate}%
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            p.status === 'OBSERVADO' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* PESTAÑA 5: CRONOGRAMA & COBERTURA DE RUTA */}
      {activeTab === 'calendario' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Cronograma Editorial de Edward */}
            <div className="biker-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-400" /> Plan Editorial & Lanzamiento de Reels
                </h3>
                <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                  Próximas 2 Semanas
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { title: 'Rodada a Medellín y Guatapé - Video Oficial', platform: 'TikTok & Reels', date: 'Programado hoy', status: 'Listo para subir' },
                  { title: 'Flyer Oficial Cumbre Bikers Calima', platform: 'Instagram & Facebook', date: 'Mañana 18:00', status: 'En revisión' },
                  { title: 'Entrevista a la Legión & Parches de Honor', platform: 'YouTube / Reels', date: '14 de Noviembre', status: 'Edición 80%' },
                  { title: 'Álbum Fotográfico Rodada Ginebra', platform: 'Facebook Album Oficial', date: '18 de Noviembre', status: 'Selección RAW' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm text-white">{item.title}</p>
                      <p className="text-xs text-gray-400">{item.platform} • <span className="font-mono text-purple-300">{item.date}</span></p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Asignación de Equipos Audiovisuales en Ruta */}
            <div className="biker-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Film className="w-5 h-5 text-cyan-400" /> Cobertura Audiovisual en Carretera
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  3 Equipos
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { role: 'Operador de Dron DJI', detail: 'Toma aérea de la caravana en doble columna', gear: 'DJI Mini 3 Pro 4K', battery: '100%' },
                  { role: 'GoPro en Casco Guía (Puntero)', detail: 'Perspectiva POV para reels de carretera', gear: 'GoPro Hero 11 Black', battery: '3 Baterías' },
                  { role: 'Fotógrafo en Parada Técnica', detail: 'Retratos oficiales y parches de integrantes', gear: 'Sony Alpha 7 IV', battery: 'Listo' },
                ].map((gear, idx) => (
                  <div key={idx} className="p-3.5 bg-white/5 rounded-xl border border-white/5 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-sm text-white">{gear.role}</p>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {gear.battery}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{gear.detail}</p>
                    <p className="text-[11px] font-mono text-cyan-400">{gear.gear}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL REGISTRAR PUBLICACIÓN */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="biker-card p-6 w-full max-w-md border border-purple-500/30 bg-[#0c0c0c] shadow-2xl space-y-5"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-purple-400" /> Registrar Nueva Publicación
                </h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddPost} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-gray-400 block mb-1">Título Descriptivo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Rodada hacia el Cañón de Calima"
                    value={newPostForm.title}
                    onChange={(e) => setNewPostForm({ ...newPostForm, title: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-400 block mb-1">Plataforma</label>
                    <select
                      value={newPostForm.platform}
                      onChange={(e) => setNewPostForm({ ...newPostForm, platform: e.target.value as SocialPlatform })}
                      className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-purple-500"
                    >
                      <option value="TikTok">TikTok</option>
                      <option value="Instagram">Instagram</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-400 block mb-1">Categoría</label>
                    <select
                      value={newPostForm.category}
                      onChange={(e) => setNewPostForm({ ...newPostForm, category: e.target.value as ContentCategory })}
                      className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-purple-500"
                    >
                      <option value="Rodadas">Rodadas</option>
                      <option value="Experiencias moteras">Experiencias moteras</option>
                      <option value="Eventos">Eventos</option>
                      <option value="Comunidad">Comunidad</option>
                      <option value="Promoción">Promoción</option>
                      <option value="Actividades sociales">Actividades sociales</option>
                      <option value="Institucional">Institucional</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-400 block mb-1">Visualizaciones</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={newPostForm.views}
                      onChange={(e) => setNewPostForm({ ...newPostForm, views: Number(e.target.value) })}
                      className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 block mb-1">Me Gusta</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={newPostForm.likes}
                      onChange={(e) => setNewPostForm({ ...newPostForm, likes: Number(e.target.value) })}
                      className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Clasificación de Calidad del Dato</label>
                  <select
                    value={newPostForm.status}
                    onChange={(e) => setNewPostForm({ ...newPostForm, status: e.target.value as DataStatus })}
                    className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-purple-500"
                  >
                    <option value="OBSERVADO">OBSERVADO (Extraído de la app)</option>
                    <option value="SIMULADO">SIMULADO (Proyección / Prueba)</option>
                    <option value="ESTIMADO">ESTIMADO (Aproximación metodológica)</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
