const LeaderBoard = ({ ranks, animationNumber }) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-between gap-1.5  h-2/5">
      {ranks.map((entry, index) => (
        <div
          key={index}
          style={{
            transitionDuration: `${index * 1500}ms`,
          }}
          className={`flex grow justify-between items-center  px-5 h-[54px]   font-Inter bg-white/25 font-semibold  text-[18px] leading-[18px] text-center border border-white text-white w-full rounded-full
                transition-all ease-in-out 
                ${animationNumber >= 2 ? "opacity-100" : "opacity-0"}
            `}
        >
          <span>{entry.rank}</span>
          <span>{entry.name}</span>
          <span>Pts. {entry.score}</span>
        </div>
      ))}
    </div>
  );
};

export default LeaderBoard;
