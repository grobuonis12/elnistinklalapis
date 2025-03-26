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
      className="flex flex-col md:flex-row w-full max-w-7xl mx-auto overflow-hidden rounded-xl border-2 border-black"
    >
      {/* Left Side */}
      <div className="w-full md:w-1/2 bg-[#ff99cc] flex items-center justify-center p-8 md:p-12 md:border-r-2 border-black">
        <div className="flex flex-col items-start w-full max-w-[400px] pl-8 md:pl-16">
          {/* Title */}
          <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-10 text-black/70">Kontaktai</h2>

          {/* Icon */}
          <div className="mb-3">
            <Image
              src="/media/kontaktuminilogo.png"
              alt="Kontaktai Mini Logo"
              width={64}
              height={64}
              className="object-contain w-16 h-16"
            />
          </div>

          {/* Contact Details */}
          <div className="space-y-4 mb-10 w-full">
            <p className="font-bold text-lg md:text-xl">{companyName}</p>
            <div className="space-y-0.5">
              <p className="font-semibold">Įmonės kodas:</p>
              <p>{companyCode}</p>
            </div>
            <div className="space-y-0.5">
              <p className="font-semibold">PVM mokėtojo kodas:</p>
              <p>{vatCode}</p>
            </div>
            <div className="space-y-0.5">
              <p className="font-semibold">Banko sąskaita:</p>
              <p>{bankAccount}</p>
              <p>{bankName}</p>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <button className="whitespace-nowrap px-5 py-2 bg-white rounded-full text-black text-sm border-2 border-black hover:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all font-medium">
              {phone}
            </button>
            <button className="whitespace-nowrap px-5 py-2 bg-white rounded-full text-black text-sm border-2 border-black hover:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all font-medium">
              {email}
            </button>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 bg-[#FFD700] p-4 md:p-8">
        {illustration?.url ? (
          <Image 
            src={illustration.url} 
            alt="Kontaktai Illustration" 
            width={500} 
            height={500} 
            className="w-full h-auto max-h-[300px] md:max-h-[500px] object-contain" 
            priority
          />
        ) : (
          <p className="text-gray-700">No image provided</p>
        )}
      </div>
    </section>
  );
}

// Ensure no dynamic values like Date.now() or Math.random() are used directly
