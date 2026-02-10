import { useRef, useState, useCallback, useEffect } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoCaptureProps {
  onPhotosComplete: (photos: string[]) => void;
  onCancel: () => void;
}

const PhotoCapture = ({ onPhotosComplete, onCancel }: PhotoCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showFlash, setShowFlash] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => setCameraReady(true);
      }
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [startCamera]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/png");
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 300);
    setPreview(dataUrl);

    const newPhotos = [...photos, dataUrl];
    setPhotos(newPhotos);

    setTimeout(() => {
      setPreview(null);
      if (newPhotos.length >= 3) {
        streamRef.current?.getTracks().forEach((t) => t.stop());
        onPhotosComplete(newPhotos);
      }
    }, 1500);
  }, [photos, onPhotosComplete]);

  const startCountdown = useCallback(() => {
    setCountdown(3);
    let count = 3;
    const interval = setInterval(() => {
      count--;
      if (count === 0) {
        clearInterval(interval);
        setCountdown(null);
        capturePhoto();
      } else {
        setCountdown(count);
      }
    }, 1000);
  }, [capturePhoto]);

  const photoNumber = photos.length + 1;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative">
      {/* Flash overlay */}
      {showFlash && (
        <div className="fixed inset-0 bg-foreground z-50 animate-flash pointer-events-none" />
      )}

      {/* Header */}
      <div className="absolute top-4 left-0 right-0 z-20 text-center">
        <p className="font-cinzel text-primary text-sm tracking-widest">
          MOCK PARLIAMENT PHOTOBOOTH
        </p>
        <p className="text-muted-foreground text-xs mt-1">
          Photo {Math.min(photoNumber, 3)} of 3
        </p>
      </div>

      {/* Photo thumbnails */}
      <div className="absolute top-16 left-0 right-0 z-20 flex justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-12 h-12 rounded border-2 overflow-hidden ${
              photos[i]
                ? "border-primary"
                : i === photos.length
                ? "border-primary/50 animate-pulse"
                : "border-muted"
            }`}
          >
            {photos[i] ? (
              <img src={photos[i]} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <span className="text-xs text-muted-foreground">{i + 1}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Camera view */}
      <div className="relative w-full max-w-lg mx-auto px-4">
        <div className="relative rounded-lg overflow-hidden border-2 border-primary/30 shadow-[0_0_20px_hsl(43_96%_56%/0.15)]">
          {/* Parliament frame overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none border-[12px] border-secondary/40 rounded-lg">
            <div className="absolute top-1 left-1 w-6 h-6 border-t-2 border-l-2 border-primary/60" />
            <div className="absolute top-1 right-1 w-6 h-6 border-t-2 border-r-2 border-primary/60" />
            <div className="absolute bottom-1 left-1 w-6 h-6 border-b-2 border-l-2 border-primary/60" />
            <div className="absolute bottom-1 right-1 w-6 h-6 border-b-2 border-r-2 border-primary/60" />
          </div>

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full aspect-[4/3] object-cover"
            style={{ transform: "scaleX(-1)", display: preview ? "none" : "block" }}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full aspect-[4/3] object-cover"
            />
          )}

          {/* Countdown overlay */}
          {countdown !== null && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/50">
              <span className="font-cinzel text-8xl font-bold text-primary animate-countdown" key={countdown}>
                {countdown}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center gap-4">
        {cameraReady && !preview && countdown === null && photos.length < 3 && (
          <Button
            onClick={startCountdown}
            size="lg"
            className="rounded-full w-20 h-20 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_hsl(43_96%_56%/0.3)] border-4 border-primary/30"
          >
            <Camera className="w-8 h-8" />
          </Button>
        )}
        <Button
          onClick={() => {
            streamRef.current?.getTracks().forEach((t) => t.stop());
            onCancel();
          }}
          variant="ghost"
          className="text-muted-foreground text-sm"
        >
          Cancel
        </Button>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default PhotoCapture;
