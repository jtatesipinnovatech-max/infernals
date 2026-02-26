import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Prevent the app from crashing if environment variables are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ ERROR: Supabase credentials missing!');
  console.warn('Por favor, añade VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en el panel de Secrets.');
}

// We only initialize if we have the URL, otherwise we export a proxy or handle it in services
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-project.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);
