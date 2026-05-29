import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LEFT_SIDE = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢶⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢾⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠘⢿⣷⡀⠀⣀⣀⣤⣤⣶⣶⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⠀⠈⠻⣿⠿⠿⠟⢛⣿⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢀⣀⣠⣤⣴⣶⣿⡿⠿⠛⠀⠀⠀⠀⠀⢀⣴⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠉⠛⠿⠿⣿⣿⣯⣄⣀⠀⠀⠀⠀⠀⠀⠀⢾⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠉⠙⠛⠿⣿⡗⠀⠀⢀⡀⠀⠀⠻⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⣠⣿⡿⣷⣶⣦⣝⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣯⣼⣿⠏⠀⠀⠈⠙⠛⠿⢿⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠒⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢘⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⡟⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⣀⣤⣤⣼⣿⠀⠙⣿⣶⣦⣶⣶⣶⣶⡶⠂
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠿⣿⣿⣛⡉⠉⠁⠀⠀⠀⠀⢀⣤⣿⠟⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⢿⣿⣶⠀⠀⠀⠀⢰⣿⠿⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⢀⣤⣀⠀⢻⣷⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣇⣴⡿⠋⠻⢿⣶⣿⣧⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢨⣿⠟⠉⠀⠀⠀⠀⠈⠙⠿⣧⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣷⡀⠀⠀⠀⠀⠀⠘⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣦⡀⠀⠀⢀⣠⣤⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣇⠙⢷⠾⠿⣻⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣀⣤⣤⣶⡿⠛⠋⠀⠀⠀⣴⣟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠉⠙⠛⠿⣶⠀⢀⣄⣈⣻⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣣⣾⠋⠛⠛⠿⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡿⠁⠀⠀⠀⠀⠀⠀⢠⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡙⠁⠀⠀⠀⠀⠀⠀⣠⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣷⠶⠶⠏⠸⣧⣤⣄⣀⣀⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢙⣷⠀⠀⠀⣤⡶⠟⠋⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣧⣤⣦⡀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠿⠋⠉⠀⠈⠻⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠈⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡶⣤⢶⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣷⡠⣽⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`;

const RIGHT_SIDE = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢾⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠘⢿⣷⡀⠀⣀⣀⣤⣤⣶⣶⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⠀⠈⠻⣿⠿⠿⠟⢛⣿⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢀⣀⣠⣤⣴⣶⣿⡿⠿⠛⠀⠀⠀⠀⠀⢀⣴⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠉⠛⠿⠿⣿⣿⣯⣄⣀⠀⠀⠀⠀⠀⠀⠀⢾⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠉⠙⠛⠿⣿⡗⠀⠀⢀⡀⠀⠀⠻⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⣠⣿⡿⣷⣶⣦⣝⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣯⣼⣿⠏⠀⠀⠈⠙⠛⠿⢿⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠒⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢘⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⡟⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⣀⣤⣤⣼⣿⠀⠙⣿⣶⣦⣶⣶⣶⣶⡶⠂
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠿⣿⣿⣛⡉⠉⠁⠀⠀⠀⠀⢀⣤⣿⠟⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⢿⣿⣶⠀⠀⠀⠀⢰⣿⠿⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠀⢀⣤⣀⠀⢻⣷⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣇⣴⡿⠋⠻⢿⣶⣿⣧⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢨⣿⠟⠉⠀⠀⠀⠀⠈⠙⠿⣧⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣷⡀⠀⠀⠀⠀⠀⠘⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣦⡀⠀⠀⢀⣠⣤⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣇⠙⢷⠾⠿⣻⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣀⣤⣤⣶⡿⠛⠋⠀⠀⠀⣴⣟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠉⠙⠛⠿⣶⠀⢀⣄⣈⣻⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣣⣾⠋⠛⠛⠿⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡿⠁⠀⠀⠀⠀⠀⠀⢠⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡙⠁⠀⠀⠀⠀⠀⠀⣠⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣷⠶⠶⠏⠸⣧⣤⣄⣀⣀⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢙⣷⠀⠀⠀⣤⡶⠟⠋⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣧⣤⣦⡀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠿⠋⠉⠀⠈⠻⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠈⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⡶⣤⢶⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣷⡠⣽⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`;

export default function IntakeForm({ userData, setUserData }) {
  const navigate = useNavigate();

  const [showEmotionPlaceholder, setShowEmotionPlaceholder] = useState(true);

  const [showZodiacPlaceholder, setShowZodiacPlaceholder] = useState(true);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !userData.name ||
      !userData.zodiac ||
      !userData.emotionalState
    )
      return;

    navigate("/scan");
  };

  return (
    <div
      className="
        min-h-screen
        flex items-center justify-center
        relative overflow-hidden
        bg-[radial-gradient(circle_at_center,_#ffcce5_25%,_#ffe6f2_55%,_#ffffff_100%)]
      "
    >
      <pre
        className="
          absolute left-10
          top-1/2 -translate-y-1/2
          text-[20px] leading-[1]
          text-black opacity-60
          whitespace-pre select-none
        "
      >
        {LEFT_SIDE}
      </pre>

      <div
        className="
          flex flex-col items-center justify-center
          px-8 py-10
          w-full max-w-md
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          rounded-3xl
          shadow-[0_8px_32px_rgba(31,38,135,0.15)]
          z-10
        "
      >
        <p
          className="
            text-center text-sm text-slate-700
            max-w-sm mb-7 leading-relaxed
          "
          style={{ fontFamily: "monospace" }}
        >
          In order to conduct an accurate reading, the diagnostic tool requires
          the following information. All data is processed by the angels and
          immediately forgotten.
        </p>

        <div className="flex flex-col gap-4 w-full max-w-sm">
          <input
            type="text"
            name="name"
            placeholder="Your screen name"
            value={userData.name}
            onChange={handleChange}
            className="
              border border-slate-300
              px-4 py-3
              text-sm text-slate-800
              outline-none
              focus:border-pink-400
              transition-colors
            "
            style={{ fontFamily: "monospace" }}
          />

          <div className="relative">
            {showZodiacPlaceholder && !userData.zodiac && (
              <span
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-sm text-slate-800
                  pointer-events-none
                "
                style={{ fontFamily: "monospace" }}
              >
                Your zodiac sign
              </span>
            )}

            <select
              name="zodiac"
              value={userData.zodiac}
              onChange={(e) => {
                handleChange(e);
                setShowZodiacPlaceholder(false);
              }}
              className="
                w-full
                bg-transparent
                border border-slate-300
                px-4 py-3 pr-10
                text-sm text-slate-800
                outline-none
                focus:border-pink-400
                transition-all duration-300
                appearance-none
              "
              style={{ fontFamily: "monospace" }}
            >
              <option value=""></option>

              <option value="Aries">Aries</option>
              <option value="Taurus">Taurus</option>
              <option value="Gemini">Gemini</option>
              <option value="Cancer">Cancer</option>
              <option value="Leo">Leo</option>
              <option value="Virgo">Virgo</option>
              <option value="Libra">Libra</option>
              <option value="Scorpio">Scorpio</option>
              <option value="Sagittarius">Sagittarius</option>
              <option value="Capricorn">Capricorn</option>
              <option value="Aquarius">Aquarius</option>
              <option value="Pisces">Pisces</option>
            </select>
          </div>

          {/* Emotional State Select */}
          <div className="relative">
            {showEmotionPlaceholder && !userData.emotionalState && (
              <span
                className="
                    absolute left-4 top-1/2
                    -translate-y-1/2
                    text-sm text-slate-800
                    pointer-events-none
                  "
                style={{ fontFamily: "monospace" }}
              >
                How are you feeling today?
              </span>
            )}

            <select
              name="emotionalState"
              value={userData.emotionalState}
              onChange={(e) => {
                handleChange(e);
                setShowEmotionPlaceholder(false);
              }}
              className="
                w-full
                bg-transparent
                border border-slate-300
                px-4 py-3 pr-10
                text-sm text-slate-800
                outline-none
                focus:border-pink-400
                transition-all duration-300
                appearance-none
              "
              style={{ fontFamily: "monospace" }}
            >
              <option value=""></option>

              <option value="Happy">Happy</option>
              <option value="Sad">Sad</option>
              <option value="Angry">Angry</option>
              <option value="Calm">Calm</option>
              <option value="Excited">Excited</option>
              <option value="Tired">Tired</option>
              <option value="Stressed">Stressed</option>
              <option value="Confused">Confused</option>
              <option value="Anxious">Anxious</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="text"
              name="spotify"
              placeholder="Your spotify username*"
              value={userData.spotify}
              onChange={handleChange}
              className="
                border border-slate-300
                px-4 py-3
                text-sm text-slate-800
                outline-none
                focus:border-pink-400
                transition-colors
              "
              style={{ fontFamily: "monospace" }}
            />

            <span
              className="text-xs text-slate-600 italic mt-2.5"
              style={{ fontFamily: "monospace" }}
            >
              * Optional. The angels are not judgmental about music taste.
            </span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={
              !userData.name ||
              !userData.zodiac ||
              !userData.emotionalState
            }
            className="
              mt-7
              bg-pink-500
              border border-white/20
              rounded-2xl
              text-slate-900
              px-6 py-3
              text-sm
              shadow-lg
              hover:bg-pink-400
              hover:scale-[1.02]
              transition-all duration-300
              cursor-pointer
              disabled:opacity-30
              disabled:cursor-not-allowed
            "
            style={{ fontFamily: "monospace" }}
          >
            conduct face scan
          </button>
        </div>
      </div>

      <pre
        className="
          absolute -right-80
          top-1/2 -translate-y-1/2
          text-[20px] leading-[1]
          text-black opacity-60
          whitespace-pre select-none
        "
      >
        {RIGHT_SIDE}
      </pre>
    </div>
  );
}
