import { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { lorePages } from "@/data/lore";

interface LorePageProps {
  onBack: () => void;
}

const LorePage = ({ onBack }: LorePageProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const page = lorePages[currentPage];

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(lorePages.length - 1, prev + 1));
  };

  // Parse markdown-like content
  const renderContent = (content: string) => {
    return content.split("\n\n").map((paragraph, index) => {
      // Check for bold text
      const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={index} className="mb-4 leading-relaxed">
          {parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={i} className="text-accent font-title">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            // Check for italic
            if (part.startsWith("*") && part.endsWith("*")) {
              return (
                <em key={i} className="text-muted-foreground">
                  {part.slice(1, -1)}
                </em>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 relative overflow-hidden">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="absolute top-4 left-4 text-muted-foreground hover:text-foreground z-20"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      {/* Title */}
      <div className="text-center pt-12 mb-8">
        <BookOpen className="h-12 w-12 mx-auto text-accent mb-4" />
        <h1 className="font-western text-3xl md:text-5xl text-accent">LORE</h1>
        <p className="text-muted-foreground mt-2 font-body">
          Página {currentPage + 1} de {lorePages.length}
        </p>
      </div>

      {/* Lore content */}
      <div className="max-w-3xl mx-auto">
        <div
          className="bg-card border-2 border-accent/30 rounded-lg p-8 md:p-12 western-border animate-fade-in parchment-bg"
          key={currentPage}
        >
          <h2 className="font-western text-2xl md:text-3xl text-primary mb-6 text-center">
            {page.title}
          </h2>
          <div className="font-body text-lg text-primary/80">
            {renderContent(page.content)}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="westernOutline"
            onClick={goToPrevious}
            disabled={currentPage === 0}
            className="min-w-[120px]"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>

          {/* Page indicators */}
          <div className="flex gap-2">
            {lorePages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentPage
                    ? "bg-accent scale-125"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>

          <Button
            variant="westernOutline"
            onClick={goToNext}
            disabled={currentPage === lorePages.length - 1}
            className="min-w-[120px]"
          >
            Próxima
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-20 left-8 w-16 h-16 border-l-2 border-t-2 border-accent/20" />
      <div className="absolute top-20 right-8 w-16 h-16 border-r-2 border-t-2 border-accent/20" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-accent/20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-accent/20" />
    </div>
  );
};

export default LorePage;
