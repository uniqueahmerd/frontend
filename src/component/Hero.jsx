import React, { useContext } from "react";
import { assets } from "../assets/Index";
import { AppContext } from "../contex/Contex";

const Hero = () => {
  const { currency, accountBalance } = useContext(AppContext);

  return (
    <div className="flex flex-col">
      <div className="bg-blue-900 rounded-xl flex items-center overflow-hidden py-1">
        {/* Image Container */}
        <div className="flex-shrink-0 ml-4 mr-3">
          <img src={assets.speaker_icon} alt="speaker" width={25} />
        </div>
        {/* Text Container */}
        <div className="flex-grow overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            <span className="inline-block text-white">
              Lorem ipsum dolor sit amet consectetur.
            </span>
          </div>
        </div>
      </div>
      <div className="mt-5 px-2">
        <img src={assets.hero1_icon} />

        <div className="bg-blue-900 text-white rounded-lg pl-3 py-3 mt-2 w-full">
          <p className="font-semibold text-xl">
            {currency} {accountBalance}
          </p>
          <p>Account balance</p>
        </div>

        <div className="mt-2">
          <img src={assets.hero2_icon} />
        </div>
        <p className="mt-3 font-semibold mb-2 text-xl">Partners</p>
        <div className="flex justify-evenly mt-2">
          <img src={assets.microsoft_logo} className="w-28" />
          <img src={assets.cisco_logo} className="w-28" />
          <img src={assets.IBM_logo} className="w-28" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
