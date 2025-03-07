const LeaderBoard = ({ ranks }) => {
  console.log("ranks", ranks);
  // const ranks = [
  //   { rank: "2nd", name: "Vidhaan", points: 98 },
  //   { rank: "3rd", name: "Shaurya", points: 98 },
  //   { rank: "4th", name: "Aanya", points: 98 },
  //   { rank: "5th", name: "Ayush", points: 98 },
  // ];

  return (
    <div className="flex flex-1 flex-col items-center justify-between gap-1.5  h-2/5">
      {ranks.map((entry, index) => (
        <div
          key={index}
          className="flex grow justify-between items-center  px-5 h-[54px]   font-Inter bg-white/25 font-semibold  text-[20px] leading-6 text-center border border-white text-white w-full rounded-full"
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
