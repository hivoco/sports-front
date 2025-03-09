const LeaderBoard = ({ ranks, animationNumber }) => {

  const numberToRank = (rank) => {
    switch (Number(rank)) {
      case 2:
        return "nd";

      case 3:
        return "rd";

      case 4:
        return "th";

      case 5:
        return "th";
      default:
        return "";
    }
  };
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
          <div className="flex gap-4 items-center">
            <span>
              {entry.rank}
              {numberToRank(entry.rank)}
            </span>
            <span>{entry.name}</span>
          </div>

          <span>{entry.score} PTS. </span>
        </div>
      ))}
    </div>
  );
};

export default LeaderBoard;
