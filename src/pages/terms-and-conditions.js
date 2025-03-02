import Button from '@/components/Button'
import IconButton from '@/components/IconButton '
import NavBar from '@/components/NavBar'
import Image from 'next/image'
import React from 'react'

const TermsAndConditions = () => {
  return (
    <div className="relative text-white  pt-7 pb-8 h-full">
      <div className='px-6'>
      <NavBar />

      </div>

      <div className='absolute  bottom-8 flex flex-col gap-5 px-6'>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-[74px] justify-center items-center">
              <h1 className="font-Inter font-normal text-3xl text-center">
                Introduction
                <br />
                /Gratification
              </h1>

              <p className="font-Inter font-normal text-[16px] leading-5 text-center">
                By clicking ‘Accept’ you agree to the T&C of The Legend League
                Quiz.
              </p>
            </div>

            <h2 className="font-Inter font-bold text-[16px] leading-5 underline text-center">
              Click here to view T&C
            </h2>
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

        <Button title={"Accept"} displayIcon={false} />
      </div>
    </div>
  );
}

export default TermsAndConditions
