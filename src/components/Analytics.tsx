import { Card, Badge, Button } from './ui';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart,
  Pie,
  Cell as ReCell
} from 'recharts';
import { TrendingUp, ArrowUpRight, Filter } from 'lucide-react';

export const AnalyticsView = () => {
  const data = [
    { name: 'Jan', amount: 120, business: 40, personal: 80 },
    { name: 'Feb', amount: 145, business: 60, personal: 85 },
    { name: 'Mar', amount: 132, business: 55, personal: 77 },
    { name: 'Apr', amount: 156, business: 70, personal: 86 },
    { name: 'May', amount: 190, business: 100, personal: 90 },
    { name: 'Jun', amount: 175, business: 85, personal: 90 },
  ];

  const pieData = [
    { name: 'Dev Tools', value: 45 },
    { name: 'Design', value: 25 },
    { name: 'Marketing', value: 20 },
    { name: 'Other', value: 10 },
  ];

  const COLORS = ['#00FF99', '#4CFFCB', 'var(--text-secondary)', 'var(--text-primary)'];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 text-text-primary">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">Advanced Analytics</h1>
          <p className="text-text-secondary font-medium">Deep insights into your subscription spending habits.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="gap-2"><Filter size={18} /> Filter</Button>
           <Button variant="primary" className="gap-2"><ArrowUpRight size={18} /> Download Report</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-secondary-background border-border">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-xl font-black tracking-tight uppercase">Spending Breakdown</h3>
             <Badge variant="accent" className="font-bold">Monthly vs Business</Badge>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontWeight: 'bold' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontWeight: 'bold' }} dx={-10} tickFormatter={(v) => `$${v}`} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{ backgroundColor: 'var(--secondary-background)', border: '1px solid var(--border)', borderRadius: '12px', fontWeight: 'bold' }}
                />
                <Bar dataKey="business" fill="#00FF99" radius={[4, 4, 0, 0]} stackId="a" />
                <Bar dataKey="personal" fill="var(--text-secondary)" radius={[4, 4, 0, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-secondary-background border-border">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-xl font-black tracking-tight uppercase">Category Share</h3>
             <TrendingUp size={20} className="text-accent" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <ReCell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: 'var(--secondary-background)', border: '1px solid var(--border)', borderRadius: '12px', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4 mt-6">
            {pieData.map((item, i) => (
              <div key={item.name} className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-sm font-bold">{item.name}</span>
                 </div>
                 <span className="text-sm font-black text-accent">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Avg Monthly Spend', value: '$158.40', sub: 'Last 12 months' },
           { label: 'Highest Month', value: '$210.00', sub: 'May 2026' },
           { label: 'Savings Found', value: '$345.00', sub: 'Year to date' },
           { label: 'Billing Efficiency', value: '92%', sub: 'Based on usage' }
         ].map((stat, i) => (
           <Card key={i} className="flex flex-col gap-2 p-8 border-none bg-text-primary/5 hover:bg-text-primary/10 transition-all group">
              <span className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] group-hover:text-accent transition-colors">{stat.label}</span>
              <span className="text-3xl font-black tracking-tighter">{stat.value}</span>
              <span className="text-[10px] font-black text-accent uppercase tracking-wider">{stat.sub}</span>
           </Card>
         ))}
      </div>
    </div>
  );
};
