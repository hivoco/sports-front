import Button from "@/components/Button";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TermsAndConditions = () => {
  const [animationNumber, setAnimationNumber] = useState(0);
  console.log(animationNumber, "animationNumber");
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
    <div className="relative text-white  pt-7 pb-8 h-full overflow-hidden">
      <div className="px-6">
        <NavBar />
      </div>

      {/* top section */}
      <div className="flex flex-col gap-1.5 items-center justify-center ">
        <p
          className={`font-Inter w-fit font-light text-[12px] leading-[14px] text-center py-1 px-2
            border border-white rounded-full
                          transition-all duration-300 ease-in-out
              ${animationNumber >= 1 ? "opacity-100" : "opacity-0"}
            `}
        >
          Play the game & win a
        </p>

        <h2
          style={{
            textShadow: " -4.76px 2.38px 4.76px  #FFFFFF40",
          }}
          className={`font-Theo font-normal text-4xl leading-9 tracking-[0.06em] flex flex-col
              transition-all duration-300 ease-in-out
              ${animationNumber >= 1 ? "opacity-100" : "opacity-0"}
              `}
        >
          meet and
          <br />
          <span className="text-[44px] leading-11  tracking-[0.2em]">
            greet
          </span>
        </h2>

        <p
          className={`font-Inter w-fit font-light text-[12px] leading-[14px] text-center py-1 px-2
          border border-white rounded-full
          transition-all duration-300 ease-in-out
          ${animationNumber >= 1 ? "opacity-100" : "opacity-0"}
        `}
        >
          with the players of{" "}
        </p>
      </div>

      {/* center section  FCB VS RM */}
      <div className="flex flex-col gap-5 items-center relative">
        <h1
          style={{
            textShadow: "-3.79px 1.89px 3.79px #FFFFFF40",
          }}
          className={`
                  transition-all duration-700 ease-in-out
                  font-Theo  font-normal text-[44px] leading-[1.16]  tracking-[0.1em]
                  flex flex-col items-center
                ${
                  animationNumber >= 1 ? "translate-x-0" : "-translate-x-[200%]"
                }
                `}
        >
          Real Madrid
        </h1>

        <Image
          style={{
            textShadow: "-6.53px 3.26px 6.53px #FFFFFF40",
          }}
          className={`absolute
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            transition-all duration-700 ease-in-out
            ${animationNumber >= 1 ? "scale-100" : "scale-0"}
          `}
          src={"/svg/& (1).svg"}
          width={59}
          height={60}
          alt="& text"
        />

        <h1
          className={`
                    transition-all duration-700 ease-in-out
                    font-Theo  font-normal text-[44px] leading-[1.16] tracking-[0.1em] 
                             ${
                               animationNumber >= 1
                                 ? "translate-x-0"
                                 : "translate-x-[200%]"
                             }
                    `}
        >
          FC Barcelona
        </h1>
      </div>

      <div className="absolute bottom-8 flex flex-col gap-3 px-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-col gap-14 justify-center items-center">
              <p
                className={`font-Inter font-normal text-[14px] leading-[17px] text-center
                          transition-all duration-700 ease-in-out
                          ${animationNumber >= 2 ? "opacity-100" : "opacity-0"}
                `}
              >
                By clicking ‘Accept’ you agree to the T&C of The Legend League
                Quiz.
              </p>
            </div>

            <div
              className={`flex flex-col gap-1 justify-center items-center
                transition-all duration-700 ease-in-out
                ${animationNumber >= 2 ? "opacity-100" : "opacity-0"}
              `}
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

          <h2
            className={`font-Inter font-medium text-[12px] leading-3.5 underline text-center
              transition-all duration-700 ease-in-out
              ${animationNumber >= 2 ? "opacity-100" : "opacity-0"}
            `}
          >
            Click here to view T&C
          </h2>
        </div>

        <Link
          className={`
            transition-all duration-700 ease-in-out
            ${animationNumber >= 2 ? "opacity-100" : "opacity-0"}
          `}
          href={"/language-selection"}
        >
          <Button title={"Accept"} displayIcon={false} />
        </Link>
      </div>

      {/* <Image
        // out of the flow
        className="absolute z-10 top-0 left-1/2 transform -translate-x-1/2"
        width={341}
        height={404}
        src={"/images/Light element.png"}
        alt="light"
        priority
      /> */}
    </div>
  );
};

export default TermsAndConditions;
