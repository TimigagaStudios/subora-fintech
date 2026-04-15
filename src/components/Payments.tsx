import { Card, Button, Input } from './ui';
import { 
  Smartphone, 
  Zap, 
  Gift, 
  RefreshCcw, 
  Globe, 
  Tv, 
  Gamepad2, 
  Wifi,
  Search,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceItem = ({ icon: Icon, label, description, color }: any) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="flex items-center gap-4 p-5 bg-secondary-background border border-border rounded-2xl group cursor-pointer transition-all hover:bg-text-primary/5"
  >
    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg`}>
      <Icon size={28} />
    </div>
    <div className="flex-1">
      <p className="font-bold text-lg">{label}</p>
      <p className="text-sm text-text-secondary">{description}</p>
    </div>
    <ChevronRight size={20} className="text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.div>
);

export const PaymentsView = () => {
  const services = [
    { label: 'Airtime', icon: Smartphone, color: 'bg-emerald-500', description: 'Recharge any mobile number instantly' },
    { label: 'Data Bundle', icon: Globe, color: 'bg-blue-500', description: 'Buy affordable data packages' },
    { label: 'Cable TV', icon: Tv, color: 'bg-orange-500', description: 'Pay for DSTV, GOTV, and more' },
    { label: 'Electricity', icon: Zap, color: 'bg-amber-500', description: 'Pay electricity bills for all DISCOs' },
    { label: 'Internet', icon: Wifi, color: 'bg-indigo-500', description: 'Fast and reliable internet plans' },
    { label: 'Gift Cards', icon: Gift, color: 'bg-pink-500', description: 'Buy gift cards from global stores' },
    { label: 'Games', icon: Gamepad2, color: 'bg-red-500', description: 'Refill game wallets and credits' },
    { label: 'Exchange', icon: RefreshCcw, color: 'bg-teal-500', description: 'Swap currencies at best rates' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Payments & Services</h1>
          <p className="text-text-secondary font-medium">Quickly pay for utility bills and other digital services.</p>
        </div>
      </header>

      <div className="relative mb-8">
        <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary/50" />
        <Input placeholder="Search for a service..." className="pl-14 bg-secondary-background h-14 text-lg font-medium" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, idx) => (
          <ServiceItem key={idx} {...service} />
        ))}
      </div>

      <Card className="mt-12 bg-accent/10 border-accent/20 border-dashed">
         <div className="flex flex-col items-center text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
               <Zap size={32} className="text-accent" />
            </div>
            <h3 className="text-2xl font-bold">More Services Coming Soon</h3>
            <p className="text-text-secondary max-w-md">We are working on bringing more services to Subora. Is there something you want to see? Let us know!</p>
            <Button variant="primary">Send Feedback</Button>
         </div>
      </Card>
    </div>
  );
};
