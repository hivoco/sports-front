import Image from "next/image";
import Popup from "./Popup";

function VerifyLoading() {
  return (
    <Popup bg={"transparent"}>
      <div className=" flex flex-col justify-center items-center gap-2">
        <Image
          className="animate-spin "
          src="/images/loading-football.png"
          width={80}
          height={80}
          alt="loading football"
          priority
        />

        <div className="flex items-center font-Inter text-lg text-center text-black font-normal mt-2  tracking-wide ">
          <span className="uppercase ">Loading</span>
          <span className="dot1 ">.</span>
          <span className="dot2 ">.</span>
          <span className="dot3 ">.</span>
        </div>
      </div>
    </Popup>
  );
}

export default VerifyLoading;
