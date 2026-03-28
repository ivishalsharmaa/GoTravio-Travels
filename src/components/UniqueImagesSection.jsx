import React from 'react';
import { motion } from 'framer-motion';

const UniqueImagesSection = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFuYWxpfGVufDB8fDB8fHww",
      alt: "Manali",
      label: "Manali",
      subtitle: "Land of High Passes"
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1691868602803-2051726efba8?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Laitlum",
      label: "Laitlum",
      subtitle: "The Hill Queen's Railway"
    },
    {
      url: "https://images.unsplash.com/photo-1646299588107-40fabeca07da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a292YWxhbXxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Kovalam Beach",
      label: "Kovalam Beach",
      subtitle: "The Eternal City"
    },
    {
      url: "https://plus.unsplash.com/premium_photo-1661943546908-7f84a497f5e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3BpdGklMjB2YWxsZXl8ZW58MHx8MHx8fDA%3D",
      alt: "Spiti Valley",
      label: "Spiti Valley",
      subtitle: "The Great White Desert"
    }
  ];

  return (
    <section className="w-full bg-white py-10 sm:py-20 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2, // Cascading staggered appearance
              }
            }
          }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {images.map((img, idx) => (
            <motion.div 
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 150, rotateX: 30, scale: 0.8 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0, 
                  scale: 1,
                  transition: { 
                    type: "spring", 
                    stiffness: 80, 
                    damping: 15 
                  }
                }
              }}
              className={`relative h-full ${idx % 2 === 0 ? 'mt-0 lg:-mt-12' : 'mt-8 lg:mt-12'}`}
            >
              {/* Continuous Floating Animation Wrapper */}
              <motion.div
                animate={{
                  y: [0, -15, 0], // Infinite precise rhythmic bobbing
                }}
                transition={{
                  duration: 4 + (idx % 2), // Offset animation timings manually so it feels organic
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.5 
                }}
                className="h-full"
              >
                {/* Interactive Card Hover Logic */}
                <motion.div 
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    rotateZ: idx % 2 === 0 ? 1 : -1, // Subtly rotates card outward
                    boxShadow: "0px 30px 40px -10px rgba(79, 70, 229, 0.4)"
                  }} 
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl transform transition-transform group h-full cursor-pointer bg-white"
                >
                  <div className="aspect-[3/4] w-full h-full">
                    <img 
                      src={img.url} 
                      alt={img.alt} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[800ms] ease-out"
                    />
                  </div>
                  
                  {/* Glowing text overlay that reveals completely seamlessly */}
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-indigo-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 border-2 border-indigo-400/50 border-opacity-0 group-hover:border-opacity-100 rounded-[2rem] sm:rounded-[2.5rem]">
                    <motion.span 
                      className="text-white font-extrabold tracking-widest text-sm sm:text-base translate-y-4 group-hover:translate-y-0 shadow-black"
                      style={{ transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)' }}
                    >
                      {img.label}
                    </motion.span>
                  </div>
                  
                  {/* Subtle glare reflection on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] sm:rounded-[2.5rem] transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UniqueImagesSection;
