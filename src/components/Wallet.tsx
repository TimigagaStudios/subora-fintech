import React from "react";
import { Card, Button, Badge } from "./ui";
import {
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Smartphone,
  Zap,
  Gift,
  RefreshCcw,
} from "lucide-react";
import { motion } from "framer-motion";
import CardWheel from "./cards/CardWheel";
import { WALLET_CARDS } from "../lib/walletCards";

export const WalletView = () => {
  const quickActions = [
    { label: "Pay", icon: ArrowUpRight, color: "bg-emerald-500" },
    { label: "Transfer", icon: RefreshCcw, color: "bg-blue-500" },
    { label: "Airtime", icon: Smartphone, color: "bg-orange-500" },
    { label: "Bills", icon: Zap, color: "bg-purple-500" },
    { label: "Gift Card", icon: Gift, color: "bg-pink-500" },
  ];

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">My Wallet</h1>
          <p className="text-text-secondary font-medium">
            Manage your virtual cards and digital assets.
          </p>
        </div>
        <Button variant="primary" className="gap-2">
          <Plus size={18} /> Add New Card
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          {/* CARD WHEEL */}
          <div className="relative">
            <CardWheel cards={WALLET_CARDS} />
          </div>

          {/* QUICK ACTIONS */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {quickActions.map((action) => (
              <motion.button
                key={action.label}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-3 p-4 bg-secondary-background border border-border rounded-2xl group transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center text-white shadow-lg`}
                >
                  <action.icon size={24} />
                </div>
                <span className="text-sm font-bold text-text-primary">
                  {action.label}
                </span>
              </motion.button>
            ))}
          </div>

          {/* ACTIVITIES */}
          <Card>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">Wallet Activities</h3>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {[
                {
                  name: "Apple Music Subscription",
                  date: "Today, 10:24 AM",
                  amount: -14.99,
                  icon: CreditCard,
                  category: "Subscription",
                },
                {
                  name: "Incoming Transfer (David)",
                  date: "Yesterday, 04:15 PM",
                  amount: 450.0,
                  icon: ArrowDownLeft,
                  category: "Transfer",
                },
                {
                  name: "Netflix Monthly",
                  date: "May 28, 2024",
                  amount: -19.99,
                  icon: CreditCard,
                  category: "Subscription",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 hover:bg-text-primary/5 rounded-2xl transition-all"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      item.amount > 0
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-text-primary/5 text-text-primary"
                    }`}
                  >
                    <item.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">{item.name}</p>
                    <p className="text-xs text-text-secondary">
                      {item.date} • {item.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold ${
                        item.amount > 0 ? "text-emerald-500" : "text-text-primary"
                      }`}
                    >
                      {item.amount > 0 ? "+" : ""}
                      {item.amount.toFixed(2)}
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
              <h3 className="text-lg font-black uppercase tracking-tight">
                Refer & Earn
              </h3>
              <Gift size={24} />
            </div>
            <p className="text-sm font-medium mb-6 opacity-80">
              Invite your friends to Subora and get $10 for every successful sign
              up.
            </p>
            <Button
              variant="secondary"
              className="w-full bg-black text-white border-none hover:bg-black/80"
            >
              Get Invite Link
            </Button>
          </Card>

          <Card>
            <h3 className="text-lg font-bold mb-6">Linked Accounts</h3>
            <div className="space-y-4">
              {[
                { name: "Chase Bank", type: "Checking •••• 1290", status: "Connected" },
                { name: "PayPal", type: "alex.c@email.com", status: "Connected" },
              ].map((acc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl border border-border"
                >
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
              <Button variant="outline" className="w-full text-sm">
                Link New Account
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};