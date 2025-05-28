import { Button } from "@/shared/ui/kit/button";
import { Star } from "lucide-react";

export function BoardsFavoriteToggle({
  isFavorite,
  onToggle,
}: {
  isFavorite: boolean;
  onToggle: () => void;
}) {
  return (
    <Button variant="ghost" size="icon" onClick={onToggle}>
      <Star
        className={
          isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
        }
      />
    </Button>
  );
}
