import { Users, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MainMenuProps {
  onNavigate: (page: "characters" | "lore" | "credits") => void;
}

const MainMenu = ({ onNavigate }: MainMenuProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-muted/20 via-background to-background" />
      
      {/* Dust particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent/20 rounded-full animate-dust"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Title */}
      <div className="text-center mb-16 animate-fade-in relative z-10">
        <h1 className="font-western text-5xl md:text-7xl text-accent tracking-wider">
          O ÚLTIMO
        </h1>
        <h1 className="font-western text-6xl md:text-8xl text-primary mt-1 tracking-widest">
          RANCHO
        </h1>
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="w-20 h-0.5 bg-accent/50" />
          <div className="w-3 h-3 bg-accent rotate-45" />
          <div className="w-20 h-0.5 bg-accent/50" />
        </div>
      </div>

      {/* Menu buttons */}
      <div className="flex flex-col gap-6 relative z-10">
        <Button
          variant="western"
          size="xl"
          onClick={() => onNavigate("characters")}
          className="animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <Users className="mr-3 h-6 w-6" />
          SELEÇÃO DE PERSONAGENS
        </Button>

        <Button
          variant="westernOutline"
          size="xl"
          onClick={() => onNavigate("lore")}
          className="animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <BookOpen className="mr-3 h-6 w-6" />
          LORE
        </Button>

        <Button
          variant="westernOutline"
          size="xl"
          onClick={() => onNavigate("credits")}
          className="animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          <Award className="mr-3 h-6 w-6" />
          CRÉDITOS
        </Button>
      </div>

      {/* Footer decoration */}
      <div className="absolute bottom-8 text-center">
        <p className="text-muted-foreground/50 font-body text-sm italic">
          "Que seus tiros sejam certeiros e sua coragem, inabalável."
        </p>
      </div>
    </div>
  );
};

export default MainMenu;
