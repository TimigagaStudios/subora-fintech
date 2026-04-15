import React from "react";
import { motion } from "framer-motion";
import type { WalletCard } from "../../lib/walletCards";

function formatMoney(amount: number) {
  return amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function CardBrand({ brand, tone }: { brand: WalletCard["brand"]; tone: WalletCard["tone"] }) {
  const text = tone === "light" ? "text-black/70" : "text-white/80";
  if (brand === "VISA") {
    return <span className={`font-black italic text-[10px] tracking-widest ${text}`}>VISA</span>;
  }
  return (
    <div className="flex items-center gap-1">
      <span className="h-3 w-3 rounded-full bg-[#FF4D4D]/90" />
      <span className="-ml-1 h-3 w-3 rounded-full bg-[#FFB800]/90 mix-blend-screen" />
    </div>
  );
}

function themeClass(theme: WalletCard["theme"]) {
  switch (theme) {
    case "obsidian":
      return "subora-card-obsidian";
    case "midnight":
      return "subora-card-midnight";
    case "jade":
      return "subora-card-jade";
    case "pearl":
      return "subora-card-pearl";
    default:
      return "subora-card-obsidian";
  }
}

export default function FintechCard({
  card,
  compact = false,
  showFullNumber = false,
  onToggleNumber,
}: {
  card: WalletCard;
  compact?: boolean;
  showFullNumber?: boolean;
  onToggleNumber?: () => void;
}) {
  const toneText = card.tone === "light" ? "text-black" : "text-white";
  const subText = card.tone === "light" ? "text-black/60" : "text-white/65";
  const muted = card.tone === "light" ? "text-black/45" : "text-white/45";

  const masked = `•••• •••• •••• ${card.last4}`;

  return (
    <motion.div
      whileHover={{ y: -4, rotateX: 4, rotateY: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={[
        "relative w-full aspect-[1.58/1] rounded-3xl overflow-hidden",
        "shadow-2xl cursor-pointer select-none",
        "border border-white/10",
        themeClass(card.theme),
      ].join(" ")}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-28 -bottom-28 h-72 w-72 rounded-full bg-[#00FF99]/10 blur-3xl" />

      {/* subtle line pattern (works for both tones) */}
      <svg
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        viewBox="0 0 400 250"
        fill="none"
      >
        <path
          d="M-10 40 C 90 10, 140 90, 240 60 C 320 35, 350 85, 420 55"
          stroke="currentColor"
          strokeWidth="2"
          className={card.tone === "light" ? "text-black/40" : "text-white/35"}
        />
        <path
          d="M-20 120 C 60 80, 120 170, 220 130 C 300 95, 340 165, 420 135"
          stroke="currentColor"
          strokeWidth="2"
          className={card.tone === "light" ? "text-black/25" : "text-white/25"}
        />
        <path
          d="M-30 200 C 70 165, 140 240, 230 210 C 310 185, 350 230, 420 205"
          stroke="currentColor"
          strokeWidth="2"
          className={card.tone === "light" ? "text-black/18" : "text-white/18"}
        />
      </svg>

      <div className={["relative h-full p-6", compact ? "p-5" : "p-6"].join(" ")}>
        <div className="flex items-start justify-between">
          <div>
            <p className={`text-[10px] font-black uppercase tracking-widest ${muted}`}>
              Total Balance
            </p>
            <h3 className={`mt-1 text-3xl font-black tracking-tight ${toneText}`}>
              ${formatMoney(card.balance)}
            </h3>
          </div>

          <div className="flex items-center justify-center rounded-xl px-3 py-2 bg-white/10 backdrop-blur-md border border-white/15">
            <CardBrand brand={card.brand} tone={card.tone} />
          </div>
        </div>

        <div className="absolute left-6 right-6 bottom-6">
          <div className="flex items-center justify-between gap-3">
            <p className={`text-lg font-black tracking-[0.2em] ${subText}`}>
              {showFullNumber ? `4532 8812 3456 ${card.last4}` : masked}
            </p>

            {onToggleNumber && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleNumber();
                }}
                className={card.tone === "light" ? "text-black/60 hover:text-black" : "text-white/60 hover:text-white"}
                aria-label="Toggle card number"
              >
                {/* keep icon outside to avoid importing extra here; caller can render icon if wanted */}
                <span className="text-xs font-bold">Show</span>
              </button>
            )}
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className={`text-[9px] font-black uppercase tracking-widest ${muted}`}>
                Card Holder
              </p>
              <p className={`text-sm font-black uppercase ${toneText}`}>
                {card.holder}
              </p>
            </div>
            <div className="text-right">
              <p className={`text-[9px] font-black uppercase tracking-widest ${muted}`}>
                Expires
              </p>
              <p className={`text-sm font-black ${toneText}`}>{card.exp}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}