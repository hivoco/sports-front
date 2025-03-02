import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const SplashScreen = () => {
  return (
    <div className="px-6 pt-7 pb-8 flex flex-col justify-between h-full">
      
      <nav className=" flex justify-between w-full">
        <Image
          src="/images/s-icon.png"
          width={27}
          height={38}
          alt="s-icon"
          priority
        />

        <Image
          src="/images/hv-circle.png"
          width={40}
          height={38}
          alt="hivoco circular logo"
          priority
        />
      </nav>

      <div className="flex flex-col gap-y-5 h-full">
        <Image
          src="/images/Logo group.png"
          width={256}
          height={268}
          alt="logo group"
          priority
        />

        <Image
          src="/images/text.png"
          width={327}
          height={76}
          alt="text"
          priority
        />
      </div>

      <button
        className="flex h-14 relative justify-center  items-center font-Inter bg-white/25 font-semibold text-[20px] leading-6 text-center border border-white text-white w-full
      rounded-full"
      >
        <span className="">Start</span>

        <div className="absolute right-0 w-14 h-14 bg-white rounded-full  shadow-md border border-gray-200 flex justify-center items-center">
          <ChevronRight className="" size={20} color="#001734" />
        </div>
      </button>
    </div>
  );
};

export default SplashScreen;
