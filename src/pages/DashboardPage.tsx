import React from "react";
import {
  ArrowUpRight,
  TrendingUp,
  Wallet,
  Zap,
  Plus,
  RefreshCcw,
  Smartphone,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  DashboardStats,
  RecentSubscriptions,
  MonthlySpendingChart,
  CategoryBreakdown,
} from "../components/Dashboard";
import { Badge, Button, Card } from "../components/ui";

export default function DashboardPage({ subscriptions }: { subscriptions: any[] }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Welcome back, Alex.
          </h1>
          <p className="text-text-secondary font-medium">
            Your financial health is{" "}
            <span className="text-accent font-bold">Excellent</span> this month.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:flex gap-2">
            <ArrowUpRight size={18} /> Quick Transfer
          </Button>
          <Button
            variant="primary"
            className="gap-2 shadow-accent/20 shadow-lg"
            onClick={() => navigate("/wallet")}
          >
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
                <p className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-2">
                  Total Balance
                </p>
                <h2 className="text-5xl font-black tracking-tight">$3,009.94</h2>
                <div className="flex items-center gap-2 mt-4">
                  <Badge variant="success" className="gap-1 flex items-center">
                    <TrendingUp size={12} /> +12.5%
                  </Badge>
                  <span className="text-xs text-text-secondary font-medium">
                    from last month
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
                <Button
                  variant="secondary"
                  className="gap-2 flex-1"
                  onClick={() => navigate("/payments")}
                >
                  <Zap size={18} /> Pay
                </Button>
                <Button variant="secondary" className="gap-2 flex-1">
                  <Plus size={18} /> Add
                </Button>
                <Button variant="secondary" className="gap-2 flex-1">
                  <RefreshCcw size={18} /> Transfer
                </Button>
                <Button
                  variant="secondary"
                  className="gap-2 flex-1"
                  onClick={() => navigate("/payments")}
                >
                  <Smartphone size={18} /> Top-up
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate("/cards")}
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
                <p className="text-[10px] font-bold uppercase opacity-60">
                  Alex Carter
                </p>
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
              <h3 className="text-xl font-bold tracking-tight mb-1">
                Upcoming Renewals
              </h3>
              <p className="text-sm text-text-secondary font-medium">
                Next 7 days
              </p>
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
                <p className="text-xs text-text-secondary font-medium">
                  Tomorrow, June 1st
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">$20.00</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[10px] px-2 py-0.5 h-auto text-accent uppercase font-black"
                >
                  Mark Paid
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 hover:bg-text-primary/5 rounded-2xl transition-all group">
              <div className="w-10 h-10 rounded-xl bg-text-primary/5 flex items-center justify-center">
                <CheckCircle
                  size={20}
                  className="text-text-secondary/50 group-hover:text-accent transition-colors"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold">Linear Plus</p>
                <p className="text-xs text-text-secondary font-medium">
                  In 12 days, June 12
                </p>
              </div>
              <div className="text-right font-bold text-sm">$15.00</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}