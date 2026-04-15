import React from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = React.useState(initialIndex);

  React.useEffect(() => {
    onChange?.(active);
  }, [active, onChange]);

  const prev = () => setActive((i) => clamp(i - 1, 0, cards.length - 1));
  const next = () => setActive((i) => clamp(i + 1, 0, cards.length - 1));

  // Only render a few cards around the active one (performance)
  const visible = cards
    .map((card, i) => ({ card, i, rel: i - active }))
    .filter((x) => Math.abs(x.rel) <= 2);

  return (
    <div className="relative w-full">
      <div className="relative mx-auto h-[300px] w-full max-w-[520px]">
        {/* clean subtle backdrop (NO blur) */}
        <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-text-primary/[0.03]" />

        {visible
          .sort((a, b) => Math.abs(b.rel) - Math.abs(a.rel)) // back first
          .map(({ card, i, rel }) => {
            const depth = Math.abs(rel);

            // wheel math (arc)
            const angle = rel * 0.42; // radians
            const x = Math.sin(angle) * 85; // horizontal curve
            const y = depth * 20 + (1 - Math.cos(angle)) * 28; // curve + stack depth
            const rotate = rel * -12; // fan rotation
            const scale = 1 - depth * 0.06;
            const opacity = 1 - depth * 0.22;

            const isActive = i === active;

            return (
              <motion.div
                key={card.id}
                className="absolute left-1/2 top-1/2 w-[min(420px,86vw)]"
                style={{
                  zIndex: 50 - depth,
                  willChange: "transform",
                  touchAction: "pan-y", // lets horizontal drag work on mobile
                }}
                initial={false}
                animate={{
                  x: `calc(-50% + ${x}px)`,
                  y: `calc(-50% + ${y}px)`,
                  rotate,
                  scale,
                  opacity,
                }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 260, damping: 26 }
                }
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  const swipe = info.offset.x;
                  if (swipe > 70) prev();
                  if (swipe < -70) next();
                }}
                onClick={() => setActive(i)}
              >
                <FintechCard card={card} />

                {/* very subtle shadow plate (minimal) */}
                <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl shadow-[0_14px_40px_rgba(0,0,0,0.18)] light:shadow-[0_14px_40px_rgba(0,0,0,0.10)]" />
              </motion.div>
            );
          })}
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