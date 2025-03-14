import React, { useState, useEffect } from "react";
import Noise from "./components/noise";
import Angry from "./components/angry";
import CursorDisk from "./components/CursorDisk";
import Happy from "./components/Happy";
import Scared from "./components/Scared";
import LoadingAnimation from "./components/LoadingAnimation";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <LoadingAnimation onComplete={handleLoadingComplete} />
      
      <div
        className={`h-screen overflow-y-scroll snap-y snap-mandatory transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* IE and Edge */,
          WebkitOverflowScrolling: "touch",
          pointerEvents: isLoading ? "none" : "auto",
        }}
      >
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;  /* Safari and Chrome */
            }
          `}
        </style>
        {!isLoading && <CursorDisk />}
        <Noise />
        <div className="relative">
          <div
            id="first-panel"
            className="w-full h-screen flex items-center justify-center snap-start relative overflow-hidden bg-white"
          >
            <div className="flex flex-col gap-32 text-center">
              <h1 className="text-4xl font-bold animate-better-pulse text-black">
                Welcome to the Mood Studio
              </h1>
              <p className="text-lg animate-better-pulse delay-750 text-black">
                How are you feeling ?
              </p>
            </div>
          </div>
          <div className="snap-start">
            <Angry />
          </div>
          <div className="w-full h-screen flex items-center justify-center snap-start">
            <Happy />
          </div>
          <div className="w-full h-screen bg-cyan-950 flex items-center justify-center snap-start">
            <Scared />
          </div>
        </div>
      </div>
    </>
  );
}
