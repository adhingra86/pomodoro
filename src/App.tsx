import { useEffect, useState } from "react";

function App() {
  const pomoTimer = 25;
  const [secondsLeft, setSecondsLeft] = useState(pomoTimer * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }, 1000);

      if (secondsLeft === 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }
  }, [secondsLeft, isActive]);

  const formatTimeLeft = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? "0" : ""}${
      seconds % 60
    }`;
  };

  return (
    <div className="flex flex-col items-center py-5">
      <h1 className="text-9xl mb-2">{formatTimeLeft(secondsLeft)}</h1>
      <div>
        <button
          onClick={() => setIsActive(!isActive)}
          className="bg-blue-700 text-white py-2 px-7 mr-1"
        >
          {isActive
            ? "Pause"
            : secondsLeft === pomoTimer * 60
            ? "Start"
            : "Resume "}
        </button>
        <button
          className="bg-blue-700 text-white py-2 px-7"
          onClick={() => {
            setSecondsLeft(pomoTimer * 60);
            setIsActive(false);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
