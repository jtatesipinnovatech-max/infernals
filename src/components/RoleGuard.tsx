import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { RolePermissions } from '../lib/permissions';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  requiredPath?: string;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ 
  children, 
  allowedRoles, 
  requiredPath 
}) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const currentPath = requiredPath || location.pathname;

  // Check role requirement if specific allowedRoles array passed
  let hasRoleAccess = true;
  if (allowedRoles && allowedRoles.length > 0) {
    hasRoleAccess = allowedRoles.includes(user.role) || user.role === 'admin' || user.role === 'lider_general';
  } else {
    hasRoleAccess = RolePermissions.canAccessRoute(user.role, currentPath);
  }

  if (!hasRoleAccess) {
    return (
      <div className="pt-32 pb-24 px-4 max-w-xl mx-auto text-center">
        <div className="biker-card p-8 border border-biker-red/30 space-y-6">
          <div className="w-16 h-16 bg-biker-red/10 border border-biker-red/30 rounded-full flex items-center justify-center mx-auto text-biker-red animate-pulse">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-wider text-white">ACCESO DENEGADO</h2>
            <p className="text-gray-400 text-sm mt-2">
              Tu rol actual (<span className="text-biker-red font-semibold">{RolePermissions.getRoleTitle(user.role)}</span>) no cuenta con permisos para acceder a esta ruta directa ({currentPath}).
            </p>
          </div>
          <div className="p-4 bg-black/40 rounded-lg text-xs text-left font-mono space-y-1 text-gray-400 border border-white/5">
            <p><span className="text-gray-500">Usuario:</span> {user.name}</p>
            <p><span className="text-gray-500">Email:</span> {user.email}</p>
            <p><span className="text-gray-500">Cargo:</span> {user.rank}</p>
          </div>
          <Link 
            to="/dashboard" 
            className="biker-btn biker-btn-primary inline-flex items-center gap-2 w-full justify-center"
          >
            <ArrowLeft className="w-4 h-4" /> Volver a Mi Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
