import { useEffect, useState } from "react";

import { Button } from "./components/button";
import { Tabs } from "./components/tabs/tabs";

const timersMap = new Map([
  ["Pomodoro", 25],
  ["Short Break", 5],
  ["Long Break", 15],
]);

function App() {
  const availableTimers = Array.from(timersMap.values());
  const [currentTimer, setCurrentTimer] = useState(availableTimers[0]);
  const [secondsLeft, setSecondsLeft] = useState(currentTimer * 60);
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

  useEffect(() => {
    setSecondsLeft(currentTimer * 60);
  }, [currentTimer]);

  const formatTimeLeft = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? "0" : ""}${
      seconds % 60
    }`;
  };

  return (
    <div className="flex flex-col items-center">
      <Tabs
        tabs={["Pomodoro", "Short Break", "Long Break"]}
        selectedTabIndex={(index) => {
          setCurrentTimer(availableTimers[index]);
          setIsActive(false);
        }}
      />
      <h1 className="text-9xl mb-2 w-[350px] text-center">
        {formatTimeLeft(secondsLeft)}
      </h1>
      <div className="flex gap-3">
        <Button
          buttonText={
            isActive
              ? "Pause"
              : secondsLeft === currentTimer * 60
              ? "Start"
              : "Resume"
          }
          onClick={() => setIsActive(!isActive)}
        />
        <Button
          buttonText="Reset"
          onClick={() => {
            setSecondsLeft(currentTimer * 60);
            setIsActive(false);
          }}
        />
      </div>
    </div>
  );
}

export default App;
