import { UserRole } from '../types';

export interface RoleConfig {
  id: UserRole;
  title: string;
  description: string;
  badgeColor: string;
  allowedRoutes: string[];
}

export class RolePermissions {
  static ROLES: Record<string, RoleConfig> = {
    lider_general: {
      id: 'lider_general',
      title: 'Líder General',
      description: 'Supervisión global del club, finanzas, aprobación de miembros y cargos directivos.',
      badgeColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      allowedRoutes: ['/dashboard', '/admin', '/admin/eventos', '/events', '/members', '/shop']
    },
    admin: {
      id: 'admin',
      title: 'Líder General / Administrador',
      description: 'Acceso total y control de mando de las operaciones del club.',
      badgeColor: 'bg-biker-red/10 text-biker-red border-biker-red/20',
      allowedRoutes: ['/dashboard', '/admin', '/admin/eventos', '/events', '/members', '/shop']
    },
    director_operativo: {
      id: 'director_operativo',
      title: 'Director Operativo',
      description: 'Planificación de rutas, logística de eventos, vehículo de apoyo y seguridad en vía.',
      badgeColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      allowedRoutes: ['/dashboard', '/admin/eventos', '/events', '/members']
    },
    coordinadora_bienestar: {
      id: 'coordinadora_bienestar',
      title: 'Coordinadora de Bienestar',
      description: 'Salud de integrantes, fichas médicas SOS, cumpleaños y fondo de solidaridad.',
      badgeColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      allowedRoutes: ['/dashboard', '/members', '/events']
    },
    coordinador_redes: {
      id: 'coordinador_redes',
      title: 'Coordinador de Redes Sociales',
      description: 'Calendario editorial, gestión de publicaciones/flyers y métricas de impacto.',
      badgeColor: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      allowedRoutes: ['/dashboard', '/admin/eventos', '/events']
    },
    officer: {
      id: 'officer',
      title: 'Oficial del Club',
      description: 'Oficial administrativo con acceso general al panel de control.',
      badgeColor: 'bg-gray-500/10 text-gray-300 border-gray-500/20',
      allowedRoutes: ['/dashboard', '/admin', '/admin/eventos', '/events', '/members']
    },
    member: {
      id: 'member',
      title: 'Miembro / Biker',
      description: 'Acceso al área personal, tarjeta digital y eventos del club.',
      badgeColor: 'bg-white/5 text-gray-400 border-white/10',
      allowedRoutes: ['/dashboard', '/events', '/shop', '/members']
    }
  };

  /**
   * Check if a given role can access a route path
   */
  static canAccessRoute(role: UserRole | string | undefined, path: string): boolean {
    if (!role) return false;
    
    // Admins and Lider General can access everything
    if (role === 'admin' || role === 'lider_general') return true;

    const config = this.ROLES[role];
    if (!config) return false;

    // Check if path starts with any allowed route
    return config.allowedRoutes.some(route => path.startsWith(route));
  }

  /**
   * Get role display name
   */
  static getRoleTitle(role: UserRole | string | undefined): string {
    if (!role) return 'Miembro';
    return this.ROLES[role]?.title || 'Oficial Biker';
  }

  /**
   * Get role badge color classes
   */
  static getBadgeColor(role: UserRole | string | undefined): string {
    if (!role) return this.ROLES.member.badgeColor;
    return this.ROLES[role]?.badgeColor || this.ROLES.member.badgeColor;
  }
}
