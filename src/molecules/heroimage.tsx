import React from "react";
import Image from "next/image";

type HeroImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export const HeroImage: React.FC<HeroImageProps> = ({ src, alt, width = 400, height = 300 }) => {
  return (
    <div className="rounded-xl cursor-pointer mt-8 ml-4 max-[768px]:ml-0">
      <Image 
        src={src} 
        alt={alt} 
        width={width} 
        height={height}
        style={{ width: 'auto', height: 'auto' }}
      />
    </div>
  );
};
