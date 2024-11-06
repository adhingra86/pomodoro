import { useEffect, useState } from "react";

import { Button } from "./components/button";
import { Tabs } from "./components/tabs/tabs";
import { Timer } from "./components/timer";

const timersMap = new Map([
  ["Pomodoro", 25],
  ["Short Break", 5],
  ["Long Break", 15],
]);

const POMODORO_CYCLE_LENGTH = 4;

function App() {
  const availableTimers = Array.from(timersMap.values());
  const [currentTimer, setCurrentTimer] = useState(availableTimers[0]);
  const [secondsLeft, setSecondsLeft] = useState(currentTimer * 60);
  const [isActive, setIsActive] = useState(false);
  const [pomoSessions, setPomoSessions] = useState(0);

  const timerIndex = availableTimers.indexOf(currentTimer);
  const currentTimerName = Array.from(timersMap.keys())[timerIndex];

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
        clearInterval(interval);
        setIsActive(false);
        handleTimerEnd();
      }
      return () => clearInterval(interval);
    }
  }, [secondsLeft, isActive]);

  useEffect(() => {
    setSecondsLeft(currentTimer * 60);
  }, [currentTimer]);

  const handleTimerEnd = () => {
    if (currentTimerName === "Pomodoro") {
      setPomoSessions((session) => session + 1);
      if (pomoSessions + 1 === POMODORO_CYCLE_LENGTH) {
        setCurrentTimer(availableTimers[availableTimers.length - 1]);
      } else {
        setCurrentTimer(availableTimers[timerIndex + 1]);
      }
    } else if (currentTimerName === "Short Break") {
      setCurrentTimer(availableTimers[timerIndex - 1]);
    } else if (currentTimerName === "Long Break") {
      setCurrentTimer(availableTimers[0]);
      setPomoSessions(0);
    }
  };

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
