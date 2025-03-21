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
    <footer className="footer mt-0">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Left side - Logo and description */}
          <div className="footer-column">
            <Link href="/">
              <Image 
                src="/media/elnislogofooter.png" 
                alt="Elnis" 
                width={200}
                height={80}
                className="footer-logo"
                priority
              />
            </Link>
            <div className="footer-description">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in libero justo. Interdum et Phasellus in libero justo.
              </p>
            </div>
            <p className="footer-copyright">
              @ELNIS, 2024
            </p>
          </div>

          {/* Middle - Recent Posts */}
          <div className="footer-column">
            <h3 className="footer-title">Naujausi straipsniai</h3>
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

          {/* Right side - Tag Cloud */}
          <div className="footer-column">
            <h2 className="text-2xl font-bold text-white mb-6">
              Žymų debesis
            </h2>
            <div className="flex flex-wrap gap-3">
              {tagCloudSection?.buttons?.map((button, index) => (
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
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent
