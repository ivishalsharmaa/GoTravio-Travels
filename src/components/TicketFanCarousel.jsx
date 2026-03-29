import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Train, Plane, MapPin } from "lucide-react";

const ROUTES = [
  {
    id: 0,
    image: "https://images.unsplash.com/photo-1579991155578-358871385228?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFpcnBsYW5lJTIwdmlld3xlbnwwfHwwfHx8MA%3D%3D",
    tag: "Flight",
    tagColor: "#6366f1",
    tagIcon: "🚆",
    title: "Mumbai to Goa",
    subtitle: "Flight",
    duration: "1h 05m",
    location: "Mumbai -> Goa",
  },
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1583671032556-c79120a4831c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG11bWJhaSUyMHRyYWlufGVufDB8fDB8fHww",
    tag: "Train",
    tagColor: "#0ea5e9",
    tagIcon: "✈️",
    title: "Delhi to Mumbai",
    subtitle: "IndiGo / SpiceJet",
    duration: "16h 35m",
    location: "Delhi -> Mumbai",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1514250609276-c577268ef8fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYWlufGVufDB8fDB8fHww",
    tag: "Tatkal",
    tagColor: "#f59e0b",
    tagIcon: "⚡",
    title: "Himachal Escape",
    subtitle: "Shatabdi Express",
    duration: "12h 30m",
    location: "Himachal Escape",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=600&auto=format&fit=crop&q=80",
    tag: "Flight",
    tagColor: "#10b981",
    tagIcon: "✈️",
    title: "Chennai to Bangalore",
    subtitle: "Air India / IndiGo",
    duration: "55m",
    location: "Chennai MAA → Bangalore BLR",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1431620828042-54af7f3a9e28?q=80&w=864&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Train",
    tagColor: "#8b5cf6",
    tagIcon: "🚆",
    title: "Kolkata to Darjeeling",
    subtitle: "Darjeeling Himalayan Rly",
    duration: "8h 00m",
    location: "Kolkata → Darjeeling NJP",
  },
];

const TOTAL = ROUTES.length;

function getOffset(index, active, total) {
  let offset = index - active;
  if (offset > Math.floor(total / 2)) offset -= total;
  if (offset < -Math.floor(total / 2)) offset += total;
  return offset;
}

function getCardTransform(offset) {
  const abs = Math.abs(offset);
  const sign = offset < 0 ? -1 : offset > 0 ? 1 : 0;

  if (abs === 0) return { x: 0, y: 0, scale: 1, rotateY: 0, opacity: 1, zIndex: 50, blur: 0, boxShadow: "0 30px 60px rgba(0,0,0,0.25)" };
  if (abs === 1) return { x: sign * 205, y: 28, scale: 0.83, rotateY: sign * -28, opacity: 0.88, zIndex: 40, blur: 0, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" };
  if (abs === 2) return { x: sign * 385, y: 55, scale: 0.67, rotateY: sign * -44, opacity: 0.6, zIndex: 30, blur: 1, boxShadow: "0 6px 20px rgba(0,0,0,0.1)" };
  return { x: sign * 520, y: 75, scale: 0.5, rotateY: sign * -55, opacity: 0, zIndex: 10, blur: 4, boxShadow: "none" };
}

const TicketFanCarousel = () => {
  const [active, setActive] = useState(2);
  const dragStartX = useRef(null);
  const timerRef = useRef(null);

  const next = useCallback(() => setActive((p) => (p + 1) % TOTAL), []);
  const prev = useCallback(() => setActive((p) => (p - 1 + TOTAL) % TOTAL), []);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 3500);
  }, [next]);

  useEffect(() => {
    timerRef.current = setInterval(next, 3500);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const goTo = (idx) => { setActive(idx); resetTimer(); };

  const onDragStart = (e) => { dragStartX.current = e.touches ? e.touches[0].clientX : e.clientX; };
  const onDragEnd = (e) => {
    if (dragStartX.current === null) return;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStartX.current - endX;
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); resetTimer(); }
    dragStartX.current = null;
  };

  return (
    <section
      className="w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #f8fafc 0%, #eff6ff 60%, #f0f9ff 100%)",
        padding: "56px 0 48px",
        marginBottom: "8px",
        borderTop: "1px solid #e2e8f0",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10 px-4"
      >
        <span
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-3"
          style={{ background: "linear-gradient(90deg,#eff6ff,#e0f2fe)", color: "#2563eb", border: "1px solid #bfdbfe" }}
        >
          <Train className="w-3.5 h-3.5" /> Popular Routes
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
          Book Your Ticket Now
        </h2>
        <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto">
          Train & flight assistance for the most traveled routes across India
        </p>
      </motion.div>

      {/* 3D Fan Stage */}
      <div
        className="relative mx-auto select-none"
        style={{ width: "100%", height: "320px", perspective: "1200px" }}
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
        onTouchStart={onDragStart}
        onTouchEnd={onDragEnd}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "220px",
            height: "300px",
            transformStyle: "preserve-3d",
          }}
        >
          {ROUTES.map((route, idx) => {
            const offset = getOffset(idx, active, TOTAL);
            const t = getCardTransform(offset);
            const isCenter = offset === 0;

            return (
              <motion.div
                key={route.id}
                onClick={() => { if (!isCenter) goTo(idx); }}
                animate={{
                  x: t.x,
                  y: t.y,
                  scale: t.scale,
                  rotateY: t.rotateY,
                  opacity: t.opacity,
                  filter: `blur(${t.blur}px)`,
                  zIndex: t.zIndex,
                  boxShadow: t.boxShadow,
                }}
                transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.85 }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "220px",
                  height: "300px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  cursor: isCenter ? "default" : "pointer",
                  transformOrigin: "bottom center",
                  transformStyle: "preserve-3d",
                }}
                whileHover={!isCenter ? { scale: t.scale + 0.03 } : {}}
              >
                {/* Card image */}
                <img
                  src={route.image}
                  alt={route.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  draggable={false}
                />

                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)",
                  }}
                />

                {/* Tag badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    background: route.tagColor,
                    color: "#fff",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    padding: "3px 10px 3px 8px",
                    borderRadius: "999px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span>{route.tagIcon}</span> {route.tag}
                </div>

                {/* Duration badge */}
                {isCenter && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "rgba(255,255,255,0.18)",
                      backdropFilter: "blur(8px)",
                      color: "#fff",
                      fontSize: "10px",
                      fontWeight: 600,
                      padding: "3px 8px",
                      borderRadius: "999px",
                      border: "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    ⏱ {route.duration}
                  </motion.div>
                )}

                {/* Bottom info */}
                <div style={{ position: "absolute", bottom: "14px", left: "14px", right: "14px" }}>
                  <p style={{ color: "#fff", fontWeight: 800, fontSize: "13px", lineHeight: 1.3, marginBottom: "4px", textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}>
                    {route.title}
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "10px", fontWeight: 500, marginBottom: "5px" }}>
                    {route.subtitle}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <MapPin size={9} color="rgba(255,255,255,0.6)" />
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "9px" }}>{route.location}</span>
                  </div>
                </div>

                {/* Glare on center */}
                {isCenter && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
                      borderRadius: "20px",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dot navigation */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "16px" }}>
        {ROUTES.map((route, idx) => (
          <motion.button
            key={route.id}
            onClick={() => goTo(idx)}
            animate={{
              width: active === idx ? "24px" : "8px",
              background: active === idx ? route.tagColor : "#bfdbfe",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ height: "8px", borderRadius: "999px", border: "none", cursor: "pointer", padding: 0 }}
            aria-label={`Go to ${route.title}`}
          />
        ))}
      </div>
    </section>
  );
};

export default TicketFanCarousel;
