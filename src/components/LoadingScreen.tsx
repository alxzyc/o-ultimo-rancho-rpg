import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTitle(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center overflow-hidden">
      {/* Dust particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full animate-dust"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80 pointer-events-none" />

      {/* Main title */}
      <div
        className={`text-center transition-all duration-1000 ${
          showTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="font-western text-6xl md:text-8xl text-accent animate-flicker tracking-wider">
          O ÚLTIMO
        </h1>
        <h1 className="font-western text-7xl md:text-9xl text-primary mt-2 tracking-widest">
          RANCHO
        </h1>
      </div>

      {/* Subtitle */}
      <p
        className={`font-body text-muted-foreground text-lg md:text-xl mt-8 italic transition-all duration-1000 delay-500 ${
          showTitle ? "opacity-100" : "opacity-0"
        }`}
      >
        Uma One-Shot de RPG no Velho Oeste
      </p>

      {/* Loading bar */}
      <div className="mt-16 w-64 md:w-96">
        <div className="h-2 bg-muted rounded-full overflow-hidden western-border">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-muted-foreground mt-4 font-body">
          {progress < 100 ? "Carregando..." : "Preparar armas..."}
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
        <div className="w-16 h-0.5 bg-accent/50" />
        <div className="w-2 h-2 bg-accent rotate-45" />
        <div className="w-16 h-0.5 bg-accent/50" />
      </div>
    </div>
  );
};

export default LoadingScreen;
