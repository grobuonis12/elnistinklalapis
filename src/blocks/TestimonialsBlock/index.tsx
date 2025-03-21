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

  const colors = ['#FFD700', '#4169E1', '#FF6B6B'];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
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
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div 
                  className="p-8 rounded-lg h-full flex flex-col justify-between"
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
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? 'bg-black' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
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