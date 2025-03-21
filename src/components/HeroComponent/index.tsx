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
      className="flex flex-col md:flex-row w-full max-w-7xl mx-auto overflow-hidden rounded-xl border-4 border-black mb-0 pb-0" // Added pb-0 to remove padding below
    >
      {/* Left Side */}
      <div className="w-full md:w-1/2 bg-[#ff99cc] p-8 text-black flex flex-col justify-center"> {/* Centered vertically */}
        <div className="max-w-[300px] mx-auto">
          {/* Title */}
          <h2 className="text-3xl font-bold mb-6 tracking-wide">Kontaktai</h2>

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
          <div className="mt-10 flex gap-3"> {/* Aligned buttons horizontally */}
            <button className="flex-1 px-4 py-3 bg-white rounded-full text-black text-base font-medium border-2 border-black hover:bg-gray-50 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {phone}
            </button>
            <button className="flex-1 px-4 py-3 bg-white rounded-full text-black text-base font-medium border-2 border-black hover:bg-gray-50 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
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