import Button from "@/components/Button";
import Hexagon from "@/components/Hexagon";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import React, { useState } from "react";

const LanguageSelection = () => {
  const [selectedOption, setSelectedOption] = useState("");
  console.log(selectedOption);

  return (
    <div
      className={`relative pt-7 flex flex-col gap-y-14 h-full
    `}
    >
      <div className="px-6">
        <NavBar />
      </div>

      <div className="px-6 flex flex-col gap-y-6">
        <h2 className="font-Inter font-bold text-3xl leading-9 text-center text-white">
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
        rounded-r-full
        ${
          selectedOption === "english"
            ? "border-[#001734] text-[#001734] bg-white"
            : "bg-white/25  text-white"
        }
        `}
        >
          <Hexagon
            className={`absolute -left-5 ${
              selectedOption === "english"
                ? "bg-[#001734] text-white"
                : "bg-white text-[#001734]"
            }`}
            title={"A"}
          />

          <span>english</span>
        </button>

        <button
          onClick={() => {
            setSelectedOption("hindi");
          }}
          className={`relative flex h-14 justify-center items-center font-Inter font-semibold text-[20px] leading-6 text-center border   w-full
        rounded-r-full
        ${
          selectedOption === "hindi"
            ? "border-[#001734] text-[#001734] bg-white"
            : "bg-white/25  text-white"
        }
        `}
        >
          <Hexagon
            className={`absolute -left-5 ${
              selectedOption === "hindi"
                ? "bg-[#001734] text-white"
                : "bg-white text-[#001734]"
            }`}
            title={"अ"}
          />

          <span>hindi</span>
        </button>
      </div>

      {selectedOption && (
        <Link
          href={`/quiz?language=${selectedOption}`}
          className={"absolute bottom-10 w-full px-6"}
        >
          <Button title={"Accept"} />
        </Link>
      )}
    </div>
  );
};

export default LanguageSelection;
