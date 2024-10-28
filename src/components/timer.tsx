export const Timer = ({ secondsLeft }: { secondsLeft: number }) => {
  const formatTimeLeft = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? "0" : ""}${
      seconds % 60
    }`;
  };

  return (
    <h1 className="text-9xl my-6 w-[350px] text-center">
      {formatTimeLeft(secondsLeft)}
    </h1>
  );
};
