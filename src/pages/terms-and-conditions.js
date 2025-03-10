import Button from "@/components/Button";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TermsAndConditions = () => {
  const [animationNumber, setAnimationNumber] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationNumber(1), 900);
    const timer2 = setTimeout(() => setAnimationNumber(2), 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div
      className="relative text-white pt-7 pb-10 h-full overflow-hidden grid gap-6 px-6
    grid-rows-[1fr_1fr_1fr_1fr_1fr)] 

    "
    >
      <NavBar />

      {/* Top Section */}
      <div className="mt3.5 grid  gap-1.5 place-items-center">
        <p
          className={`font-Inter w-fit font-light text-[12px] leading-[14px] text-center py-1 px-2 border border-white rounded-full transition-all duration-300 ease-in-out ${
            animationNumber >= 1 ? "opacity-100" : "opacity-0"
          }`}
        >
          Play the game & win a
        </p>

        <div
          style={{ textShadow: "-4.76px 2.38px 4.76px #FFFFFF40" }}
          className={`font-Theo font-normal  text-center transition-all duration-300 ease-in-out ${
            animationNumber >= 1 ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-[44px] leading-[1.14] tracking-[0.10em]">
            {" "}
            meet and
          </h2>

          <h2 className="text-[44px] leading-[1.16] tracking-[0.20em]">
            greet
          </h2>
        </div>

        <p
          className={`font-Inter w-fit font-light text-[12px] leading-[14px] text-center py-1 px-2 border border-white rounded-full transition-all duration-300 ease-in-out ${
            animationNumber >= 1 ? "opacity-100" : "opacity-0"
          }`}
        >
          with the players of
        </p>
      </div>

      {/* Center Section */}
      <div className="grid gap-5 place-items-center relative -smt-1">
        <h1
          style={{ textShadow: "-3.79px 1.89px 3.79px #FFFFFF40" }}
          className={`font-Theo font-normal text-[44px] leading-[1.16] tracking-[0.1em] transition-all duration-700 ease-in-out ${
            animationNumber >= 1 ? "translate-x-0" : "-translate-x-[200%]"
          }`}
        >
          Real Madrid
        </h1>

        <Image
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out ${
            animationNumber >= 1 ? "scale-100" : "scale-0"
          }`}
          src="/svg/& (1).svg"
          width={59}
          height={60}
          alt="& text"
        />

        <h1
          style={{ textShadow: "-3.79px 1.89px 3.79px #FFFFFF40" }}
          className={`font-Theo font-normal text-[44px] leading-[1.16] tracking-[0.1em] transition-all duration-700 ease-in-out ${
            animationNumber >= 1 ? "translate-x-0" : "translate-x-[200%]"
          }`}
        >
          FC Barcelona
        </h1>
      </div>

      {/* Ticket Section */}
      <div className="grid gap-5 place-items-center">
        <p
          className={`font-Inter font-normal text-[14px] leading-[17px] text-center transition-all duration-700 ease-in-out ${
            animationNumber >= 2 ? "opacity-100" : "opacity-0"
          }`}
        >
          By clicking ‘Accept’ you agree to the T&C of
          <br />
          The Legend League Quiz.
        </p>

        <div
          className={`grid gap-1 place-items-center transition-all duration-700 ease-in-out ${
            animationNumber >= 2 ? "opacity-100" : "opacity-0"
          }`}
        >
          <h3 className="font-Inter text-[12px] font-bold leading-3.5 text-center">
            Get tickets on
          </h3>
          <Image
            src="/images/district-icon.png"
            width={159}
            height={40}
            alt="district icon"
            priority
          />
        </div>
      </div>

      {/* T&C and Accept Button */}
      <div className="mt-2 grid gap-3 place-items-center">
        <h2
          className={`font-Inter font-medium text-[12px] leading-3.5 underline text-center transition-all duration-700 ease-in-out ${
            animationNumber >= 2 ? "opacity-100" : "opacity-0"
          }`}
        >
          Click here to view T&C
        </h2>

        <Link
          className={`w-full  transition-all duration-700 ease-in-out ${
            animationNumber >= 2 ? "opacity-100" : "opacity-0"
          }`}
          href="/language-selection"
        >
          <Button className={'!h-12'} title={"Accept"} displayIcon={false} />
        </Link>
      </div>
    </div>
  );
};

export default TermsAndConditions;
