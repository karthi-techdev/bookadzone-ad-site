"use client"

import { HeroSection } from "@/organism/herosection";
import Image from "next/image";
import productImg1 from '../../public/media/images/baz-img-features-1.png'
import productImg2 from '../../public/media/images/baz-img-features-2.png'
import productImg3 from '../../public/media/images/baz-img-features-3.png'
import productImg4 from '../../public/media/images/baz-img-features-4.png'
import productImg5 from '../../public/media/images/baz-img-features-5.png'
import productImgLaptop from '../../public/media/images/baz-img-laptop.png'
import productImgBeam from '../../public/media/images/baz-img-beam.png'
import productLapImg from '../../public/media/images/baz-laptop-content-search.jpg'
import Link from "next/link";
import React, { forwardRef, useRef, useState, useEffect } from "react"
import { cn } from "../lib/utils"
import { AnimatedBeam } from "../components/ui/animated-beam"
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";
import { RiAiGenerate2 } from "react-icons/ri";
import { IoQrCode } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { BsCalendarCheck } from "react-icons/bs";
import { BiSolidCategoryAlt, BiSolidEdit } from "react-icons/bi";
import { PiLightningFill } from "react-icons/pi";
import { AiOutlineFileDone } from "react-icons/ai";
import { FiCheckCircle,FiMail } from "react-icons/fi";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof globalThis.window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface InfoSectionProps {
  className?: string;
}

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-40 cursor-pointer group flex relative size-17 max-[556px]:size-14 items-center justify-center rounded-full border-1 border-[#6f6f6f] p-3 backdrop-blur-[2rem] bg-gradient-to-b from-[#7f6af708] to-[#000000]",
        className
      )}
    >
      {children}
    </div>
  )
})
Circle.displayName = "Circle"

interface FAQItem {
  question: string;
  answer: string;
}

export default function Home() {
  const isBrowser = typeof globalThis.window !== 'undefined';
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const div5Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)

  // Refs for animation sections
  const featuresGridRef = useRef<HTMLDivElement>(null)
  const laptopSectionRef = useRef<HTMLDivElement>(null)
  const beamSectionRef = useRef<HTMLDivElement>(null)
  const screenContentRef = useRef<HTMLDivElement>(null)
  const stepSectionRef = useRef<HTMLDivElement>(null)
  const countdownRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)
  const newsletterRef = useRef<HTMLDivElement>(null)

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [subscribeError, setSubscribeError] = useState<string>('');
  const [subscribeSuccess, setSubscribeSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const targetDate = new Date('2026-08-31T00:00:00').getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference > 0) {
        setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((difference % (1000 * 60)) / 1000));
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  // GSAP Animations
  useEffect(() => {
    // Features Grid Animation
    if (featuresGridRef.current) {
      const featuresItems = featuresGridRef.current.querySelectorAll('.feature-item');
      
      gsap.fromTo(featuresItems, 
        {
          y: 100,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresGridRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Laptop Section Animation
    if (laptopSectionRef.current) {
      const laptopImg = laptopSectionRef.current.querySelector('.img-laptop');
      const contentBoxes = laptopSectionRef.current.querySelectorAll('.content-box');
      
      gsap.fromTo(laptopImg,
        {
          scale: 0.5,
          opacity: 0,
          rotationY: 180
        },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: laptopSectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(contentBoxes,
        {
          x: (index) => index % 2 === 0 ? -100 : 100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: laptopSectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Animated Beam Section
    if (beamSectionRef.current) {
      const circles = beamSectionRef.current.querySelectorAll('.circle-animate');
      const title = beamSectionRef.current.querySelector('.title-head');
      
      gsap.fromTo(title,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: beamSectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(circles,
        {
          scale: 0,
          rotation: 180,
          opacity: 0
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: beamSectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Screen Content Section
    if (screenContentRef.current) {
      gsap.fromTo(screenContentRef.current,
        {
          scale: 0.8,
          opacity: 0,
          y: 100
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: screenContentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Step Section Animation
    if (stepSectionRef.current) {
      const steps = stepSectionRef.current.querySelectorAll('.step-item');
      const gradientBg = stepSectionRef.current.querySelector('.gradient-bg');
      
      gsap.fromTo(steps,
        {
          x: -100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stepSectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(gradientBg,
        {
          scale: 0.5,
          opacity: 0,
          rotation: 45
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stepSectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Countdown Animation
    if (countdownRef.current) {
      const countdownItems = countdownRef.current.querySelectorAll('.countdown-item');
      const countdownText = countdownRef.current.querySelector('.countdown-text');
      
      gsap.fromTo(countdownText,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: countdownRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(countdownItems,
        {
          y: 100,
          opacity: 0,
          scale: 0.5
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: countdownRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // FAQ Section Animation
    if (faqRef.current) {
      const faqItems = faqRef.current.querySelectorAll('.faq-item');
      const faqTitle = faqRef.current.querySelector('.faq-title');
      
      gsap.fromTo(faqTitle,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(faqItems,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Newsletter Animation
    if (newsletterRef.current) {
      gsap.fromTo(newsletterRef.current,
        {
          scale: 0.8,
          opacity: 0,
          y: 50
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: newsletterRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Parallax effect for background elements
    gsap.to(".parallax-bg", {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: "main",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Clean up ScrollTrigger instances
    return () => {
      for (const trigger of ScrollTrigger.getAll()) {
        trigger.kill();
      }
    };
  }, []);

  interface FAQItem {
    id: string;
    question: string;
    answer: string;
  }

  const faqData: FAQItem[] = [
    {
      id: "faq-1",
      question: "How do I book a billboard through Bookadzone?",
      answer: "Simply search for your desired location, compare available ad spaces, and click \"Book Now.\" Upload your creative and confirm the booking in just a few clicks."
    },
    {
      id: "faq-2",
      question: "Can I see the availability of ad spaces in real-time?",
      answer: "Yes, our platform provides real-time availability updates for all ad spaces. You can see which locations are available for your desired dates instantly."
    },
    {
      id: "faq-3",
      question: "What types of ad spaces can I book?",
      answer: "We offer various ad space types including billboards, digital displays, transit ads, and indoor advertising spaces. Each type comes with detailed specifications."
    },
    {
      id: "faq-4",
      question: "How do I know which location is best for my campaign?",
      answer: "Our platform provides analytics and insights for each location, including traffic data, audience demographics, and performance metrics to help you make informed decisions."
    },
    {
      id: "faq-5",
      question: "Do I need to coordinate separately with agencies?",
      answer: "No, Bookadzone handles all coordination with property owners and agencies. You can manage your entire campaign through our unified platform."
    }
  ];

  
  return (
    <main className="min-h-screen text-white overflow-hidden">
      <HeroSection/>

    <section className="info-section" ref={featuresGridRef}>
      <div className="features-grid px-10 mb-35 max-[768px]:mb-10 max-[556px]:px-5">
        <div className="grid grid-cols-4 max-[820px]:grid-cols-2 max-[600px]:grid-cols-1 gap-6">
            <div className="feature-item p-6 max-[1110px]:p-5 max-[865px]:p-4 max-[820px]:p-6 h-[100%] rounded-xl text-white border border-[1px] border-[var(--light-blur-grey-color)] bg-[var(--light-dark-color)]">
              <div className="content h-[-webkit-fill-available] flex flex-col justify-evenly">
                  <div className="text-content">
                  <h2 className="text-[1.6rem] max-[1195px]:text-[1.4rem] max-[1110px]:text-[1.3rem] font-medium max-[1010px]:text-[1.2rem] max-[950px]:text-[1rem] max-[820px]:text-[1.8rem] max-[680px]:text-[1.5rem]">Simplifying High-Impact <span className="text-[var(--purple-color)]">Campaign Execution</span></h2>
                  </div>

                  <div className="product-img relative">
                  <Image src={productImg1} alt="Product Image" className="w-full h-auto mt-4 rounded-[1.5rem] mb-4 max-[970px]:mb-2 max-[970px]:mt-2 [mask-image:linear-gradient(to_top,rgba(0,0,0,0)_-0%,#000_50%)] [mask-repeat:no-repeat] [mask-size:100%_100%]"/>
                  <Link href="#features" className="absolute max-[1195px]:text-[.8rem] max-[1115px]:text-[.7rem] max-[950px]:text-[.6rem] max-[820px]:text-[.8rem] bottom-[-0.7rem] bg-[var(--purple-color)] text-white text-sm px-4 py-2 font-medium w-[100%] text-center rounded-full max-[680px]:text-[.7rem]">Explore Features</Link>
                  </div>
              </div>
            </div>

            <div className="feature-item pb-6 max-[1110px]:pb-5 max-[1110px]:px-5 h-[100%] max-[865px]:pb-4 max-[865px]:px-4 px-6 max-[820px]:px-6 max-[820px]:pb-6 rounded-xl text-white border border-[1px] border-[var(--light-blur-grey-color)] bg-[var(--light-dark-color)]">
              <div className="content h-[-webkit-fill-available] flex flex-col justify-between gap-5">
                <div className="product-img relative">
                  <Image src={productImg2} alt="Product Image" className="w-full h-auto mb-4 max-[970px]:mb-2"/>
                  </div>

                  <div className="text-content">
                  <h2 className="text-[1.6rem] max-[1195px]:text-[1.4rem] font-medium mb-5 max-[1110px]:text-[1.3rem] max-[1110px]:mb-3 max-[1010px]:text-[1.2rem] max-[950px]:text-[1rem] max-[820px]:text-[1.8rem] max-[680px]:text-[1.5rem]"><span className="text-[var(--purple-color)]">Effortless </span>Ad Space Discovery</h2>
                  <p className="text-[var(--light-grey-color)] text-xs max-[1195px]:text-[.7rem] max-[1115px]:text-[.6rem] mt-2 font-medium max-[970px]:text-[.5rem] max-[820px]:text-[.8rem] max-[680px]:text-[.8rem]">Browse verified listings, compare pricing, and book the perfect outdoor media spot all from your fingertips.</p>
                  </div>
              </div>
            </div>

            <div className="flex h-[100%] flex-col justify-between gap-5 max-[1125px]:gap-3 max-[820px]:gap-5">
              <div className="feature-item rounded-xl text-white border border-[1px] border-[var(--light-blur-grey-color)] bg-[var(--light-dark-color)]">
                <div className="product-img relative">
                  <Image src={productImg3} alt="Product Image" className="w-full h-auto"/>
                  <h2 className="text-xl font-medium absolute top-0 mt-2 ms-3 max-[1125px]:text-[1.1rem] max-[950px]:text-[1rem] max-[820px]:text-[1.3rem]"><span className="text-[var(--purple-color)]">Strategic </span>Visibility</h2>
                  </div>
              </div>
              <div className="feature-item rounded-xl text-white border border-[1px] border-[var(--light-blur-grey-color)] overflow-hidden bg-[var(--light-dark-color)]">
                  <div className="product-img relative flex flex-col justify-center items-center ">
                  <Image src={productImg4} alt="Product Image" className="w-full h-auto scale-[1.07]"/>
                  <Link href="javascript:void(0)" className="absolute bottom-[0.5rem] max-[1195px]:text-[.8rem] max-[950px]:text-[.6rem] bg-[var(--purple-color)] text-white text-sm max-[1115px]:text-[.7rem] px-4 py-2 font-medium w-[90%] text-center rounded-full max-[820px]:text-[.8rem] max-[680px]:text-[.7rem]"> View Nearby Ad Locations</Link>
                  </div>
              </div>
            </div>

            <div className="feature-item pt-6 max-[1110px]:pt-5 max-[865px]:pt-4 max-[1110px]:px-5 max-[865px]:px-4 max-[820px]:px-6 max-[820px]:pt-6 h-[100%] px-6 rounded-xl text-white border border-[1px] border-[var(--light-blur-grey-color)] bg-[var(--light-dark-color)]">
              <div className="content h-[-webkit-fill-available] flex flex-col justify-between">
                  <div className="text-content">
                  <h2 className="text-[1.6rem] max-[1195px]:text-[1.4rem] font-medium max-[1110px]:text-[1.3rem] max-[1010px]:text-[1.2rem] max-[950px]:text-[1rem] max-[820px]:text-[1.8rem] max-[680px]:text-[1.5rem]">Book Hoardings in <span className="text-[var(--purple-color)]">Seconds</span></h2>
                  <p className="text-[var(--light-grey-color)] text-xs mt-3 max-[1195px]:text-[.7rem] max-[1115px]:text-[.6rem] font-medium max-[1110px]:mt-2 max-[970px]:text-[.5rem] max-[820px]:text-[.8rem] max-[680px]:text-[.8rem]">Discover, compare, and instantly book billboard spaces with real-time availability.</p>
                  </div>

                  <div className="product-img relative">
                  <Image src={productImg5} alt="Product Image" className="w-full h-auto mt-4 max-[970px]:mt-2"/>
                  </div>
              </div>
            </div>
        </div>
      </div>
    </section>

    <section className="laptop-section" ref={laptopSectionRef}>
      <div className="laptop-grid px-10 mt-30 mb-30 max-[768px]:mt-0 max-[768px]:mb-15 max-[556px]:px-5">
          <div className="grid grid-cols-3 max-[992px]:grid-cols-1 max-[600px]:grid-cols-1 gap-6">
              <div className="content flex flex-col gap-8 items-start max-[1145px]:gap-5 max-[992px]:flex-row max-[620px]:flex-col ">
                <div className="content-box w-[70%] max-[992px]:w-[100%] max-[620px]:text-center">
                  <h3 className="text-[1rem] font-bold max-[1145px]:text-[.9rem] max-[992px]:text-[1.2rem] max-[768px]:text-[1rem]">01 Strategic Reach</h3>
                  <p className="text-[.7rem] text-[var(--light-grey-color)] max-[1145px]:text-[.6rem] max-[992px]:text-[.8rem] max-[768px]:text-[.8rem] font-medium">Find and book premium outdoor media spaces across top cities to maximize brand visibility.</p>
                </div>

                <div className="content-box w-[70%] max-[992px]:w-[100%] max-[992px]:text-right max-[620px]:text-center">
                  <h3 className="text-[1rem] font-bold max-[1145px]:text-[.9rem] max-[992px]:text-[1.2rem] max-[768px]:text-[1rem]">02 Effortless Discovery</h3>
                  <p className="text-[.7rem] text-[var(--light-grey-color)] max-[1145px]:text-[.6rem] max-[992px]:text-[.8rem] max-[768px]:text-[.8rem] font-medium">Search locations, compare options, and secure your perfect ad spot in just a few clicks.</p>
                </div>
              </div>

              <div className="img-laptop flex justify-center items-center">
                <Image src={productImgLaptop} alt="Product Image" className="w-full h-auto scale-[1.7] max-[992px]:scale-none"/>
              </div>

              <div className="content flex flex-col gap-8 items-end max-[1145px]:gap-5 max-[992px]:flex-row max-[620px]:flex-col">
                <div className="content-box w-[70%] max-[992px]:w-[100%] max-[620px]:text-center">
                  <h3 className="text-[1rem] font-bold max-[1145px]:text-[.9rem] max-[992px]:text-[1.2rem] max-[768px]:text-[1rem]">03 Smart Campaign Execution</h3>
                  <p className="text-[.7rem] text-[var(--light-grey-color)] max-[1145px]:text-[.6rem] max-[992px]:text-[.8rem] max-[768px]:text-[.8rem] font-medium">Manage creatives, bookings, and agencies all in one platform, hassle-free campaign management.</p>
                </div>

                <div className="content-box w-[70%] max-[992px]:w-[100%] max-[992px]:text-right max-[620px]:text-center">
                  <h3 className="text-[1rem] font-bold max-[1145px]:text-[.9rem] max-[992px]:text-[1.2rem] max-[768px]:text-[1rem]">04 Data-Driven Insights</h3>
                  <p className="text-[.7rem] text-[var(--light-grey-color)] max-[1145px]:text-[.6rem] max-[992px]:text-[.8rem] max-[768px]:text-[.8rem] font-medium">Track campaign performance with detailed analytics to optimize reach, engagement, and ROI.</p>
                </div>
              </div>
          </div>
      </div>
    </section>

    <section className="mobile-beam-section mt-40 max-[992px]:mt-20" id="features" ref={beamSectionRef}>
      <div className="title-head text-center flex flex-col">
        <span className="text-center text-[var(--light-grey-color)] font-semibold">Features</span>
        <h3 className="text-3xl max-[556px]:text-[2rem] font-bold text-white mx-5">Your complete <span className="text-[var(--purple-color)]">Powerhouse</span> for outdoor ads.</h3>
      </div>

      <div className="animated-beam-container mt-5">
        <div className="relative flex h-[550px] w-full items-center justify-center p-10" ref={containerRef}>
          <div className="flex size-full max-h-[600px] max-w-[900px] flex-col items-stretch justify-between gap-10">
            <div className="flex flex-row items-center justify-between">
              <Circle ref={div1Ref} className="circle-animate relative z-40 select-none touch-manipulation">
                <RiAiGenerate2 className="size-5" />
                <div className="popup backdrop-blur-[5px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform translate-y-2 group-hover:translate-y-0 invisible group-hover:visible bg-[var(--light-dark-color)] p-2 absolute left-[5rem] max-[850px]:left-[0rem] max-[850px]:bottom-[-5rem] w-[10rem] border border-[1px] border-[var(--light-blur-grey-color)] rounded-sm shadow-lg text-left z-50 select-none max-[850px]:touch-manipulation max-[850px]:group-active:opacity-100 max-[850px]:group-active:visible max-[850px]:group-active:translate-y-0">
                  <h4 className="text-[.7rem] mb-1 select-none">Smart AI Suggestions</h4>
                  <p className="text-[.5rem] text-[var(--light-grey-color)] select-none">Get personalized ad placement recommendations powered by AI for maximum visibility and ROI.</p>
                </div>
              </Circle>
              <Circle ref={div5Ref} className="circle-animate relative z-40 select-none touch-manipulation">
                <IoQrCode />
                <div className="popup backdrop-blur-[5px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform translate-y-2 group-hover:translate-y-0 invisible group-hover:visible bg-[var(--light-dark-color)] p-2 absolute right-[5rem] max-[850px]:right-[0rem] max-[850px]:bottom-[-5rem] w-[10rem] border border-[1px] border-[var(--light-blur-grey-color)] rounded-sm shadow-lg text-left z-50 select-none max-[850px]:touch-manipulation max-[850px]:group-active:opacity-100 max-[850px]:group-active:visible max-[850px]:group-active:translate-y-0">
                  <h4 className="text-[.7rem] mb-1 select-none">QR Code Booking</h4>
                  <p className="text-[.5rem] text-[var(--light-grey-color)] select-none">Every billboard comes with a unique QR code, scan it on site to check availability and book instantly.</p>
                </div>
              </Circle>
              </div>
              <div className="flex flex-row items-center justify-between">
              <Circle ref={div2Ref} className="circle-animate relative z-40 select-none touch-manipulation">
                <FaLocationDot className="size-5" />
                <div className="popup backdrop-blur-[5px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform translate-y-2 group-hover:translate-y-0 invisible group-hover:visible bg-[var(--light-dark-color)] p-2 absolute left-[5rem] max-[850px]:left-[0rem] max-[850px]:bottom-[-5rem] w-[10rem] border border-[1px] border-[var(--light-blur-grey-color)] rounded-sm shadow-lg text-left z-50 select-none max-[850px]:touch-manipulation max-[850px]:group-active:opacity-100 max-[850px]:group-active:visible max-[850px]:group-active:translate-y-0">
                  <h4 className="text-[.7rem] mb-1 select-none">Location Based Search</h4>
                  <p className="text-[.5rem] text-[var(--light-grey-color)] select-none">Discover available ad spaces across cities and highways with precise map-based navigation.</p>
                </div>
              </Circle>
              <Circle ref={div4Ref} className="circle-animate size-20 z-10">
                <Image  src={productImgBeam} alt="Product Image" className="w-full h-auto scale-[4.5] max-[556px]:scale-[6]"/>
              </Circle>
              <Circle ref={div6Ref} className="circle-animate relative z-40 select-none touch-manipulation">
                <BiSolidCategoryAlt className="size-5" />
                <div className="popup backdrop-blur-[5px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform translate-y-2 group-hover:translate-y-0 invisible group-hover:visible bg-[var(--light-dark-color)] p-2 absolute right-[5rem] w-[10rem] max-[850px]:right-[0rem] max-[850px]:bottom-[-5rem] border border-[1px] border-[var(--light-blur-grey-color)] rounded-sm shadow-lg text-left z-50 select-none max-[850px]:touch-manipulation max-[850px]:group-active:opacity-100 max-[850px]:group-active:visible max-[850px]:group-active:translate-y-0">
                  <h4 className="text-[.7rem] mb-1 select-none">Explore Ad Formats</h4>
                  <p className="text-[.5rem] text-[var(--light-grey-color)] select-none">Browse multiple advertising formats including hoardings, unipoles, digital boards, and more.</p>
                </div>
              </Circle>
              </div>
              <div className="flex flex-row items-center justify-between">
              <Circle ref={div3Ref} className="circle-animate relative z-40 select-none touch-manipulation">
                <BsCalendarCheck className="size-5" />
                <div className="popup backdrop-blur-[5px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform translate-y-2 group-hover:translate-y-0 invisible group-hover:visible bg-[var(--light-dark-color)] p-2 absolute left-[5rem] max-[850px]:left-[0rem] max-[850px]:bottom-[-5rem] w-[10rem] border border-[1px] border-[var(--light-blur-grey-color)] rounded-sm shadow-lg text-left z-50 select-none max-[850px]:touch-manipulation max-[850px]:group-active:opacity-100 max-[850px]:group-active:visible max-[850px]:group-active:translate-y-0">
                  <h4 className="text-[.7rem] mb-1 select-none">Easy Scheduling</h4>
                  <p className="text-[.5rem] text-[var(--light-grey-color)] select-none">Book, manage, and schedule your campaigns seamlessly with flexible date options.</p>
                </div>
              </Circle>
              <Circle ref={div7Ref} className="circle-animate relative z-40 select-none touch-manipulation">
                <PiLightningFill className="size-5"/>
                <div className="popup backdrop-blur-[5px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform translate-y-2 group-hover:translate-y-0 invisible group-hover:visible bg-[var(--light-dark-color)] p-2 absolute right-[5rem] max-[850px]:right-[0rem] max-[850px]:bottom-[-5rem] w-[10rem] border border-[1px] border-[var(--light-blur-grey-color)] rounded-sm shadow-lg text-left z-50 select-none max-[850px]:touch-manipulation max-[850px]:group-active:opacity-100 max-[850px]:group-active:visible max-[850px]:group-active:translate-y-0">
                  <h4 className="text-[.7rem] mb-1 select-none">Instant Booking</h4>
                  <p className="text-[.5rem] text-[var(--light-grey-color)] select-none">Reserve your preferred ad space in just a few clicks, fast, secure, and hassle-free.</p>
                </div>
              </Circle>
            </div>
          </div>
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div1Ref}
            toRef={div4Ref}
            curvature={-200}
            endYOffset={-10}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div2Ref}
            toRef={div4Ref}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div3Ref}
            toRef={div4Ref}
            curvature={200}
            endYOffset={10}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div5Ref}
            toRef={div4Ref}
            curvature={-200}
            endYOffset={-10}
            reverse
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div6Ref}
            toRef={div4Ref}
            reverse
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div7Ref}
            toRef={div4Ref}
            curvature={200}
            endYOffset={10}
            reverse
          />
        </div>
      </div>
    </section>

    <section className="screen-content-section" ref={screenContentRef}>
      <div className="content px-10 mb-20 mt-20 max-[768px]:mt-15 flex">
        <Image src={productLapImg} alt="Product Image" className="w-full h-auto border border-[1px] border-[var(--light-blur-grey-color)] rounded-tr-[1.3rem] rounded-tl-[1.3rem] [mask-image:linear-gradient(to_top,rgba(0,0,0,0)_-0%,#000_60%)] [mask-repeat:no-repeat] [mask-size:100%_100%] shadow-lg"/>
      </div>
    </section>

    <section className="step-section" id="how-it-works" ref={stepSectionRef}>
      <div className="container flex flex-wrap px-10 mt-20 mb-20 max-[768px]:mt-0 max-[768px]:mb-15 max-[556px]:px-5 w-full mx-auto">
        <div className="flex flex-col items-center md:flex-row w-full h-fit md:space-x-10 space-y-10 md:space-y-0">
          <div className="md:w-3/5 w-full md:pr-10 md:py-6">
            <div className="step-item flex relative pb-12">
              <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-[2px] bg-[var(--white-glass-color)] pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-10 h-10 rounded-full border-1 border-[#6f6f6f] backdrop-blur-[5px] bg-gradient-to-b from-[#7f6af708] to-[#000000] inline-flex items-center justify-center text-white relative z-10">
                <FaLocationDot />
              </div>
              <div className="flex-grow pl-4">
                <h2 className="font-semibold text-sm text-white mb-1 tracking-wider">Step 1</h2>
                <p className="leading-relaxed text-[var(--light-grey-color)] text-xs font-medium max-[680px]:text-[.8rem]">Discover premium billboard spaces across cities. Use our interactive map to browse and filter by location, size, and visibility.</p>
              </div>
            </div>
            <div className="step-item flex relative pb-12">
              <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-[2px] bg-[var(--white-glass-color)] pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-10 h-10 rounded-full border-1 border-[#6f6f6f] backdrop-blur-[5px] bg-gradient-to-b from-[#7f6af708] to-[#000000] inline-flex items-center justify-center text-white relative z-10">
                 <BsCalendarCheck />
              </div>
              <div className="flex-grow pl-4">
                <h2 className="font-semibold text-sm text-white mb-1 tracking-wider">Step 2</h2>
                <p className="leading-relaxed text-[var(--light-grey-color)] text-xs font-medium max-[680px]:text-[.8rem]">View real-time availability and compare pricing instantly. Get detailed insights like audience reach, traffic count, and best time to advertise.</p>
              </div>
            </div>
            <div className="step-item flex relative pb-12">
              <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-[2px] bg-[var(--white-glass-color)] pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-10 h-10 rounded-full border-1 border-[#6f6f6f] backdrop-blur-[5px] bg-gradient-to-b from-[#7f6af708] to-[#000000] inline-flex items-center justify-center text-white relative z-10">
                <BiSolidEdit />
              </div>
              <div className="flex-grow pl-4">
                <h2 className="font-semibold text-sm text-white mb-1 tracking-wider">Step 3</h2>
                <p className="leading-relaxed text-[var(--light-grey-color)] text-xs font-medium max-[680px]:text-[.8rem]">Choose your duration, format, and placement preferences. Our AI-powered recommendations help you select the most impactful spots.</p>
              </div>
            </div>
            <div className="step-item flex relative pb-12">
              <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-[2px] bg-[var(--white-glass-color)] pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-10 h-10 rounded-full border-1 border-[#6f6f6f] backdrop-blur-[5px] bg-gradient-to-b from-[#7f6af708] to-[#000000] inline-flex items-center justify-center text-white relative z-10">
                <AiOutlineFileDone/>
              </div>
              <div className="flex-grow pl-4">
                <h2 className="font-semibold text-sm text-white mb-1 tracking-wider">Step 4</h2>
                <p className="leading-relaxed text-[var(--light-grey-color)] text-xs font-medium max-[680px]:text-[.8rem]">Review your selections and book your ad space securely. Get instant confirmation with digital proof and billing transparency.</p>
              </div>
            </div>
            <div className="step-item flex relative">
              <div className="flex-shrink-0 w-10 h-10 rounded-full border-1 border-[#6f6f6f] backdrop-blur-[5px] bg-gradient-to-b from-[#7f6af708] to-[#000000] inline-flex items-center justify-center text-white relative z-10">
                <FiCheckCircle  />
              </div>
              <div className="flex-grow pl-4">
                <h2 className="font-semibold  text-sm text-white mb-1 tracking-wider">Finish</h2>
                <p className="leading-relaxed text-[var(--light-grey-color)] text-xs font-medium max-[680px]:text-[.8rem]">Once approved, your brand goes live on the billboard network. Track performance and ROI from your personalized dashboard.</p>
              </div>
            </div>
          </div>
          <div className="gradient-bg md:w-3/5 w-full flex items-center justify-center overflow-hidden">
            <BackgroundGradientAnimation>
             <Image src={productImgBeam} alt="Product Image" className="w-[25rem] max-[768px]:w-[20rem] absolute z-[100] top-15 left-1/2 -translate-x-1/2"/>
            </BackgroundGradientAnimation>
          </div>
        </div>
      </div>
    </section>

    <section className="countdown-section flex flex-col items-center justify-center p-4 relative overflow-hidden" ref={countdownRef}>
      
      <div className="w-full max-w-4xl mx-auto text-center">
        <h3 className="countdown-text text-3xl max-[556px]:text-[2rem] font-bold text-white mb-3">
          <span className="text-[#7F6AF7]">Next&#8208;Gen Billboard Experience</span> Arrives Soon&#33;
        </h3>
        
        <p className="countdown-text text-xs text-[var(--light-grey-color)] max-w-md mx-auto mb-10 leading-relaxed max-[680px]:text-[.8rem] font-medium">
          Revolutionizing how brands connect with people&#x2c; get ready for the transformation.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="countdown-item bg-[#080411b3] backdrop-blur-lg rounded-lg p-6 border border-[#98a9b882]">
            <div className="text-3xl md:text-4xl font-bold text-white">{days}</div>
            <div className="text-xs text-[#98A9B8] mt-2">Days</div>
          </div>
          <div className="countdown-item bg-[#080411b3] backdrop-blur-lg rounded-lg p-6 border border-[#98a9b882]">
            <div className="text-3xl md:text-4xl font-bold text-white">{hours}</div>
            <div className="text-xs text-[#98A9B8] mt-2">Hours</div>
          </div>
          <div className="countdown-item bg-[#080411b3] backdrop-blur-lg rounded-lg p-6 border border-[#98a9b882]">
            <div className="text-3xl md:text-4xl font-bold text-white">{minutes}</div>
            <div className="text-xs text-[#98A9B8] mt-2">Minutes</div>
          </div>
          <div className="countdown-item bg-[#080411b3] backdrop-blur-lg rounded-lg p-6 border border-[#98a9b882]">
            <div className="text-3xl md:text-4xl font-bold text-white">{seconds}</div>
            <div className="text-xs text-[#98A9B8] mt-2">Seconds</div>
          </div>
        </div>
      </div>
    </section>

   <section className="faq-section w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="faqs" ref={faqRef}>
    <div className="faq-title mb-10 flex flex-col items-center text-center">
      <h1 className="text-3xl max-[556px]:text-[2rem] font-bold text-white mb-3">
        Frequently asked <span className="text-[var(--purple-color)]">questions</span>
      </h1>
    </div>

    <div className="space-y-8 max-[570px]:space-y-6">
      {faqData.map((faq, index) => (
        <div
          key={faq.id}
          className="faq-item transition-shadow duration-200"
        >
        <button
          className={`w-full px-6 py-5 max-[570px]:px-4 max-[570px]:py-3 text-left flex justify-between cursor-pointer items-center rounded-[5rem] border border-[var(--light-blur-grey-color)] ${
            openIndex === index 
              ? 'bg-gradient-to-b from-[#7f6af708] to-[#000000]' 
              : 'bg-[var(--light-dark-color)]'
          }`}
          onClick={() => toggleAccordion(index)}
          aria-expanded={openIndex === index}
          aria-controls={`faq-content-${index}`}
        >
            <span className="text-sm max-[570px]:text-[.75rem] font-semibold text-white pr-4">
              {index + 1}. {faq.question}
            </span>
            {openIndex === index ? (
              <FaChevronUp 
                className="flex-shrink-0 w-4 h-4 text-[var(--light-grey-color)] transition-transform duration-200" 
                aria-hidden="true"
              />
            ) : (
              <FaChevronDown 
                className="flex-shrink-0 w-4 h-4 text-[var(--light-grey-color)] transition-transform duration-200" 
                aria-hidden="true"
              />
            )}
          </button>
          
          <div
            id={`faq-content-${index}`}
            className={`px-5 transition-all duration-300 ease-in-out bg-transparent ${
              openIndex === index 
                ? 'opacity-100 max-h-96 pb-4' 
                : 'opacity-0 max-h-0 overflow-hidden'
            }`}
          >
            <div className="pt-4">
              <p className="text-[var(--light-grey-color)] text-sm leading-relaxed font-medium max-[570px]:text-[.75rem] max-[680px]:text-[.8rem] font-medium">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>

  <section className="text-white my-10 flex items-center justify-center mx-5" ref={newsletterRef}>
    <div className="max-w-2xl w-full text-center">
      <h2 className="text-3xl max-[556px]:text-[2rem] font-bold text-white mb-3">
        Get The Latest{" "}
        <span className="text-[var(--purple-color)]">Update&apos;s and deals.</span>
      </h2>

      <p className="text-xs text-[var(--light-grey-color)] max-w-md mx-auto mb-10 leading-relaxed max-[680px]:text-[.8rem] font-medium">
        Stay updated with the latest travel tips, blog posts, and exclusive
        deals. Subscribe to our newsletter and never miss an update.
      </p>

      <form 
        className="flex flex-col gap-2"
        onSubmit={async (e) => {
          if (!isBrowser) return;
          e.preventDefault();
          const form = e.currentTarget;
          const email = (form.querySelector('input[type="email"]') as HTMLInputElement).value;

          if (!email.trim()) {
            setSubscribeError('Email is required');
            return;
          }

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.exec(email)) {
            setSubscribeError('Please enter a valid email');
            return;
          }

          setIsLoading(true);
          try {
            const response = await fetch('/api/subscribe', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
              if (response.status === 409) {
                setSubscribeError('This email is already subscribed');
              } else {
                setSubscribeError(data.error || 'Failed to subscribe');
              }
              return;
            }

            // Success
            setSubscribeError('');
            setSubscribeSuccess(true);
            form.reset();
            setTimeout(() => setSubscribeSuccess(false), 3000);

          } catch (error) {
            console.error('Subscription error:', error);
            if (error instanceof Error) {
              setSubscribeError(`Failed to subscribe: ${error.message}`);
            } else {
              setSubscribeError('Failed to subscribe. Please try again.');
            }
          } finally {
            setIsLoading(false);
          }
        }}
      >
        <div className="flex items-center bg-[var(--light-dark-color)] rounded-full overflow-hidden shadow-md border border-[var(--light-blur-grey-color)] transition-all duration-300"
             style={{ borderColor: subscribeError ? 'rgb(239, 68, 68)' : '' }}>
          <div className="flex items-center flex-grow px-4">
            <FiMail className="text-gray-400 w-5 h-5 mr-3" />
            <input
              type="email"
              placeholder="Enter your E-mail Address"
              className="bg-transparent w-full py-3 text-sm text-gray-200 placeholder-gray-400 focus:outline-none"
              onChange={(e) => {
                const value = e.target.value.trim();
                if (subscribeError) setSubscribeError('');
                
                if (!value) {
                  setSubscribeError('Email is required');
                } else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).exec(value)) {
                  setSubscribeError('Please enter a valid email');
                } else {
                  setSubscribeError('');
                }
              }}
            />
          </div>
          <button
            type="submit"
            className="bg-[var(--purple-color)] hover:bg-[var(--light-purple-color)] text-white font-semibold px-10 py-3 rounded-full transition-all duration-300 max-[556px]:px-7 max-[556px]:py-3"
            disabled={!!subscribeError || isLoading}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
        {subscribeError && (
          <p className="text-red-500 text-xs px-4">{subscribeError}</p>
        )}
        {subscribeSuccess && (
          <p className="text-green-500 text-xs px-4">Successfully subscribed!</p>
        )}
      </form>
    </div>
  </section>

    </main>
  );
}