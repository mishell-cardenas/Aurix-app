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
    spotify: "",
  });

  const [reading, setReading] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/form"
          element={<IntakeForm userData={userData} setUserData={setUserData} />}
        />
        <Route
          path="/scan"
          element={<WebcamScan userData={userData} setReading={setReading} />}
        />
        <Route
          path="/results"
          element={
            reading ? (
              <Results reading={reading} userData={userData} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
