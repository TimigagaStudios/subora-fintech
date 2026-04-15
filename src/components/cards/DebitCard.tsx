"use client";
import React from "react";

export type WalletCard = {
  id: string;
  balance: number;
  currency: string;
  holder: string;
  bankName: string;
  last4: string;
  expMonth: string;
  expYear: string;
  brand?: "mastercard" | "visa";
};

function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `$${amount.toFixed(2)}`;
  }
}

function BrandMark({ brand }: { brand?: "mastercard" | "visa" }) {
  if (brand === "visa") {
    return (
      <div className="text-xs font-semibold tracking-widest text-white/80">
        VISA
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1">
      <span className="h-3 w-3 rounded-full bg-[#FF4D4D]/90" />
      <span className="-ml-1 h-3 w-3 rounded-full bg-[#FFB800]/90 mix-blend-screen" />
    </div>
  );
}

export function DebitCard({ card }: { card: WalletCard }) {
  return (
    <div
      className={[
        "relative w-[320px] max-w-[86vw] select-none overflow-hidden rounded-3xl",
        "bg-gradient-to-br from-[#0B0B0B] via-[#111111] to-[#1A1A1A]",
        "border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.55)]",
        "backdrop-blur-xl h-[210px]",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#00FF99]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 -bottom-10 h-44 w-44 rounded-full bg-white/5 blur-2xl" />

      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="text-[11px] uppercase tracking-widest text-white/60">
              Balance
            </div>
            <div className="text-2xl font-semibold text-white">
              {formatMoney(card.balance, card.currency)}
            </div>
          </div>
          <div className="pt-1">
            <BrandMark brand={card.brand} />
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm text-white/75">{card.bankName}</div>

          <div className="flex items-center gap-2 text-[13px] tracking-[0.2em] text-white/70">
            <span>5292</span>
            <span>••••</span>
            <span>••••</span>
            <span>{card.last4}</span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/45">
                Card Holder
              </div>
              <div className="text-sm font-medium text-white/85">
                {card.holder}
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] uppercase tracking-widest text-white/45">
                Exp
              </div>
              <div className="text-sm font-medium text-white/85">
                {card.expMonth}/{card.expYear}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}