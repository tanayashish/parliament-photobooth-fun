import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import PhotoCapture from "@/components/PhotoCapture";
import PhotoStrip from "@/components/PhotoStrip";

type AppState = "landing" | "capture" | "strip";

const Index = () => {
  const [state, setState] = useState<AppState>("landing");
  const [photos, setPhotos] = useState<string[]>([]);

  const handleStart = () => setState("capture");

  const handlePhotosComplete = (capturedPhotos: string[]) => {
    setPhotos(capturedPhotos);
    setState("strip");
  };

  const handleRetake = () => {
    setPhotos([]);
    setState("capture");
  };

  const handleCancel = () => {
    setPhotos([]);
    setState("landing");
  };

  return (
    <>
      {state === "landing" && <LandingPage onStart={handleStart} />}
      {state === "capture" && (
        <PhotoCapture onPhotosComplete={handlePhotosComplete} onCancel={handleCancel} />
      )}
      {state === "strip" && (
        <PhotoStrip photos={photos} onRetake={handleRetake} />
      )}
    </>
  );
};

export default Index;
