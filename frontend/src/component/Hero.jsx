import React from 'react';
import { FaCircle } from 'react-icons/fa';

function Hero({ heroData, heroCount, setHeroCount }) {
  return (
    <div className="text-white w-full h-full px-6 md:px-12 flex flex-col justify-center items-start space-y-6">
      <div>
        <h1 className="text-[24px] md:text-[36px] lg:text-[44px] font-bold leading-tight">
          {heroData.text1}
        </h1>
        <p className="text-[16px] md:text-[20px] text-gray-300 mt-2">
          {heroData.text2}
        </p>
      </div>

      {/* Circles */}
      <div className="flex gap-3 mt-4">
        {[0, 1, 2, 3].map((i) => (
          <FaCircle
            key={i}
            className={`w-[14px] h-[14px] cursor-pointer transition-all duration-300 ${
              heroCount === i ? 'fill-orange-400 scale-110' : 'fill-gray-300 hover:fill-orange-300'
            }`}
            onClick={() => setHeroCount(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;
