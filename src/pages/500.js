// pages/500.js
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Custom500() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-purple-500 to-blue-600 text-white p-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-md rounded-xl p-8 flex flex-col items-center">
        <Image
          src="/images/hv-circle-white.png"
          width={70}
          height={70}
          alt="Logo"
          className="mb-6"
          priority
        />

        <h2 className="text-xl font-bold mb-4">Server Error</h2>

        <p className="text-center mb-8">
          We're sorry, but something went wrong on our server.
        </p>

        <Link href="/" className="w-full">
          <button className="w-full py-3 bg-white text-blue-600 rounded-full font-semibold">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
