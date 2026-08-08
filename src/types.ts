export type UserRole = 
  | 'member' 
  | 'admin' 
  | 'officer' 
  | 'lider_general' 
  | 'director_operativo' 
  | 'coordinadora_bienestar' 
  | 'coordinador_redes';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  rank: string;
  bike_model?: string;
  joined_at: string;
  avatar_url?: string;
  blood_type?: string;
  emergency_contact?: string;
  plate_number?: string;
}

export interface ClubEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  route_map_url?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image_url: string;
  stock: number;
}

export interface Transaction {
  id: number;
  user_id: number;
  amount: number;
  type: 'dues' | 'shop' | 'contribution';
  status: string;
  created_at: string;
}
