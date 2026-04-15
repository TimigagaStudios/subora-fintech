import React from "react";
import { Card, Button } from "./ui";
import { Plus, Lock, Settings, Eye, EyeOff, TrendingUp, History, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import FintechCard from "./cards/FintechCard";
import type { WalletCard } from "../lib/walletCards";
import { WALLET_CARDS } from "../lib/walletCards";

const CreditCardDetailed = ({
  card,
  active,
}: {
  card: WalletCard;
  active: boolean;
}) => {
  const [showNumber, setShowNumber] = React.useState(false);

  return (
    <div className="p-6 rounded-3xl border border-border bg-secondary-background/50 backdrop-blur-xl relative overflow-hidden group hover:bg-secondary-background transition-all">
      <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="w-full md:w-80 flex-shrink-0">
          <motion.div whileHover={{ scale: 1.02 }}>
            <FintechCard
              card={card}
              compact
              showFullNumber={showNumber}
              onToggleNumber={() => setShowNumber((s) => !s)}
            />
          </motion.div>
        </div>

        <div className="flex-1 w-full space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black">${card.balance.toLocaleString()}</h3>
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
                <div className="h-full bg-accent" style={{ width: "32%" }} />
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
            <Button variant={active ? "primary" : "outline"} size="sm" className="gap-2">
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
  // Use your shared cards list (consistent identity everywhere)
  const cards = WALLET_CARDS;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Virtual Cards</h1>
          <p className="text-text-secondary font-medium">
            Manage your digital spending and set custom limits.
          </p>
        </div>
        <Button variant="primary" className="gap-2">
          <Plus size={18} /> Create New Card
        </Button>
      </header>

      <div className="space-y-6">
        {cards.map((card, idx) => (
          <CreditCardDetailed key={card.id} card={card} active={idx === 0} />
        ))}
      </div>

      <Card className="bg-secondary-background/30 border-dashed">
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-20 h-20 rounded-full bg-text-primary/5 flex items-center justify-center mb-6">
            <Plus size={40} className="text-text-secondary/50" />
          </div>
          <h3 className="text-xl font-bold mb-2">Request a Physical Card</h3>
          <p className="text-text-secondary max-w-sm mb-6">
            Get a sleek card delivered to your doorstep. Seamlessly integrated with your Subora wallet.
          </p>
          <Button variant="outline">Join Waitlist</Button>
        </div>
      </Card>
    </div>
  );
};