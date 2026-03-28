import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  { id: 1, url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800", title: "Secret Cenote" },
  { id: 2, url: "https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&q=80&w=800", title: "Hidden Valley" },
  { id: 3, url: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&q=80&w=800", title: "Secluded Cove" },
  { id: 4, url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800", title: "Lost Cascade" },
  { id: 5, url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800", title: "Whispering Woods" },
  { id: 6, url: "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?auto=format&fit=crop&q=80&w=800", title: "Remote Falls" }
];

const Carousel3DSection = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  // Auto-slide feature
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(next, 4000);
      return () => clearInterval(timer);
    }
  }, [next, isHovered]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5; // Ranges from -0.5 to 0.5
    const y = (e.clientY - top) / height - 0.5; // Ranges from -0.5 to 0.5
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = offset.x;
    if (swipe < -50) {
      next();
    } else if (swipe > 50) {
      prev();
    }
  };

  const getStyles = (idx) => {
    let diff = (idx - activeIndex + images.length) % images.length;
    // Normalize diff to make it relative to the active index
    if (diff > Math.floor(images.length / 2)) {
      diff -= images.length;
    }

    // Interactive parallax tilt for the central focused item
    const mouseTiltX = diff === 0 && isHovered ? mousePos.y * -25 : 0;
    const mouseTiltY = diff === 0 && isHovered ? mousePos.x * 25 : 0;

    let x = 0, z = 0, rotateY = 0, opacity = 1, zIndex = 10, filter = 'blur(0px) brightness(100%)';

    if (diff === 0) {
      x = 0;
      z = 150;
      rotateY = 0; 
      opacity = 1;
      zIndex = 10;
      filter = 'blur(0px) brightness(100%)';
    } else if (diff === 1 || diff === -1) {
      x = diff * 220;
      z = 0;
      rotateY = diff * -40;
      opacity = 0.8;
      zIndex = 5;
      filter = 'blur(2px) brightness(60%)';
    } else if (diff === 2 || diff === -2) {
      x = diff * 340;
      z = -150;
      rotateY = diff * -55;
      opacity = 0.4;
      zIndex = 1;
      filter = 'blur(4px) brightness(30%)';
    } else {
      x = Math.sign(diff) * 400;
      z = -300;
      rotateY = Math.sign(diff) * -70;
      opacity = 0;
      zIndex = 0;
      filter = 'blur(8px) brightness(0%)';
    }

    // Apply swipe parallax offset mapping
    return { 
      x, 
      z, 
      rotateX: mouseTiltX,
      rotateY: rotateY + mouseTiltY, 
      opacity, 
      zIndex, 
      filter 
    };
  };

  return (
    <section className="w-full bg-gradient-to-b from-white to-indigo-50 py-16 overflow-hidden font-sans relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Carousel Container */}
        <div 
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-[400px] sm:h-[450px] flex items-center justify-center perspective-[1200px] z-10 select-none touch-pan-y"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <AnimatePresence>
            {images.map((img, idx) => {
              const style = getStyles(idx);
              let tempDiff = (idx - activeIndex + images.length) % images.length;
              if (tempDiff > Math.floor(images.length / 2)) tempDiff -= images.length;
              const isCenter = tempDiff === 0;
                
              return (
                <motion.div
                  key={img.id}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  initial={false}
                  animate={{
                    x: style.x,
                    z: style.z,
                    rotateX: style.rotateX,
                    rotateY: style.rotateY,
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                    filter: style.filter
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="absolute w-[240px] sm:w-[320px] aspect-[3/4] cursor-pointer rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10"
                  onClick={() => setActiveIndex(idx)}
                >
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    className="w-full h-full object-cover pointer-events-none" 
                  />
                  
                  {/* Glassmorphism gradient overlay for text */}
                  <div 
                    className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-12 pb-6 px-6 transition-opacity duration-300 pointer-events-none"
                    style={{ opacity: isCenter ? 1 : 0 }}
                  >
                    <h3 className="text-white text-xl sm:text-3xl font-bold tracking-wide drop-shadow-md">{img.title}</h3>
                  </div>

                  {/* Surface Reflection Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-30 pointer-events-none transition-opacity duration-300" />
                  
                  {/* Subtle edge highlight */}
                  <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none mix-blend-overlay" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
        {/* Navigation Indicators */}
        <div className="flex flex-col items-center mt-10 z-20">
          {/* Dots Indicator */}
          <div className="flex gap-3">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-500 rounded-full ${
                  idx === activeIndex 
                    ? "w-8 h-2 bg-indigo-600 shadow-md" 
                    : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel3DSection;
