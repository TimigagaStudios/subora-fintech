import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { WalletCard } from "../../lib/walletCards";
import FintechCard from "./FintechCard";

function wrapIndex(i: number, len: number) {
  return ((i % len) + len) % len;
}

// forward relative position (0 = active, 1 = next, 2 = next-next)
function forwardRel(i: number, active: number, len: number) {
  return (i - active + len) % len;
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

  // show only active + next 2 (this matches the reference stack)
  const visible = cards
    .map((card, i) => ({ card, i, rel: forwardRel(i, active, len) }))
    .filter((x) => x.rel <= 2)
    .sort((a, b) => b.rel - a.rel); // draw farthest first

  // style presets per stack depth (tuned for the reference look)
  const styleFor = (rel: number) => {
    if (rel === 0) {
      return { x: 0, y: 34, r: 0, s: 1, o: 1, blur: 0 };
    }
    if (rel === 1) {
      return { x: 66, y: -18, r: 16, s: 0.92, o: 0.44, blur: 12 };
    }
    // rel === 2
    return { x: 104, y: -52, r: 26, s: 0.86, o: 0.32, blur: 16 };
  };

  return (
    <div className="relative w-full">
      <div className="relative mx-auto h-[320px] w-full max-w-[520px]">
        {/* no heavy background plate (clean) */}
        <div className="pointer-events-none absolute inset-0" />

        {visible.map(({ card, i, rel }) => {
          const isActive = rel === 0;
          const st = styleFor(rel);

          return (
            <motion.div
              key={card.id}
              className="absolute left-1/2 top-1/2 w-[min(380px,88vw)]"
              style={{
                zIndex: 50 - rel,
                willChange: "transform, opacity, filter",
                touchAction: "pan-y",
                backfaceVisibility: "hidden",
              }}
              initial={false}
              animate={{
                x: `calc(-50% + ${st.x}px)`,
                y: `calc(-50% + ${st.y}px)`,
                rotate: st.r,
                scale: st.s,
                opacity: st.o,
                filter: st.blur ? `blur(${st.blur}px)` : "none",
              }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 200, damping: 25 }
              }
              drag={isActive && len > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                const swipe = info.offset.x;
                const vel = info.velocity.x;

                // “skip” to next card like the reference
                if (swipe < -70 || vel < -800) next();
                if (swipe > 70 || vel > 800) prev();
              }}
              onClick={() => setActive(i)}
            >
              {/* Keep active card sharp even if container has blur */}
              <div style={{ filter: "none" }}>
                <FintechCard card={card} />
              </div>

              {/* soft minimal shadow (not heavy) */}
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl shadow-[0_10px_24px_rgba(0,0,0,0.18)] light:shadow-[0_10px_24px_rgba(0,0,0,0.10)]" />
            </motion.div>
          );
        })}
      </div>

      {/* dots */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {cards.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={[
              "h-2 rounded-full transition-all",
              idx === active ? "w-7 bg-accent" : "w-2 bg-text-primary/15",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}