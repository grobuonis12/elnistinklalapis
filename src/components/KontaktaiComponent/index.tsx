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
      className="flex flex-col md:flex-row w-full max-w-7xl mx-auto overflow-hidden rounded-t-xl border-4 border-black border-b-0"
    >
      {/* Left Side */}
      <div className="w-full md:w-1/2 bg-[#ff99cc] p-8 text-black flex flex-col justify-center border-r-4 border-black">
        <div className="max-w-[300px] mx-auto">
          {/* Title */}
          <h2 className="text-3xl font-bold mb-10 tracking-wide">Kontaktai</h2>

          {/* Icon */}
          <div className="mb-10 flex justify-start">
            <Image
              src="/media/kontaktuminilogo.png"
              alt="Kontaktai Mini Logo"
              width={24}
              height={24}
              className="w-auto h-auto"
            />
          </div>

          {/* Contact Details */}
          <div className="space-y-6 text-base leading-relaxed">
            <p className="font-bold text-lg">{companyName}</p>
            <div className="space-y-1">
              <p className="font-semibold text-sm">Įmonės kodas:</p>
              <p className="text-base">{companyCode}</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-sm">PVM mokėtojo kodas:</p>
              <p className="text-base">{vatCode}</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-sm">Banko sąskaita:</p>
              <p className="text-base">{bankAccount}</p>
              <p className="text-base">{bankName}</p>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="flex flex-col space-y-4 mt-8">
            <button className="w-full px-6 py-3 bg-white rounded-full text-black text-base font-medium border-2 border-black hover:bg-gray-50 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] truncate">
              {phone}
            </button>
            <button className="w-full px-6 py-3 bg-white rounded-full text-black text-base font-medium border-2 border-black hover:bg-gray-50 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {email}
            </button>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 bg-[#FFD700] p-8 flex items-center justify-center">
        {illustration?.url ? (
          <Image 
            src={illustration.url} 
            alt="Kontaktai Illustration" 
            width={500} 
            height={500} 
            className="w-full h-auto object-contain" 
          />
        ) : (
          <p className="text-gray-700">No image provided</p>
        )}
      </div>
    </section>
  );
}

// Ensure no dynamic values like Date.now() or Math.random() are used directly
