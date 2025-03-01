import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const LandingDisplay = () => {
  const [animation, setAnimation] = useState(false);
  const router =useRouter()
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
      className={` flex  h-svh justify-center items-center gap-3
      ${animation ? "flex-row" : "flex-col"}
     `}
    >
      <Image
        src={"/images/sports-front logo.png"}
        width="170"
        height="90"
        alt="sports front logo"
        priority
      />

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
            src={"/images/hivoco-logo.png"}
            width={111}
            height={98}
            alt={"hivoco logo"}
            priority
          />
        </>
      )}

      {!animation && (
        <p className="font-Inter font-normal text-[14px] leading-4 text-center text-white  px-16">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel
          ex ac arcu vestibulum consequat.
        </p>
      )}
    </div>
  );
};

export default LandingDisplay;
