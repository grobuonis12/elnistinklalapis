import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'

interface TagCloudButton {
  text: string;
  link: string;
  hexColor: string;
  id?: string | null;
}

interface FooterSection {
  title: string;
  type: 'latest_posts' | 'tag_cloud' | 'custom_links';
  buttons?: TagCloudButton[] | null;
  links?: Array<{
    link: {
      label: string;
      url?: string | null;
    };
  }> | null;
}

const FooterComponent = ({ footer }: { footer: Footer }) => {
  const navItems = footer?.navItems || []
  const sections = footer?.sections || []

  // Find the tag cloud section
  const tagCloudSection = sections.find(section => section.type === 'tag_cloud')

  // Example recent posts - you'll need to fetch these from your CMS
  const recentPosts = [
    {
      id: 1,
      title: "SSL SERTIFIKATAS",
      date: "2023 12 15",
      image: "/path-to-image.jpg"
    },
    {
      id: 2,
      title: "Pavadinimas gali būti ilgesnis, bet ne daugiau nei per 2 eilutes",
      date: "Date 12 px"
    },
    {
      id: 3,
      title: "Pavadinimas 15 px",
      date: "Date 12 px"
    }
  ]

  const renderSection = (section: FooterSection) => {
    switch (section.type) {
      case 'latest_posts':
        return (
          <div className="footer-column">
            <h3 className="footer-title">{section.title}</h3>
            <div className="footer-posts">
              {recentPosts.map((post, index) => (
                <div key={post.id} className="footer-post">
                  <div className="footer-post-number">
                    {index + 1}
                  </div>
                  <div className="footer-post-content">
                    <h4 className="footer-post-title">{post.title}</h4>
                    <p className="footer-post-date">{post.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'tag_cloud':
        return (
          <div className="footer-column">
            <h2 className="text-2xl font-bold text-white mb-6">
              {section.title}
            </h2>
            <div className="flex flex-wrap gap-3">
              {section.buttons?.map((button, index) => (
                <Link
                  key={button.id || index}
                  href={button.link}
                  className="bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-full text-sm transition-colors duration-200 flex items-center gap-2 shadow-[2px_2px_0px_rgba(0,0,0,0.25)]"
                >
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: button.hexColor }}
                  />
                  {button.text}
                </Link>
              ))}
            </div>
          </div>
        );

      case 'custom_links':
        return (
          <div className="footer-column">
            <h3 className="footer-title">{section.title}</h3>
            <nav className="footer-nav">
              {section.links?.map((item, i) => (
                <CMSLink
                  key={i}
                  {...item.link}
                  className="footer-nav-link"
                >
                  <span className="footer-nav-dot" />
                  {item.link.label}
                </CMSLink>
              ))}
            </nav>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <footer className="bg-black">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Left side - Logo and description */}
          <div className="flex flex-col items-start">
            <Link href="/" className="mb-6 inline-block">
              <Image 
                src="/media/elnislogofooter.png" 
                alt="Elnis" 
                width={140}
                height={56}
                className="w-auto h-auto"
                priority
              />
            </Link>
            <p className="text-gray-400 text-sm mb-4 max-w-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in libero justo. 
              Interdum et Phasellus in libero justo.
            </p>
            <p className="text-gray-500 text-sm">
              @ELNIS, 2024
            </p>
          </div>

          {/* Middle - Recent Posts */}
          <div className="flex flex-col items-start">
            <h3 className="text-xl font-semibold text-white mb-6">Naujausi straipsniai</h3>
            <div className="space-y-6 w-full">
              {recentPosts.map((post, index) => (
                <div key={post.id} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center text-black text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-white text-sm font-medium">{post.title}</h4>
                    <p className="text-gray-400 text-xs">{post.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Tag Cloud */}
          <div className="flex flex-col items-start">
            <h2 className="text-xl font-semibold text-white mb-6">
              Žymų debesis
            </h2>
            <div className="flex flex-wrap gap-3">
              {tagCloudSection?.buttons?.map((button, index) => (
                <Link
                  key={button.id || index}
                  href={button.link}
                  className="bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-full text-sm transition-all duration-200 flex items-center gap-2 shadow-[2px_2px_0px_rgba(0,0,0,0.25)] hover:scale-105"
                >
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: button.hexColor }}
                  />
                  {button.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent
