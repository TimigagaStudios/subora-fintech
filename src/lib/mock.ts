import { Subscription } from './supabase';

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: '1',
    user_id: 'user1',
    name: 'Spotify',
    price: 11.99,
    billing_cycle: 'monthly',
    category: 'Entertainment',
    next_billing_date: '2026-06-15',
    status: 'active',
  },
  {
    id: '2',
    user_id: 'user1',
    name: 'Canva Pro',
    price: 119.99,
    billing_cycle: 'yearly',
    category: 'Design Tools',
    next_billing_date: '2026-09-20',
    status: 'active',
  },
  {
    id: '3',
    user_id: 'user1',
    name: 'Vercel Pro',
    price: 20.00,
    billing_cycle: 'monthly',
    category: 'Development Tools',
    next_billing_date: '2026-06-01',
    status: 'active',
    project_tag: 'Portfolio'
  },
  {
    id: '4',
    user_id: 'user1',
    name: 'Linear Plus',
    price: 15.00,
    billing_cycle: 'monthly',
    category: 'Development Tools',
    next_billing_date: '2026-06-12',
    status: 'active',
    project_tag: 'Subsight App'
  },
  {
    id: '5',
    user_id: 'user1',
    name: 'Mailchimp',
    price: 45.00,
    billing_cycle: 'monthly',
    category: 'Marketing Tools',
    next_billing_date: '2026-06-25',
    status: 'cancelled',
  }
];

export const CATEGORIES = [
  { name: 'Design Tools', icon: 'Palette' },
  { name: 'Development Tools', icon: 'Code' },
  { name: 'Marketing Tools', icon: 'Megaphone' },
  { name: 'Entertainment', icon: 'PlayCircle' },
  { name: 'Custom', icon: 'PlusCircle' }
];
