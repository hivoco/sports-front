import { ChevronRight } from "lucide-react";

const Button = ({ title, displayIcon, className }) => {
  return (
    <button
      className={`flex h-14 relative justify-center  items-center font-Inter bg-white/25 font-semibold text-[20px] leading-6 text-center border border-white text-white w-full
      rounded-full 
      ${className}`}
    >
      <span className="">{title}</span>

      {displayIcon && (
        <div className="absolute right-0 w-14 h-14 bg-white rounded-full  shadow-md border border-gray-200 flex justify-center items-center">
          <ChevronRight className="" size={20} color="#001734" />
        </div>
      )}
    </button>
  );
};

export default Button;
