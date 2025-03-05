const Hexagon = ({ title, className }) => {
  return (
    <div
      className={`w-16 h-14 flex items-center justify-center
        ${className}
        `}
      style={{
        clipPath:
          "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
      }}
    >
      <span
        className={`font-Inter font-normal text-2xl leading-7 text-center 
      `}
      >
        {title}
      </span>
    </div>
  );
};

export default Hexagon;
