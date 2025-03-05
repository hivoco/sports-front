import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Quiz = () => {
  const options = ["real madird", "bacrelona"];
  const [isListening ,setIsListening]= useState(false)
  const [selectedOption,setSelectedOption]=useState("")
  const correctAns= "Real Madird"
  return (
    <div className="font-Inter pt-7 pb-10 h-full flex flex-col justify-between ">
      {/* navbar */}
      <div className="px-6 flex justify-between items-start">
        <nav className="flex gap-0.5 items-center text-white">
          <Image
            src="/images/s-icon.png"
            width={27}
            height={38}
            alt="s icon"
            priority
          />

          <X size={24} color="white" />

          <Image
            src="/images/hv-circle-white.png"
            width={38}
            height={38}
            alt="s icon"
            priority
          />
        </nav>

        <div className="flex flex-col gap-2.5 ">
          <Image
            src="/svg/Exit.svg"
            width={34}
            height={34}
            alt="exit button"
            priority
          />
          <Image
            src="/svg/Mute.svg"
            width={34}
            height={34}
            alt="mute button"
            priority
          />
        </div>
      </div>

      {/* container quiz card */}
      <div className="relative mx-7">
        {/* quiz card */}

        <div
          className="bg-white rotate3 h-full text-[#001734] py-6 px-7
            flex flex-col justify-between items-center rounded-3xl 
            rotate-3 relative z-20"
        >
          <div className="flex flex-col gap-3 ">
            <span className=" font-semibold text-[14px] leading-[17px] ">
              01/10
            </span>

            <h2 className="font-semibold text-[16px] leading-[20px] ">
              Who has won more El Clásico matches in official competitions?
            </h2>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <Image
              onClick={() => {
                setIsListening(true);
              }}
              className="self-center"
              src={
                isListening
                  ? "/images/listening.png"
                  : "/images/mic-hexagon.png"
              }
              width={123}
              height={134}
              alt="mic hexagon image"
              priority
            />

            {/* options  */}
            <div className="flex flex-col gap-0.5 self-stretch">
              {options.map((option, index) => {
                return (
                  <button
                    onClick={() => {
                      setSelectedOption(option);
                    }}
                    className={`font-medium text-[16px] leading-5 text-center
                    flex items-center justify-between  border border-[#001734]
                    px-6 py-3 rounded-full capitalize
                    `}
                    key={index}
                    // className="w-full border"
                  >
                    {option}

                    <Image
                      src={"/svg/tick-circle.svg"}
                      width={24}
                      height={24}
                      alt="tick image"
                      priority
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="bg-white/30 -rotate-3 h-full 
            rounded-3xl 
             absolute z-0 inset-0"
        ></div>

        <div
          className="bg-white/15 rotate-8 h-full 
            rounded-3xl 
             absolute z-10 inset-0"
        ></div>
      </div>

      {/* bottom two buttons SKIP SUBMIT */}

      <div className="flex gap-5 items-center px-6">
        <button
          className={`capitalize bg-white/25 py-4 font-Inter font-semibold text-[20px] leading-6 px-5 border border-white text-white w-full
        rounded-full placeholder:text-white/50 outline-none text-center`}
        >
          skip
        </button>

        <Link
        className="w-full"
        href={"/login"}>
        <button
          className={`capitalize bg-white/25 py-4 font-Inter font-semibold text-[20px] leading-6 px-5 border border-white text-white w-full
        rounded-full placeholder:text-white/50 outline-none text-center`}
        >
          submit
        </button>
        
        </Link>
      </div>
    </div>
  );
};

export default Quiz;
