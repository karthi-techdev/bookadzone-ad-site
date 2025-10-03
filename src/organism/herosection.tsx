import React from "react";
import { HeroText } from "../molecules/herotext";
import { HeroImage } from "../molecules/heroimage";
import heroImgOne from '../../public/media/images/Frame 41.png'

export const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center px-8 md:px-20 py-16 max-[768px]:mt-15 max-[556px]:px-5">
      <HeroText
        paragraph="Discover premium advertising spaces with real-time availability and trusted listings. Seamlessly plan, compare, and book the perfect spot for your brand visibility."
        buttonLabel="Explore Features"
      />
      <HeroImage src={heroImgOne.src} alt="AdZone Preview" />
    </section>
  );
};
