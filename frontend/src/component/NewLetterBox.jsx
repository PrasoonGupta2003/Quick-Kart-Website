import React from 'react';
import { RiExchangeFundsLine } from 'react-icons/ri';
import { MdLocalShipping, MdOutlineSupportAgent } from 'react-icons/md';
import { BsShieldCheck } from 'react-icons/bs';

function NewLetterBox() {
  return (
    <div className='w-full bg-[#0f172a] text-white px-4 md:px-16 py-12 flex flex-col items-center gap-10'>
      
      {/* Policy Section */}
      <div className='w-full flex flex-wrap justify-center items-center gap-[40px] md:gap-[80px] '>
        
        {/* Exchange Policy */}
        <div className='w-[300px] max-w-[90%] flex flex-col items-center gap-[10px]'>
          <RiExchangeFundsLine className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] text-[#90b9ff]' />
          <p className='font-semibold text-[19px] md:text-[25px] text-[#5e87f7]'>Easy Exchange Policy</p>
          <p className='font-semibold text-[12px] md:text-[18px] text-[aliceblue] text-center'>
            Exchange Made Easy 🔁 Quick, Simple, and Customer-Friendly Process.
          </p>
        </div>

        {/* Free Delivery */}
        <div className='w-[300px] max-w-[90%] flex flex-col items-center gap-[10px]'>
          <MdLocalShipping className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] text-[#90ff90]' />
          <p className='font-semibold text-[19px] md:text-[25px] text-[#7fffd4]'>Free & Fast Delivery</p>
          <p className='font-semibold text-[12px] md:text-[18px] text-[aliceblue] text-center'>
            Delivery to Your Doorstep Within 2 Days 🚚 Across Major Cities.
          </p>
        </div>

        {/* Secure Payment */}
        <div className='w-[300px] max-w-[90%] flex flex-col items-center gap-[10px]'>
          <BsShieldCheck className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] text-[#f0f8ff]' />
          <p className='font-semibold text-[19px] md:text-[25px] text-[#00bfff]'>Secure Payments</p>
          <p className='font-semibold text-[12px] md:text-[18px] text-[aliceblue] text-center'>
            End-to-End Encrypted 🔒 Transactions with Trusted Gateways.
          </p>
        </div>

        {/* 24/7 Support */}
        <div className='w-[300px] max-w-[90%] flex flex-col items-center gap-[10px]'>
          <MdOutlineSupportAgent className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] text-[#ffc0cb]' />
          <p className='font-semibold text-[19px] md:text-[25px] text-[#ffb6c1]'>24/7 Customer Support</p>
          <p className='font-semibold text-[12px] md:text-[18px] text-[aliceblue] text-center'>
            Got Questions? 🤔 Our Support Team is Ready Anytime!
          </p>
        </div>

      </div>
    </div>
  );
}

export default NewLetterBox;
