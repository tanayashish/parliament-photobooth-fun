import { useRef, useCallback } from "react";
import { Gavel, Scale, Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";

interface PhotoStripProps {
  photos: string[];
  onRetake: () => void;
}

const PhotoStrip = ({ photos, onRetake }: PhotoStripProps) => {
  const stripRef = useRef<HTMLDivElement>(null);

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDownload = useCallback(async () => {
    if (!stripRef.current) return;
    try {
      const canvas = await html2canvas(stripRef.current, {
        scale: 3,
        backgroundColor: null,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.download = `mock-parliament-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background py-8 px-4">
      {/* Strip preview */}
      <div
        ref={stripRef}
        className="w-[320px] bg-gradient-to-b from-navy-dark via-navy to-navy-dark p-5 rounded-sm shadow-2xl relative"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        {/* Outer gold border */}
        <div className="absolute inset-1 border-2 border-gold/60 rounded-sm pointer-events-none" />
        <div className="absolute inset-2.5 border border-gold/25 rounded-sm pointer-events-none" />

        {/* Corner ornaments */}
        <div className="absolute top-3 left-3 text-gold/50">
          <Gavel className="w-4 h-4" />
        </div>
        <div className="absolute top-3 right-3 text-gold/50">
          <Scale className="w-4 h-4" />
        </div>
        <div className="absolute bottom-3 left-3 text-gold/50">
          <Scale className="w-4 h-4" />
        </div>
        <div className="absolute bottom-3 right-3 text-gold/50">
          <Gavel className="w-4 h-4" />
        </div>

        {/* Title */}
        <div className="text-center mb-4 pt-3">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold/60" />
            <Scale className="w-3.5 h-3.5 text-gold" />
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
          <h2 className="text-gold text-xl font-bold tracking-[0.25em] leading-tight">
            MOCK
          </h2>
          <h2 className="text-gold text-xl font-bold tracking-[0.25em] leading-tight">
            PARLIAMENT
          </h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <div className="h-px w-6 bg-gold/40" />
            <div className="w-1.5 h-1.5 bg-gold/50 rotate-45" />
            <div className="h-px w-6 bg-gold/40" />
          </div>
        </div>

        {/* Photos */}
        <div className="space-y-2.5 px-2">
          {photos.map((photo, i) => (
            <div key={i} className="relative">
              <div className="border border-gold/30 rounded-sm overflow-hidden shadow-lg">
                <img
                  src={photo}
                  alt={`Photo ${i + 1}`}
                  className="w-full aspect-[4/3] object-cover"
                  style={{ transform: "scaleX(-1)" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Date */}
        <div className="text-center mt-4 pb-2">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <div className="h-px w-6 bg-gold/30" />
            <Gavel className="w-3 h-3 text-gold/60" />
            <div className="h-px w-6 bg-gold/30" />
          </div>
          <p className="text-gold/70 text-[10px] tracking-[0.2em] uppercase">
            {today}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 mt-8">
        <Button
          onClick={onRetake}
          variant="outline"
          className="font-cinzel border-primary/40 text-primary hover:bg-secondary"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Retake
        </Button>
        <Button
          onClick={handleDownload}
          className="font-cinzel bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_hsl(43_96%_56%/0.2)]"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Strip
        </Button>
      </div>
    </div>
  );
};

export default PhotoStrip;
