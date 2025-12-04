import { useState, useEffect } from "react";
import { ArrowLeft, Minus, Plus, Flame, Shield, Heart, Sword, StickyNote, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Character } from "@/data/characters";

interface CharacterSheetProps {
  character: Character;
  onBack: () => void;
  onInventory: () => void;
}

const CharacterSheet = ({ character, onBack, onInventory }: CharacterSheetProps) => {
  const [currentLife, setCurrentLife] = useState(character.life);
  const [heroicWillActive, setHeroicWillActive] = useState(false);
  const [notes, setNotes] = useState("");

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes-${character.id}`);
    if (savedNotes) setNotes(savedNotes);
  }, [character.id]);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem(`notes-${character.id}`, notes);
  }, [notes, character.id]);

  const decreaseLife = () => {
    setCurrentLife((prev) => Math.max(0, prev - 1));
  };

  const increaseLife = () => {
    const maxLife = heroicWillActive ? character.life + 10 : character.life;
    setCurrentLife((prev) => Math.min(maxLife, prev + 1));
  };

  const toggleHeroicWill = () => {
    setHeroicWillActive((prev) => {
      if (!prev) {
        // Activating: add bonus life
        setCurrentLife((life) => Math.min(life + 10, character.life + 10));
      } else {
        // Deactivating: remove bonus life if over max
        setCurrentLife((life) => Math.min(life, character.life));
      }
      return !prev;
    });
  };

  const displayedAbilities = heroicWillActive
    ? character.heroicWill.abilities
    : character.abilities;

  const maxLife = heroicWillActive ? character.life + 10 : character.life;
  const lifePercentage = (currentLife / maxLife) * 100;

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 relative">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="absolute top-4 left-4 text-muted-foreground hover:text-foreground z-20"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Trocar Personagem
      </Button>

      <div className="pt-16 max-w-7xl mx-auto">
        {/* Character header */}
        <div
          className={`text-center mb-8 p-6 rounded-lg border-2 ${
            heroicWillActive
              ? "border-destructive bg-destructive/10 heroic-active"
              : "border-accent/50 bg-card"
          } transition-all duration-500`}
        >
          <span className="text-6xl md:text-8xl">{character.emoji}</span>
          <h1
            className={`font-western text-3xl md:text-5xl mt-4 ${
              heroicWillActive ? "text-destructive" : "text-accent"
            }`}
          >
            {character.name}
          </h1>
          <p className="font-body text-muted-foreground italic text-lg">
            "{character.title}"
          </p>
          {heroicWillActive && (
            <p className="font-western text-xl text-destructive mt-2">
              {character.heroicWill.name}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Stats & Weapon */}
          <div className="space-y-6">
            {/* Life and Defense */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-western text-xl text-accent mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5" /> VIDA & DEFESA
              </h2>

              {/* Life control */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Vida</span>
                  <span className="font-western text-2xl text-foreground">
                    {currentLife} / {maxLife}
                  </span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-full transition-all duration-300 ${
                      lifePercentage > 50
                        ? "bg-green-600"
                        : lifePercentage > 25
                        ? "bg-yellow-600"
                        : "bg-destructive"
                    }`}
                    style={{ width: `${lifePercentage}%` }}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={decreaseLife}
                    className="flex-1"
                  >
                    <Minus className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="westernGold"
                    size="lg"
                    onClick={increaseLife}
                    className="flex-1"
                    disabled={currentLife >= maxLife}
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Defense */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent" />
                  <span className="text-muted-foreground">Defesa</span>
                </div>
                <span className="font-western text-3xl text-accent">
                  {heroicWillActive ? character.defense + 2 : character.defense}
                </span>
              </div>
            </div>

            {/* Weapons */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-western text-xl text-accent mb-4 flex items-center gap-2">
                <Sword className="h-5 w-5" /> ARMAMENTO
              </h2>
              <div className="space-y-3">
                {character.weapons.map((weapon, index) => (
                  <div key={index} className="p-3 bg-muted/30 rounded-lg border border-border/50">
                    <p className="font-title text-foreground">
                      {weapon.name}
                    </p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground">{weapon.type}</span>
                      <span className="text-accent font-western">{weapon.damage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Heroic Will Button */}
            <Button
              variant={heroicWillActive ? "outline" : "western"}
              size="lg"
              onClick={toggleHeroicWill}
              className="w-full"
            >
              <Flame className="mr-2 h-5 w-5" />
              {heroicWillActive
                ? "Desativar Vontade Heroica"
                : "Vontade Heroica"}
            </Button>

            {/* Inventory Button */}
            <Button
              variant="westernOutline"
              size="lg"
              onClick={onInventory}
              className="w-full"
            >
              <Package className="mr-2 h-5 w-5" />
              Inventário
            </Button>

            {heroicWillActive && (
              <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
                <h3 className="font-western text-lg text-destructive mb-2">
                  Bônus Ativos:
                </h3>
                <ul className="space-y-1 text-sm text-foreground/80">
                  {character.heroicWill.effects.map((effect, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      {effect}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Middle column - Attributes */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-western text-xl text-accent mb-4">ATRIBUTOS</h2>
            <div className="grid grid-cols-2 gap-2">
              {character.attributes.map((attr) => (
                <div
                  key={attr.name}
                  className="flex items-center justify-between p-2 bg-muted/30 rounded border border-border/30"
                >
                  <span className="text-sm text-muted-foreground truncate">
                    {attr.name}
                  </span>
                  <span
                    className={`font-western text-lg ${
                      attr.value > 0
                        ? "text-green-500"
                        : attr.value < 0
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  >
                    {attr.value >= 0 ? `+${attr.value}` : attr.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Abilities & Notes */}
          <div className="space-y-6">
            {/* Abilities */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2
                className={`font-western text-xl mb-4 ${
                  heroicWillActive ? "text-destructive" : "text-accent"
                }`}
              >
                {heroicWillActive ? "⚡ PODERES HEROICOS ⚡" : "HABILIDADES"}
              </h2>
              <div className="space-y-4">
                {displayedAbilities.map((ability, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      heroicWillActive
                        ? "bg-destructive/10 border-destructive/50"
                        : "bg-muted/30 border-border/50"
                    }`}
                  >
                    <p
                      className={`font-title font-semibold ${
                        heroicWillActive ? "text-destructive" : "text-foreground"
                      }`}
                    >
                      {ability.name}
                    </p>
                    <p className="text-sm text-muted-foreground font-body mt-1">
                      {ability.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="font-western text-xl text-accent mb-4 flex items-center gap-2">
                <StickyNote className="h-5 w-5" /> ANOTAÇÕES
              </h2>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anote informações importantes aqui..."
                className="min-h-[200px] bg-muted/30 border-border font-body resize-none"
              />
            </div>
          </div>
        </div>

        {/* Character story */}
        <div className="mt-6 bg-card border border-border rounded-lg p-6">
          <h2 className="font-western text-xl text-accent mb-4">HISTÓRIA</h2>
          <p className="text-foreground/80 font-body leading-relaxed">
            {character.story}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterSheet;
