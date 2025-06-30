import React, { useEffect, useState } from 'react';
import Background from '../component/Background';
import Hero from '../component/Hero';
import Product from './Product';
import OurPolicy from '../component/OurPolicy';
import NewLetterBox from '../component/NewLetterBox';
import Footer from '../component/Footer';

function Home() {
  const heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that speaks for you" },
    { text1: "Discover Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Find Your Perfect Fit", text2: "Now on Sale!" },
  ];

  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(prev => (prev === 3 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden relative top-[70px]">
      <div className="w-full lg:h-[100vh] sm:h-[50vh] h-[100vh] bg-gradient-to-bl from-[#141414] to-[#0c2025]">
        <div className="flex flex-col-reverse md:flex-row h-full">
          {/* Left - Text and Circles */}
          <div className="w-full md:w-1/2 h-[50vh] md:h-full flex justify-center items-center">
            <Hero
              heroCount={heroCount}
              setHeroCount={setHeroCount}
              heroData={heroData[heroCount]}
            />
          </div>

          {/* Right - Image */}
          <div className="w-full md:w-1/2 h-[50vh] md:h-full">
            <Background heroCount={heroCount} />
          </div>
        </div>
      </div>
      <Product/>
      <OurPolicy/>
      <NewLetterBox/>
      <Footer/>
    </div>
  );
}

export default Home;
