import NavBar from "@/components/NavBar";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const Loading = () => {
  const [animationNumber, setAnimationNumber] = useState(0);
  // console.log(animationNumber, "animationNumber");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationNumber(1);
    }, 1500);

    const timer2 = setTimeout(() => {
      // setAnimationNumber(2);
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      // clearTimeout(timer3);
    };
  }, []);

  const router = useRouter();
  
// >>>>>>> Stashed changes

  return (
    <div
      className="pt-7 pb-8 h-full
      text-white font-Inter
      flex flex-col justify-between"
    >
      <div className="px-6">
        <NavBar />
      </div>

      <div className={`flex flex-col gap-2.5  items-center `}>
        <Image
          className="animate-spin"
          src="/images/loading-football.png"
          width={156}
          height={153}
          alt="loading football"
          priority
        />

        <p className="font-Theo font-normal text-[34px] leading-[38px] tracking-[0.02em] text-center">
          Loading Quiz
        </p>
      </div>

      <p className={`px-10 font-normal text-[16px] leading-4 text-center`}>
        Answer questions correctly in the shortest timespan to improve your
        chances of winning.
      </p>
    </div>
  );
};

export default Loading;
