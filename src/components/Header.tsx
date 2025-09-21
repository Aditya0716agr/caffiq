"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideOnMobile, setHideOnMobile] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      // Auto-hide only on mobile widths
      if (window.innerWidth < 768 && !isOpen) {
        const delta = y - lastYRef.current;
        // hide when scrolling down past 16px, show when scrolling up
        if (y > 16 && delta > 2) {
          setHideOnMobile(true);
        } else if (delta < -2) {
          setHideOnMobile(false);
        }
      } else {
        setHideOnMobile(false);
      }
      lastYRef.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const navItems = [
  { label: "Home", id: "home" },
  { label: "Product", id: "product" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" }];


  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ?
      "bg-[#FBFCFD]/80 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.05)]" :
      "bg-[#FBFCFD]/70 backdrop-blur-md"}`
      }
      initial={{ y: -100 }}
      animate={{ y: hideOnMobile ? -100 : 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}>

      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}>

            <button
              onClick={() => scrollToSection("home")}
              className="text-2xl text-foreground hover:text-[#00B386] transition-colors duration-300 !whitespace-pre-line !whitespace-pre-line !font-(family-name:--font-poppins) lg:!text-3xl !font-extrabold"
              style={{ fontFamily: "var(--font-heading)" }}>Caffiq


            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) =>
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative text-foreground hover:text-[#00B386] transition-colors duration-300 text-base font-medium py-2 px-1 group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>

                {item.label}
                <motion.div
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00B386] group-hover:w-full transition-all duration-300"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }} />

              </motion.button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center text-foreground hover:text-[#00B386] transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileTap={{ scale: 0.9 }}>

            <AnimatePresence mode="wait">
              {isOpen ?
              <motion.div
                key="close"
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: 180, opacity: 1 }}
                exit={{ rotate: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}>

                  <X size={24} />
                </motion.div> :

              <motion.div
                key="menu"
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}>

                  <Menu size={24} />
                </motion.div>
              }
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen &&
        <motion.div
          className="md:hidden fixed inset-0 top-20 bg-[#FBFCFD]/95 backdrop-blur-lg border-t border-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}>

            <nav className="flex flex-col items-center justify-center h-full space-y-8 px-6">
              {navItems.map((item, index) =>
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-2xl font-medium text-foreground hover:text-[#00B386] transition-colors duration-300 py-4 px-6 rounded-lg hover:bg-secondary/40"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>

                  {item.label}
                </motion.button>
            )}
            </nav>
          </motion.div>
        }
      </AnimatePresence>
    </motion.header>);

};