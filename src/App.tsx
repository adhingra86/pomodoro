import { useEffect, useState } from "react";

import { Button } from "./components/button";
import { Tabs } from "./components/tabs/tabs";
import { Timer } from "./components/timer";

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
        setCurrentTimer((prevTimer) => {
          const index = availableTimers.findIndex(
            (timer) => timer === prevTimer
          );
          if (index === availableTimers.length - 1) {
            return availableTimers[0];
          }
          return availableTimers[index + 1];
        });
        setIsActive(false);
      }
      return () => clearInterval(interval);
    }
  }, [secondsLeft, isActive]);

  useEffect(() => {
    setSecondsLeft(currentTimer * 60);
  }, [currentTimer]);

  return (
    <div className="flex flex-col items-center pt-10">
      <Tabs
        tabs={["Pomodoro", "Short Break", "Long Break"]}
        selectTab={(index) => {
          setCurrentTimer(availableTimers[index]);
          setIsActive(false);
        }}
        selectedTabIndex={availableTimers.findIndex(
          (timer) => timer === currentTimer
        )}
      />
      <Timer secondsLeft={secondsLeft} />
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
          backgroundColor="bg-blue-600"
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
