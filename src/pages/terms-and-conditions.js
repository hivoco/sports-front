import Button from '@/components/Button'
import NavBar from '@/components/NavBar'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const TermsAndConditions = () => {
  
  return (
    <div className="relative text-white  pt-7 pb-8 h-full">
      <div className="px-6">
        <NavBar />
      </div>

      {/* top section */}
      <div className="flex flex-col gap-3 items-center">
        <div className="flex flex-col gap-1 items-center">
          <p
            className="font-Inter w-fit font-light text-[12px] leading-[14px] text-center py-1 px-2
      border border-white rounded-full
      "
          >
            Play the game & win a
          </p>
          <h2
            style={{
              textShadow: " -4.76px 2.38px 4.76px  #FFFFFF40",
            }}
            className="font-Theo font-normal text-4xl leading-11 tracking-[0.08em] flex flex-col"
          >
            <span className="flex items-end gap-1.5">
              meet
              <Image
                className="self-end"
                src={"/svg/&.svg"}
                width={34}
                height={34}
                alt="& text"
              />
            </span>
            greet
          </h2>
        </div>

        <p
          className="font-Inter w-fit font-light text-[12px] leading-[14px] text-center py-1 px-2
      border border-white rounded-full
      "
        >
          with the players of{" "}
        </p>
      </div>

      <div className="absolute bottom-8 flex flex-col gap-3 px-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-col gap-14 justify-center items-center">
              <h1
                style={{
                  textShadow: "-3.79px 1.89px 3.79px #FFFFFF40",
                }}
                className="font-Theo  font-normal text-2xl leading-[30px]  
                flex flex-col items-center
                "
              >
                Real Madrid
                <Image
                  className="-rotate-12"
                  src={"/svg/& (1).svg"}
                  width={45}
                  height={54}
                  alt="& text"
                />
                <span className="-mt-4">FC Barcelona </span>
              </h1>

              <p className="font-Inter font-normal text-[14px] leading-[17px] text-center">
                By clicking ‘Accept’ you agree to the T&C of The Legend League
                Quiz.
              </p>
            </div>

            <div className="flex flex-col gap-1 justify-center items-center">
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

          <h2 className="font-Inter font-medium text-[12px] leading-3.5 underline text-center">
            Click here to view T&C
          </h2>
        </div>

        <Link href={"/language-selection"}>
          <Button title={"Accept"} displayIcon={false} />
        </Link>
      </div>

      <Image
        // out of the flow
        className="absolute z-10 top-0 left-1/2 transform -translate-x-1/2"
        width={341}
        height={404}
        src={"/images/Light element.png"}
        alt="light"
      />
    </div>
  );
}

export default TermsAndConditions
