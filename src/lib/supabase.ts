import { createClient } from '@supabase/supabase-js';

const defaultSupabaseUrl = 'https://tydlnvztpisshfbplpxu.supabase.co';
const defaultSupabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5ZGxudnp0cGlzc2hmYnBscHh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5NTcyMDUsImV4cCI6MjEwMTUzMzIwNX0.H9yhYdlwCMoafB2Y51koQfpfFS4lens4PDASgoTgUgA';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || defaultSupabaseUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || defaultSupabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

