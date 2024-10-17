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
    <h1>
      {formatTimeLeft(secondsLeft)}
      <br />
      <button onClick={() => setIsActive(!isActive)}>
        {isActive
          ? "Pause"
          : secondsLeft === pomoTimer * 60
          ? "Start"
          : "Resume "}
      </button>
      <button
        onClick={() => {
          setSecondsLeft(pomoTimer * 60);
          setIsActive(false);
        }}
      >
        Reset
      </button>
    </h1>
  );
}

export default App;
