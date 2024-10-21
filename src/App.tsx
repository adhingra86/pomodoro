import { useEffect, useState } from "react";

import { Button } from "./components/button";

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
    <div className="flex flex-col items-center">
      <h1 className="text-9xl mb-2 w-[350px] text-center">
        {formatTimeLeft(secondsLeft)}
      </h1>
      <div className="flex gap-3">
        <Button
          buttonText={
            isActive
              ? "Pause"
              : secondsLeft === pomoTimer * 60
              ? "Start"
              : "Resume "
          }
          onClick={() => setIsActive(!isActive)}
        />
        <Button
          buttonText="Reset"
          onClick={() => {
            setSecondsLeft(pomoTimer * 60);
            setIsActive(false);
          }}
        />
      </div>
    </div>
  );
}

export default App;
