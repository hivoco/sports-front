import LeaderBoard from "@/components/LeaderBoard";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState([]);
  const [animationNumber, setAnimationNumber] = useState(0);
  console.log(animationNumber, "animationNumber");

  useEffect(() => {
    if (router.query.phone) {
      postData(router.query.phone);
    }
  }, [router.query.phone]);
  const postData = async (phone) => {
    const data = {
      phone: phone,
    };

    if (!phone) {
      return;
    }

    try {
      const response = await fetch("https://node.hivoco.com/api/get_top_5", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("result", result.winner);
      setLeaderboard(result.winner);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationNumber(1);
    }, 1500);

    const timer2 = setTimeout(() => {
      setAnimationNumber(2);
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      // clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="px-6 pt-7 pb-8 text-white flex flex-col  justify-between gap-4 h-full overflow-hidden">
      <div className="flex flex-col gap-2.5  justify-between  h-3/5">
        <NavBar />

        <div className="flex flex-col gap-0 flex-1 justify-between">
          <div className="relative flex flex-1 w-full gap-10 justify-center items-center  mb-4">
            <Image
              className=""
              src="/images/rm-club.png"
              width={77}
              height={97}
              alt="fc real madrid"
              priority
            />

            <Image
              style={{
                textShadow: " -5px 2px 4px  #FFFFFF40",
              }}
              className=" h-full w-auto absolute  transform left-[47%] -translate-x-1/2"
              src="/images/flash.svg"
              width={21}
              height={118}
              alt="fc real madrid"
              priority
              quality={100}
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
            className={` font-Theo font-normal text-[52px] leading[38px] leading-[0.75] text-center tracking-[0.08em] 
              transition-all duration-700 ease-in-out 
              ${animationNumber >= 1 ? "scale-100" : "scale-0"}
              `}
          >
            LEADERBOARD
          </h1>

          <div className="flex flex-1 justify-between items-center px-4 ">
            <span
              className={`font-Theo font-normal text-[32px] leading-8 text-center
              transition-all duration-700 ease-in-out
              ${animationNumber >= 1 ? "translate-x-0" : "-translate-x-[220%]"}
              `}
            >
              1st
            </span>

            <div className="flex flex-col justify-between items-center">
              <div
                className={`bg-[url('/images/star-glow.png')] bg-no-repeat bg-center w-fit py-3 px-10 
                          transition-all duration-700 ease-in-out 
                ${animationNumber >= 1 ? "scale-100" : "scale-0"}
              `}
              >
                <Image
                  src="/images/trophy.png"
                  width={66}
                  height={116}
                  alt=" trophy"
                  priority
                />
              </div>
{/* 
              <Image
              className="object-cover"
                src="/images/prize-and-star.png"
                width={66}
                height={116}
                alt=" trophy"
                priority
              /> */}

              <p
                className={`font-Theo font-normal text-[28px] leading-7 tracking-[0.04em] text-center
                transition-all duration-700 ease-in-out 
                ${animationNumber >= 1 ? "opacity-100" : "opacity-0"}
                `}
              >
                {leaderboard[0]?.name || "Name"}
              </p>
            </div>

            <span
              className={`font-Theo font-normal text-[32px] leading-8 text-center
              transition-all duration-700 ease-in-out
              ${animationNumber >= 1 ? "translate-x-0" : "translate-x-[200%]"}
              `}
            >
              {leaderboard[0]?.score || "0"}
              <br />
              pts.
            </span>
          </div>
        </div>
      </div>

      <LeaderBoard
        animationNumber={animationNumber}
        ranks={
          leaderboard.length > 5
            ? leaderboard?.slice(1, leaderboard.length - 1)
            : leaderboard?.slice(1, leaderboard.length)
        }
      />
    </div>
  );
};

export default Leaderboard;
