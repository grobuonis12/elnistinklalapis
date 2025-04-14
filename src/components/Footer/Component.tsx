import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const FooterComponent = () => {
  return (
    <footer className="w-full bg-black text-white py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
        {/* Left side - Logo and description */}
        <div className="flex flex-col items-start">
          <Link 
            href="/"
            className="mb-6 inline-block hover:opacity-80 transition-opacity duration-200"
            aria-label="Go to homepage"
          >
            <Image 
              src="/media/elnislogofooter.png" 
              alt="Elnis" 
              width={140}
              height={56}
              className="w-auto h-auto"
              priority
            />
          </Link>
          <p className="text-white/60 text-sm mb-4 max-w-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in libero justo. 
            Interdum et Phasellus in libero justo.
          </p>
          <p className="text-white/40 text-sm">
            @ELNIS, 2025
          </p>
        </div>

        {/* Middle - Recent Posts */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Naujausi įrašai</h3>
          <div className="space-y-4">
            {/* Static content for now */}
            <Link href="#" className="flex items-center space-x-3 group">
              <div>
                <h4 className="text-sm font-medium group-hover:text-gray-300 transition-colors">
                  Pavyzdinis įrašas 1
                </h4>
              </div>
            </Link>
            <Link href="#" className="flex items-center space-x-3 group">
              <div>
                <h4 className="text-sm font-medium group-hover:text-gray-300 transition-colors">
                  Pavyzdinis įrašas 2
                </h4>
              </div>
            </Link>
          </div>
        </div>

        {/* Right side - Tag Cloud */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Žymės</h3>
          <div className="flex flex-wrap gap-4">
            {/* Static content for now */}
            <Link href="#" className="flex justify-center">
              <div
                className="flex items-center space-x-2 px-4 py-2 bg-white text-black border-2 border-black rounded-[20px] hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
                style={{
                  boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
                  letterSpacing: '0.05em',
                }}
              >
                {/* Hexagon with contour */}
                <div className="relative w-[12px] h-[12px] flex-shrink-0" style={{ transform: 'rotate(-15deg)' }}>
                  {/* Black contour */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: 'black',
                      clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                    }}
                  ></div>
                  {/* Colored hexagon */}
                  <div
                    className="absolute inset-[1px]"
                    style={{
                      backgroundColor: "#FF5733",
                      clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                    }}
                  ></div>
                </div>

                {/* Button Text */}
                <span className="text-xs uppercase tracking-[0.2em] font-medium">
                  Pavyzdinė žymė
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}; 