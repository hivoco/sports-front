import { useEffect, useState, useRef } from "react";

export const useRecordVoice = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordingAudio, setRecordingAudio] = useState(null);
  const chunks = useRef([]);

  // Function to start the recording
  const startRecording = () => {
    if (mediaRecorder) {
      if (mediaRecorder.state === "recording") {
        console.log("Already recording...");
        return; // Prevent starting a new recording if one is already in progress
      }
      mediaRecorder.start();
      setRecording(true);
      setRecordingAudio(null);
      console.log("Recording started...");
    } else {
      console.log("MediaRecorder not initialized yet.");
    }
  };

  // Function to stop the recording
  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      setRecording(false);
      console.log("Recording stopped...");
    }
  };

  // Function to initialize the media recorder with the provided stream
  const initialMediaRecorder = (stream) => {
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.onstart = () => {
      chunks.current = [];
    };

    mediaRecorder.ondataavailable = (ev) => {
      chunks.current.push(ev.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
      setRecordingAudio(audioBlob);
    };

    setMediaRecorder(mediaRecorder);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(initialMediaRecorder)
        .catch((err) => console.error("Error accessing microphone:", err));
    }
  }, []);

  return { recordingAudio, recording, startRecording, stopRecording };
};
