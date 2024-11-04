import { useEffect, useState } from "react";

import { Button } from "./components/button";
import { Tabs } from "./components/tabs/tabs";
import { Timer } from "./components/timer";

const timersMap = new Map([
  ["Pomodoro", 0.1],
  ["Short Break", 0.05],
  ["Long Break", 15],
]);

function App() {
  const availableTimers = Array.from(timersMap.values());
  const [currentTimer, setCurrentTimer] = useState(availableTimers[0]);
  const [secondsLeft, setSecondsLeft] = useState(currentTimer * 60);
  const [isActive, setIsActive] = useState(false);
  const [pomoSessions, setPomoSessions] = useState(0);

  useEffect(() => {
    const currentPomoSessions = localStorage.getItem("pomoSessions");
    if (currentPomoSessions) {
      setPomoSessions(Number(currentPomoSessions));
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }, 1000);

      if (secondsLeft === 0) {
        setPomoSessions((pomoSessions) => pomoSessions + 1);
        localStorage.setItem("pomoSessions", String(pomoSessions + 1));
        setCurrentTimer((prevTimer) => {
          if (
            availableTimers.indexOf(prevTimer) + 1 ===
              availableTimers.length - 1 &&
            pomoSessions < 4
          ) {
            return availableTimers[0];
          }
          const index = availableTimers.findIndex(
            (timer) => timer === prevTimer
          );

          return availableTimers[index + 1];
        });
        clearInterval(interval);
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
          buttonText={isActive ? "Pause" : "Start"}
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
