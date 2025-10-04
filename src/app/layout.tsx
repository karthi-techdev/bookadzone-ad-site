'use client'
import "./globals.css";
import '@fontsource-variable/urbanist';
import { useEffect, useState } from "react";
import { Pivot as Hamburger } from 'hamburger-react'
import { motion, AnimatePresence } from "framer-motion";
import logo from '../../public/media/images/bookadzone-logo.png'
import mobilelogo from '../../public/media/images/ba-png.png'
import Link from "next/link";
import { IoClose } from "react-icons/io5";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="en">
      <body>
        <div className="navbar fixed top-0 w-full z-9999999">
          <nav className={`navbar bg-[var(--light-dark-color)] rounded-full mx-auto my-2 h-[3.75rem] px-4 md:px-8 py-3 md:py-2 flex items-center justify-between max-w-[100%] shadow-lg border border-[1px] border-[var(--light-blur-grey-color)] fixed top-[0.125rem] left-1/2 transform -translate-x-1/2 w-[98%] z-50 ${isScrolled ? "backdrop-blur-sm bg-opacity-95" : ""}`}>
            <Link href="/" className="text-2xl font-bold text-white">
              <img className="hidden md:block w-[8.4375rem]" src={logo.src} alt="BookAdZone Logo" />
              <img className="block md:hidden w-[3.125rem]" src={mobilelogo.src} alt="BookAdZone" />
            </Link>

            <div className="hidden md:flex gap-[3rem] items-center font-medium">
              <div className="menu-wrapper text-white text-[0.800rem] gap-[2rem] flex items-center w-fit flex justify-end  ml-[1.875rem]">
                <Link href="/" className="hover:text-[var(--purple-color)] transition-colors">Home</Link>
                <Link href="/features" className="hover:text-[var(--purple-color)] transition-colors">Features</Link>
                <Link href="/how-it-works" className="hover:text-[var(--purple-color)] transition-colors">How it works?</Link>
                <Link href="/contact" className="hover:text-[var(--purple-color)] transition-colors">Contact</Link>
              </div>
              <button onClick={() => setOpen(true)} className="text-[0.875rem] text-white w-[8.125rem] p-[0.625rem] cursor-pointer rounded-[1.375rem] bg-[var(--purple-color)] hover:bg-[var(--light-purple-color)] transition-colors">
                Get Notified
              </button>
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
                      className="text-white text-base hover:text-[var(--purple-color)] transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}

                <motion.div className="w-full mt-auto font-medium">
                  <button
                    className="w-full text-center text-white bg-[var(--purple-color)] hover:bg-[var(--light-purple-color)] py-3 rounded-[30px] text-sm transition-colors block  "
                    onClick={() => setOpen(true)}
                  >
                    Get Notified
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

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
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ 
                    duration: 0.3, 
                    ease: [0.4, 0, 0.2, 1] 
                  }}
                  className="relative z-10 w-full max-w-md bg-[var(--light-dark-color)] border border-[var(--light-blur-grey-color)] rounded-xl p-6 shadow-2xl"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-white">We're <span className="text-[var(--purple-color)]">Launching Soon!</span></h2>
                    <p className="text-xs text-[var(--light-grey-color)] mt-1">
                      Be the first to know when we go live
                    </p>
                  </div>

                  <form className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-white mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full px-3 py-2.5 text-xs rounded-lg bg-[var(--dark-color)] border border-[var(--light-blur-grey-color)] text-white placeholder-[var(--light-grey-color)] focus:outline-none focus:ring-2 focus:ring-[var(--purple-color)] focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white mb-1.5">
                        Profile Type
                      </label>
                      <select className="w-full px-3 py-2.5 text-xs rounded-lg bg-[var(--dark-color)] border border-[var(--light-blur-grey-color)] text-white focus:outline-none focus:ring-2 focus:ring-[var(--purple-color)] focus:border-transparent transition-all duration-200">
                        <option value="" className="text-[var(--light-grey-color)]">Select Advertiser or Agency</option>
                        <option value="advertiser" className="text-white">Advertiser</option>
                        <option value="agency" className="text-white">Agency</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white mb-1.5">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter company name"
                        className="w-full px-3 py-2.5 text-xs rounded-lg bg-[var(--dark-color)] border border-[var(--light-blur-grey-color)] text-white placeholder-[var(--light-grey-color)] focus:outline-none focus:ring-2 focus:ring-[var(--purple-color)] focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white mb-1.5">
                        Position
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your position"
                        className="w-full px-3 py-2.5 text-xs rounded-lg bg-[var(--dark-color)] border border-[var(--light-blur-grey-color)] text-white placeholder-[var(--light-grey-color)] focus:outline-none focus:ring-2 focus:ring-[var(--purple-color)] focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2.5 text-xs rounded-lg bg-[var(--dark-color)] border border-[var(--light-blur-grey-color)] text-white placeholder-[var(--light-grey-color)] focus:outline-none focus:ring-2 focus:ring-[var(--purple-color)] focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg  bg-[var(--purple-color)] text-white text-xs font-semibold hover:bg-[var(--light-purple-color)] transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-[var(--purple-color)] focus:ring-offset-2 focus:ring-offset-[var(--light-dark-color)] shadow-lg mt-4"
                    >
                      Notify Me at Launch
                    </button>
                  </form>

                  <button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 w-7 h-7 rounded-full border border-[var(--light-blur-grey-color)] flex items-center justify-center text-[var(--light-grey-color)] hover:text-white hover:border-white transition-all duration-200 text-lg"
                  >
                    <IoClose />
                  </button>

                  <p className="text-xs text-center text-[var(--light-grey-color)] mt-4">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

         <div className="h-[5rem] md:h-[4rem]"></div>
        </div>

        <div className="fixed top-0 inset-0 bg-[url('/media/images/blurry-hero-animated.svg')] h-[100dvh] w-full bg-cover bg-no-repeat bg-center blur-[8rem] z-[-1000] opacity-50"></div>
        {children}
      </body>
    </html>
  );
}
