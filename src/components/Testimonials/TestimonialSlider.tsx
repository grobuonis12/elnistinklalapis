"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useMediaQuery } from "react-responsive";

interface Testimonial {
  company: string;
  testimonial: string;
  person: string;
  title?: string;
  bgColor?: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isNarrow = useMediaQuery({ maxWidth: 1024 });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const nextTestimonial = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const increment = isMobile || isNarrow ? 1 : 3;
      return (prevIndex + increment) % testimonials.length;
    });
    setTimeout(() => setIsAnimating(false), 600);
  }, [isMobile, isNarrow, testimonials.length, isAnimating]);

  useEffect(() => {
    if (!isClient) return;
    
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextTestimonial, isClient]);

  if (!testimonials || testimonials.length === 0) {
    return <p className="text-black dark:text-white text-center">No testimonials available.</p>;
  }

  const getTestimonial = (index: number): Testimonial => {
    return testimonials[index] ?? {
      company: "Unknown",
      testimonial: "No testimonial available.",
      person: "Anonymous",
      title: "",
      bgColor: "#ffffff",
    };
  };

  // Server-side render with default values
  if (!isClient) {
    return (
      <div id="atsiliepimai" className="relative w-full max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex justify-center gap-6 relative">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={`${testimonial.company}-${index}`}
              className="relative mx-auto w-[310px] z-10"
            >
              <div
                className="p-4 md:p-6 rounded-lg border-2 border-black dark:border-white relative h-full"
                style={{
                  width: "310px",
                  minHeight: "240px",
                  backgroundColor: testimonial.bgColor || "#FFDE59",
                  color: "black",
                  boxShadow: "6px 6px 0px black, 0 10px 15px -3px rgba(0, 0, 0, 0.25), 0 4px 6px -4px rgba(0, 0, 0, 0.15)",
                }}
              >
                <h2 className="text-base md:text-lg font-bold uppercase mb-2 text-black dark:text-white">
                  {testimonial.company}
                </h2>
                <p className="text-sm italic leading-relaxed text-black dark:text-white">
                  "{testimonial.testimonial}"
                </p>
                <p className="mt-4 font-semibold text-sm md:text-base text-black dark:text-white">
                  {testimonial.person}
                </p>
                {testimonial.title && (
                  <p className="text-xs font-light text-black dark:text-white">
                    — {testimonial.title} —
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const visibleTestimonials = (isMobile || isNarrow)
    ? [getTestimonial(currentIndex)]
    : [
        getTestimonial(currentIndex),
        getTestimonial((currentIndex + 1) % testimonials.length),
        getTestimonial((currentIndex + 2) % testimonials.length),
      ];

  const totalBubbles = (isMobile || isNarrow)
    ? testimonials.length
    : Math.ceil(testimonials.length / 3);

  return (
    <div id="atsiliepimai" className="relative w-full max-w-6xl mx-auto px-4 md:px-6">
      <LayoutGroup>
        <div className={`flex justify-center ${(isMobile || isNarrow) ? '' : 'gap-6'} relative`}>
          <AnimatePresence mode="wait">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.company}-${currentIndex}-${index}`}
                layout
                initial={{ 
                  opacity: 0, 
                  x: 100,
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 1
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  x: -100,
                  transition: {
                    duration: 0.3
                  }
                }}
                className={`relative mx-auto ${(isMobile || isNarrow) ? 'w-full' : 'w-[310px]'} z-10`}
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d"
                }}
              >
                <motion.div
                  layout
                  className="p-4 md:p-6 rounded-lg border-2 border-black dark:border-white relative h-full"
                  style={{
                    width: (isMobile || isNarrow) ? "100%" : "310px",
                    minHeight: "240px",
                    height: "auto",
                    backgroundColor: testimonial.bgColor || "#FFDE59",
                    color: "black",
                    boxShadow: "6px 6px 0px black, 0 10px 15px -3px rgba(0, 0, 0, 0.25), 0 4px 6px -4px rgba(0, 0, 0, 0.15)",
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                    isolation: "isolate"
                  }}
                >
                  <motion.h2 
                    layout="position"
                    className="text-base md:text-lg font-bold uppercase mb-2 text-black dark:text-white"
                  >
                    {testimonial.company}
                  </motion.h2>
                  <motion.p 
                    layout="position"
                    className="text-sm italic leading-relaxed text-black dark:text-white"
                  >
                    "{testimonial.testimonial}"
                  </motion.p>
                  <motion.p 
                    layout="position"
                    className="mt-4 font-semibold text-sm md:text-base text-black dark:text-white"
                  >
                    {testimonial.person}
                  </motion.p>
                  {testimonial.title && (
                    <motion.p 
                      layout="position"
                      className="text-xs font-light text-black dark:text-white"
                    >
                      — {testimonial.title} —
                    </motion.p>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
  
        <div className="flex justify-center mt-4 space-x-3">
          {[...Array(totalBubbles)].map((_, index) => {
            const isActive = (isMobile || isNarrow)
              ? currentIndex === index
              : Math.floor(currentIndex / 3) === index;
            const activeTestimonial = getTestimonial(index * ((isMobile || isNarrow) ? 1 : 3));
            return (
              <motion.div
                key={index}
                layout
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: isActive ? 1.2 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
                className={`h-2 md:h-3 w-2 md:w-3 rounded-full cursor-pointer border-2 border-black dark:border-white hover:scale-110 transition-colors duration-300 ${
                  (isMobile || isNarrow) && isActive 
                    ? 'bg-[#FFDE59]' 
                    : isActive ? 'bg-black' : 'bg-white'
                }`}
                onClick={() => {
                  if (!isAnimating) {
                    setCurrentIndex((isMobile || isNarrow) ? index : index * 3);
                  }
                }}
              />
            );
          })}
        </div>
      </LayoutGroup>
    </div>
  );
}
