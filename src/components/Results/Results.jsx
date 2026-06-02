import { useNavigate } from "react-router-dom";
import { WINGS } from "../../data/auraTypes";

export default function Results({ reading }) {
  const navigate = useNavigate();

  const mock = {
    auraType: "The Radiant Angel",
    auraNumber: 6,
    color: "#CFEEDC",
    textColor: "#2D3A33",
    reading:
      "You carry a gentle glow that turns ordinary moments into quiet blessings. Your happiness ripples outward, creating a calm harmony that others can feel before they understand it. The careful, earth-touched nature of Virgo softens into warmth today, making your energy both grounded and luminous. You seem to be standing in a doorway between gratitude and possibility, where small joys reveal hidden magic.",
    prophecy: "A forgotten wish will return wearing a new face.",
    angelNumber: 444,
    frequencyLabel: "Emerald Harmony",
    frequencyExplanation:
      "This frequency reflects steady growth, inner balance, and blessings quietly taking root around you.",
  };

  const data = reading || mock;

  const wing = WINGS[data.auraNumber - 1] || WINGS[0];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ backgroundColor: data.color, color: data.textColor }}
    >
      <div
        className="flex flex-col gap-6 w-full max-w-2xl text-center px-8"
        style={{ fontFamily: "monospace" }}
      >
        <div className="flex flex-col gap-1">
          <p className="text-xs tracking-widest uppercase opacity-60">
            Spectral Analysis Complete
          </p>
          <h1 className="text-4xl font-light tracking-wide">{data.auraType}</h1>
          <p className="text-xs opacity-50">
            aura type {String(data.auraNumber).padStart(2, "0")} of 08
          </p>
        </div>

        <pre
          className="text-[10px] leading-tight select-none text-center"
          style={{ color: data.textColor }}
        >
          {wing}
        </pre>

        <div className="flex flex-col gap-2 text-left">
          <p className="text-xs tracking-widest uppercase opacity-60">
            Aura Reading
          </p>
          <p className="text-sm leading-relaxed">{data.reading}</p>
        </div>

        <div className="flex flex-col gap-2 text-left">
          <p className="text-xs tracking-widest uppercase opacity-60">
            Prophecy
          </p>
          <p className="text-sm leading-relaxed italic">{data.prophecy}</p>
        </div>

        <div className="flex flex-col gap-1 text-left">
          <p className="text-xs tracking-widest uppercase opacity-60">
            Your Angel Number
          </p>
          <p className="text-2xl font-light">✨ {data.angelNumber} ✨</p>
          <p className="text-sm">
            {data.frequencyLabel}: {data.frequencyExplanation}
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="
            self-center
            px-8 py-3
            text-sm
            text-slate-700
            border border-white/30
            bg-white/10
            backdrop-blur-md
            rounded-xl

            shadow-lg
            hover:bg-gray-100/60
            hover:border-white/40

            transition-all duration-300
            cursor-pointer
          "
          style={{ fontFamily: "monospace" }}
        >
          back to start
        </button>
      </div>
    </div>
  );
}
