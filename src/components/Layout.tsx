import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  PieChart,
  Calendar,
  Settings,
  LogOut,
  CreditCard,
  Briefcase,
  Menu,
  X,
  TrendingUp,
  Search,
  User,
  Bell,
  Wallet,
  History,
  Zap,
  Moon,
  Sun,
} from "lucide-react";
import { cn } from "./ui";

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

const NavItem = ({ icon: Icon, label, isActive, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 group relative",
      isActive
        ? "bg-accent/10 text-accent font-medium shadow-[0_0_20px_rgba(0,255,153,0.1)] border border-accent/20"
        : "text-text-secondary hover:text-text-primary hover:bg-text-primary/5"
    )}
  >
    <Icon
      size={20}
      className={cn(
        isActive ? "text-accent" : "text-text-secondary group-hover:text-text-primary"
      )}
    />
    <span>{label}</span>
    {isActive && <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-accent" />}
  </button>
);

export const Layout = ({
  children,
  activePage,
  setActivePage,
  user,
  onLogout,
}: {
  children: React.ReactNode;
  activePage: string;
  setActivePage: (page: string) => void;
  user: any;
  onLogout?: () => void;
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Your project uses `.light` class (not Tailwind dark)
    if (isDarkMode) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [isDarkMode]);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "cards", label: "Virtual Cards", icon: CreditCard },
    { id: "payments", label: "Payments", icon: Zap },
    { id: "transactions", label: "History", icon: History },
    { id: "analytics", label: "Analytics", icon: PieChart },
    { id: "subscriptions", label: "Manage Subs", icon: CreditCard },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "business", label: "Business Mode", icon: Briefcase },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-background text-text-primary overflow-hidden selection:bg-accent/30">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 border-r border-border bg-secondary-background/30 backdrop-blur-xl p-6 relative">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-[0_0_20px_rgba(0,255,153,0.4)]">
            <TrendingUp size={24} className="text-black stroke-[2.5]" />
          </div>
          <span className="text-2xl font-black tracking-tight text-text-primary italic">
            Subora
          </span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activePage === item.id}
              onClick={() => setActivePage(item.id)}
            />
          ))}
        </nav>

        <div className="mt-auto space-y-4 pt-6">
          <div className="bg-accent/5 rounded-2xl p-4 border border-accent/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                Pro Plan
              </span>
              <TrendingUp size={14} className="text-accent" />
            </div>
            <p className="text-xs text-text-secondary mb-3 leading-relaxed font-medium">
              Unlock premium virtual cards and 5% cashback.
            </p>
            <button className="w-full py-2 bg-accent text-black text-xs font-bold rounded-lg hover:opacity-90 transition-all shadow-lg shadow-accent/20">
              Upgrade Now
            </button>
          </div>

          <div
            className="flex items-center gap-3 px-2 pt-4 border-t border-border group cursor-pointer"
            onClick={() => onLogout?.()}
            role="button"
          >
            <div className="w-10 h-10 rounded-full bg-text-primary/5 border border-border flex items-center justify-center overflow-hidden">
              <User size={20} className="text-text-secondary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-text-primary truncate">
                {user?.email || "alex@example.com"}
              </p>
              <p className="text-[10px] font-bold text-accent truncate uppercase tracking-tighter">
                Premium User
              </p>
            </div>
            <LogOut
              size={16}
              className="text-text-secondary group-hover:text-red-400 transition-colors"
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
        {/* Header */}
        <header className="sticky top-0 z-20 h-20 bg-background/80 backdrop-blur-md border-b border-border px-6 md:px-10 flex items-center justify-between">
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-text-secondary hover:text-text-primary"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <span className="text-xl font-black tracking-tight text-text-primary italic">
              Subora
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/50"
              />
              <input
                type="text"
                placeholder="Search transactions, cards or bills..."
                className="w-full bg-text-primary/5 border border-border rounded-2xl pl-12 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/30 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/30 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-xl bg-text-primary/5 border border-border text-text-secondary hover:text-text-primary transition-all"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="p-2.5 rounded-xl bg-text-primary/5 border border-border text-text-secondary hover:text-text-primary transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-accent border-2 border-background"></span>
            </button>
            <div className="hidden sm:flex items-center gap-3 ml-2">
              <button
                onClick={() => setActivePage("wallet")}
                className="flex items-center gap-2 bg-accent text-black px-5 py-2.5 rounded-2xl font-black text-sm hover:opacity-90 transition-all shadow-lg shadow-accent/20"
              >
                <Wallet size={18} className="stroke-[2.5]" />
                <span>My Wallet</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 md:p-10 max-w-[1600px] mx-auto">{children}</div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-12">
              <span className="text-2xl font-black italic">Subora</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-text-primary"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 space-y-2 overflow-y-auto">
              {navItems.map((item) => (
                <NavItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  isActive={activePage === item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                />
              ))}
            </nav>
            <div className="pb-6 border-t border-border pt-6 mt-4">
              <button
                onClick={() => onLogout?.()}
                className="flex items-center gap-3 w-full px-4 py-3 text-red-400 font-bold"
              >
                <LogOut size={20} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};