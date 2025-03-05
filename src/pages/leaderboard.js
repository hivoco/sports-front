import LeaderBoard from "@/components/LeaderBoard";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import React from "react";

const Leaderboard = () => {
  return (
    <div className="px-6 pt-7 pb-8 text-white flex flex-col  justify-between gap-4 h-full">
      <div className="flex flex-col gap-2.5  justify-between  h-3/5">
        <NavBar />

        <div className="flex flex-col gap-3 flex-1 justify-between">
          <div className="relative flex w-full gap-10 justify-center items-center  ">
            <Image
              className=""
              src="/images/rm-club.png"
              width={77}
              height={97}
              alt="fc real madrid"
              priority
            />

            {/* <div className="absolute  h-full rotate-[12deg] border bg-white border-white w-0.5" /> */}

            <Image
              className=" h-full w-auto absolute  transform left-1/2 -translate-x-1/2"
              src="/images/flash.svg"
              width={21}
              height={118}
              alt="fc real madrid"
              priority
            />

            <Image
              className=""
              src="/images/fcb-club.png"
              width={93}
              height={97}
              alt="fc barcelona logo"
              priority
            />
          </div>
          <h1
            style={{
              textShadow: "-4px 2px 4px #FFFFFF40",
            }}
            className="font-Theo font-normal text-3xl leading-9 text-center tracking-[0.08em] "
          >
            LEADERBOARD
          </h1>

          <div className="flex justify-between items-center px-4 ">
            <span className="font-Inter font-extrabold text-[24px] leading-7 text-center">
              1st
            </span>

            <div>
              <div className="bg-[url('/images/star-glow.png')] bg-no-repeat bg-center w-fit py-3 px-10">
                <Image
                  className=""
                  src="/images/trophy.png"
                  width={66}
                  height={116}
                  alt=" trophy"
                  priority
                />
              </div>
              <p className="font-Inter font-semibold text-[18px] leading-6 text-center">
                Kamakshi Garg
              </p>
            </div>

            <span className="font-Inter font-extrabold text-[24px] leading-7 text-center">
              98
              <br />
              pts.
            </span>
          </div>
        </div>
      </div>

      <LeaderBoard />
    </div>
  );
};

export default Leaderboard;
