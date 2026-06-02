import { useState } from "react";

const DISCLAIMER = `Aurix was inspired by a magical aura scanner I stumbled upon on Instagram (@aitanapico), full credit to the original creator for the concept. This is my own independent take on it, built from scratch.

The angel wing and star ASCII art featured in the app was sourced from emojicombos.com, a wonderful corner of the internet!

One important note about the camera: it's purely for the vibe. When you grant camera access, your video feed is displayed locally on your screen for the theatrical scanning effect and that's it. No images are taken. No frames are captured. Nothing is sent anywhere. Your face is never used, stored, or processed in any way. The angels only need your name, zodiac, and emotional state to do their work.`;

export default function Disclaimer() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
          onClick={() => setOpen(!open)}
          className="
            fixed top-4 left-4 
            z-50 w-8 h-8 
            rounded-full
            text-slate-600
            border border-slate-300
            bg-white/10
            backdrop-blur-md

            shadow-lg
            hover:bg-slate-200/60
            hover:border-white/40

            transition-all
            text-xs flex 
            items-center 
            justify-center 
            cursor-pointer
            duration-300
          "
          style={{ fontFamily: "monospace" }}
        >
          ?
        </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div
            className="fixed top-14 left-4 z-50 max-w-sm bg-white/80 backdrop-blur-md border border-white/40 rounded-xl p-6 shadow-xl"
            style={{ fontFamily: "monospace" }}
          >
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs tracking-widest uppercase text-slate-500">
                Disclaimer
              </p>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
              {DISCLAIMER}
            </p>
            <div className="mt-4 flex flex-col gap-1">
              <a
                href="https://www.instagram.com/p/DYhvWR7DKtD/"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-slate-600 underline transition-colors"
              >
                original project
              </a>

              <a
                href="https://emojicombos.com/angel-wings-ascii-art"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-slate-600 underline transition-colors"
              >
                angel wing art
              </a>

              <a
                href="https://emojicombos.com/stars-ascii-art"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-slate-600 underline transition-colors"
              >
                star art
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
