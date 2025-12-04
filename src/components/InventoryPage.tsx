import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Trash2, Edit2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Character } from "@/data/characters";
import { useToast } from "@/hooks/use-toast";

interface InventoryItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
}

interface InventoryPageProps {
  character: Character;
  onBack: () => void;
}

const InventoryPage = ({ character, onBack }: InventoryPageProps) => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: 1,
  });
  const { toast } = useToast();

  // Load items from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem(`inventory-${character.id}`);
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, [character.id]);

  // Save items to localStorage
  useEffect(() => {
    localStorage.setItem(`inventory-${character.id}`, JSON.stringify(items));
  }, [items, character.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, insira um nome para o item.",
        variant: "destructive",
      });
      return;
    }

    if (editingId) {
      // Update existing item
      setItems(items.map(item => 
        item.id === editingId 
          ? { ...item, ...formData }
          : item
      ));
      toast({
        title: "Item atualizado",
        description: `${formData.name} foi atualizado com sucesso.`,
      });
      setEditingId(null);
    } else {
      // Add new item
      const newItem: InventoryItem = {
        id: Date.now().toString(),
        ...formData,
      };
      setItems([...items, newItem]);
      toast({
        title: "Item adicionado",
        description: `${formData.name} foi adicionado ao inventário.`,
      });
    }

    setFormData({ name: "", description: "", quantity: 1 });
    setIsAdding(false);
  };

  const handleEdit = (item: InventoryItem) => {
    setFormData({
      name: item.name,
      description: item.description,
      quantity: item.quantity,
    });
    setEditingId(item.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string, name: string) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Item removido",
      description: `${name} foi removido do inventário.`,
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ name: "", description: "", quantity: 1 });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 relative">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="absolute top-4 left-4 text-muted-foreground hover:text-foreground z-20"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <div className="pt-16 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 p-6 rounded-lg border-2 border-accent/50 bg-card">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Package className="h-8 w-8 text-accent" />
            <h1 className="font-western text-3xl md:text-5xl text-accent">
              Inventário
            </h1>
          </div>
          <p className="font-body text-muted-foreground italic">
            {character.name}
          </p>
        </div>

        {/* Add Item Button */}
        {!isAdding && (
          <Button
            variant="western"
            onClick={() => setIsAdding(true)}
            className="w-full mb-6"
          >
            <Plus className="mr-2 h-5 w-5" />
            Adicionar Item
          </Button>
        )}

        {/* Add/Edit Form */}
        {isAdding && (
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <h2 className="font-western text-xl text-accent mb-4">
              {editingId ? "Editar Item" : "Novo Item"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground font-body block mb-2">
                  Nome do Item *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Poção de Cura, Mapa Antigo..."
                  className="bg-muted/30"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground font-body block mb-2">
                  Descrição
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descreva o item e suas propriedades..."
                  className="bg-muted/30 min-h-[100px]"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground font-body block mb-2">
                  Quantidade
                </label>
                <Input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                  className="bg-muted/30"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" variant="western" className="flex-1">
                  {editingId ? "Atualizar" : "Adicionar"}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel} className="flex-1">
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Items List */}
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-body">
                Seu inventário está vazio. Adicione itens encontrados durante a aventura.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-lg p-4 hover:border-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-title text-lg text-foreground">
                        {item.name}
                      </h3>
                      <span className="px-2 py-1 bg-accent/20 text-accent rounded text-sm font-western">
                        x{item.quantity}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-sm text-muted-foreground font-body">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(item.id, item.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
