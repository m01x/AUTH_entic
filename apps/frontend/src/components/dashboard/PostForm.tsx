import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { successToast, errorToast } from "@/hooks/useToast";

export function PostForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      errorToast("Por favor completa todos los campos");
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    successToast("Post creado exitosamente");
    setTitle("");
    setDescription("");
    setIsSubmitting(false);
  };

  return (
    <div className="glass-card w-full rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-white">Crear Nuevo Post</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-white/85">
            Título
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título del post..."
            className="glass-input"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-white/85">
            Descripción
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción del post..."
            className="glass-input min-h-[100px] resize-none"
            disabled={isSubmitting}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="glass-button h-11 w-full rounded-lg text-sm font-semibold"
        >
          {isSubmitting ? "Creando..." : "Crear Post"}
        </Button>
      </form>
    </div>
  );
}
