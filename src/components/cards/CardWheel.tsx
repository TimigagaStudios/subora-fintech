import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { WalletCard } from "../../lib/walletCards";
import FintechCard from "./FintechCard";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function CardWheel({
  cards,
  initialIndex = 0,
  onChange,
}: {
  cards: WalletCard[];
  initialIndex?: number;
  onChange?: (activeIndex: number) => void;
}) {
  const [active, setActive] = React.useState(initialIndex);

  React.useEffect(() => {
    onChange?.(active);
  }, [active, onChange]);

  const prev = () => setActive((i) => clamp(i - 1, 0, cards.length - 1));
  const next = () => setActive((i) => clamp(i + 1, 0, cards.length - 1));

  const visible = cards
    .map((card, i) => ({ card, i, rel: i - active }))
    .filter((x) => Math.abs(x.rel) <= 3);

  return (
    <div className="relative w-full">
      <div className="relative mx-auto h-[290px] w-full max-w-[520px]">
        {/* Wheel “halo” like your reference */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-text-primary/5 blur-2xl" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-2xl" />

        <AnimatePresence initial={false}>
          {visible
            .sort((a, b) => Math.abs(b.rel) - Math.abs(a.rel)) // back cards first
            .map(({ card, i, rel }) => {
              const depth = Math.abs(rel);

              // these create the "stacked wheel" effect
              const x = rel * 28;
              const y = depth * 18;
              const rotate = rel * -12;
              const scale = 1 - depth * 0.06;
              const opacity = 1 - depth * 0.22;

              return (
                <motion.div
                  key={card.id}
                  className="absolute left-1/2 top-1/2 w-[min(420px,86vw)]"
                  style={{ zIndex: 50 - depth }}
                  initial={{ opacity: 0, scale: 0.95, x: 0, y: 40 }}
                  animate={{
                    x: `calc(-50% + ${x}px)`,
                    y: `calc(-50% + ${y}px)`,
                    rotate,
                    scale,
                    opacity,
                    filter: depth >= 2 ? "blur(0.6px)" : "blur(0px)",
                  }}
                  exit={{ opacity: 0, scale: 0.95, y: 60 }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  drag={i === active ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(_, info) => {
                    const swipe = info.offset.x;
                    if (swipe > 60) prev();
                    if (swipe < -60) next();
                  }}
                  onClick={() => setActive(i)}
                >
                  <FintechCard card={card} />
                  <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl shadow-[0_22px_70px_rgba(0,0,0,0.35)]" />
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>

      {/* dots */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to card ${i + 1}`}
            className={[
              "h-2 rounded-full transition-all",
              i === active ? "w-7 bg-accent" : "w-2 bg-text-primary/15",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}