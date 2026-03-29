import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

// ── India travel destination cards ──────────────────────────────────────────
const SLIDES = [
  {
    id: 0,
    img: "https://images.unsplash.com/photo-1529316275402-0462fcc4abd6?q=80&w=871&auto=format&fit=crop",
    label: "Hotel Booking",
    sub: "LUXURY STAYS",
    color: "#f59e0b",
  },
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1518614768202-663a3a0ecf59?w=600&auto=format&fit=crop&q=60",
    label: "Cab Services",
    sub: "RIDE WITH EASE",
    color: "#6366f1",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1573068057232-fa17a193d54d?w=600&auto=format&fit=crop&q=60",
    label: "Tickets (Flight/Train)",
    sub: "SEAMLESS BOOKINGS",
    color: "#10b981",
  },
  {
    id: 3,
    img: "https://plus.unsplash.com/premium_photo-1661963073823-6fde89371f00?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8amFpcHVyJTIwcGFsYWNlfGVufDB8fDB8fHww",
    label: "Jaipur Palace",
    sub: "ROYAL HERITAGE",
    color: "#ef4444",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=700&auto=format&fit=crop&q=80",
    label: "Manali Valley",
    sub: "SNOWY ESCAPES",
    color: "#0ea5e9",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1673118857603-6ded0315bc4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG11bm5hciUyMHRlYSUyMHBsYW50YXRpb258ZW58MHx8MHx8fDA%3D",
    label: "Munnar Tea Gardens",
    sub: "LUSH GREEN HILLS",
    color: "#84cc16",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=700&auto=format&fit=crop&q=80",
    label: "Goa Beaches",
    sub: "TROPICAL PARADISE",
    color: "#f97316",
  },
];

const TOTAL = SLIDES.length;

// ── Arc geometry ─────────────────────────────────────────────────────────────
// Each card position is derived from its signed offset from the active card.
// Positive = right side, Negative = left side.
function getStyle(offset) {
  const abs = Math.abs(offset);
  const sign = offset < 0 ? -1 : offset > 0 ? 1 : 0;

  // center card
  if (abs === 0) {
    return {
      x: 0, y: 0,
      scaleX: 1, scaleY: 1,
      rotateY: 0,
      opacity: 1,
      zIndex: 60,
      brightness: 1,
    };
  }
  if (abs === 1) {
    return {
      x: sign * 215, y: 18,
      scaleX: 0.82, scaleY: 0.85,
      rotateY: sign * -28,
      opacity: 0.9,
      zIndex: 50,
      brightness: 0.75,
    };
  }
  if (abs === 2) {
    return {
      x: sign * 390, y: 42,
      scaleX: 0.62, scaleY: 0.66,
      rotateY: sign * -46,
      opacity: 0.75,
      zIndex: 40,
      brightness: 0.5,
    };
  }
  if (abs === 3) {
    return {
      x: sign * 530, y: 65,
      scaleX: 0.44, scaleY: 0.46,
      rotateY: sign * -58,
      opacity: 0.5,
      zIndex: 30,
      brightness: 0.35,
    };
  }
  // completely hidden
  return {
    x: sign * 650, y: 90,
    scaleX: 0.28, scaleY: 0.3,
    rotateY: sign * -70,
    opacity: 0,
    zIndex: 10,
    brightness: 0.2,
  };
}

function getOffset(index, active, total) {
  let d = index - active;
  if (d > Math.floor(total / 2)) d -= total;
  if (d < -Math.floor(total / 2)) d += total;
  return d;
}

// ── Component ─────────────────────────────────────────────────────────────────
const AboutCarousel = () => {
  const [active, setActive] = useState(3);
  const dragRef = useRef(null);
  const timerRef = useRef(null);

  const next = useCallback(() => setActive((p) => (p + 1) % TOTAL), []);
  const prev = useCallback(() => setActive((p) => (p - 1 + TOTAL) % TOTAL), []);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 3200);
  }, [next]);

  useEffect(() => {
    timerRef.current = setInterval(next, 3200);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const goTo = (idx) => { setActive(idx); resetTimer(); };

  const handleDragStart = (e) => {
    dragRef.current = e.touches ? e.touches[0].clientX : e.clientX;
  };
  const handleDragEnd = (e) => {
    if (dragRef.current === null) return;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragRef.current - endX;
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); resetTimer(); }
    dragRef.current = null;
  };

  return (
    <section
      className="w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #eff6ff 0%, #dbeafe 50%, #eff6ff 100%)",
        padding: "56px 0 52px",
        borderTop: "1px solid #e2e8f0",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10 px-4"
      >
        <span
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-3"
          style={{
            background: "linear-gradient(90deg, #eff6ff, #e0e7ff)",
            color: "#4f46e5",
            border: "1px solid #c7d2fe",
          }}
        >
          🌏 &nbsp;Destinations We've Covered
        </span>
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2"
          style={{ color: "#0f172a" }}
        >
          Explore India with GoTravio
        </h2>
        <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "480px", margin: "0 auto" }}>
          From Himalayan horizons to coastal shores — we've helped travelers discover the best of India
        </p>
      </motion.div>

      {/* Arc Stage */}
      <div
        className="relative mx-auto select-none"
        style={{ width: "100%", height: "320px", perspective: "1400px" }}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "260px",
            height: "280px",
            transformStyle: "preserve-3d",
          }}
        >
          {SLIDES.map((slide, idx) => {
            const offset = getOffset(idx, active, TOTAL);
            const s = getStyle(offset);
            const isCenter = offset === 0;

            return (
              <motion.div
                key={slide.id}
                onClick={() => { if (!isCenter) goTo(idx); }}
                animate={{
                  x: s.x,
                  y: s.y,
                  scaleX: s.scaleX,
                  scaleY: s.scaleY,
                  rotateY: s.rotateY,
                  opacity: s.opacity,
                  filter: `brightness(${s.brightness})`,
                  zIndex: s.zIndex,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.9 }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "260px",
                  height: "280px",
                  borderRadius: "18px",
                  overflow: "hidden",
                  cursor: isCenter ? "default" : "pointer",
                  transformOrigin: "center center",
                  transformStyle: "preserve-3d",
                  boxShadow: isCenter
                    ? `0 0 0 2px ${slide.color}55, 0 30px 60px rgba(0,0,0,0.7)`
                    : "0 10px 30px rgba(0,0,0,0.4)",
                }}
                whileHover={!isCenter ? { opacity: s.opacity + 0.12 } : {}}
              >
                {/* Image */}
                <img
                  src={slide.img}
                  alt={slide.label}
                  draggable={false}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />

                {/* Dark overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: isCenter
                      ? "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)"
                      : "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
                  }}
                />

                {/* Color accent line at top */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: slide.color,
                    opacity: isCenter ? 1 : 0.6,
                  }}
                />

                {/* Labels — only on center card */}
                {isCenter && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    style={{ position: "absolute", bottom: "18px", left: "16px", right: "16px" }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        background: slide.color,
                        color: "#fff",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        padding: "2px 8px",
                        borderRadius: "999px",
                        marginBottom: "6px",
                        textTransform: "uppercase",
                      }}
                    >
                      {slide.sub}
                    </span>
                    <p
                      style={{
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: "15px",
                        lineHeight: 1.3,
                        textShadow: "0 1px 8px rgba(0,0,0,0.7)",
                        margin: 0,
                      }}
                    >
                      {slide.label}
                    </p>
                  </motion.div>
                )}

                {/* Center card glare */}
                {isCenter && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dot nav */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          marginTop: "20px",
        }}
      >
        {SLIDES.map((slide, idx) => (
          <motion.button
            key={slide.id}
            onClick={() => goTo(idx)}
            animate={{
              width: active === idx ? "26px" : "8px",
              background: active === idx ? slide.color : "#cbd5e1",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              height: "8px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            aria-label={`Go to ${slide.label}`}
          />
        ))}
      </div>
    </section>
  );
};

export default AboutCarousel;
