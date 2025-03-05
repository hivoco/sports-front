import NavBar from "@/components/NavBar";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Loading = () => {
  const router =useRouter()
  useEffect(() => {
    setTimeout(() => {
      router.push("/quiz");
    }, 1500);
  }, []);

  return (
    <div
      className="pt-7 pb-8 h-full
      text-white font-Inter
      flex flex-col justify-between"
    >
      <div className="px-6">
        <NavBar />
      </div>

      <div className="flex flex-col gap-2.5  items-center ">
        <Image
          className="animate-spin"
          src="/images/loading-football.png"
          width={156}
          height={153}
          alt="loading football"
          priority
        />

        <p className="font-medium text-[24px] leading-9 text-center">
          Loading Quiz
        </p>
      </div>

      <p className="px-10 font-normal text-[16px] leading-4 text-center">
        Answer questions correctly in the shortest timespan to improve your
        chances of winning.
      </p>
    </div>
  );
};

export default Loading;
