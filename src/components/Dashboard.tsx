import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar, 
  CreditCard, 
  ChevronRight,
  MoreVertical,
  Activity
} from 'lucide-react';
import { Card, Badge, Button } from './ui';
import { Subscription } from '../lib/supabase';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart,
  Area
} from 'recharts';

export const StatCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend = 'up',
  subtext
}: { 
  title: string, 
  value: string, 
  change?: string, 
  icon: React.ElementType,
  trend?: 'up' | 'down',
  subtext?: string
}) => (
  <Card className="flex flex-col gap-4 relative overflow-hidden group hover:border-accent/40 transition-all duration-300 bg-secondary-background border-border">
    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-16 translate-x-16 blur-2xl group-hover:bg-accent/10 transition-colors" />
    <div className="flex items-center justify-between relative">
      <div className="p-3 bg-text-primary/5 rounded-xl border border-border group-hover:border-accent/30 transition-colors">
        <Icon size={24} className="text-accent" />
      </div>
      {change && (
        <Badge variant={trend === 'up' ? 'danger' : 'success'} className="flex items-center gap-1 font-bold">
           {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
           {change}
        </Badge>
      )}
    </div>
    <div className="space-y-1 relative">
      <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">{title}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-3xl font-black tracking-tight text-text-primary">{value}</h3>
      </div>
      {subtext && <p className="text-xs text-text-secondary font-medium">{subtext}</p>}
    </div>
  </Card>
);

export const DashboardStats = ({ subscriptions }: { subscriptions: Subscription[] }) => {
  const activeSubs = subscriptions.filter(s => s.status === 'active');
  const monthlyTotal = activeSubs.reduce((acc, s) => {
    return acc + (s.billing_cycle === 'monthly' ? s.price : s.price / 12);
  }, 0);
  
  const yearlyTotal = monthlyTotal * 12;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <StatCard 
        title="Monthly Subscriptions" 
        value={`$${monthlyTotal.toFixed(2)}`} 
        change="+4.2%" 
        icon={DollarSign}
        trend="up"
        subtext="Subscription spend only"
      />
      <StatCard 
        title="Yearly Commitment" 
        value={`$${yearlyTotal.toFixed(2)}`} 
        icon={TrendingUp}
        subtext="Projected subscription cost"
      />
      <StatCard 
        title="Active Services" 
        value={activeSubs.length.toString()} 
        icon={CreditCard}
        subtext="Tracking 12 total"
      />
      <StatCard 
        title="Upcoming Renewal" 
        value="June 12" 
        icon={Calendar}
        subtext="Linear Plus ($15.00)"
      />
    </div>
  );
};

export const SubscriptionRow = ({ sub }: { sub: Subscription }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-text-primary/5 transition-all group border border-transparent hover:border-border">
    <div className="flex items-center gap-4 min-w-0">
      <div className="w-12 h-12 rounded-xl bg-text-primary/5 border border-border flex items-center justify-center font-bold text-accent group-hover:scale-110 transition-transform">
        {sub.name.charAt(0)}
      </div>
      <div className="min-w-0">
        <h4 className="text-sm font-bold text-text-primary truncate">{sub.name}</h4>
        <p className="text-xs text-text-secondary font-medium truncate uppercase tracking-wider">{sub.category}</p>
      </div>
    </div>
    
    <div className="hidden lg:block text-center">
       <p className="text-[10px] font-bold text-text-secondary mb-1 uppercase tracking-tighter">Billing</p>
       <Badge variant="default" className="bg-text-primary/5 border-border">{sub.billing_cycle}</Badge>
    </div>

    <div className="hidden lg:block text-center">
       <p className="text-[10px] font-bold text-text-secondary mb-1 uppercase tracking-tighter">Payment</p>
       <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 bg-text-primary/10 rounded-sm" />
          <span className="text-[10px] font-bold text-text-primary/70">•••• 7890</span>
       </div>
    </div>

    <div className="flex items-center gap-8">
      <div className="text-right">
        <p className="text-sm font-black text-text-primary">${sub.price.toFixed(2)}</p>
        <p className="text-[10px] font-bold text-accent uppercase tracking-tighter">Due in 4 days</p>
      </div>
      <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-text-primary/5">
        <MoreVertical size={16} />
      </button>
    </div>
  </div>
);

export const RecentSubscriptions = ({ subscriptions }: { subscriptions: Subscription[] }) => (
  <Card className="lg:col-span-2">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h3 className="text-xl font-bold tracking-tight mb-1">Recent Subscriptions</h3>
        <p className="text-sm text-text-secondary">Your most recently added tracking</p>
      </div>
      <Button variant="ghost" size="sm" className="text-accent hover:text-accent-soft gap-1">
        View All <ChevronRight size={16} />
      </Button>
    </div>
    <div className="space-y-2">
      {subscriptions.slice(0, 5).map(sub => (
        <SubscriptionRow key={sub.id} sub={sub} />
      ))}
    </div>
  </Card>
);

export const MonthlySpendingChart = () => {
  const data = [
    { name: 'Jan', amount: 120 },
    { name: 'Feb', amount: 145 },
    { name: 'Mar', amount: 132 },
    { name: 'Apr', amount: 156 },
    { name: 'May', amount: 190 },
    { name: 'Jun', amount: 175 },
  ];

  return (
    <Card className="lg:col-span-3 bg-secondary-background border-border">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black tracking-tight mb-1 text-text-primary uppercase">Analytics</h3>
          <p className="text-sm text-text-secondary font-medium">Spending trend over time</p>
        </div>
        <div className="flex items-center gap-2 p-1 bg-text-primary/5 rounded-xl border border-border">
          <button className="px-3 py-1 text-xs font-black rounded-lg bg-accent text-black">6M</button>
          <button className="px-3 py-1 text-xs font-black rounded-lg text-text-secondary hover:text-text-primary">1Y</button>
          <button className="px-3 py-1 text-xs font-black rounded-lg text-text-secondary hover:text-text-primary">All</button>
        </div>
      </div>
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00FF99" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00FF99" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontWeight: 'bold' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontWeight: 'bold' }}
              dx={-10}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--secondary-background)', 
                border: '1px solid var(--border)',
                borderRadius: '12px',
                color: 'var(--text-primary)',
                fontWeight: 'bold'
              }}
              itemStyle={{ color: '#00FF99' }}
            />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="#00FF99" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorAmount)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export const CategoryBreakdown = () => {
  const data = [
    { name: 'Dev Tools', value: 45, color: '#00FF99' },
    { name: 'Design', value: 25, color: '#4CFFCB' },
    { name: 'Marketing', value: 15, color: 'var(--text-secondary)' },
    { name: 'Misc', value: 15, color: 'var(--text-primary)' },
  ];

  return (
    <Card className="lg:col-span-2 bg-secondary-background border-border">
      <div className="flex items-center justify-between mb-8">
         <h3 className="text-xl font-black tracking-tight text-text-primary uppercase">Categories</h3>
         <Activity size={20} className="text-text-secondary/50" />
      </div>
      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-text-primary">{item.name}</span>
              <span className="font-black text-accent">{item.value}%</span>
            </div>
            <div className="h-2 w-full bg-text-primary/5 rounded-full overflow-hidden">
               <div 
                className="h-full bg-accent rounded-full shadow-[0_0_10px_rgba(0,255,153,0.3)]" 
                style={{ width: `${item.value}%`, backgroundColor: item.color }} 
               />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 p-4 bg-accent/5 rounded-2xl border border-accent/10 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
          <TrendingDown size={20} className="text-accent" />
        </div>
        <div>
           <p className="text-[10px] font-black text-accent uppercase tracking-wider">Savings Insight</p>
           <p className="text-[13px] text-text-secondary leading-tight font-medium">Switching Linear to Yearly could save you $30/year.</p>
        </div>
      </div>
    </Card>
  );
};
