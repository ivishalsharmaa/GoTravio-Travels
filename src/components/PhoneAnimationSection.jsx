import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Search, MessageSquare, ShieldCheck, MapPin, Train } from 'lucide-react';

const destinations = [
  { img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800", title: "The Taj Mahal", sub: "Agra, India" },
  { img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800", title: "Pristine Beaches", sub: "Goa, India" },
  { img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800", title: "Pink City, Jaipur", sub: "POPULAR" }
];

const PhoneAnimationSection = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { title: "Enquiry", icon: <Search className="w-8 h-8 text-white" />, desc: "Finding best options" },
    { title: "Response", icon: <MessageSquare className="w-8 h-8 text-white" />, desc: "Expert replied" },
    { title: "Verified", icon: <ShieldCheck className="w-8 h-8 text-white" />, desc: "All checked" },
    { title: "Successful", icon: <CheckCircle className="w-8 h-8 text-white" />, desc: "Booking confirmed" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-center">
        {/* Phone Mockup on Left */}
        <div className="flex-shrink-0 w-[300px] h-[600px] bg-[#1a1c29] rounded-[3rem] p-3 shadow-2xl relative border-4 border-[#2d3047] flex items-center justify-center -ml-0 lg:-ml-10">
          {/* Top Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1c29] rounded-b-xl z-20"></div>
          
          <div className="w-full h-full bg-[#1e2133] rounded-[2.5rem] overflow-hidden relative flex flex-col">
            {/* Background Image inside Phone (matches user image tone) */}
            <div className="absolute inset-0">
              <img src="https://images.unsplash.com/photo-1506462945848-ac8ea6f609cc?auto=format&fit=crop&w=600" alt="bg" className="w-full h-full object-cover blur-sm opacity-60" />
            </div>

            <div className="relative z-10 flex flex-col justify-between h-full bg-black/30 w-full rounded-[2.5rem]">
              
              {/* Top Progress Bar inside Phone */}
              <div className="bg-white rounded-t-[2.5rem] pt-10 pb-4 px-6 flex justify-between items-center shadow-md relative">
                <div className="absolute left-10 right-10 top-14 h-1 bg-gray-200 z-0"></div>
                {['Book', 'Travel', 'Arrive'].map((lbl, s) => (
                  <div key={s} className="relative flex flex-col items-center z-10">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] z-10 font-bold transition-all duration-500
                      ${s <= step ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>
                      {s < step ? <CheckCircle className="w-4 h-4" /> : s + 1}
                    </div>
                    <span className="text-[10px] font-semibold text-gray-500 mt-2">{lbl}</span>
                  </div>
                ))}
              </div>

              {/* Central Animation */}
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -30 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative flex items-center justify-center mb-10 mt-6">
                      {/* Outer decorative rings */}
                      <div className="absolute w-32 h-32 rounded-full border border-white/30 bg-white/5 backdrop-blur-md" />
                      <div className="absolute w-28 h-28 rounded-full border border-white/10" />

                      {/* Inner circle with icon */}
                      <div className="relative z-10 w-20 h-20 rounded-full bg-black/40 backdrop-blur-lg border border-white/40 flex items-center justify-center shadow-2xl text-white">
                        {React.cloneElement(steps[step].icon, { className: "w-10 h-10 text-white" })}
                      </div>
                    </div>
                    <h3 className="text-3xl font-extrabold text-white mb-2 drop-shadow-md">{steps[step].title}</h3>
                    <p className="text-sm font-medium text-white/90">{steps[step].desc}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom ProgressBar like the image */}
              <div className="p-4 flex flex-col items-center w-full mb-6">
                 <div className="bg-[#2d3047]/80 backdrop-blur-md rounded-2xl p-4 w-[90%] mx-auto mt-auto border border-white/10">
                   <div className="flex justify-between text-[11px] font-semibold text-slate-300 mb-2">
                     <span>Response Progress</span>
                     <span>{((step + 1) / steps.length * 100).toFixed(0)}%</span>
                   </div>
                   <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${((step + 1) / steps.length * 100)}%` }}
                       className="h-full bg-white rounded-full transition-all duration-300"
                     />
                   </div>
                 </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Images */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
          {destinations.map((dest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
              className={`relative rounded-3xl overflow-hidden shadow-xl group cursor-pointer ${i === 2 ? 'sm:col-span-2 aspect-[21/9]' : 'aspect-square'} `}
            >
              <img src={dest.img} alt={dest.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 mb-1">
                  {dest.sub === "POPULAR" ? (
                    <span className="px-3 py-1 bg-indigo-500 text-white text-[10px] font-bold rounded-full">{dest.sub}</span>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4 text-gray-300" />
                      <span className="text-gray-300 text-sm font-medium">{dest.sub}</span>
                    </>
                  )}
                </div>
                <h3 className="text-white text-2xl font-bold">{dest.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default PhoneAnimationSection;
