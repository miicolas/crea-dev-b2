import Noise from "./components/noise";
import Angry from "./components/angry";
import CursorDisk from "./components/CursorDisk";

export default function App() {
  return (
    <div
      className="h-screen overflow-y-scroll snap-y snap-mandatory"
      style={{
        scrollbarWidth: "none" /* Firefox */,
        msOverflowStyle: "none" /* IE and Edge */,
        WebkitOverflowScrolling: "touch",
      }}
    >
      <style>
        {`
          div::-webkit-scrollbar {
            display: none;  /* Safari and Chrome */
          }
        `}
      </style>
      <Noise />
      <CursorDisk />
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
        <div className="w-full h-screen bg-green-500 flex items-center justify-center snap-start">
          Panel 3
        </div>
      </div>
    </div>
  );
}
