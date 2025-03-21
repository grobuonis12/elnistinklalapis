import React from 'react';
import Link from 'next/link';
import { CMSLink } from '@/components/Link';
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

// Naujausių įrašų komponentas - bus pakeistas tikrais duomenimis vėliau
const LatestPosts: React.FC = () => (
  <div className="space-y-4">
    {/* Laikinas pavyzdys, bus pakeistas tikrais duomenimis */}
    <article className="flex gap-4">
      <div className="w-16 h-16 bg-gray-800 rounded-lg overflow-hidden">
        <img src="/placeholder.jpg" alt="" className="w-full h-full object-cover" />
      </div>
      <div>
        <h4 className="text-white font-medium mb-1">SSL Sertifikatas</h4>
        <p className="text-gray-400 text-sm">2024-01-15</p>
      </div>
    </article>
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
          className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full hover:scale-105 transition-all"
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: button.hexColor || "#FF5733" }}
          />
          <span className="text-sm">{button.text}</span>
        </Link>
      ))}
    </div>
  );
};

// Pagrindinis poraštės komponentas
export const Footer: React.FC<FooterProps> = ({ footer }) => {
  const latestPosts = footer.sections?.find(s => s.type === 'latest_posts')?.posts || [];
  const tagButtons = footer.sections?.find(s => s.type === 'tag_cloud')?.buttons || [];

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-block mb-6">
              <img src="/logo-white.svg" alt="Elnis" className="w-32" />
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in libero justo. 
              Interdum et Phasellus in libero justo.
            </p>
            <p className="text-gray-500 text-sm">
              @ELNIS, 2024
            </p>
          </div>

          {/* Latest Posts */}
          <div>
            <h3 className="text-xl font-medium mb-6">Naujausi straipsniai</h3>
            <div className="space-y-6">
              {latestPosts.map((post, index) => (
                <article key={index} className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                    <img src={post.image?.url || '/placeholder.jpg'} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <Link href={post.url} className="text-white hover:text-gray-300">
                      <h4 className="font-medium mb-1">{post.title}</h4>
                    </Link>
                    <p className="text-gray-400 text-sm">{post.date}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Tag Cloud */}
          <div>
            <h3 className="text-xl font-medium mb-6">Žymų debesis</h3>
            <TagCloud buttons={tagButtons} />
          </div>
        </div>
      </div>
    </footer>
  );
}; 