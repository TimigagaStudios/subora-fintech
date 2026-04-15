import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { WalletCard } from "../../lib/walletCards";
import FintechCard from "./FintechCard";

function wrapIndex(i: number, len: number) {
  return ((i % len) + len) % len;
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
  const reduceMotion = useReducedMotion();
  const len = cards.length;

  const [active, setActive] = React.useState(() =>
    len ? wrapIndex(initialIndex, len) : 0
  );

  React.useEffect(() => {
    if (!len) return;
    onChange?.(active);
  }, [active, len, onChange]);

  const prev = () => setActive((i) => wrapIndex(i - 1, len));
  const next = () => setActive((i) => wrapIndex(i + 1, len));

  if (!len) return null;

  // render only active + 2 behind each side (performance)
  const radius = Math.min(2, Math.floor((len - 1) / 2));
  const items = Array.from({ length: radius * 2 + 1 }, (_, k) => k - radius).map(
    (rel) => {
      const idx = wrapIndex(active + rel, len);
      return { card: cards[idx], idx, rel };
    }
  );

  return (
    <div className="relative w-full">
      <div className="relative mx-auto h-[300px] w-full max-w-[520px]">
        {/* subtle backdrop */}
        <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-text-primary/[0.02]" />

        {items
          .slice()
          .sort((a, b) => Math.abs(b.rel) - Math.abs(a.rel)) // back cards first
          .map(({ card, idx, rel }) => {
            const depth = Math.abs(rel);
            const isActive = rel === 0;

            // wheel/arc positioning (fintech stacked wheel)
            const angle = rel * 0.52; // radians
            const x = Math.sin(angle) * 92;
            const y = depth * 22 + (1 - Math.cos(angle)) * 30;

            const rotate = rel * -12;
            const scale = 1 - depth * 0.07;
            const opacity = 1 - depth * 0.28;

            // required blur on cards behind (limit to keep it smooth)
            const blur =
              depth === 0 ? 0 : depth === 1 ? 10 : 14; // 10–18px range

            return (
              <motion.div
                key={`${card.id}-${idx}-${rel}`} // stable per position
                className="absolute left-1/2 top-1/2 w-[min(420px,86vw)]"
                style={{
                  zIndex: 50 - depth,
                  willChange: "transform, opacity, filter",
                  touchAction: "pan-y",
                  backfaceVisibility: "hidden",
                  filter: blur ? `blur(${blur}px)` : "none",
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
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 200, damping: 25 }
                }
                drag={isActive && len > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.14}
                dragMomentum={false}
                onDragEnd={(_, info) => {
                  const swipe = info.offset.x;
                  const vel = info.velocity.x;

                  if (swipe > 70 || vel > 700) prev();
                  if (swipe < -70 || vel < -700) next();
                }}
                onClick={() => setActive(idx)}
              >
                {/* active card stays sharp */}
                <div style={{ filter: "none" }}>
                  <FintechCard card={card} />
                </div>

                {/* clean, not heavy shadow */}
                <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl shadow-[0_12px_30px_rgba(0,0,0,0.16)]" />
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