// pages/_error.js
import React from "react";
import Link from "next/link";
import Image from "next/image";

function Error({ statusCode }) {
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

        <h2 className="text-xl font-bold mb-4">Something went wrong</h2>

        <p className="text-center mb-8">
          {statusCode
            ? `An error ${statusCode} occurred on the server`
            : "An error occurred on the client"}
        </p>

        <div className="flex flex-col w-full gap-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-white text-blue-600 rounded-full font-semibold"
          >
            Try Again
          </button>

          <Link href="/" className="w-full">
            <button className="w-full py-3 bg-transparent border border-white rounded-full font-semibold">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
