import { Gavel, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10">
          <Gavel className="w-32 h-32 text-primary" />
        </div>
        <div className="absolute bottom-10 right-10">
          <Scale className="w-32 h-32 text-primary" />
        </div>
        <div className="absolute top-1/4 right-1/4">
          <Gavel className="w-20 h-20 text-primary rotate-45" />
        </div>
        <div className="absolute bottom-1/4 left-1/4">
          <Scale className="w-20 h-20 text-primary -rotate-12" />
        </div>
      </div>

      {/* Gold border frame */}
      <div className="absolute inset-4 border-2 border-primary/30 rounded-lg pointer-events-none" />
      <div className="absolute inset-6 border border-primary/15 rounded-lg pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* Decorative top ornament */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
          <Scale className="w-8 h-8 text-primary" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
        </div>

        {/* Title */}
        <h1 className="font-cinzel text-5xl md:text-7xl font-bold text-primary mb-2 tracking-wider">
          MOCK
        </h1>
        <h1 className="font-cinzel text-5xl md:text-7xl font-bold text-primary mb-6 tracking-wider">
          PARLIAMENT
        </h1>

        {/* Subtitle ornament */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-primary/50" />
          <Gavel className="w-5 h-5 text-primary/70" />
          <div className="h-px w-12 bg-primary/50" />
        </div>

        <p className="text-lg md:text-xl text-muted-foreground mb-2 font-cinzel tracking-wide">
          OFFICIAL PHOTOBOOTH
        </p>
        <p className="text-sm text-muted-foreground mb-10">
          Step into the chamber and capture your parliamentary moment
        </p>

        {/* Start button */}
        <Button
          onClick={onStart}
          size="lg"
          className="font-cinzel text-lg px-12 py-6 bg-primary text-primary-foreground hover:bg-primary/90 border border-primary/50 shadow-[0_0_30px_hsl(43_96%_56%/0.2)] transition-all duration-300 hover:shadow-[0_0_40px_hsl(43_96%_56%/0.4)]"
        >
          Enter the Chamber
        </Button>

        {/* Bottom ornament */}
        <div className="flex items-center justify-center gap-3 mt-12">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/30" />
          <div className="w-2 h-2 bg-primary/40 rotate-45" />
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/30" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
