import React from 'react';
import Link from 'next/link';
import { CMSLink } from '@/components/Link';
import { LatestPosts } from '@/components/LatestPosts';
import type { Footer as FooterType } from '@/payload-types';

// Mygtuko savybių sąsaja, naudojama žymų debesies mygtukams
interface ButtonProps {
  text: string;      // Mygtuko tekstas
  link: string;      // Nuorodos URL
  hexColor: string;  // Šešiakampio spalva
  id?: string | null;
}

interface PostProps {
  title: string;
  url: string;
  date: string;
  image?: {
    url: string;
  };
}

interface FooterSection {
  title: string;
  type: 'latest_posts' | 'tag_cloud' | 'custom_links';
  buttons?: ButtonProps[];
  posts?: PostProps[];
  links?: Array<{ link: any }>;
  id?: string;
}

// Poraštės komponento savybių sąsaja
interface FooterProps {
  footer: {
    sections?: FooterSection[];
  } & FooterType;
}

// Poraštės sekcijos komponentas, naudojamas kiekvienai poraštės daliai
const FooterSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div className="flex-1 min-w-[250px]">
    <h3 className="text-white text-lg font-medium mb-6">{title}</h3>
    {children}
  </div>
);

// Žymų debesies komponentas - atvaizduoja mygtukus tokiu pat stiliumi kaip WelcomeBlock
const TagCloud: React.FC<{ buttons: ButtonProps[] }> = ({ buttons }) => {
  if (!buttons?.length) return null;

  return (
    <div className="grid grid-cols-2 gap-2">
      {buttons.map((button, index) => (
        <Link 
          key={button.id || index} 
          href={button.link}
          className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full text-xs uppercase tracking-[0.2em] font-medium hover:scale-105 transition-all"
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: button.hexColor || "#FF5733" }}
          />
          <span>{button.text}</span>
        </Link>
      ))}
    </div>
  );
};

// Pagrindinis poraštės komponentas
export const Footer: React.FC<FooterProps> = ({ footer }) => {
  const tagButtons = footer.sections?.find(s => s.type === 'tag_cloud')?.buttons || [];

  return (
    <footer className="bg-black text-white pb-8 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto pt-16">
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-block mb-6">
              <img src="/logo-white.svg" alt="Elnis" className="w-32" />
            </Link>
            <p className="text-white/60 text-sm mb-4 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in libero justo. 
              Interdum et Phasellus in libero justo.
            </p>
            <p className="text-white/40 text-sm">
              @ELNIS, 2025
            </p>
          </div>

          {/* Latest Posts */}
          <div>
            <h2 className="text-white text-xl font-medium mb-6">Naujausi straipsniai</h2>
            <LatestPosts />
          </div>

          {/* Tag Cloud */}
          <div>
            <h2 className="text-white text-xl font-medium mb-6">Žymų debesis</h2>
            <div className="flex flex-wrap gap-2">
              {tagButtons.map((button, index) => (
                <Link 
                  key={button.id || index} 
                  href={button.link}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white/90 hover:text-white transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span>{button.text}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 