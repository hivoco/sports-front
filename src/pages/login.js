import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col gap-11 justify-center items-center h-full text-white">
      <div className="flex flex-col justify-center items-center gap-4">
        <nav className="flex gap-1 items-center text-white">
          <Image
            src="/images/s-icon.png"
            width={34}
            height={48}
            alt="s icon"
            priority
          />

          <X size={30} color="white" />

          <Image
            src="/images/hv-circle-white.png"
            width={48}
            height={48}
            alt="s icon"
            priority
          />
        </nav>

        {/* upper section */}
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-2.5 justify-center items-center">
            <h2
              style={{ textShadow: "-4px 2px 4px #FFFFFF40" }}
              className="font-Theo font-normal text-[40px] leading-[38px] tracking-[0.08em] text-center text-white"
            >
              LEGENDS
            </h2>

            <h3 className="font-Inter font-medium text-[16px] leading-5 text-center tracking-[0.2em] text-white">
              FACE OFF
            </h3>
          </div>
          <p className="font-Inter text-[18px] leading-[22px] text-center">
            SIGN UP TO VIEW RESULTS
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-16">
        {/* inputs  */}
        <div className="flex flex-col gap-3">
          <input
            autoComplete="name"
            type="text"
            placeholder="Full Name"
            className={`flex py-4 font-Inter font-semibold text-[18px] leading-6 px-5 border border-white text-white w-full
          rounded-full placeholder:text-white/50 outline-none`}
          />

          <div className="flex items-center py-4 font-Inter  font-semibold text-[18px] leading-6 px-5 border border-white text-white w-full  rounded-full">
            <span>+91</span>
            <input
              type="tel"
              // value={phoneNumber}
              // onChange={handleChange}
              placeholder="Phone number"
              maxLength={10}
              autoComplete="phone number"
              className="w-full outline-none pl-2.5"
            />
          </div>
        </div>

        <Link
        className="self-center"
        href={"/leaderboard"}>
          <button
            className={`py-3 px-11 self-center font-Inter bg-white/25 font-semibold text-[20px] leading-6 text-center border border-white text-white 
          rounded-full `}
          >
            Submit
          </button>
        </Link>

      </div>
    </div>
  );
};

export default Login;
