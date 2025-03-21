"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    console.log("Received Testimonials:", testimonials);
  }, [testimonials]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % testimonials.length);
  };

  if (!testimonials || testimonials.length === 0) {
    return <p className="text-black text-center">No testimonials available.</p>;
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

  const visibleTestimonials = [
    getTestimonial(currentIndex),
    getTestimonial((currentIndex + 1) % testimonials.length),
    getTestimonial((currentIndex + 2) % testimonials.length),
  ];

  const totalBubbles = Math.ceil(testimonials.length / 3);

  return (
    <div id="atsiliepimai" className="relative w-full max-w-6xl mx-auto">
      <div className="flex justify-center gap-6 overflow-hidden">
        <AnimatePresence mode="wait">
          {visibleTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.company + index} // Ensure unique key for each testimonial
              initial={{ opacity: 0, x: 100 }} // Start off-screen to the right
              animate={{ opacity: 1, x: 0 }} // Slide into view
              exit={{ opacity: 0, x: -100 }} // Slide out to the left
              transition={{ duration: 0.6, ease: "easeInOut" }} // Smooth transition
              className="relative mx-auto"
              style={{ width: "310px", height: "270px" }}
            >
              {/* Testimonial card */}
              <div
                className="p-6 rounded-lg border-2 border-black relative"
                style={{
                  width: "310px",
                  height: "270px",
                  backgroundColor: testimonial.bgColor || "#FFDE59",
                  color: "black",
                  boxShadow: "6px 6px 0px black",
                }}
              >
                <h2 className="text-lg font-bold uppercase mb-2">{testimonial.company}</h2>
                <p className="text-sm italic leading-relaxed">"{testimonial.testimonial}"</p>
                <p className="mt-4 font-semibold">{testimonial.person}</p>
                {testimonial.title && (
                  <p className="text-xs font-light">— {testimonial.title} —</p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
  
      {/* Pagination Bubbles */}
      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(totalBubbles)].map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full ${
              Math.floor(currentIndex / 3) === index ? "bg-black" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
