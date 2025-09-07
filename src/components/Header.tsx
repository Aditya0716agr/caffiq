"use client";

import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ?
      'bg-background/90 backdrop-blur-md border-b border-border/50' :
      'bg-transparent'}`
      }>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight !font-(family-name:--font-montserrat)">
              Caffiq
            </h1>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden sm:block">
            <button className="relative inline-flex items-center px-6 py-3 bg-ring text-background font-semibold text-sm tracking-wide rounded-full hover:bg-ring/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 shadow-lg shadow-ring/25 hover:shadow-ring/40 hover:shadow-xl transform hover:-translate-y-0.5 !w-full !h-full">
              Early Access
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-colors duration-200"
              aria-label="Open menu">

              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile CTA Button - Fixed at bottom */}
        <div className="sm:hidden fixed bottom-4 left-4 right-4 z-50">
          <button className="w-full inline-flex items-center justify-center px-6 py-4 bg-ring text-background font-semibold text-base tracking-wide rounded-full hover:bg-ring/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-200 shadow-lg shadow-ring/25 hover:shadow-ring/40 hover:shadow-xl transform hover:-translate-y-0.5 min-h-[48px]">
            Early Access
          </button>
        </div>
      </div>
    </header>);

}