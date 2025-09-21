'use client'
import "./globals.css";
import '@fontsource-variable/urbanist';
import { useEffect, useState } from "react";
import { Pivot as Hamburger } from 'hamburger-react'
import { motion, AnimatePresence } from "framer-motion";
import logo from '../../public/media/images/bookadzone-logo.png'
import mobilelogo from '../../public/media/images/ba-png.png'
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="en">
      <body>
        <div className="navbar">
          <nav className={`navbar bg-[var(--light-dark-color)] rounded-full mx-auto my-2 h-[3.75rem] px-4 md:px-8 py-3 md:py-2 flex items-center justify-between max-w-[100%] shadow-lg border border-[1px] border-[var(--light-blur-grey-color)] fixed top-[0.125rem] left-1/2 transform -translate-x-1/2 w-[98%] z-50 ${isScrolled ? "backdrop-blur-sm bg-opacity-95" : ""}`}>
            <Link href="/" className="text-2xl font-bold text-white">
              <img className="hidden md:block w-[8.4375rem]" src={logo.src} alt="BookAdZone Logo" />
              <img className="block md:hidden w-[3.125rem]" src={mobilelogo.src} alt="BookAdZone" />
            </Link>

            <div className="hidden md:flex gap-[3rem] items-center">
              <div className="menu-wrapper text-white text-[0.800rem] gap-[2rem] flex items-center w-fit flex justify-end  ml-[1.875rem]">
                <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
                <Link href="/features" className="hover:text-purple-400 transition-colors">Features</Link>
                <Link href="/how-it-works" className="hover:text-purple-400 transition-colors">How it works?</Link>
                <Link href="/contact" className="hover:text-purple-400 transition-colors">Contact</Link>
              </div>
              <Link href="/get-notified">
                <button className="text-[0.875rem] text-white w-[8.125rem] p-[0.625rem] rounded-[1.375rem] bg-[rgb(79_58_154_/_0.88)] hover:bg-[rgb(79_58_154)] transition-colors">
                  Get Notified
                </button>
              </Link>
            </div>
            <div className="md:hidden relative">
              <Hamburger
                toggled={isMobileMenuOpen}
                toggle={setIsMobileMenuOpen} 
                // onToggle={(prev) =>setIsMobileMenuOpen(!prev)}
                color="white"
                size={24}
              />
            </div>
          </nav>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                layout
                key="mobile-menu"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                exit={{ y: -100, opacity: 0 }}
                className=" mobile-menu fixed top-0 left-0 w-full backdrop-blur-[0.1875rem] h-screen bg-[#000000b3] relative z-[-1] z-50 flex flex-col  p-30 gap-6 px-6"
              >


                {["Home", "Features", "How it works?", "Contact"].map((item, idx) => (
                  <motion.div key={idx}  >
                    <Link
                      href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-white text-base hover:text-purple-400 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}

                <motion.div className="w-full mt-auto">
                  <Link
                    href="/get-notified"
                    className="w-full text-center text-white bg-purple-700 hover:bg-purple-600 py-3 rounded-[30px] text-sm transition-colors block  "
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Notified
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

         <div className="h-[5rem] md:h-[4rem]"></div>
        </div>

        <div className="fixed top-0 inset-0 bg-[url('/media/images/blurry-hero-animated.svg')] h-[100dvh] w-full bg-cover bg-no-repeat bg-center blur-[185px] z-[-1000]"></div>
        {children}
      </body>
    </html>
  );
}
