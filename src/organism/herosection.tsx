import React, { useEffect, useRef } from "react";
import { HeroText } from "../molecules/herotext";
import { HeroImage } from "../molecules/heroimage";
import heroImgOne from '../../public/media/images/Frame 41.png'
import { gsap } from "gsap";

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text animation - slide in from left with fade
      gsap.fromTo(textRef.current,
        {
          x: -100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out"
        }
      );

      // Image animation - slide in from right with fade
      gsap.fromTo(imageRef.current,
        {
          x: 100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power3.out"
        }
      );

      // Subtle floating animation for the image
      gsap.to(imageRef.current, {
        y: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="flex flex-col md:flex-row justify-between items-center px-8 md:px-20 py-16 max-[768px]:mt-15 max-[556px]:px-5" 
      id="home"
    >
      <div ref={textRef}>
        <HeroText
          paragraph="Discover premium advertising spaces with real-time availability and trusted listings. Seamlessly plan, compare, and book the perfect spot for your brand visibility."
          buttonLabel="Explore Features"
        />
      </div>
      <div ref={imageRef}>
        <HeroImage src={heroImgOne.src} alt="AdZone Preview" />
      </div>
    </section>
  );
};