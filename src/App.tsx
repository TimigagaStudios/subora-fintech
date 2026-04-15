import { useState } from 'react';
import { Layout } from './components/Layout';
import { 
  DashboardStats, 
  RecentSubscriptions, 
  MonthlySpendingChart, 
  CategoryBreakdown,
  SubscriptionRow
} from './components/Dashboard';
import { AnalyticsView } from './components/Analytics';
import { CalendarView } from './components/Calendar';
import { WalletView } from './components/Wallet';
import { TransactionsView } from './components/Transactions';
import { PaymentsView } from './components/Payments';
import { CardsView } from './components/Cards';
import { MOCK_SUBSCRIPTIONS } from './lib/mock';
import { 
  Plus, 
  LayoutGrid, 
  List as ListIcon, 
  ArrowUpRight, 
  Briefcase, 
  Layers, 
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Wallet,
  Zap,
  RefreshCcw,
  Smartphone
} from 'lucide-react';
import { Button, Card, Badge, Input } from './components/ui';
import { motion } from 'framer-motion';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [subscriptions] = useState(MOCK_SUBSCRIPTIONS);
  const [isLoggedIn, setIsLoggedIn] = useState(true); 

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div>
                  <h1 className="text-4xl font-black tracking-tight mb-2">Welcome back, Alex.</h1>
                  <p className="text-text-secondary font-medium">Your financial health is <span className="text-accent font-bold">Excellent</span> this month.</p>
               </div>
               <div className="flex items-center gap-3">
                  <Button variant="outline" className="hidden sm:flex gap-2">
                    <ArrowUpRight size={18} /> Quick Transfer
                  </Button>
                  <Button variant="primary" className="gap-2 shadow-accent/20 shadow-lg" onClick={() => setActivePage('wallet')}>
                    <Wallet size={18} className="stroke-[3]" /> Open Wallet
                  </Button>
               </div>
            </header>

            {/* Quick Balance Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
               <div className="md:col-span-8">
                  <Card className="h-full bg-secondary-background relative overflow-hidden group border-none">
                     <div className="absolute top-0 right-0 w-64 h-full bg-accent opacity-5 blur-3xl -mr-20 pointer-events-none group-hover:opacity-10 transition-opacity" />
                     <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center h-full gap-6">
                        <div>
                           <p className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-2">Total Balance</p>
                           <h2 className="text-5xl font-black tracking-tight">$3,009.94</h2>
                           <div className="flex items-center gap-2 mt-4">
                              <Badge variant="success" className="gap-1 flex items-center">
                                 <TrendingUp size={12} /> +12.5%
                              </Badge>
                              <span className="text-xs text-text-secondary font-medium">from last month</span>
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
                           <Button variant="secondary" className="gap-2 flex-1" onClick={() => setActivePage('payments')}>
                              <Zap size={18} /> Pay
                           </Button>
                           <Button variant="secondary" className="gap-2 flex-1">
                              <Plus size={18} /> Add
                           </Button>
                           <Button variant="secondary" className="gap-2 flex-1">
                              <RefreshCcw size={18} /> Transfer
                           </Button>
                           <Button variant="secondary" className="gap-2 flex-1" onClick={() => setActivePage('payments')}>
                              <Smartphone size={18} /> Top-up
                           </Button>
                        </div>
                     </div>
                  </Card>
               </div>
               <div className="md:col-span-4">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setActivePage('cards')}
                    className="h-full credit-card-gradient-1 rounded-2xl p-6 text-black cursor-pointer shadow-xl shadow-accent/10 relative overflow-hidden group"
                  >
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:opacity-30 transition-opacity" />
                     <div className="relative flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start">
                           <span className="font-black italic text-sm">SUBORA PREMIUM</span>
                           <div className="w-10 h-7 bg-black/10 rounded flex items-center justify-center border border-black/5 backdrop-blur-sm">
                              <span className="font-black italic text-[10px]">VISA</span>
                           </div>
                        </div>
                        <div>
                           <p className="text-lg font-black tracking-widest mb-1">•••• 7890</p>
                           <p className="text-[10px] font-bold uppercase opacity-60">Alex Carter</p>
                        </div>
                     </div>
                  </motion.div>
               </div>
            </div>

            <DashboardStats subscriptions={subscriptions} />
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <MonthlySpendingChart />
              <CategoryBreakdown />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <RecentSubscriptions subscriptions={subscriptions} />
               <Card>
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-bold tracking-tight mb-1">Upcoming Renewals</h3>
                      <p className="text-sm text-text-secondary font-medium">Next 7 days</p>
                    </div>
                    <Badge variant="accent">3 Pending</Badge>
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-center gap-4 p-4 bg-accent/5 rounded-2xl border border-accent/10">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                          <AlertCircle size={20} className="text-accent" />
                        </div>
                        <div className="flex-1">
                           <p className="text-sm font-bold">Vercel Pro</p>
                           <p className="text-xs text-text-secondary font-medium">Tomorrow, June 1st</p>
                        </div>
                        <div className="text-right">
                           <p className="text-sm font-bold">$20.00</p>
                           <Button variant="ghost" size="sm" className="text-[10px] px-2 py-0.5 h-auto text-accent uppercase font-black">Mark Paid</Button>
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-4 p-4 hover:bg-text-primary/5 rounded-2xl transition-all group">
                        <div className="w-10 h-10 rounded-xl bg-text-primary/5 flex items-center justify-center">
                          <CheckCircle size={20} className="text-text-secondary/50 group-hover:text-accent transition-colors" />
                        </div>
                        <div className="flex-1">
                           <p className="text-sm font-bold">Linear Plus</p>
                           <p className="text-xs text-text-secondary font-medium">In 12 days, June 12</p>
                        </div>
                        <div className="text-right font-bold text-sm">$15.00</div>
                     </div>
                  </div>
               </Card>
            </div>
          </div>
        );

      case 'wallet':
        return <WalletView />;
      
      case 'cards':
        return <CardsView />;

      case 'payments':
        return <PaymentsView />;

      case 'transactions':
        return <TransactionsView />;

      case 'subscriptions':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div>
                  <h1 className="text-4xl font-black tracking-tight mb-2">My Subscriptions</h1>
                  <p className="text-text-secondary font-medium">Manage and track all your active services.</p>
               </div>
               <div className="flex items-center gap-3">
                  <div className="bg-text-primary/5 p-1 rounded-xl border border-border flex">
                     <button className="p-2 bg-accent text-black rounded-lg shadow-sm">
                        <ListIcon size={18} />
                     </button>
                     <button className="p-2 text-text-secondary hover:text-text-primary rounded-lg">
                        <LayoutGrid size={18} />
                     </button>
                  </div>
               </div>
            </header>

            <Card className="p-2 overflow-hidden border-none shadow-none bg-transparent">
               <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1 max-w-md">
                     <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/50" />
                     <Input placeholder="Filter by name, category or tag..." className="pl-12 bg-text-primary/5 border-border" />
                  </div>
                  <Button variant="outline" size="md">Filter</Button>
               </div>
               <div className="space-y-1">
                  {subscriptions.map(sub => (
                    <SubscriptionRow key={sub.id} sub={sub} />
                  ))}
               </div>
            </Card>
          </div>
        );

      case 'analytics':
        return <AnalyticsView />;

      case 'calendar':
        return <CalendarView subscriptions={subscriptions} />;

      case 'business':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div>
                  <h1 className="text-4xl font-black tracking-tight mb-2">Business Mode</h1>
                  <p className="text-text-secondary font-medium">Subscriptions grouped by projects and clients.</p>
               </div>
               <Button variant="primary" className="gap-2">
                 <Briefcase size={18} /> New Project
               </Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {['Portfolio', 'Subora App', 'Internal Tools'].map((project) => (
                  <Card key={project} className="group hover:border-accent/30 transition-all">
                     <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                           <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                              <Layers size={24} className="text-accent" />
                           </div>
                           <h3 className="text-lg font-bold">{project}</h3>
                        </div>
                        <Badge variant="accent">$45.00/mo</Badge>
                     </div>
                     <div className="space-y-3 mb-6">
                        {subscriptions.filter(s => s.project_tag === project).map(sub => (
                           <div key={sub.id} className="flex items-center justify-between text-sm">
                              <span className="text-text-secondary">{sub.name}</span>
                              <span className="font-bold">${sub.price}</span>
                           </div>
                        ))}
                        {subscriptions.filter(s => s.project_tag === project).length === 0 && (
                          <p className="text-xs text-text-secondary italic">No subscriptions tagged yet.</p>
                        )}
                     </div>
                     <Button variant="outline" className="w-full text-xs font-bold py-2">Manage Project</Button>
                  </Card>
               ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
             <div className="p-6 bg-text-primary/5 rounded-full border border-border">
                <AlertCircle size={48} className="text-accent/50" />
             </div>
             <div>
                <h3 className="text-2xl font-bold">Work in Progress</h3>
                <p className="text-text-secondary">The {activePage} page is under construction.</p>
             </div>
             <Button onClick={() => setActivePage('dashboard')}>Back to Dashboard</Button>
          </div>
        );
    }
  };

  if (!isLoggedIn) {
     return (
       <div className="min-h-screen bg-background flex items-center justify-center p-6">
         <Card className="max-w-md w-full p-10 bg-secondary-background border-border">
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center shadow-[0_0_20px_rgba(0,255,153,0.4)]">
                <TrendingUp size={28} className="text-black stroke-[2.5]" />
              </div>
              <span className="text-3xl font-black tracking-tight italic text-text-primary">Subora</span>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-center text-text-primary">Welcome back</h2>
                <p className="text-text-secondary text-center text-sm">Enter your details to sign in</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-secondary ml-1">Email Address</label>
                  <Input type="email" placeholder="name@company.com" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-secondary ml-1">Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <Button className="w-full h-12 font-bold text-lg" onClick={() => setIsLoggedIn(true)}>Sign In</Button>
              </div>
              <div className="relative flex items-center justify-center">
                 <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
                 <span className="relative bg-secondary-background px-4 text-xs font-bold text-text-secondary uppercase">Or continue with</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="gap-2">Google</Button>
                <Button variant="outline" className="gap-2">GitHub</Button>
              </div>
              <p className="text-center text-sm text-text-secondary font-medium">
                 Don't have an account? <span className="text-accent font-bold cursor-pointer hover:underline">Sign up</span>
              </p>
            </div>
         </Card>
       </div>
     );
  }

  return (
    <Layout activePage={activePage} setActivePage={setActivePage} user={{ email: 'alex@example.com' }}>
      {renderContent()}
    </Layout>
  );
}

function Search({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
