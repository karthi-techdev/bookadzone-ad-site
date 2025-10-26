'use client'
import "./globals.css";
import '@fontsource-variable/urbanist';
import { FormEvent, useEffect, useState } from "react";
import { Pivot as Hamburger } from 'hamburger-react'
import { motion, AnimatePresence } from "framer-motion";
import logo from '../../public/media/images/bookadzone-logo.png'
import mobilelogo from '../../public/media/images/ba-png.png'
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { FaInstagram, FaTwitter, FaLinkedinIn, FaFacebookF } from "react-icons/fa";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Update active section based on scroll position
      const sections = ["home", "features", "how-it-works", "faqs"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Set initial active section
    const hash = window.location.hash.replace('#', '');
    if (hash && ["home", "features", "how-it-works", "faqs"].includes(hash)) {
      setActiveSection(hash);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowPopup(true);
  };

  // Function to handle link clicks and update active section
  const handleLinkClick = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  // Function to get link class based on active state
  const getLinkClass = (section: string) => {
    const baseClass = "transition-colors";
    const isActive = activeSection === section;
    return `${baseClass} ${isActive ? "text-[var(--purple-color)] font-semibold" : "text-white hover:text-[var(--purple-color)]"}`;
  };

  // Function to get mobile link class based on active state
  const getMobileLinkClass = (section: string) => {
    const baseClass = "transition-colors font-medium block py-3";
    const isActive = activeSection === section;
    return `${baseClass} ${isActive ? "text-[var(--purple-color)] font-semibold" : "text-white hover:text-[var(--purple-color)]"}`;
  };

  const menuItems = [
    { name: "Home", id: "home" },
    { name: "Features", id: "features" },
    { name: "How it works?", id: "how-it-works" },
    { name: "Faq&apos;s", id: "faqs" }
  ];

  return (
    <html lang="en">
      <body>
        {/* Navbar with smooth scroll effect */}
        <motion.div 
          className="navbar fixed top-0 w-full z-100000"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <nav className={`navbar bg-[var(--light-dark-color)] rounded-full mx-auto my-2 h-[3.75rem] px-4 md:px-8 py-3 md:py-2 flex items-center justify-between max-w-[100%] shadow-lg border border-[1px] border-[var(--light-blur-grey-color)] fixed top-[0.125rem] left-1/2 transform -translate-x-1/2 w-[98%] z-10000000 ${isScrolled ? "backdrop-blur-sm bg-opacity-95" : ""}`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link 
                href="#home" 
                className="text-2xl font-bold text-white"
                onClick={() => handleLinkClick("home")}
              >
                <img className="hidden md:block w-[8.4375rem]" src={logo.src} alt="BookAdZone Logo" />
                <img className="block md:hidden w-[3.125rem]" src={mobilelogo.src} alt="BookAdZone" />
              </Link>
            </motion.div>

            <div className="hidden md:flex gap-[3rem] items-center font-medium">
              <div className="menu-wrapper text-[0.800rem] gap-[2rem] flex items-center w-fit flex justify-end ml-[1.875rem]">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link 
                      href={`#${item.id}`}
                      className={getLinkClass(item.id)}
                      onClick={() => handleLinkClick(item.id)}
                    >
                      {item.name === "Faq&apos;s" ? "Faq's" : item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.button 
                onClick={() => setOpen(true)}
                className="text-[0.875rem] text-white w-[8.125rem] p-[0.625rem] cursor-pointer rounded-[1.375rem] bg-[var(--purple-color)] hover:bg-[var(--light-purple-color)] transition-colors"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(127, 106, 247, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Get Notified
              </motion.button>
            </div>
            <div className="md:hidden relative">
              <Hamburger
                toggled={isMobileMenuOpen}
                toggle={setIsMobileMenuOpen} 
                color="white"
                size={24}
              />
            </div>
          </nav>

          {/* Mobile Menu with enhanced animations */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mobile-menu fixed top-0 left-0 w-full backdrop-blur-[0.1875rem] h-screen bg-[#000000b3] relative z-50 flex flex-col p-30 gap-2 px-6"
              >
                {menuItems.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 + 0.2 }}
                  >
                    <Link
                      href={`#${item.id}`}
                      className={getMobileLinkClass(item.id)}
                      onClick={() => handleLinkClick(item.id)}
                    >
                      {item.name === "Faq&apos;s" ? "Faq's" : item.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div 
                  className="w-full mt-auto font-medium"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <button
                    className="w-full text-center text-white bg-[var(--purple-color)] hover:bg-[var(--light-purple-color)] py-3 rounded-[30px] text-sm transition-colors"
                    onClick={() => {
                      setOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Get Notified
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Get Notified Modal */}
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="absolute inset-0 bg-black/60 backdrop-blur-md"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.4, 0, 0.2, 1],
                    scale: { type: "spring", stiffness: 300, damping: 30 }
                  }}
                  className="relative z-10 w-full max-w-md bg-[var(--light-dark-color)] border border-[var(--light-blur-grey-color)] rounded-xl p-6 shadow-2xl"
                >
                  <div className="text-center mb-6">
                    <motion.h2 
                      className="text-xl font-bold text-white"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      We&apos;re <span className="text-[var(--purple-color)]">Launching Soon&#33;</span>
                    </motion.h2>
                    <motion.p 
                      className="text-xs text-[var(--light-grey-color)] mt-1"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.15 }}
                    >
                      Be the first to know when we go live
                    </motion.p>
                  </div>

                  <form className="space-y-3" onSubmit={handleSubmit}>
                    {[
                      { label: "Full Name", type: "text", placeholder: "Enter your full name" },
                      { label: "Profile Type", type: "select", options: ["Select Advertiser or Agency", "Advertiser", "Agency"] },
                      { label: "Company Name", type: "text", placeholder: "Enter company name" },
                      { label: "Position", type: "text", placeholder: "Enter your position" },
                      { label: "Email Address", type: "email", placeholder: "Enter your email" }
                    ].map((field, index) => (
                      <motion.div
                        key={field.label}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 + 0.2 }}
                      >
                        <label className="block text-xs font-medium text-white mb-1.5">
                          {field.label}
                        </label>
                        {field.type === "select" ? (
                          <select className="w-full px-3 py-2.5 text-xs rounded-lg bg-[var(--dark-color)] border border-[var(--light-blur-grey-color)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--purple-color)] focus:border-transparent transition-all duration-200">
                            {field.options?.map(option => (
                              <option key={option} value={option} className="text-[var(--light-grey-color)]">
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            className="w-full px-3 py-2.5 text-xs rounded-lg bg-[var(--dark-color)] border border-[var(--light-blur-grey-color)] text-white placeholder-[var(--light-grey-color)] focus:outline-none focus:ring-2 focus:ring-[var(--purple-color)] focus:border-transparent transition-all duration-200"
                          />
                        )}
                      </motion.div>
                    ))}

                    <motion.button
                      type="submit"
                      className="w-full py-3 rounded-lg bg-[var(--purple-color)] text-white text-xs font-semibold hover:bg-[var(--light-purple-color)] transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-[var(--purple-color)] focus:ring-offset-2 focus:ring-offset-[var(--light-dark-color)] shadow-lg mt-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Notify Me at Launch
                    </motion.button>
                  </form>

                  {/* Success Popup */}
                  <AnimatePresence>
                    {showPopup && (
                      <motion.div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          className="bg-[var(--dark-color)] border border-[var(--light-blur-grey-color)] rounded-2xl p-6 text-center max-w-sm w-full shadow-2xl"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                          <h2 className="text-lg font-semibold text-white mb-2">
                            🎉 You&apos;re on the List!
                          </h2>
                          <p className="text-sm text-[var(--light-grey-color)] mb-4">
                            Thank you for your interest. We&apos;ll notify you as soon as we launch!
                          </p>
                          <button
                            onClick={() => setShowPopup(false)}
                            className="px-5 py-2 text-xs rounded-lg bg-[var(--purple-color)] hover:bg-[var(--light-purple-color)] text-white font-medium transition-all duration-200"
                          >
                            Close
                          </button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 w-7 h-7 rounded-full border border-[var(--light-blur-grey-color)] flex items-center justify-center text-[var(--light-grey-color)] hover:text-white hover:border-white transition-all duration-200 text-lg"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <IoClose />
                  </motion.button>

                  <motion.div 
                    className="mt-5 text-center text-[var(--light-grey-color)] text-xs"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <p>Already <span className="text-[var(--purple-color)] font-semibold">356 Advertisers</span> and <span className="text-[var(--purple-color)] font-semibold">127 Agencies</span> have subscribed.</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="h-[5rem] md:h-[4rem]"></div>
        </motion.div>

        {/* Background with subtle animation */}
        <motion.div 
          className="fixed top-0 inset-0 bg-[url('/media/images/blurry-hero-animated.svg')] h-[100dvh] w-full bg-cover bg-no-repeat bg-center blur-[8rem] z-[-1000] opacity-50"
          animate={{ 
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Main content with fade in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {children}
        </motion.div>

        {/* Footer with staggered animations */}
        <motion.footer 
          className="border-t border-[var(--light-blur-grey-color)] text-white bg-[var(--light-dark-color)] rounded-[1rem] mx-5 mb-5 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="footer-content py-6 px-4 md:px-10">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 mb-6">
              <motion.div 
                className="flex flex-col md:flex-row items-center gap-3 md:gap-6"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                <p className="font-medium">Follow us</p>
                <div className="flex gap-4 text-xl">
                  {[
                    { icon: <FaInstagram />, label: "Instagram" },
                    { icon: <FaTwitter />, label: "Twitter" },
                    { icon: <FaLinkedinIn />, label: "LinkedIn" },
                    { icon: <FaFacebookF />, label: "Facebook" }
                  ].map((social, index) => (
                    <motion.a
                      key={social.label}
                      href="#"
                      aria-label={social.label}
                      className="border border-[var(--light-blur-grey-color)] p-2 rounded-[.5rem] transition-colors duration-300 hover:bg-gradient-to-b hover:from-[#473E7E] hover:to-[#000000]"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      viewport={{ once: true }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="text-sm text-[var(--light-grey-color)] font-medium flex flex-wrap justify-center gap-3 py-2"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <span>Advertise</span>
                <span>Simplify</span>
                <span>Grow</span>
              </motion.div>
            </div>

            <motion.hr 
              className="border-[var(--light-blur-grey-color)] mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            />

            <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-4">
              <motion.div 
                className="flex flex-col md:flex-row items-center gap-6"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-wrap justify-center md:justify-start gap-5 text-[var(--light-grey-color)]">
                  {["Home", "Features", "How it works?", "Faq&apos;s", "info@bookadzone.com"].map((item, index) => (
                    <motion.a
                      key={item}
                      href={item.includes("@") ? `mailto:${item}` : `#${item.toLowerCase().replace(/\s+/g, "-").replace("?", "").replace("'", "")}`}
                      className="hover:underline"
                      whileHover={{ y: -2 }}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.6 }}
                      viewport={{ once: true }}
                      onClick={() => {
                        if (!item.includes("@")) {
                          const sectionId = item.toLowerCase().replace(/\s+/g, "-").replace("?", "").replace("'", "");
                          handleLinkClick(sectionId);
                        }
                      }}
                    >
                      {item === "Faq&apos;s" ? "Faq's" : item}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.p 
                className="text-[var(--light-grey-color)] text-center md:text-right flex flex-wrap items-center justify-center gap-1"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
              >
                Copyrights © 2025 All Rights Reserved by 
                <motion.a 
                  href="#home"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleLinkClick("home")}
                >
                  <img
                    src={logo.src}
                    alt="bookadzone Logo"
                    className="h-[1.07rem] object-contain"
                  />
                </motion.a>
              </motion.p>
            </div>
          </div>

          {/* Marquee with continuous animation */}
          <motion.div 
            className="overflow-hidden relative w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex whitespace-nowrap">
              <motion.div 
                className="flex"
                animate={{ x: [0, -1600] }}
                transition={{ 
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear"
                  }
                }}
              >
                <div className="flex animate-[marquee_20s_linear_infinite]"> 
                  <img className="w-[80rem] opacity-50 flex-shrink-0" src={logo.src} alt="BookAdZone Logo" /> 
                  <img className="w-[80rem] opacity-50 flex-shrink-0" src={logo.src} alt="BookAdZone Logo" /> 
                </div> 
                
                <div className="flex animate-[marquee_20s_linear_infinite]" aria-hidden="true"> 
                  <img className="w-[80rem] opacity-50 flex-shrink-0" src={logo.src} alt="BookAdZone Logo" /> 
                  <img className="w-[80rem] opacity-50 flex-shrink-0" src={logo.src} alt="BookAdZone Logo" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.footer>
      </body>
    </html>
  );
}