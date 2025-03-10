import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const LandingDisplay = () => {
  const [animationNumber, setAnimationNumber] = useState(0);
  console.log(animationNumber,"animationNumber");
  
  const router = useRouter();
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationNumber(1);
    }, 900);

    const timer2 = setTimeout(() => {
      setAnimationNumber(2);
    }, 5200);

    const timer3 = setTimeout(() => {
      setAnimationNumber(3);
    }, 8000);


    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);

    };
  }, []);

  useEffect(() => {
    const timer = 
    setTimeout(() => {
      router.push("/splash-screen");
    }, 9500);

    return ()=>{
      clearTimeout(timer)
    }
  }, []);

  return (
    <div
      className={`fixed h-full w-full  flex  gap-2.5 items-center  justify-center text-white
     `}
    >
      <Image
        className={`transition-all duration-700 ease-in-out 
        ${animationNumber === 2 ? "translate-0" : "-translate-x-[150%]"}
        `}
        src={"/images/sports-front logo.png"}
        width="136"
        height="72"
        alt="sports front logo"
        priority
      />

      <X
        size={34}
        color="white"
        className={`transition-opacity duration-700 ease-in-out
        ${animationNumber === 2 ? "opacity-100" : "opacity-0"} `}
      />

      <Image
        className={`transition-all duration-700 ease-in-out w-[136px] h-auto 
          ${animationNumber === 2 ? "translate-0" : "translate-x-[150%] "}
        `}
        src={"/images/White hollow logo.png"}
        height={136}
        width={81}
        alt={"hivoco logo"}
        priority
      />

      {/* absolute, out of layout  */}
      {/* first screen image full bg */}

      <Image
        className={`absolute inset-0  h-full w-full transition-opacity duration-[1500ms] ease-in-out
          ${animationNumber === 1 ? "opacity-100 " : "opacity-0"}
          `}
        src="/images/first-screen-BG.png"
        width={"375"}
        height={"667"}
        alt="first screen BG"
        priority
      />
    </div>
  );
};

export default LandingDisplay;
