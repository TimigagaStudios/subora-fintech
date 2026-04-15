"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DebitCard, type WalletCard } from "./DebitCard";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function CardWheel({ cards }: { cards: WalletCard[] }) {
  const [active, setActive] = React.useState(0);

  const prev = () => setActive((i) => clamp(i - 1, 0, cards.length - 1));
  const next = () => setActive((i) => clamp(i + 1, 0, cards.length - 1));

  const visible = cards
    .map((c, i) => ({ card: c, i, rel: i - active }))
    .filter((x) => Math.abs(x.rel) <= 3);

  return (
    <div className="relative w-full">
      <div className="relative mx-auto h-[260px] w-full max-w-[420px]">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/5 blur-2xl dark:bg-white/5" />

        <AnimatePresence initial={false}>
          {visible
            .sort((a, b) => Math.abs(b.rel) - Math.abs(a.rel))
            .map(({ card, i, rel }) => {
              const depth = Math.abs(rel);

              const x = rel * 26;
              const y = depth * 16;
              const rotate = rel * -10;
              const scale = 1 - depth * 0.06;
              const opacity = 1 - depth * 0.22;

              return (
                <motion.div
                  key={card.id}
                  className="absolute left-1/2 top-1/2"
                  style={{ zIndex: 50 - depth }}
                  initial={{ opacity: 0, scale: 0.95, x: 0, y: 30 }}
                  animate={{
                    x: `calc(-50% + ${x}px)`,
                    y: `calc(-50% + ${y}px)`,
                    rotate,
                    scale,
                    opacity,
                    filter: depth >= 2 ? "blur(0.4px)" : "blur(0px)",
                  }}
                  exit={{ opacity: 0, scale: 0.95, y: 40 }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  drag={i === active ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(_, info) => {
                    const swipe = info.offset.x;
                    if (swipe > 60) prev();
                    if (swipe < -60) next();
                  }}
                >
                  <DebitCard card={card} />
                  <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl shadow-[0_22px_70px_rgba(0,0,0,0.40)]" />
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={[
              "h-2 rounded-full transition-all",
              i === active ? "w-6 bg-[#00FF99]" : "w-2 bg-black/20 dark:bg-white/20",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}