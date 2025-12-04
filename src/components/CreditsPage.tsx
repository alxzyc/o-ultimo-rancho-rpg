import { ArrowLeft, Heart, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CreditsPageProps {
  onBack: () => void;
}

const CreditsPage = ({ onBack }: CreditsPageProps) => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="absolute top-4 left-4 text-muted-foreground hover:text-foreground z-20"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-accent/10 animate-dust"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              width: `${20 + Math.random() * 20}px`,
              height: `${20 + Math.random() * 20}px`,
            }}
          />
        ))}
      </div>

      {/* Credits content */}
      <div className="text-center animate-fade-in relative z-10">
        <Sparkles className="h-16 w-16 mx-auto text-accent mb-6" />
        
        <h1 className="font-western text-4xl md:text-6xl text-accent mb-4">
          CRÉDITOS
        </h1>

        <div className="w-32 h-0.5 bg-accent mx-auto mb-12" />

        <div className="bg-card border-2 border-accent/50 rounded-lg p-8 md:p-12 western-border max-w-md">
          <p className="text-muted-foreground font-body text-lg mb-4">
            Criado com dedicação por
          </p>
          
          <h2 className="font-western text-5xl md:text-7xl text-accent mb-6">
            ALX
          </h2>

          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span>Feito com</span>
            <Heart className="h-5 w-5 text-destructive animate-pulse" />
            <span>para jogadores de RPG</span>
          </div>
        </div>

        <div className="mt-12 space-y-2 text-muted-foreground/60 font-body text-sm">
          <p>O Último Rancho - Uma One-Shot de Faroeste</p>
          <p>Sistema de RPG personalizado</p>
          <p className="italic">"Que a poeira do deserto guie seus passos"</p>
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-20 left-8 w-20 h-20 border-l-2 border-t-2 border-accent/30" />
      <div className="absolute top-20 right-8 w-20 h-20 border-r-2 border-t-2 border-accent/30" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-accent/30" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-accent/30" />
    </div>
  );
};

export default CreditsPage;
