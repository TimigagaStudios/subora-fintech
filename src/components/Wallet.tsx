import React from 'react';
import { Card, Button, Badge } from './ui';
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  Smartphone, 
  Zap, 
  Gift, 
  RefreshCcw,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion } from 'framer-motion';

const VirtualCard = ({ balance, name, number, expiry, type, gradient }: any) => {
  const [showNumber, setShowNumber] = React.useState(false);
  
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative w-full aspect-[1.58/1] rounded-3xl p-6 text-white overflow-hidden shadow-2xl ${gradient} cursor-pointer group`}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/20 transition-all duration-500" />
      
      <div className="relative h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-white/70 text-sm font-medium mb-1">Total Balance</p>
            <h3 className="text-3xl font-bold tracking-tight">${balance.toLocaleString()}</h3>
          </div>
          <div className="w-12 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20">
            <span className="font-bold italic text-xs">{type}</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <p className="text-lg font-medium tracking-[0.2em]">
              {showNumber ? number : `•••• •••• •••• ${number.slice(-4)}`}
            </p>
            <button onClick={() => setShowNumber(!showNumber)} className="text-white/60 hover:text-white">
              {showNumber ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Card Holder</p>
              <p className="text-sm font-bold uppercase">{name}</p>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Expires</p>
              <p className="text-sm font-bold">{expiry}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const WalletView = () => {
  const quickActions = [
    { label: 'Pay', icon: ArrowUpRight, color: 'bg-emerald-500' },
    { label: 'Transfer', icon: RefreshCcw, color: 'bg-blue-500' },
    { label: 'Airtime', icon: Smartphone, color: 'bg-orange-500' },
    { label: 'Bills', icon: Zap, color: 'bg-purple-500' },
    { label: 'Gift Card', icon: Gift, color: 'bg-pink-500' },
  ];

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">My Wallet</h1>
          <p className="text-text-secondary font-medium">Manage your virtual cards and digital assets.</p>
        </div>
        <Button variant="primary" className="gap-2">
          <Plus size={18} /> Add New Card
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
              <div className="min-w-[340px] md:min-w-[400px]">
                <VirtualCard 
                  balance={3009.94}
                  name="ALEX CARTER"
                  number="4532 8812 3456 7890"
                  expiry="09/26"
                  type="VISA"
                  gradient="credit-card-gradient-1"
                />
              </div>
              <div className="min-w-[340px] md:min-w-[400px] opacity-60 hover:opacity-100 transition-opacity">
                <VirtualCard 
                  balance={1240.00}
                  name="ALEX CARTER"
                  number="5412 7500 1234 5678"
                  expiry="12/25"
                  type="MASTERCARD"
                  gradient="credit-card-gradient-2"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {quickActions.map((action) => (
              <motion.button 
                key={action.label}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-3 p-4 bg-secondary-background border border-border rounded-2xl group transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center text-white shadow-lg`}>
                  <action.icon size={24} />
                </div>
                <span className="text-sm font-bold text-text-primary">{action.label}</span>
              </motion.button>
            ))}
          </div>

          <Card>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">Wallet Activities</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
               {[
                 { name: 'Apple Music Subscription', date: 'Today, 10:24 AM', amount: -14.99, icon: CreditCard, category: 'Subscription' },
                 { name: 'Incoming Transfer (David)', date: 'Yesterday, 04:15 PM', amount: 450.00, icon: ArrowDownLeft, category: 'Transfer' },
                 { name: 'Netflix Monthly', date: 'May 28, 2024', amount: -19.99, icon: CreditCard, category: 'Subscription' },
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-4 p-4 hover:bg-text-primary/5 rounded-2xl transition-all">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.amount > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-text-primary/5 text-text-primary'}`}>
                       <item.icon size={20} />
                    </div>
                    <div className="flex-1">
                       <p className="font-bold">{item.name}</p>
                       <p className="text-xs text-text-secondary">{item.date} • {item.category}</p>
                    </div>
                    <div className="text-right">
                       <p className={`font-bold ${item.amount > 0 ? 'text-emerald-500' : 'text-text-primary'}`}>
                         {item.amount > 0 ? '+' : ''}{item.amount.toFixed(2)}
                       </p>
                    </div>
                 </div>
               ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="bg-accent text-black border-none">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black uppercase tracking-tight">Refer & Earn</h3>
                <Gift size={24} />
             </div>
             <p className="text-sm font-medium mb-6 opacity-80">Invite your friends to Subora and get $10 for every successful sign up.</p>
             <Button variant="secondary" className="w-full bg-black text-white border-none hover:bg-black/80">Get Invite Link</Button>
          </Card>

          <Card>
             <h3 className="text-lg font-bold mb-6">Linked Accounts</h3>
             <div className="space-y-4">
                {[
                  { name: 'Chase Bank', type: 'Checking •••• 1290', status: 'Connected' },
                  { name: 'PayPal', type: 'alex.c@email.com', status: 'Connected' }
                ].map((acc, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-text-primary/5 flex items-center justify-center">
                        <CreditCard size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{acc.name}</p>
                        <p className="text-[10px] text-text-secondary">{acc.type}</p>
                      </div>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full text-sm">Link New Account</Button>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
