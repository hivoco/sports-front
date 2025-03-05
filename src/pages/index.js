import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const LandingDisplay = () => {
  const [animation, setAnimation] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation(true);
    }, 2000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      router.push("/splash-screen");
    }, 3000);
  }, []);

  return (
    <div
      className={` flex  h-full justify-end items-center gap-3 text-white
      ${animation ? "flex-row px-6" : "flex-col pb-20"}
     `}
    >
      <div className="flex flex-col gap-40">
        <div className="flex flex-col items-center gap-3">
          <Image
            src={"/images/sports-front logo.png"}
            width="135"
            height="72"
            alt="sports front logo"
            priority
          />

          {!animation && (
            <>
              <h2
                style={{ textShadow: "-4px 2px 4px #FFFFFF40" }}
                className="font-Theo font-normal text-[40px] leading-[38px] tracking-[0.08em] text-center"
              >
                LEGENDS
              </h2>
              <p className="font-Inter font-medium text-[16px] leading-5 tracking-[0.22em] text-center">
                FACE OFF
              </p>
            </>
          )}
        </div>

        {!animation && (
          <div className=" flex flex-col gap-1.5 items-center justify-center">
            <h4 className="font-Inter font-extrabold text-[20px] leading-6 -tracking-wide text-center">
              6th APRIL 2025
            </h4>

            <p className="font-Inter font-semibold text-[12px] leading-3.5 tracking-[0.24em] text-center">
              DY PATIL STADIUM, MUMBAI
            </p>
          </div>
        )}
      </div>

      {animation && (
        <>
          <X
            size={34}
            className={`text-white
                    transition-opacity 
          duration-1000 
          ease-in-out
          ${animation ? "opacity-100" : "opacity-0"}

          `}
          />

          <Image
            src={"/images/White hollow logo.png"}
            width={135}
            height={81}
            alt={"hivoco logo"}
            priority
          />
        </>
      )}
    </div>
  );
};

export default LandingDisplay;
