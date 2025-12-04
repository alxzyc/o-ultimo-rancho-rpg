import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import MainMenu from "@/components/MainMenu";
import CharacterSelection from "@/components/CharacterSelection";
import CharacterSheet from "@/components/CharacterSheet";
import LorePage from "@/components/LorePage";
import CreditsPage from "@/components/CreditsPage";
import InventoryPage from "@/components/InventoryPage";
import { Character } from "@/data/characters";

type Page = "loading" | "menu" | "characters" | "sheet" | "lore" | "credits" | "inventory";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>("loading");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const handleLoadingComplete = () => {
    setCurrentPage("menu");
  };

  const handleNavigate = (page: "characters" | "lore" | "credits") => {
    setCurrentPage(page);
  };

  const handleBackToMenu = () => {
    setCurrentPage("menu");
  };

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
    setCurrentPage("sheet");
  };

  const handleBackToSelection = () => {
    setSelectedCharacter(null);
    setCurrentPage("characters");
  };

  const handleOpenInventory = () => {
    setCurrentPage("inventory");
  };

  const handleBackToSheet = () => {
    setCurrentPage("sheet");
  };

  return (
    <>
      {currentPage === "loading" && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      {currentPage === "menu" && <MainMenu onNavigate={handleNavigate} />}
      {currentPage === "characters" && (
        <CharacterSelection
          onBack={handleBackToMenu}
          onSelect={handleSelectCharacter}
        />
      )}
      {currentPage === "sheet" && selectedCharacter && (
        <CharacterSheet
          character={selectedCharacter}
          onBack={handleBackToSelection}
          onInventory={handleOpenInventory}
        />
      )}
      {currentPage === "lore" && <LorePage onBack={handleBackToMenu} />}
      {currentPage === "credits" && <CreditsPage onBack={handleBackToMenu} />}
      {currentPage === "inventory" && selectedCharacter && (
        <InventoryPage
          character={selectedCharacter}
          onBack={handleBackToSheet}
        />
      )}
    </>
  );
};

export default Index;
