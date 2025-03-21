import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Code } from 'lucide-react';

interface ContactSectionProps {
  companyInfo?: {
    name: string;
    code: string;
    vatCode: string;
    bankAccount: string;
    bankName: string;
    phone: string;
    email: string;
  };
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  companyInfo = {
    name: 'IT "ELNIS"',
    code: '304153085',
    vatCode: 'LT100009868416',
    bankAccount: 'LT474010051003606689',
    bankName: 'Luminor Bank AS',
    phone: '+370 623 06955',
    email: 'info@elnis.lt'
  }
}) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {/* Left side - Contact Information */}
      <div className="bg-[#FFC0CB] p-8 md:p-16">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold mb-8">Kontaktai</h2>
          <div className="space-y-4">
            <p className="font-bold">{companyInfo.name}</p>
            <p>Įmonės kodas: {companyInfo.code}</p>
            <p>PVM mokėtojo kodas: {companyInfo.vatCode}</p>
            <p>Banko sąskaita:</p>
            <p>{companyInfo.bankAccount}</p>
            <p>{companyInfo.bankName}</p>
          </div>
          <div className="mt-8 space-y-4">
            <Link 
              href={`tel:${companyInfo.phone}`}
              className="inline-flex items-center justify-center w-full bg-white text-black rounded-full py-3 px-6 hover:bg-gray-100 transition-colors"
            >
              {companyInfo.phone}
            </Link>
            <Link
              href={`mailto:${companyInfo.email}`}
              className="inline-flex items-center justify-center w-full bg-white text-black rounded-full py-3 px-6 hover:bg-gray-100 transition-colors"
            >
              {companyInfo.email}
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Social Links */}
      <div className="bg-[#FFD700] p-8 md:p-16 flex items-center justify-center">
        <div className="relative w-full max-w-md aspect-square">
          <div className="absolute inset-0">
            <Code className="w-full h-full text-black opacity-10" />
          </div>
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="flex gap-8">
              <Link
                href="https://www.facebook.com/elnis"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Facebook className="w-8 h-8" />
              </Link>
              <Link
                href="https://www.instagram.com/elnis"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-4 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Instagram className="w-8 h-8" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 