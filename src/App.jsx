import React from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import CameraFeed from "./components/CameraFeed";
import TextInput from "./components/TextInput";
import { Leva } from "leva";

function App() {
  return (
    <div className="app-container">
      <div className="main-content">
        <div className="avatar-section">
          <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
            <color attach="background" args={["#ececec"]} />
            <Experience />
          </Canvas>
        </div>
        <div className="camera-section">
          <CameraFeed />
        </div>
      </div>
      <div className="input-section">
        <TextInput />
      </div>
      <Leva collapsed />
    </div>
  );
}

export default App;
