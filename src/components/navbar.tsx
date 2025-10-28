'use client'
import { FormEvent, useEffect, useState } from "react";
import { Pivot as Hamburger } from 'hamburger-react'
import { motion, AnimatePresence } from "framer-motion";
import logo from '../../public/media/images/bookadzone-logo.png'
import mobilelogo from '../../public/media/images/ba-png.png'
import Link from "next/link";
import { IoClose } from "react-icons/io5";

export default function Navbar() {
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
      const [isScrolled, setIsScrolled] = useState(false);
      const [open, setOpen] = useState(false);
      const [activeSection, setActiveSection] = useState("home");
    
      useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 10);
          
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
    
      const handleLinkClick = (section: string) => {
        setActiveSection(section);
        setIsMobileMenuOpen(false);
      };
    
      const getLinkClass = (section: string) => {
        const baseClass = "transition-colors";
        const isActive = activeSection === section;
        return `${baseClass} ${isActive ? "text-[var(--purple-color)] font-semibold" : "text-white hover:text-[var(--purple-color)]"}`;
      };
    
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
     <>
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
                className="fixed inset-0 flex items-center justify-center z-50000000000 p-4"
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
     </>
    )
}