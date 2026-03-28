import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

const destinations = [
  {
    id: 0,
    url: "https://images.unsplash.com/photo-1617824077360-7a77db40aae1?w=700&auto=format&fit=crop&q=80",
    label: "Leh Ladakh",
    subtitle: "Land of High Passes",
    description:
      "A high-altitude desert nestled in the Himalayas, famous for its monasteries, rugged terrain, and surreal landscapes. Experience the thrill of Khardung La, the world's highest motorable road, and the otherworldly Pangong Lake.",
    tag: "Adventure",
    tagColor: "#6366f1",
    cardBg: "from-indigo-500 to-violet-700",
  },
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1754737524646-d5159e91cbe7?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZGFyamVlbGluZyUyMHRveSUyMHRyYWlufGVufDB8fDB8fHww",
    label: "Darjeeling Toy Train",
    subtitle: "The Hill Queen's Railway",
    description:
      "The iconic UNESCO World Heritage Darjeeling Himalayan Railway weaves through emerald tea gardens and colonial-era hill stations. Board the charming steam locomotive for a nostalgic journey through misty mountains and cloud-kissed valleys.",
    tag: "Heritage",
    tagColor: "#f59e0b",
    cardBg: "from-amber-400 to-orange-600",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1665413793441-13aedeb062d3?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHZhcmFuYXNpJTIwZ2hhdHxlbnwwfHwwfHx8MA%3D%3D",
    label: "Varanasi Ganga View",
    subtitle: "The Eternal City",
    description:
      "One of the world's oldest living cities, Varanasi sits on the sacred banks of the Ganges. Witness the mesmerizing Ganga Aarti at Dashashwamedh Ghat, sunrise boat rides across ancient ghats, and the timeless spiritual rhythm of this holy city.",
    tag: "Spiritual",
    tagColor: "#ef4444",
    cardBg: "from-rose-400 to-red-600",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1628265512314-a9464859fe0c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a3V0Y2h8ZW58MHx8MHx8fDA%3D",
    label: "Rann of Kutch",
    subtitle: "The Great White Desert",
    description:
      "A breathtaking expanse of salt marshland that dazzles under a full moon, the Rann of Kutch transforms into a shimmering white paradise. Experience the vibrant Rann Utsav festival, Kutchi handicrafts, and a horizon that stretches endlessly into the sky.",
    tag: "Nature",
    tagColor: "#10b981",
    cardBg: "from-teal-400 to-cyan-600",
  },
];

// How many back-cards are visually shown behind the front card
const VISIBLE_BACK = 3;

const StackedCardCarousel = () => {
  const [order, setOrder] = useState(destinations.map((_, i) => i)); // indices in stacking order (last = top)
  const [activeId, setActiveId] = useState(0); // which destination card is on top
  const [isAnimating, setIsAnimating] = useState(false);
  const [descKey, setDescKey] = useState(0); // used to re-trigger description fade
  const timerRef = useRef(null);

  const cycleTop = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setOrder((prev) => {
      const next = [...prev];
      const top = next.pop(); // remove top
      next.unshift(top); // push to bottom
      return next;
    });
    setActiveId((prev) => {
      const currentTopIndex = order[order.length - 1];
      // next top will be order[length-2] after rotation
      const nextTopId = destinations[order[order.length - 2]]?.id ?? 0;
      setDescKey((k) => k + 1);
      return nextTopId;
    });
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating, order]);

  // Re-resolve activeId whenever order changes
  useEffect(() => {
    const topIdx = order[order.length - 1];
    setActiveId(destinations[topIdx].id);
    setDescKey((k) => k + 1);
  }, [order]);

  // Auto cycle
  useEffect(() => {
    timerRef.current = setInterval(cycleTop, 3000);
    return () => clearInterval(timerRef.current);
  }, [cycleTop]);

  const handleCardClick = (stackPosition) => {
    if (isAnimating) return;
    clearInterval(timerRef.current);

    // If top card is tapped → just cycle forward (auto-advance)
    if (stackPosition === order.length - 1) {
      cycleTop();
      timerRef.current = setInterval(cycleTop, 3000);
      return;
    }

    // Bring clicked back-card to top by rotating order
    const stepsNeeded = order.length - 1 - stackPosition;
    let newOrder = [...order];
    for (let i = 0; i < stepsNeeded; i++) {
      const top = newOrder.pop();
      newOrder.unshift(top);
    }
    setIsAnimating(true);
    setOrder(newOrder);
    setTimeout(() => {
      setIsAnimating(false);
      timerRef.current = setInterval(cycleTop, 3000);
    }, 700);
  };

  const activeDestination = destinations[activeId];

  // Calculate per-card transform based on its position in stacking order
  const getCardStyle = (stackPos, totalCards) => {
    const fromTop = totalCards - 1 - stackPos; // 0 = top card, 1 = second, etc.

    if (fromTop === 0) {
      // Top card — fully visible, popped forward
      return {
        scale: 1,
        x: 0,
        y: 0,
        rotate: 0,
        zIndex: totalCards + 10,
        opacity: 1,
        boxShadow: "0 40px 80px -10px rgba(0,0,0,0.35)",
      };
    }

    const ratio = fromTop / VISIBLE_BACK;
    return {
      scale: 1 - fromTop * 0.055,
      x: fromTop * -14,
      y: fromTop * 18,
      rotate: fromTop * -4,
      zIndex: totalCards - fromTop,
      opacity: fromTop <= VISIBLE_BACK ? Math.max(0, 1 - ratio * 0.65) : 0,
      boxShadow: `0 ${20 - fromTop * 4}px ${50 - fromTop * 8}px -10px rgba(0,0,0,0.2)`,
    };
  };

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-16 sm:py-20 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
        className="text-center mb-12 sm:mb-16"
      >
        <span className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide">
          <MapPin className="w-3.5 h-3.5" /> Dream Destinations
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3">
          Explore Incredible India
        </h2>
        <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
          From snow-capped peaks to golden deserts — discover the places that take your breath away.
        </p>
      </motion.div>

      {/* Main Layout: Stack (left) + Description (right) */}
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
        {/* ── Stacked Card Carousel ── */}
        <div
          className="relative flex-shrink-0"
          style={{ width: "260px", height: "360px", perspective: "1200px" }}
        >
          {order.map((destIndex, stackPos) => {
            const dest = destinations[destIndex];
            const style = getCardStyle(stackPos, order.length);
            const isTop = stackPos === order.length - 1;

            return (
              <motion.div
                key={dest.id}
                animate={{
                  scale: style.scale,
                  x: style.x,
                  y: style.y,
                  rotate: style.rotate,
                  opacity: style.opacity,
                  boxShadow: style.boxShadow,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 28,
                  mass: 0.9,
                }}
                onClick={() => handleCardClick(stackPos)}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "260px",
                  height: "360px",
                  zIndex: style.zIndex,
                  cursor: isTop ? "default" : "pointer",
                  transformOrigin: "bottom center",
                  borderRadius: "24px",
                  overflow: "hidden",
                  willChange: "transform, opacity",
                }}
                whileHover={!isTop ? { scale: style.scale + 0.02, y: style.y - 4 } : {}}
              >
                {/* Card Image */}
                <img
                  src={dest.url}
                  alt={dest.label}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "24px",
                  }}
                  draggable={false}
                />

                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "24px",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)",
                  }}
                />

                {/* Tag badge */}
                {isTop && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      background: dest.tagColor,
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      padding: "4px 12px",
                      borderRadius: "999px",
                    }}
                  >
                    {dest.tag}
                  </motion.div>
                )}

                {/* Label at bottom */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "20px",
                    right: "20px",
                  }}
                >
                  <p
                    style={{
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: "18px",
                      lineHeight: 1.2,
                      letterSpacing: "-0.02em",
                      textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                    }}
                  >
                    {dest.label}
                  </p>
                  {isTop && (
                    <p
                      style={{
                        color: "rgba(255,255,255,0.75)",
                        fontSize: "12px",
                        marginTop: "3px",
                        fontWeight: 500,
                      }}
                    >
                      {dest.subtitle}
                    </p>
                  )}
                </div>

                {/* Glare highlight on top card */}
                {isTop && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "24px",
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </motion.div>
            );
          })}

          {/* Click hint dots below stack */}
          <div
            style={{
              position: "absolute",
              bottom: "-40px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            {destinations.map((dest) => (
              <motion.div
                key={dest.id}
                animate={{
                  width: activeId === dest.id ? "24px" : "8px",
                  background: activeId === dest.id ? dest.tagColor : "#cbd5e1",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{
                  height: "8px",
                  borderRadius: "999px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  const stackPos = order.findIndex((i) => i === dest.id);
                  handleCardClick(stackPos);
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Description Panel ── */}
        <div className="flex-1 max-w-sm lg:max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={descKey}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-5"
            >
              {/* Title */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {activeDestination.label}
                </h3>
                <p className="text-sm font-medium mt-1" style={{ color: activeDestination.tagColor }}>
                  {activeDestination.subtitle}
                </p>
              </div>

              {/* Divider */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "60px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  height: "3px",
                  borderRadius: "999px",
                  background: `linear-gradient(90deg, ${activeDestination.tagColor}, transparent)`,
                }}
              />

              {/* Description */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {activeDestination.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default StackedCardCarousel;
