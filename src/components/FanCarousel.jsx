import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const CARDS = [
  {
    id: 0,
    image: "https://images.unsplash.com/photo-1617824077360-7a77db40aae1?w=600&auto=format&fit=crop&q=80",
    tag: "Adventure",
    tagColor: "#6366f1",
    title: "Manali to Leh",
    subtitle: "The Ultimate Himalayan Road Trip",
    location: "Himachal Pradesh → Ladakh",
  },
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1550149550-33b46c745e03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlrZSUyMHRyaXB8ZW58MHx8MHx8fDA%3D",
    tag: "Scenic",
    tagColor: "#10b981",
    title: "Mumbai to Goa",
    subtitle: "Coastal Highway Drive",
    location: "Maharashtra → Goa",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1628265512314-a9464859fe0c?w=600&auto=format&fit=crop&q=80",
    tag: "Nature",
    tagColor: "#f59e0b",
    title: "Ahmedabad to Little Rann of Kutch",
    subtitle: "The Great White Salt Desert",
    location: "Gujarat, India",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1635845604348-893db8ebc170?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fG11bm5hcnxlbnwwfHwwfHx8MA%3D%3D",
    tag: "Backwaters",
    tagColor: "#06b6d4",
    title: "Munnar–Alleppey–Kochi",
    subtitle: "Kerala's Golden Triangle",
    location: "Kerala, India",
  },
  {
    id: 4,
    image: "https://plus.unsplash.com/premium_photo-1697730345611-4568df7852ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHVkYWlwdXJ8ZW58MHx8MHx8fDA%3D",
    tag: "Heritage",
    tagColor: "#ef4444",
    title: "Jaipur–Udaipur",
    subtitle: "Rajasthan Royal Circuit",
    location: "Rajasthan, India",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&auto=format&fit=crop&q=80",
    tag: "Coastal",
    tagColor: "#8b5cf6",
    title: "Coorg Highlands",
    subtitle: "Scotland of India",
    location: "Karnataka, India",
  },
  {
    id: 6,
    image: "/darjelling.png",
    tag: "Hill Station",
    tagColor: "#14b8a6",
    title: "Darjeeling",
    subtitle: "Queen of the Hills",
    location: "West Bengal, India",
  },
  {
    id: 7,
    image: "/goa.png",
    tag: "Beach",
    tagColor: "#f97316",
    title: "Goa Beaches",
    subtitle: "Sun, Sand & Sea",
    location: "Goa, India",
  },
];

const TOTAL = CARDS.length;
const CARD_WIDTH = 270;
const CARD_HEIGHT = 200;
const RADIUS = 370;
const AUTO_ROTATE_DURATION = 35; // seconds per full rotation

const FanCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(null);
  const rotationRef = useRef(0);
  const containerRef = useRef(null);
  const dragStartRef = useRef(null);
  const dragRotationRef = useRef(0);

  // Smooth animation loop
  useEffect(() => {
    const animate = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (!isPaused) {
        rotationRef.current -= (360 / (AUTO_ROTATE_DURATION * 1000)) * delta;
        setRotation(rotationRef.current);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPaused]);

  // Touch / Mouse drag to rotate
  const handlePointerDown = useCallback((e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    dragStartRef.current = clientX;
    dragRotationRef.current = rotationRef.current;
    setIsPaused(true);
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (dragStartRef.current === null) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const diff = clientX - dragStartRef.current;
    const newRotation = dragRotationRef.current + diff * 0.3;
    rotationRef.current = newRotation;
    setRotation(newRotation);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (dragStartRef.current === null) return;
    dragStartRef.current = null;
    // Resume after a short delay
    setTimeout(() => setIsPaused(false), 1500);
  }, []);

  return (
    <section
      className="w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #f8fafc 0%, #eff6ff 60%, #f0f9ff 100%)",
        padding: "50px 0 60px",
        marginTop: "32px",
        marginBottom: "8px",
        position: "relative",
        borderTop: "1px solid #e2e8f0",
      }}
    >
      {/* Ambient glow effects */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(59, 130, 246, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-8 px-4 relative z-10"
      >
        <span
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-3"
          style={{
            background: "linear-gradient(90deg, #eff6ff, #e0f2fe)",
            color: "#2563eb",
            border: "1px solid #bfdbfe",
          }}
        >
          <MapPin className="w-3.5 h-3.5" /> Top Destinations
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
          Popular Cab Routes
        </h2>
        <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto">
          Explore India's most-loved destinations with our premium cab service
        </p>
      </motion.div>

      {/* 3D Rotating Cylinder Stage */}
      <div
        ref={containerRef}
        className="relative mx-auto select-none"
        style={{
          width: "100%",
          height: "430px",
          perspective: "1100px",
          perspectiveOrigin: "50% 48%",
          cursor: "grab",
        }}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        {/* Cylinder container */}
        <div
          style={{
            position: "absolute",
            top: "42%",
            left: "50%",
            width: `${CARD_WIDTH}px`,
            height: `${CARD_HEIGHT}px`,
            transformStyle: "preserve-3d",
            transform: `translate(-50%, -50%) rotateX(-4deg) rotateY(${rotation}deg)`,
            transition: isPaused ? "none" : undefined,
          }}
        >
          {CARDS.map((card, idx) => {
            const angle = (360 / TOTAL) * idx;
            return (
              <div
                key={card.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: `${CARD_WIDTH}px`,
                  height: `${CARD_HEIGHT}px`,
                  borderRadius: "14px",
                  overflow: "hidden",
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                  WebkitBackfaceVisibility: "hidden",
                  backfaceVisibility: "hidden",
                  boxShadow:
                    "0 20px 50px -12px rgba(0, 0, 0, 0.25), 0 0 20px rgba(59, 130, 246, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.3)",
                }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  draggable={false}
                  loading="lazy"
                />

                {/* Dark gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Tag badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    background: card.tagColor,
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    textTransform: "uppercase",
                  }}
                >
                  {card.tag}
                </div>

                {/* Card info at bottom */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "12px",
                    right: "12px",
                  }}
                >
                  <p
                    style={{
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: "15px",
                      lineHeight: 1.3,
                      marginBottom: "4px",
                      textShadow: "0 2px 8px rgba(0,0,0,0.7)",
                    }}
                  >
                    {card.title}
                  </p>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "11px",
                      fontWeight: 500,
                      marginBottom: "5px",
                    }}
                  >
                    {card.subtitle}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <MapPin size={10} color="rgba(255,255,255,0.6)" />
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "10px" }}>
                      {card.location}
                    </span>
                  </div>
                </div>

                {/* Subtle glass glare */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)",
                    borderRadius: "14px",
                    pointerEvents: "none",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Floor shadow / ground effect */}
        <div
          style={{
            position: "absolute",
            bottom: "5px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%",
            maxWidth: "800px",
            height: "80px",
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </section>
  );
};

export default FanCarousel;
