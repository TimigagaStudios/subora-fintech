import { Card, Button, Badge, Input } from './ui';
import { 
  Search, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  ChevronRight, 
  Filter,
  Download
} from 'lucide-react';

export const TransactionsView = () => {
  const transactions = [
    { id: 1, name: 'Apple Music Subscription', date: 'Jun 05, 2024', time: '10:24 AM', amount: -14.99, icon: CreditCard, category: 'Subscription', status: 'Completed' },
    { id: 2, name: 'Incoming Transfer (David)', date: 'Jun 04, 2024', time: '04:15 PM', amount: 450.00, icon: ArrowDownLeft, category: 'Transfer', status: 'Completed' },
    { id: 3, name: 'Netflix Monthly', date: 'May 28, 2024', time: '08:00 AM', amount: -19.99, icon: CreditCard, category: 'Subscription', status: 'Completed' },
    { id: 4, name: 'Amazon Prime', date: 'May 25, 2024', time: '09:30 AM', amount: -12.99, icon: CreditCard, category: 'Subscription', status: 'Completed' },
    { id: 5, name: 'Vercel Pro', date: 'May 20, 2024', time: '11:15 AM', amount: -20.00, icon: CreditCard, category: 'Hosting', status: 'Completed' },
    { id: 6, name: 'Canva Pro Yearly', date: 'May 15, 2024', time: '02:45 PM', amount: -119.99, icon: CreditCard, category: 'Design', status: 'Completed' },
    { id: 7, name: 'Spotify Duo', date: 'May 12, 2024', time: '07:20 PM', amount: -16.99, icon: CreditCard, category: 'Subscription', status: 'Completed' },
    { id: 8, name: 'Airtel Airtime Recharge', date: 'May 10, 2024', time: '01:10 PM', amount: -50.00, icon: ArrowUpRight, category: 'Communication', status: 'Completed' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Transactions</h1>
          <p className="text-text-secondary font-medium">History of all your payments and transfers.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download size={18} /> Export
          </Button>
          <Button variant="primary" className="gap-2">
            <Filter size={18} /> Filter
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/50" />
          <Input placeholder="Search by name, category or amount..." className="pl-12 bg-secondary-background/50 border-border h-12" />
        </div>

        <Card className="p-0 overflow-hidden bg-transparent border-none">
          <div className="flex flex-col gap-1">
            {transactions.map((tx, idx) => (
              <div 
                key={tx.id} 
                className={`flex items-center gap-4 p-4 hover:bg-text-primary/5 transition-all group ${idx !== transactions.length - 1 ? 'border-b border-border' : ''}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tx.amount > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-text-primary/5 text-text-primary'}`}>
                  <tx.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">{tx.name}</p>
                  <p className="text-xs text-text-secondary font-medium uppercase tracking-wider">{tx.category} • {tx.date} at {tx.time}</p>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <p className={`font-bold ${tx.amount > 0 ? 'text-emerald-500' : 'text-text-primary'}`}>
                      {tx.amount > 0 ? '+' : ''}{Math.abs(tx.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </p>
                    <Badge variant={tx.status === 'Completed' ? 'success' : 'warning'} className="text-[10px] py-0 px-1.5 h-auto uppercase">{tx.status}</Badge>
                  </div>
                  <ChevronRight size={18} className="text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Button variant="ghost" className="w-full py-4 text-text-secondary font-bold">Load More Transactions</Button>
      </div>
    </div>
  );
};
