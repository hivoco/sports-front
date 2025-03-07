import Button from "@/components/Button";
import Hexagon from "@/components/Hexagon";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import React, { useState } from "react";

const LanguageSelection = () => {
  const [selectedOption, setSelectedOption] = useState("");


  return (
    <div
      className={`relative pt-7 flex flex-col gap-y-14 h-full
    `}
    >
      <div className="px-6">
        <NavBar />
      </div>

      <div className="px-6 flex flex-col gap-y-6">


        <h2 className="font-Theo  font-normal text-[42px] leading-[38px] tracking-[0.02em] text-center text-white">
          Choose Language
        </h2>

        <p className="font-Inter font-normal text-[16px] leading-5 text-center text-white">
          The game is yours- make it legendary!
        </p>
      </div>

      <div className="flex flex-col gap-y-5 justify-center items-center px-7">
        <button
          onClick={() => {
            setSelectedOption("english");
          }}
          className={`relative flex h-14 justify-center items-center font-Inter font-semibold text-[20px] leading-6 text-center border w-full
        rounded-r-full transition-colors duration-500
        ${
          selectedOption === "english"
            ? "border-[#28211D] text-[#28211D] bg-white"
            : "bg-white/25  text-white"
        }
        `}
        >
          <Hexagon
            className={`absolute -left-5 capitalize ${
              selectedOption === "english"
                ? "bg-[#28211D] text-white"
                : "bg-white text-[#28211D]"
            }`}
            title={"A"}
          />

          <span className="capitalize">english</span>
        </button>

        <button
          onClick={() => {
            setSelectedOption("hindi");
          }}
          className={`relative capitalize flex h-14 justify-center items-center font-Inter font-semibold text-[20px] leading-6 text-center border   w-full
        rounded-r-full transition-colors duration-500 
        ${
          selectedOption === "hindi"
            ? "border-[#28211D] text-[#28211D] bg-white"
            : "bg-white/25  text-white"
        }
        `}
        >
          <Hexagon
            className={`absolute -left-5  ${
              selectedOption === "hindi"
                ? "bg-[#28211D] text-white"
                : "bg-white text-[#28211D]"
            }`}
            title={"अ"}
          />

          <span className="capitalize">hindi</span>
        </button>
      </div>

      {selectedOption && (
        <Link
          href={`/platformQuiz?language=${selectedOption}`}
          className={"absolute bottom-10 w-full px-6"}
        >
          <Button title={"Accept"} />
        </Link>
      )}
    </div>
  );
};

export default LanguageSelection;
