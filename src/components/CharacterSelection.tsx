import { useState } from "react";
import { ChevronLeft, ChevronRight, Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { characters, Character } from "@/data/characters";

interface CharacterSelectionProps {
  onBack: () => void;
  onSelect: (character: Character) => void;
}

const CharacterSelection = ({ onBack, onSelect }: CharacterSelectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const character = characters[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? characters.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === characters.length - 1 ? 0 : prev + 1));
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
        <h1 className="font-western text-3xl md:text-5xl text-accent">
          ESCOLHA SEU DESTINO
        </h1>
        <p className="text-muted-foreground mt-2 font-body">
          {currentIndex + 1} de {characters.length} pistoleiros
        </p>
      </div>

      {/* Character carousel */}
      <div className="flex items-center justify-center gap-4 md:gap-8">
        {/* Previous button */}
        <Button
          variant="westernOutline"
          size="icon"
          onClick={goToPrevious}
          className="h-12 w-12 md:h-16 md:w-16 shrink-0"
        >
          <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
        </Button>

        {/* Character card */}
        <div className="flex-1 max-w-4xl animate-fade-in" key={character.id}>
          <div className="bg-card border-2 border-border rounded-lg p-6 md:p-8 western-border">
            {/* Header */}
            <div className="text-center mb-6">
              <span className="text-5xl md:text-7xl">{character.emoji}</span>
              <h2 className="font-western text-2xl md:text-4xl text-accent mt-4">
                {character.name}
              </h2>
              <p className="font-body text-muted-foreground italic text-lg">
                "{character.title}"
              </p>
            </div>

            {/* Stats row */}
            <div className="flex justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-destructive/20 border-2 border-destructive flex items-center justify-center">
                  <span className="font-western text-2xl md:text-3xl text-destructive">
                    {character.life}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">VIDA</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-secondary border-2 border-accent flex items-center justify-center">
                  <span className="font-western text-2xl md:text-3xl text-accent">
                    {character.defense}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">DEFESA</p>
              </div>
            </div>

            {/* Story preview */}
            <div className="mb-6">
              <p className="text-foreground/80 font-body text-center leading-relaxed line-clamp-3">
                {character.story}
              </p>
            </div>

            {/* All Attributes */}
            <div className="mb-6">
              <h3 className="font-western text-lg text-accent text-center mb-3">
                ATRIBUTOS
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {character.attributes.map((attr) => (
                  <div
                    key={attr.name}
                    className="bg-muted/50 rounded px-2 py-2 text-center border border-border/30"
                  >
                    <p className="text-xs text-muted-foreground truncate">
                      {attr.name}
                    </p>
                    <p className="font-western text-accent text-lg">
                      {attr.value >= 0 ? `+${attr.value}` : attr.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Abilities */}
            <div className="space-y-3 mb-6">
              <h3 className="font-western text-lg text-accent text-center">
                HABILIDADES
              </h3>
              {character.abilities.map((ability, index) => (
                <div
                  key={index}
                  className="bg-muted/30 rounded-lg p-3 border border-border/50"
                >
                  <p className="font-title text-foreground font-semibold">
                    {ability.name}
                  </p>
                  <p className="text-sm text-muted-foreground font-body">
                    {ability.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Weapons */}
            <div className="text-center mb-6">
              <p className="text-muted-foreground text-sm mb-2">ARMAMENTO</p>
              <div className="space-y-2">
                {character.weapons.map((weapon, index) => (
                  <div key={index} className="bg-muted/30 rounded p-2 border border-border/30">
                    <p className="font-title text-accent text-sm">
                      {weapon.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {weapon.type} • Dano: {weapon.damage}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Select button */}
            <Button
              variant="westernGold"
              size="xl"
              onClick={() => onSelect(character)}
              className="w-full"
            >
              <Check className="mr-2 h-5 w-5" />
              SELECIONAR {character.name.split(" ")[0]}
            </Button>
          </div>
        </div>

        {/* Next button */}
        <Button
          variant="westernOutline"
          size="icon"
          onClick={goToNext}
          className="h-12 w-12 md:h-16 md:w-16 shrink-0"
        >
          <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
        </Button>
      </div>

      {/* Character indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {characters.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-accent scale-125"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CharacterSelection;
