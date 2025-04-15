"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface LogoStripProps {
  logos?: Array<{
    logo: {
      url: string;
      alt?: string;
    } | null;
    url?: string;
  }>;
}

export default function LogoStrip({ logos = [] }: LogoStripProps) {
  // Filter out any logos with null logo property
  const validLogos = logos.filter(logo => logo && logo.logo && logo.logo.url);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotate logos every 3 seconds if not hovered
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === validLogos.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [validLogos.length, isHovered]);

  // Continuous scrolling effect with variable speed
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const maxScroll = scrollWidth - clientWidth;
    
    let scrollPosition = 0;
    let scrollSpeed = 0.5; // Reduced initial speed from 1 to 0.5
    const maxSpeed = 1.5; // Reduced maximum speed from 3 to 1.5
    const acceleration = 0.005; // Reduced acceleration rate from 0.01 to 0.005
    
    const animate = () => {
      // Gradually increase speed up to maxSpeed
      scrollSpeed = Math.min(scrollSpeed + acceleration, maxSpeed);
      
      scrollPosition += scrollSpeed;
      
      // Reset position when reaching the end
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
        scrollSpeed = 0.5; // Reset speed to initial value
      }
      
      container.scrollLeft = scrollPosition;
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [validLogos.length]);

  if (!validLogos.length) return null;

  return (
    <div 
      id="logoStrip" 
      className="w-full bg-white py-8 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Full-width container with negative margins to extend beyond the viewport */}
      <div className="w-screen -mx-[calc((100vw-100%)/2)]">
        <div className="relative h-[100px] flex items-center justify-center">
          <div 
            ref={containerRef}
            className="flex gap-12 items-center justify-start overflow-hidden whitespace-nowrap"
            style={{ 
              width: '100%',
              scrollBehavior: 'auto'
            }}
          >
            {/* Duplicate logos to create seamless loop */}
            {[...validLogos, ...validLogos, ...validLogos].map((logo, index) => {
              const LogoWrapper = logo.url ? Link : 'div';
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: index === currentIndex ? 1.2 : 1,
                    transition: {
                      duration: 0.5,
                      ease: "easeInOut"
                    }
                  }}
                  whileHover={{ 
                    scale: 1.3,
                    transition: { duration: 0.2 }
                  }}
                  className="flex items-center justify-center flex-shrink-0"
                >
                  <LogoWrapper
                    {...(logo.url ? {
                      href: logo.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "cursor-pointer hover:opacity-80 transition-all duration-300 transform hover:scale-110"
                    } : {
                      className: "cursor-default"
                    })}
                  >
                    <Image
                      src={logo.logo.url}
                      alt={logo.logo.alt || 'Logo'}
                      width={200}
                      height={100}
                      className="h-[80px] w-auto object-contain filter hover:brightness-110 transition-all duration-300"
                      priority
                    />
                  </LogoWrapper>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
