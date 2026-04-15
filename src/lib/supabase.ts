import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Subscription = {
  id: string;
  user_id: string;
  name: string;
  price: number;
  billing_cycle: 'monthly' | 'yearly';
  category: string;
  next_billing_date: string;
  status: 'active' | 'cancelled';
  project_tag?: string;
  icon_url?: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type Payment = {
  id: string;
  subscription_id: string;
  amount: number;
  paid_at: string;
  status: 'paid' | 'pending';
};
