'use client' 
import '@fontsource-variable/urbanist';
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar/>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {children}
        </motion.div>

        <Footer/>
      </body>
    </html>
  );
}