import { HeroSection } from "@/organism/herosection";
import Image from "next/image";
import productImg1 from '../../public/media/images/baz-img-features-1.png'
import productImg2 from '../../public/media/images/baz-img-features-2.png'
import productImg3 from '../../public/media/images/baz-img-features-3.png'
import productImg4 from '../../public/media/images/baz-img-features-4.png'
import productImg5 from '../../public/media/images/baz-img-features-5.png'
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen text-white flex flex-col ">
      <HeroSection/>

      <section className="features-section">
        <div className="features-grid px-10 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 h-[100%] rounded-xl text-white border border-[1px] border-[var(--light-blur-grey-color)] bg-[var(--light-dark-color)]">
                <div className="content h-[-webkit-fill-available] flex flex-col justify-evenly">
                   <div className="text-content">
                    <h2 className="text-3xl font-medium">Simplifying High-Impact <span className="text-[var(--purple-color)]">Campaign Execution</span></h2>
                   </div>

                   <div className="product-img relative">
                    <Image src={productImg1} alt="Product Image" className="w-full h-auto mt-4 rounded-[1.5rem] mb-4 [mask-image:linear-gradient(to_top,rgba(0,0,0,0)_-0%,#000_50%)] [mask-repeat:no-repeat] [mask-size:100%_100%]"/>
                    <Link href="/" className="absolute bottom-[-0.7rem] bg-[var(--purple-color)] text-white text-sm px-4 py-2 font-medium w-[100%] text-center rounded-full">Explore Features</Link>
                   </div>
                </div>
              </div>

              <div className="pb-6 h-[100%] px-6 rounded-xl text-white border border-[1px] border-[var(--light-blur-grey-color)] bg-[var(--light-dark-color)]">
               <div className="content h-[-webkit-fill-available] flex flex-col justify-between gap-5">
                  <div className="product-img relative">
                    <Image src={productImg2} alt="Product Image" className="w-full h-auto mb-4"/>
                   </div>

                   <div className="text-content">
                    <h2 className="text-3xl font-medium mb-5"><span className="text-[var(--purple-color)]">Effortless </span>Ad Space Discovery</h2>
                    <p className="text-[var(--light-grey-color)] text-xs mt-2 font-medium">Browse verified listings, compare pricing, and book the perfect outdoor media spot all from your fingertips.</p>
                   </div>
               </div>
              </div>

              <div className="flex h-[100%] flex-col justify-between gap-2">
                <div className="rounded-xl text-white border border-[1px] border-[var(--light-blur-grey-color)] bg-[var(--light-dark-color)]">
                  <div className="product-img relative">
                    <Image src={productImg3} alt="Product Image" className="w-full h-auto"/>
                    <h2 className="text-xl font-medium absolute top-0 mt-2 ms-3"><span className="text-[var(--purple-color)]">Strategic </span>Visibility</h2>
                   </div>
                </div>
                <div className="rounded-xl text-white border border-[1px] border-[var(--light-blur-grey-color)] overflow-hidden bg-[var(--light-dark-color)]">
                   <div className="product-img relative flex flex-col justify-center items-center ">
                    <Image src={productImg4} alt="Product Image" className="w-full h-auto scale-[1.07]"/>
                    <Link href="/" className="absolute bottom-[0.5rem] bg-[var(--purple-color)] text-white text-sm px-4 py-2 font-medium w-[90%] text-center rounded-full"> View Nearby Ad Locations</Link>
                   </div>
                </div>
              </div>

              <div className="pt-6 h-[100%] px-6 rounded-xl text-white border border-[1px] border-[var(--light-blur-grey-color)] bg-[var(--light-dark-color)]">
                <div className="content h-[-webkit-fill-available] flex flex-col justify-between">
                   <div className="text-content">
                    <h2 className="text-3xl font-medium">Book Hoardings in <span className="text-[var(--purple-color)]">Seconds</span></h2>
                    <p className="text-[var(--light-grey-color)] text-xs mt-3 font-medium">Discover, compare, and instantly book billboard spaces with real-time availability.</p>
                   </div>

                   <div className="product-img relative">
                    <Image src={productImg5} alt="Product Image" className="w-full h-auto mt-4"/>
                   </div>
                </div>
              </div>
          </div>
        </div>
      </section>
    </main>
  );
}
