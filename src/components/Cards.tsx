import React from 'react';
import { Card, Button } from './ui';
import { 
  Plus, 
  Lock, 
  Settings, 
  Eye, 
  EyeOff,
  TrendingUp,
  History,
  MoreHorizontal
} from 'lucide-react';
import { motion } from 'framer-motion';

const CreditCardDetailed = ({ name, balance, number, expiry, type, gradient, active }: any) => {
  const [showNumber, setShowNumber] = React.useState(false);
  
  return (
    <div className={`p-6 rounded-3xl border border-border bg-secondary-background/50 backdrop-blur-xl relative overflow-hidden group hover:bg-secondary-background transition-all`}>
      <div className={`absolute top-0 right-0 w-32 h-full opacity-10 blur-2xl ${gradient} pointer-events-none`} />
      
      <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="w-full md:w-80 flex-shrink-0">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className={`w-full aspect-[1.58/1] rounded-2xl p-6 text-white overflow-hidden shadow-2xl ${gradient} cursor-pointer group/card`}
          >
            <div className="relative h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/70 text-[10px] font-medium mb-1 uppercase tracking-wider italic">Subora Virtual</p>
                  <div className="w-10 h-7 bg-amber-400/80 rounded shadow-inner" />
                </div>
                <div className="w-12 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20">
                  <span className="font-black italic text-[10px]">{type}</span>
                </div>
              </div>

              <div>
                <p className="text-lg font-black tracking-[0.2em] mb-4">
                   {showNumber ? number : `•••• •••• •••• ${number.slice(-4)}`}
                </p>
                <div className="flex justify-between items-end">
                   <div>
                     <p className="text-white/50 text-[8px] uppercase tracking-widest">Card Holder</p>
                     <p className="text-xs font-bold uppercase">{name}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-white/50 text-[8px] uppercase tracking-widest">Expires</p>
                     <p className="text-xs font-bold">{expiry}</p>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex-1 w-full space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black">${balance.toLocaleString()}</h3>
              <p className="text-sm text-text-secondary font-medium">Available Balance</p>
            </div>
            <div className="flex gap-2">
               <Button variant="ghost" size="icon" onClick={() => setShowNumber(!showNumber)}>
                  {showNumber ? <EyeOff size={20} /> : <Eye size={20} />}
               </Button>
               <Button variant="ghost" size="icon">
                  <MoreHorizontal size={20} />
               </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-text-primary/5 rounded-2xl">
                <p className="text-xs text-text-secondary font-bold uppercase mb-1">Limit Used</p>
                <div className="flex items-end gap-2">
                   <span className="text-lg font-black tracking-tight text-accent">32%</span>
                   <span className="text-xs text-text-secondary mb-1">/ $5,000</span>
                </div>
                <div className="w-full h-1.5 bg-text-primary/10 rounded-full mt-2 overflow-hidden">
                   <div className="h-full bg-accent" style={{ width: '32%' }} />
                </div>
             </div>
             <div className="p-4 bg-text-primary/5 rounded-2xl">
                <p className="text-xs text-text-secondary font-bold uppercase mb-1">Recent Activity</p>
                <div className="flex items-center gap-2">
                   <TrendingUp size={18} className="text-emerald-500" />
                   <span className="text-lg font-black tracking-tight text-emerald-500">+$240</span>
                </div>
                <p className="text-[10px] text-text-secondary mt-2">Past 24 hours</p>
             </div>
          </div>

          <div className="flex flex-wrap gap-3">
             <Button variant={active ? 'primary' : 'outline'} size="sm" className="gap-2">
                <Plus size={16} /> Top Up
             </Button>
             <Button variant="outline" size="sm" className="gap-2">
                <Lock size={16} /> Freeze Card
             </Button>
             <Button variant="outline" size="sm" className="gap-2">
                <Settings size={16} /> Settings
             </Button>
             <Button variant="outline" size="sm" className="gap-2">
                <History size={16} /> History
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CardsView = () => {
  const cards = [
    { id: 1, name: 'ALEX CARTER', balance: 3009.94, number: '4532 8812 3456 7890', expiry: '09/26', type: 'VISA', gradient: 'credit-card-gradient-1', active: true },
    { id: 2, name: 'ALEX CARTER', balance: 1240.00, number: '5412 7500 1234 5678', expiry: '12/25', type: 'MASTERCARD', gradient: 'credit-card-gradient-2', active: false },
    { id: 3, name: 'ALEX CARTER (WORK)', balance: 840.50, number: '4000 1234 5678 9010', expiry: '01/27', type: 'VISA', gradient: 'credit-card-gradient-3', active: false },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Virtual Cards</h1>
          <p className="text-text-secondary font-medium">Manage your digital spending and set custom limits.</p>
        </div>
        <Button variant="primary" className="gap-2">
          <Plus size={18} /> Create New Card
        </Button>
      </header>

      <div className="space-y-6">
         {cards.map(card => (
           <CreditCardDetailed key={card.id} {...card} />
         ))}
      </div>

      <Card className="bg-secondary-background/30 border-dashed">
         <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-20 h-20 rounded-full bg-text-primary/5 flex items-center justify-center mb-6">
               <Plus size={40} className="text-text-secondary/50" />
            </div>
            <h3 className="text-xl font-bold mb-2">Request a Physical Card</h3>
            <p className="text-text-secondary max-w-sm mb-6">Get a sleek metal card delivered to your doorstep. Seamlessly integrated with your Subora wallet.</p>
            <Button variant="outline">Join Waitlist</Button>
         </div>
      </Card>
    </div>
  );
};
