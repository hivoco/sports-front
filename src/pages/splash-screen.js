import NavBar from "@/components/NavBar";
import { useMusic } from "@/context/MusicContext";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SplashScreen = () => {
  const { isMusicEnabled, isPlaying, enableMusic, toggleMusic } = useMusic();

  const [animationNumber, setAnimationNumber] = useState(0);

  console.log(animationNumber, "animationNumber");

  const router = useRouter();

  const handleClick = () => {
    if (!isPlaying) {
      toggleMusic();
    }

    router.push("/terms-and-conditions");
  };

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationNumber(1);
    }, 900);

    const timer2 = setTimeout(() => {
      setAnimationNumber(2);
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      // clearTimeout(timer3);
    };
  }, []);



    return (
      <div className="px-6 pt-7 pb-8 flex flex-col justify-between h-full text-white overflow-hidden">
        <div className="flex flex-col gap9 h-[45%] justify-between">
          <div
            className={`transition-all duration-700 ease-in-out
              ${animationNumber >= 1 ? "translate-y-0" : "-translate-y-[200%]"} 
          `}
          >
            <NavBar />
          </div>

          <div className=" relative flex ">
            <Image
              className={` w-1/2 h-auto
              transition-all duration-700 ease-in-out
                  ${
                    animationNumber >= 1
                      ? "translate-y-0 translate-x-0"
                      : "-translate-y-[120%] -translate-x-[120%]"
                  }
            `}
              src="/images/RM logo.png"
              width={160}
              height={200}
              alt="rm logo"
              priority
            />

            <Image
              style={{
                textShadow: " -5px 2px 4px  #FFFFFF40",
              }}
              className={`absolute top-[10%] left-1/2 -translate-x-1/2  w-[110px] h-[286px]
                          transition-all duration-700 ease-in-out
          
            ${animationNumber >= 1 ? "scale-100" : "scale-0"}

          `}
              src="/images/flash.svg"
              width={45}
              height={286}
              alt="flash image"
              priority
              quality={100}
            />

            <Image
              className={` absolute right-0  transform translate-y-3/4  w-[51%]  h-auto
                          transition-all duration-700 ease-in-out
                      ${
                        animationNumber >= 1
                          ? "translate-y-0 translate-x-0"
                          : "translate-y-[120%] translate-x-[120%]"
                      }
                        `}
              src="/images/FCB logo.png"
              width={168}
              height={174}
              alt="fcb logo"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col  justify-between h-[30%] gap14">
          <h1
            style={{
              textShadow: "-4px 2px 4px #FFFFFF40",
            }}
            className={`transition-all duration-500 ease-in-out
          font-Theo font-normal text-[54px] leading-12 tracking-[0.06em] text-center
               ${animationNumber >= 1 ? "opacity-100" : "opacity-0"} 
         `}
          >
            THE LEGENDS
            <br />
            LEAGUE QUIZ
          </h1>
          <button
            onClick={handleClick}
            className={`transition-all duration-700 ease-in-out
          ${animationNumber >= 2 ? "translate-y-0" : "translate-y-[200%]"}
          flex h-14 relative justify-center items-center font-Inter 
          bg-white/25 font-semibold text-[20px] leading-6 text-center 
          border border-white text-white w-full rounded-full`}
          >
            <span className="">Start</span>

            <div className="absolute right-0 w-14 h-14 bg-white rounded-full shadow-md border border-gray-200 flex justify-center items-center">
              <ChevronRight className="" size={20} color="#001734" />
            </div>
          </button>{" "}
        </div>
      </div>
    );
  };

export default SplashScreen;
