import React from 'react';
import Link from 'next/link';

const topics = [
  { label: 'Reikalinga konsultacija', href: '/konsultacija' },
  { label: 'Nauja svetainė', href: '/nauja-svetaine' },
  { label: 'Patikimi saugiai', href: '/saugumas' },
  { label: 'Nauja el. parduotuvė', href: '/el-parduotuve' },
  { label: 'Svetainės atnaujinimas', href: '/atnaujinimas' },
  { label: 'Priežiūros paslaugos', href: '/prieziura' },
  { label: 'Skubu pagalba', href: '/pagalba' },
  { label: 'Klausimynas', href: '/klausimai' },
];

export const WelcomeBlock: React.FC = () => {
  return (
    <section className="bg-[#1B9B8D] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="inline-block bg-[#FFD700] rounded-full px-8 py-4 mb-8 shadow-lg border-2 border-black">
            <h2 className="text-black text-xl font-medium">
              Sveiki atvykę! Pasirinkite Jus dominančią temą:
            </h2>
          </div>
          <div className="flex flex-col gap-3 max-w-[1400px] mx-auto">
            {/* First row */}
            <div className="flex justify-center gap-4">
              {topics.slice(0, 4).map((topic, index) => (
                <Link
                  key={index}
                  href={topic.href}
                  className="flex-1 min-w-[200px] max-w-[320px] bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-200 flex items-center gap-2 shadow-lg border-2 border-black"
                >
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  {topic.label}
                </Link>
              ))}
            </div>
            {/* Second row */}
            <div className="flex justify-center gap-4">
              {topics.slice(4, 8).map((topic, index) => (
                <Link
                  key={index + 4}
                  href={topic.href}
                  className="flex-1 min-w-[200px] max-w-[320px] bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-200 flex items-center gap-2 shadow-lg border-2 border-black"
                >
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  {topic.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 