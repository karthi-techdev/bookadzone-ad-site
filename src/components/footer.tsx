"use client"
import { motion } from "framer-motion";
import Image from 'next/image'
import logo from '../../public/media/images/bookadzone-logo.png'
import { FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


export default function Footer() {
     // scroll to section on click (no local state needed in footer)
     const handleLinkClick = (section: string) => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      };

    return (
     <>
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
                    { icon: <FaInstagram />, label: "Instagram", link: "https://www.instagram.com/bookadzone/" },
                    { icon: <FaXTwitter />, label: "Twitter", link: "https://x.com/bookadzone" },
                    { icon: <FaLinkedinIn />, label: "LinkedIn", link: "https://www.linkedin.com/company/bookadzone/" },
                    { icon: <FaFacebookF />, label: "Facebook", link: "https://www.facebook.com/people/Bookadzone/61583101444332/" }
                  ].map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
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
                  {["Home", "Features", "How it works?", "Faq&apos;s", "contact@bookadzone.com"].map((item, index) => (
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
                  <Image
                    src={logo}
                    alt="bookadzone Logo"
                    className="h-[1.07rem] object-contain"
                    width={80}
                    height={18}
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
                  <Image className="w-[80rem] opacity-50 flex-shrink-0" src={logo} alt="BookAdZone Logo" width={1280} height={120} /> 
                  <Image className="w-[80rem] opacity-50 flex-shrink-0" src={logo} alt="BookAdZone Logo" width={1280} height={120} /> 
                </div> 
                
                <div className="flex animate-[marquee_20s_linear_infinite]" aria-hidden="true"> 
                  <Image className="w-[80rem] opacity-50 flex-shrink-0" src={logo} alt="BookAdZone Logo" width={1280} height={120} /> 
                  <Image className="w-[80rem] opacity-50 flex-shrink-0" src={logo} alt="BookAdZone Logo" width={1280} height={120} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.footer>
     </>
    )
}