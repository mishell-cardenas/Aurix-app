import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
// import { captureFrame } from "../../utils/captureFrame";

export default function WebcamScan({ userData, setReading }) {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [scanText, setScanText] = useState("Initializing scan...");
  const [scanLine, setScanLine] = useState(0);
  const [loading, setLoading] = useState(false);

  const SPIRALS = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⠴⢤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⢾⣛⡆⠈⡏⠰⠶⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢦⣿⣄⣉⣁⣤⠽⣦⣤⡶⠶⣤⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠚⠹⡉⢃⣴⠟⠉⠀⠀⠀⠀⠉⠻⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⢡⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈⢷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡂⣿⡇⠀⠀⠀⠀⣠⣤⣀⠀⠀⠀⠘⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⢻⣷⠀⠀⠀⠀⢯⡉⣿⡆⠀⠀⣰⡇⠀⢀⣀⢤⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣧⣀⠀⠀⢀⣴⡟⠀⠀⣰⣿⡷⢏⡭⠔⠹⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠛⠿⠿⠟⠋⠀⢀⣼⣿⣿⣿⠿⣭⡉⢛⡃⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣀⣤⠶⠿⣟⣟⣝⡷⣲⢤⣀⠀⠀⠀⠀⠀⠀⢠⠀⠀⠀⠀⠀⠀⣠⣾⡿⠃⠹⡟⢖⠢⠽⠦⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⣴⠞⠁⠀⠀⠀⠀⠀⠉⠙⢦⣕⡯⣷⣄⠀⠀⠠⣴⠋⢓⡶⠂⠀⢀⣼⣿⠟⠁⠀⠀⠈⠺⡄⠋⣀⣰⣀⠀⠀⠀⠀⠀⠀
⠀⣠⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢯⣒⢭⣦⠀⠀⢸⠕⠦⠇⠀⣤⣿⡿⠃⣠⠴⠶⠶⣤⡀⠀⠀⠼⠿⡏⠀⠀⠀⠀⠀⠀
⢀⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣝⡫⢧⠀⠀⠀⠀⣠⣾⡿⠉⠀⢸⠁⢀⣀⠀⠈⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣼⠁⠀⠀⠀⠀⣠⣶⣿⣿⣷⣦⡀⠀⠀⠀⠀⠙⡮⣛⡆⠀⠀⣰⣿⡏⢐⡀⠀⠸⣦⣀⣨⠇⠒⣸⣀⣀⣄⣀⡀⠀⠀⠀⠀⠀⠀
⢹⠆⠀⠀⠀⢠⣿⡿⠃⠀⠀⠉⢻⡄⠀⠀⠀⠀⠙⣗⢿⠀⣸⡟⡙⢷⡈⢠⠀⡀⠈⠉⣁⠘⣠⠟⠉⠉⠙⢿⣿⡆⠀⠀⠀⠀⠀
⠘⣇⠀⠀⠀⠈⢿⡇⠀⢲⠀⠀⠀⢻⡀⠀⢤⣴⡀⠹⣽⣴⡿⣁⠀⠈⠻⣦⣤⣥⣌⣡⡤⠞⠁⠀⣰⠛⠆⣸⣿⡇⠀⠀⠀⠀⠀
⠀⢻⡄⠀⠀⠀⠀⠉⠙⠉⠀⠀⠀⢸⠀⠀⠚⠻⠁⠀⢿⣿⢣⢀⡤⠶⠲⢮⣍⡉⠉⠁⠀⣤⠀⠀⠘⢿⣿⡿⠏⠀⠀⠀⠀⠀⠀
⠀⠀⢻⣄⠀⠀⠀⠀⠀⠀⠀⠀⣰⠋⠀⡀⠀⠀⠀⠀⢸⣿⣰⠏⢀⡴⢶⡄⢸⡇⠀⢖⠚⠉⠓⣲⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠙⠷⣦⣄⣀⣀⣠⣴⠾⠁⠀⢰⣕⢲⣪⡉⠅⣾⣿⡟⠀⠈⠳⠭⠵⠋⠀⠀⣼⣁⢄⣸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠀⠀⠀⢤⡼⠉⢹⡣⣉⠀⣿⣿⡇⠀⠀⢠⣴⠶⢦⡀⠀⠁⠀⠀⣙⡂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡔⠟⡛⡀⡆⣿⡟⣷⠀⠀⣿⣇⣲⠈⡿⢀⣴⣾⣿⠿⠿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢰⡀⡷⣰⣇⡴⠠⠜⠀⠀⠀⠀⣿⡇⡘⣷⣄⠀⠙⣉⠞⢡⣿⡟⠁⠀⠀⠀⠀⠈⠻⣿⣆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠠⣤⣯⣷⣧⠿⠵⠶⠶⣤⣄⡀⠀⢻⣇⠡⡌⠻⣏⠉⠁⠀⢺⣿⠀⠀⢀⣶⣶⣤⠀⠀⠘⣿⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠠⢾⡿⡋⠗⠈⠃⠈⠁⠰⠉⡻⢶⣜⣿⢘⠂⣠⣌⣷⡀⠀⢸⣿⡆⠀⠈⠧⠄⢸⡇⠀⠀⣹⠇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣰⠏⠄⠁⠀⠀⠀⠀⠀⠀⠀⠁⠈⠙⢿⣏⠰⡏⣬⣿⢻⡀⠀⠻⣿⣄⠀⠀⣠⠞⠀⠀⢠⡟⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢰⡏⠴⠀⠀⠀⠀⢀⣠⣀⣀⠀⠀⠀⠀⠈⢻⣧⡙⢦⣤⡾⠁⠀⠀⠈⠙⠛⠋⠁⠀⠀⣠⡞⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠸⢿⡀⠀⠀⠀⣰⠋⠁⠀⠉⠙⢦⠀⠀⠀⠀⢻⣟⢦⣄⡀⠀⠀⠀⠀⠀⠀⠀⣀⣤⠾⠋⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢹⡹⣇⠀⠀⠘⡇⠀⠀⠖⡆⠀⠘⣧⠀⠀⠀⠀⠻⣎⢿⠹⠳⢲⡲⢶⠶⠾⠛⠉⣁⣠⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠸⣎⡹⣧⡀⠀⠻⣦⣤⠴⠃⠀⢰⠏⠀⣤⣀⣴⠀⠙⣧⡱⡀⢠⡾⢟⣛⡓⣆⠀⠿⣿⠛⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠱⣊⠜⣻⣶⣄⣀⠀⠀⠀⣀⠟⠠⣔⣊⠁⣶⣄⠀⠈⢷⣅⢸⠅⢸⣓⣃⣼⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠙⢮⡞⡜⡝⡝⡟⡯⠟⠁⠀⠀⠀⠈⠿⠀⠀⠀⠀⠀⠹⣶⡳⢤⣹⣯⡥⠴⠶⠶⠦⣄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣤⣀⠀⠈⠻⣦⡀⠀⠀⡞⣙⣷⠀⢈⡆⠀⠀⣀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⠏⣤⢈⣿⠀⠀⠀⠈⠳⣄⠈⣷⣈⣉⣠⡼⢡⡾⠛⠉⠙⢳⡀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣄⠈⠉⠁⢀⣀⣤⣶⣶⣾⣷⣌⠙⠋⠁⠀⣿⠀⢤⡀⠀⠀⣷
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⠿⠛⠛⠉⠁⡼⠋⢠⠨⠍⡳⢄⡀⠀⠘⠻⠛⠁⠀⣰⡿
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⣔⡒⡞⡀⠁⠰⠙⡲⢦⣤⣤⣤⣾⠿⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠑⠺⠞⠧⠁⠀⠀⠀⠁⠐⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`;

  useEffect(() => {
    const messages = [
      "Initializing scan...",
      "Detecting spectral signature...",
      "Analyzing frequency patterns...",
      "Consulting the angels...",
      "Spectral analysis complete.",
    ];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < messages.length) {
        setScanText(messages[i]);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      setScanText("Processing your aura...");

      try {
        const response = await fetch("/api/read-aura", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: userData.name,
            zodiac: userData.zodiac,
            emotionalState: userData.emotionalState,
            spotify: userData.spotify,
          }),
        });

        const data = await response.json();
        setReading(data);
        navigate("/results");
      } catch (err) {
        console.error("API error:", err);
        setScanText("Signal lost. Please try again.");
        setLoading(false);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="
          min-h-screen
          flex items-center justify-center
          relative overflow-hidden
          bg-[radial-gradient(circle_at_center,_#d9f99d_5%,_#d9f99d_5%,_#f7fee7_65%,_#ffffff_100%)]"
    >
      <pre
        className="
          absolute left-30
          top-1/2 -translate-y-1/2
          text-[10px] leading-[1]
          text-black opacity-60
          whitespace-pre select-none
        "
      >
        {SPIRALS}
      </pre>

      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
        {/* WEBCAM CONTAINER */}
        <div
          className="relative w-full max-w-xl overflow-hidden"
          style={{ aspectRatio: "16/9" }}
        >
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-full object-cover"
            mirrored={true}
          />

          <div
            className="absolute left-0 w-full h-0.5 bg-sky-300 opacity-70 pointer-events-none"
            style={{ top: `${scanLine}%`, transition: "top 30ms linear" }}
          />

          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-sky-300" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-sky-300" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-sky-300" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-sky-300" />
        </div>

        <p
          className="text-sm text-slate-500 italic"
          style={{ fontFamily: "monospace" }}
        >
          {loading ? "Processing your aura..." : scanText}
          <span className="animate-pulse">|</span>
        </p>
      </div>

      <pre
        className="
          absolute right-10
          top-1/2 -translate-y-1/2
          text-[10px] leading-[1]
          text-black opacity-60
          whitespace-pre select-none
        "
      >
        {SPIRALS}
      </pre>
    </div>
  );
}
