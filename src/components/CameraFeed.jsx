import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import "./CameraFeed.css";

const CameraFeed = () => {
  const webcamRef = useRef(null);
  const [emotion, setEmotion] = useState("Neutral");

  useEffect(() => {
    const loadModels = async () => {
      try {
        console.log("Loading face-api models...");
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceExpressionNet.loadFromUri("/models");
        console.log("Face-api models loaded successfully");
      } catch (error) {
        console.error("Error loading face-api models:", error);
      }
    };

    loadModels();
  }, []);

  const detectEmotion = async () => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;

      const options = new faceapi.TinyFaceDetectorOptions({
        inputSize: 320, // Adjust based on model requirements
        scoreThreshold: 0.5,
      });

      try {
        const detections = await faceapi
          .detectAllFaces(video, options)
          .withFaceExpressions();

        if (detections.length > 0) {
          const expressions = detections[0].expressions;
          const sortedExpressions = Object.entries(expressions).sort(
            (a, b) => b[1] - a[1] // Sort by confidence
          );

          console.log("Detected expressions:", expressions); // Debugging log

          // Set the emotion with the highest confidence
          const [topEmotion, confidence] = sortedExpressions[0];
          if (confidence > 0.3) {
            setEmotion(topEmotion);
          } else {
            setEmotion("Neutral");
          }
        } else {
          setEmotion("No Face Detected");
        }
      } catch (error) {
        console.error("Error detecting emotion:", error);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      detectEmotion();
    }, 200); // Detect emotions every 200ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="camera-container">
      <Webcam
        ref={webcamRef}
        audio={false}
        className="webcam-video"
        videoConstraints={{
          width: 480,
          height: 360,
          facingMode: "user",
        }}
      />
      <div className="emotion-label">
        <p>Emotion: {emotion}</p>
      </div>
    </div>
  );
};

export default CameraFeed;
