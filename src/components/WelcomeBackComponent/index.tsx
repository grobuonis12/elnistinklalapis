"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ButtonProps {
  text: string;
  link: string;
  hexColor: string;
}

interface WelcomeBlockProps {
  title: string;
  buttons: ButtonProps[];
}

export default function WelcomeBackComponent({ title, buttons }: WelcomeBlockProps) {
  const [buttonList, setButtonList] = useState<ButtonProps[]>([]);

  useEffect(() => {
    console.log("Received Buttons:", buttons);
    setButtonList(buttons || []);
  }, [buttons]);

  if (!buttonList || buttonList.length === 0) {
    return <p className="text-white text-center">No buttons available.</p>;
  }
  return (
    <div className="w-full flex flex-col items-center justify-center h-[500px] md:h-[400px] bg-[#2F9890] p-6 relative border-b-[6px] border-black">
      {/* Title */}
      <div className="relative bg-yellow-400 text-black font-bold text-xl md:text-2xl px-10 py-4 rounded-full border-2 border-black" style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)' }}>
        {title}
      </div>
  
      {/* Buttons Grid */}
      <div className="flex flex-wrap justify-center gap-6 mt-8 w-full max-w-6xl px-4">
        {buttonList.map((button, index) => (
          <Link 
            key={index} 
            href={button.link}
            passHref
            className="flex justify-center"
          >
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
                    backgroundColor: button.hexColor || "#FF5733",
                    clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  }}
                ></div>
              </div>
  
              {/* Button Text */}
              <span className="text-xs uppercase tracking-[0.2em] font-medium">
                {button.text}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}