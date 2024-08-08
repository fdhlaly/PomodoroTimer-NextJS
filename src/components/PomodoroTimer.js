"use client";

import { useState, useRef, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const PomodoroTimer = () => {
  const [isPomodoro, setIsPomodoro] = useState(true);
  const [duration, setDuration] = useState(25 * 60);
  const [intervalId, setIntervalId] = useState(null);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const musicRef = useRef(null);
  const isInitialRender = useRef(true);

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

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsAnimating(true);
    }, 10); // Small delay to ensure transition is applied
  };

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300); // Match this duration with the transition duration
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      if (isModalOpen) {
        setIsAnimating(true);
      }
    }
  }, [isModalOpen]);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-500 ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-pink-500 to-purple-600 text-black"
      }`}
    >
      <button
        onClick={toggleTheme}
        className="text-2xl md:text-3xl cursor-pointer absolute top-3 right-3 bg-white/10 shadow-md rounded-full p-3 hover:bg-white/35 transition-colors duration-500"
      >
        {isDarkMode ? (
          <FaSun className="text-yellow-500" />
        ) : (
          <FaMoon className="text-yellow-500" />
        )}
      </button>
      <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-center">
        Pomodoro Timer
      </h1>
      <div className="text-6xl md:text-7xl lg:text-8xl mb-6">
        {formatTime(duration)}
      </div>
      {message && (
        <div className="text-2xl md:text-3xl mb-6 text-center">{message}</div>
      )}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6 w-full justify-center">
        <button
          onClick={startPomodoro}
          className={`px-6 py-3 transition-all w-full rounded-lg md:w-auto active:scale-95 ${
            isDarkMode
              ? "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
              : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
          }`}
        >
          Start Pomodoro
        </button>
        <button
          onClick={endTask}
          className={`px-6 py-3 transition-all w-full rounded-lg md:w-auto active:scale-95 ${
            isDarkMode
              ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              : "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
          }`}
        >
          End Task
        </button>
      </div>
      <button
        onClick={openModal}
        className={`px-6 py-3 transition-all w-full rounded-lg md:w-auto active:scale-95 ${
          isDarkMode
            ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
        }`}
      >
        Learn About Pomodoro
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center text-center bg-black bg-opacity-50 transition-opacity duration-300 ${
            isAnimating ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`bg-white text-black p-6 rounded-lg w-3/4 md:w-1/2 transform transition-transform duration-300 ${
              isAnimating ? "scale-100" : "scale-90"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b">
              What is the Pomodoro Technique?
            </h2>
            <p className="mb-4">
              The Pomodoro Technique is a time management method developed by
              Francesco Cirillo in the late 1980s. It uses a timer to break down
              work into intervals, traditionally 25 minutes in length, separated
              by short breaks. These intervals are known as "Pomodoros," after
              the tomato-shaped kitchen timer that Cirillo used as a university
              student.
            </p>
            <p className="mb-4">
              The technique is based on the idea that the timer creates a sense
              of urgency, which helps to focus the mind and avoid distractions.
              After completing a Pomodoro, you take a short break of 5 minutes,
              and after four Pomodoros, you take a longer break of 15-30
              minutes.
            </p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <audio ref={musicRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default PomodoroTimer;
