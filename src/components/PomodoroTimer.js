"use client";

import { useState, useRef } from "react";

const PomodoroTimer = () => {
  const [isPomodoro, setIsPomodoro] = useState(true);
  const [duration, setDuration] = useState(25 * 60);
  const [intervalId, setIntervalId] = useState(null);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [message, setMessage] = useState("");
  const musicRef = useRef(null);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const updateTimer = (duration) => {
    setDuration(duration);
  };

  const startPomodoro = () => {
    clearInterval(intervalId);

    if (musicRef.current) {
      musicRef.current.play();
    }

    let count = pomodoroCount;
    let currentDuration = isPomodoro ? 25 * 60 : 5 * 60;

    const timerFunction = () => {
      updateTimer(currentDuration);
      currentDuration--;

      if (currentDuration < 0) {
        count++;
        clearInterval(intervalId);

        if (count % 4 === 0) {
          setMessage("Time for a long break!");
          currentDuration = 15 * 60;
        } else {
          setMessage(
            isPomodoro ? "Time for a short break!" : "Time to get back to work!"
          );
          currentDuration = isPomodoro ? 5 * 60 : 25 * 60;
        }

        setIsPomodoro(!isPomodoro);
        setPomodoroCount(count);
        const newIntervalId = setInterval(timerFunction, 1000);
        setIntervalId(newIntervalId);
      }
    };

    const newIntervalId = setInterval(timerFunction, 1000);
    setIntervalId(newIntervalId);
  };

  const endTask = () => {
    clearInterval(intervalId);
    setDuration(0);
    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.currentTime = 0;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 to-purple-600 text-white">
      <div className="flex flex-col items-center justify-center bg-white/10 text-center p-5 rounded-lg shadow-lg">
        <h1 className="text-4xl mb-6">Pomodoro Timer</h1>
        <div className="text-6xl mb-6">{formatTime(duration)}</div>
        {message && <div className="text-2xl mb-6">{message}</div>}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={startPomodoro}
            className="px-6 py-3 bg-pink-600 rounded-lg hover:bg-pink-700 active:scale-95 transition"
          >
            Start Pomodoro
          </button>
          <button
            onClick={endTask}
            className="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 active:scale-95 transition"
          >
            End Task
          </button>
        </div>
        <audio ref={musicRef} loop>
          <source src="/music.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default PomodoroTimer;
