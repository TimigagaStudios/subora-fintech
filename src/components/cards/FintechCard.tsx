import React from "react";
import type { WalletCard } from "../../lib/walletCards";

function formatMoney(amount: number) {
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function themeClass(theme: WalletCard["theme"]) {
  switch (theme) {
    case "black":
      return "subora-card-black";
    case "graphite":
      return "subora-card-graphite";
    case "pearl":
      return "subora-card-pearl";
    default:
      return "subora-card-black";
  }
}

export default function FintechCard({ card }: { card: WalletCard }) {
  const isLight = card.tone === "light";

  return (
    <div
      className={[
        "relative w-full aspect-[1.58/1] rounded-3xl overflow-hidden",
        "border",
        isLight ? "border-black/10" : "border-white/10",
        themeClass(card.theme),
      ].join(" ")}
    >
      {/* very subtle pattern (no blur) */}
      <svg
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        viewBox="0 0 400 250"
        fill="none"
      >
        <path
          d="M-10 40 C 90 10, 140 90, 240 60 C 320 35, 350 85, 420 55"
          stroke="currentColor"
          strokeWidth="2"
          className={isLight ? "text-black/35" : "text-white/30"}
        />
        <path
          d="M-20 120 C 60 80, 120 170, 220 130 C 300 95, 340 165, 420 135"
          stroke="currentColor"
          strokeWidth="2"
          className={isLight ? "text-black/22" : "text-white/22"}
        />
      </svg>

      <div className="relative h-full p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className={isLight ? "text-black/45 text-[10px] font-black uppercase tracking-widest" : "text-white/45 text-[10px] font-black uppercase tracking-widest"}>
              Total Balance
            </p>
            <h3 className={isLight ? "mt-1 text-3xl font-black tracking-tight text-black" : "mt-1 text-3xl font-black tracking-tight text-white"}>
              ${formatMoney(card.balance)}
            </h3>
          </div>

          <div
            className={[
              "rounded-2xl px-3 py-2 text-[10px] font-black tracking-widest",
              isLight
                ? "bg-black/5 text-black/70 border border-black/10"
                : "bg-white/10 text-white/80 border border-white/15",
            ].join(" ")}
          >
            {card.brand}
          </div>
        </div>

        <div className="absolute left-6 right-6 bottom-6">
          <p
            className={[
              "text-lg font-black tracking-[0.22em]",
              isLight ? "text-black/55" : "text-white/60",
            ].join(" ")}
          >
            •••• •••• •••• {card.last4}
          </p>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className={isLight ? "text-[9px] font-black uppercase tracking-widest text-black/35" : "text-[9px] font-black uppercase tracking-widest text-white/35"}>
                Card Holder
              </p>
              <p className={isLight ? "text-sm font-black uppercase text-black" : "text-sm font-black uppercase text-white"}>
                {card.holder}
              </p>
            </div>
            <div className="text-right">
              <p className={isLight ? "text-[9px] font-black uppercase tracking-widest text-black/35" : "text-[9px] font-black uppercase tracking-widest text-white/35"}>
                Expires
              </p>
              <p className={isLight ? "text-sm font-black text-black" : "text-sm font-black text-white"}>
                {card.exp}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}