'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  name: string;
  company: string;
  text: string;
  backgroundColor: string;
}

interface TestimonialsBlockProps {
  testimonials?: Testimonial[];
}

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({ testimonials = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const colors = ['#FFD700', '#4169E1', '#FF6B6B'];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials]);

  if (!testimonials.length) return null;

  const currentTestimonial = testimonials[currentIndex];
  if (!currentTestimonial) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Cards Container */}
          <div className="relative h-[300px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ x: direction > 0 ? '100%' : '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: direction < 0 ? '100%' : '-100%' }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 w-full"
              >
                <div 
                  className="p-8 h-full flex flex-col justify-between rounded-lg"
                  style={{ backgroundColor: colors[currentIndex % colors.length] }}
                >
                  <div>
                    <p className="text-black text-lg mb-6">"{currentTestimonial.text}"</p>
                  </div>
                  <div>
                    <p className="font-bold text-black">{currentTestimonial.name}</p>
                    <p className="text-black/70">{currentTestimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <div className="flex gap-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-black w-12' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}; 