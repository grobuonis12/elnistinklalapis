"use client";

import Image from "next/image";

interface KontaktaiProps {
  companyName: string;
  companyCode: string;
  vatCode: string;
  bankAccount: string;
  bankName: string;
  phone: string;
  email: string;
  illustration?: { url: string };
}

export default function KontaktaiComponent({
  companyName,
  companyCode,
  vatCode,
  bankAccount,
  bankName,
  phone,
  email,
  illustration,
}: KontaktaiProps) {
  return (
    <section
      id="kontaktai"
      className="flex flex-col md:flex-row w-full max-w-7xl mx-auto overflow-hidden rounded-xl border-4 border-black mb-0 pb-0 mobile-safe-area"
    >
      {/* Left Side */}
      <div className="w-full md:w-1/2 bg-[#ff99cc] p-4 md:p-8 text-black flex flex-col justify-center">
        <div className="max-w-[300px] mx-auto w-full">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-wide mobile-text">Kontaktai</h2>

          {/* Icon */}
          <div className="mb-6 flex justify-start">
            <Image
              src="/media/kontaktuminilogo.png"
              alt="Kontaktai Mini Logo"
              width={32}
              height={32}
              className="w-auto h-auto"
            />
          </div>

          {/* Contact Details */}
          <div className="space-y-4 md:space-y-6 text-base leading-relaxed mobile-text">
            <p className="font-bold text-lg">{companyName}</p>
            <div className="space-y-1">
              <p className="font-semibold text-sm md:text-base">Įmonės kodas:</p>
              <p className="text-base">{companyCode}</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-sm md:text-base">PVM mokėtojo kodas:</p>
              <p className="text-base">{vatCode}</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-sm md:text-base">Banko sąskaita:</p>
              <p className="text-base">{bankAccount}</p>
              <p className="text-base">{bankName}</p>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="whitespace-nowrap px-4 py-2 bg-white rounded-full text-black text-sm border-2 border-black hover:bg-gray-50 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all font-medium touch-target-min mobile-tap-highlight">
              {phone}
            </button>
            <button className="whitespace-nowrap px-4 py-2 bg-white rounded-full text-black text-sm border-2 border-black hover:bg-gray-50 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all font-medium touch-target-min mobile-tap-highlight">
              {email}
            </button>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 bg-[#FFD700] p-4 md:p-8 flex items-center justify-center">
        {illustration?.url ? (
          <Image 
            src={illustration.url} 
            alt="Kontaktai Illustration" 
            width={500} 
            height={500} 
            className="w-full h-auto object-contain" 
            priority // Load image immediately for better mobile experience
          />
        ) : (
          <p className="text-gray-700 mobile-text">No image provided</p>
        )}
      </div>
    </section>
  );
}

// Ensure no dynamic values like Date.now() or Math.random() are used directly
