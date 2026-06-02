import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import IntakeForm from "./components/IntakeForm/IntakeForm";
import WebcamScan from "./components/WebcamScan/WebcamScan";
import Results from "./components/Results/Results";

function App() {
  const [userData, setUserData] = useState({
    name: "",
    zodiac: "",
    emotion: "",
    spotify: "",
  });

  const [reading, setReading] = useState(null);

  return (
    <BrowserRouter>
      <div className="fixed top-4 right-4 z-50" style={{ width: '300px' }}>
        <iframe
          data-testid="embed-iframe"
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/17enKxmwzSPWQJN8RnmbxY?utm_source=generator"
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/form"
            element={
              <IntakeForm userData={userData} setUserData={setUserData} />
            }
          />
          <Route
            path="/scan"
            element={<WebcamScan userData={userData} setReading={setReading} />}
          />
          <Route
            path="/results"
            element={
              reading ? (
                <Results reading={reading} />
              ) : (
                <Navigate to="/" replace />
              )
              // <Results reading={reading} />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
