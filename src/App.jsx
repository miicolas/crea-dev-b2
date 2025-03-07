import Noise from "./components/noise";
import Angry from "./components/angry";
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
      <div className="relative z-20">
        <div className="w-full h-screen bg-green-500 flex items-center justify-center snap-start">
          Panel 1
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
