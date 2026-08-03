export interface User {
  id: string;
  name: string;
  email: string;
  role: 'member' | 'admin' | 'officer';
  rank: string;
  bike_model?: string;
  joined_at: string;
  avatar_url?: string;
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
