import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setQuiz(JSON.parse(storedData));
      localStorage.removeItem("data"); // Optional: Clear after use
    }
  }, []);

  const postData = async () => {
    const data = {
      name: name.slice(0, 10),
      phone: phone,
      quiz,
    };

    if (!phone || !name) {
      return;
    }

    try {
      const response = await fetch(
        "https://node.hivoco.com/api/after_login_insert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      window.location.href = `/leaderboard?phone=${phone}`;
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
    <div className="flex flex-col gap-11 justify-center items-center h-full text-white">
      <div className="flex flex-col justify-center items-center gap-4">
        <nav
          className={`flex gap-1 items-center text-white
            transition-all duration-500 ease-in-out
            ${animationNumber >= 1 ? "opacity-100" : "opacity-0"}
          `}
        >
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
              className={`font-Theo font-normal text-[64px] leading-[38px] tracking-[0.08em] text-center text-white
              transition-all duration-500 ease-in-out
              ${animationNumber >= 1 ? "scale-100" : "scale-50"}
                `}
            >
              LEGENDS
            </h2>

            <h3
              className={`font-Inter font-medium text-[16px] leading-5 text-center tracking-[0.2em] text-white
                transition-all duration-500 ease-in-out
                ${animationNumber >= 1 ? "translate-y-0" : "translate-y-1/2"}
              `}
            >
              FACE OFF
            </h3>
          </div>
          <p
            className={`font-Inter text-[18px] leading-[22px] text-center
            transition-all duration-500 ease-in-out
            ${animationNumber >= 1 ? "opacity-100" : "opacity-0"}
            `}
          >
            SIGN UP TO VIEW RESULTS
          </p>
        </div>
      </div>

      <div
        className={`flex flex-col gap-16
          transition-all duration-500 ease-in-out
          ${animationNumber >= 1 ? "opacity-100" : "opacity-0"}
        `}
      >
        {/* inputs  */}
        <div className="flex flex-col gap-3">
          <input
            // autoComplete="name"
            autocomplete="off"
            type="text"
            inputMode="text"
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            minLength={3}
            maxLength={20}
            placeholder="Full Name"
            className={`flex py-4 font-Inter font-medium text-[18px] leading-[18px] px-5 border border-white   w-full
          rounded-full placeholder:text-white/50 outline-none
          ${name ? "bg-white text-black" : "bg-white/25 text-white "}
          `}
          />

          <div
            className={`flex items-center py-4 font-Inter  font-medium text-[18px] leading-[18px] px-5 border border-white  w-full  rounded-full
                     ${phone ? "bg-white text-black" : "bg-white/25 text-white "}
           `}
          >
            <span>+91</span>
            <input
              type="tel"
              autocomplete="off"
              placeholder="Phone number"
              maxLength={10}
              // autoComplete="tel"
              className={`w-full outline-none pl-2.5 placeholder:text-white/50
                `}
              inputMode="numeric"
              name="number"
              minLength={10}
              value={phone}
              onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if (e.target.value === "" || re.test(e.target.value)) {
                  setPhone(e.target.value);
                }
              }}
            />
          </div>
        </div>

        {/* <Link className="self-center" href={"/leaderboard"}> */}
        <button
          onClick={() => postData()}
          className={`py-3 px-11 self-center font-Inter bg-white/25 font-semibold text-[20px] leading-6 text-center border border-white text-white 
          rounded-full `}
        >
          Submit
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default Login;
