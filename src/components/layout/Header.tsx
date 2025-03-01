'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: '/team', label: 'Team' },
    { href: '/insights', label: 'Insights' },
    { href: '#', label: 'Login', isDropdown: true },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLoginDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMobileLinkClick = () => {
    setIsMenuOpen(false); // Close the mobile menu after clicking a link
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false); // Close the mobile menu when the logo is clicked
  };

  const handleExternalLinkClick = (link: string) => {
    setSelectedLink(link);
    setIsModalOpen(true); // Show the modal before redirecting
  };

  const handleModalAcknowledge = () => {
    if (selectedLink) {
      window.open(selectedLink, '_blank');
    }
    setIsModalOpen(false);
    setSelectedLink(null);
  };

  return (
    <header className="bg-white text-black shadow-md fixed top-0 left-0 w-full z-50">
      <div className="relative container mx-auto flex items-center justify-between h-[80px] md:h-[140px] px-6">
        {/* Mobile Menu Icon */}
        <div className="md:hidden absolute right-6 z-10">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
            className="focus:outline-none"
          >
            <svg
              className="w-8 h-8 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center h-full">
          <Link href="/" aria-label="Panoramic Planning Home" onClick={handleLogoClick}>
            <Image
              src="/panoramic-planning-logo.png"
              alt="Panoramic Planning Logo"
              width={200}
              height={80}
              className="object-contain md:w-[250px] md:h-[100px] w-[150px] h-[60px]"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center absolute top-1/2 transform -translate-y-1/2 right-6">
          {navItems.map((item) =>
            item.isDropdown ? (
              <div
                key={item.label}
                className="relative"
                ref={dropdownRef}
              >
                <button
                  onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                  className={`text-lg hover:text-gray-600 ${
                    isLoginDropdownOpen ? 'font-semibold' : ''
                  }`}
                  aria-haspopup="true"
                  aria-expanded={isLoginDropdownOpen}
                >
                  {item.label}
                </button>
                {isLoginDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg z-50">
                    <ul className="py-2">
                      <li>
                        <button
                          onClick={() =>
                            handleExternalLinkClick('https://accountview.lpl.com/web/login')
                          }
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          LPL Account View
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            handleExternalLinkClick(
                              'https://wealth.emaplan.com/ema/SignIn?ema%2Flpl%2Fpanfs'
                            )
                          }
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          eMoney Login
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`text-lg hover:text-gray-600 ${
                  pathname === item.href ? 'font-semibold' : ''
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      </div>

{/* Mobile Navigation */}
{isMenuOpen && (
  <div className="md:hidden px-4 pt-4 pb-4 bg-white shadow-lg absolute top-full right-0 w-full">
    <nav className="flex flex-col items-end space-y-3"> {/* Uniform spacing between all links */}
      {navItems.map((item) =>
        item.isDropdown ? (
          <div key={item.label} className="w-full text-right">
            <button
              onClick={() => handleExternalLinkClick('https://accountview.lpl.com/web/login')}
              className="block w-full text-lg pr-6 py-2 hover:text-gray-600 text-right"
            >
              LPL Account View
            </button>
            <button
              onClick={() => handleExternalLinkClick('https://wealth.emaplan.com/ema/SignIn?ema%2Flpl%2Fpanfs')}
              className="block w-full text-lg pr-6 py-2 hover:text-gray-600 text-right"
            >
              eMoney Login
            </button>
          </div>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            onClick={handleMobileLinkClick}
            className={`block w-full text-lg pr-6 py-2 hover:text-gray-600 text-right ${
              pathname === item.href ? 'font-semibold' : ''
            }`}
          >
            {item.label}
          </Link>
        )
      )}
    </nav>
  </div>
)}

{/* Leaving Site Disclaimer Modal */}
{isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div className="bg-white rounded-lg p-6 max-w-lg w-full text-center">
      <h2 className="text-2xl font-bold mb-4">Leaving Panoramic Planning</h2>
      <p className="text-lg mb-6">
        You are about to leave Panoramic Planning&apos;s website. By clicking &quot;Acknowledge and Continue,&quot; you will be redirected to an external website.
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleModalAcknowledge}
          className="px-4 py-2 bg-primary text-white rounded hover:opacity-90"
        >
          Acknowledge and Continue
        </button>
      </div>
    </div>
  </div>
)}
    </header>
  );
};

export default Header;
