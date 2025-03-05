import NavBar from "@/components/NavBar";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SplashScreen = () => {
  const router = useRouter();
  return (
    <div className="px-6 pt-7 pb-8 flex flex-col justify-between h-full text-white">
      <div className="flex flex-col gap9 h-[45%] justify-between">
        <NavBar />

        <div className=" relative flex ">
          <Image
            className=" border border-black w-1/2 h-auto"
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
            className="absolute top-[10%] left-1/2 -translate-x-1/2 rotate-[24.6deg] w-[110px] h-[286px]
          will-change-transform "
            src="/images/flash.png"
            width={45}
            height={286}
            alt="flash image"
            priority
            quality={100}
          />

          <Image
            className="absolute right-0  transform translate-y-3/4 border border-black w-[51%]  h-auto"
            src="/images/FCB logo.png"
            width={168}
            height={174}
            alt="fcb logo"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col  justify-between h-[30%] gap14">
        <h1 className="font-Theo font-normal text-[30px] leading-[38px] tracking-[0.08em] text-center ">
          THE LEGENDS LEAGUE QUIZ
        </h1>

        <Link href={"/terms-and-conditions"}>
          <button
            onClick={() => router.push("terms-and-conditions")}
            className="flex h-14 relative justify-center  items-center font-Inter bg-white/25 font-semibold text-[20px] leading-6 text-center border border-white text-white w-full
            rounded-full"
          >
            <span className="">Start</span>

            <div className="absolute right-0 w-14 h-14 bg-white rounded-full  shadow-md border border-gray-200 flex justify-center items-center">
              <ChevronRight className="" size={20} color="#001734" />
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SplashScreen;
