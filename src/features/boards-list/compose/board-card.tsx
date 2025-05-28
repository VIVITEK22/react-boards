import type { ApiSchemas } from "@/shared/api/schema";
import { BoardListCard } from "../ui/board-list-card";
import { Button } from "@/shared/ui/kit/button";
import { BoardsFavoriteToggle } from "../ui/boards-favorite-toggle";
import { useToggleFavorite } from "../model/use-toggle-favorite";
import { useRemoveBoard } from "../model/use-remove-board";

export function BoardCard({
  board,
  isFavoritePage,
}: {
  board: ApiSchemas["Board"];
  isFavoritePage?: boolean;
}) {
  const { handleToggleFavorite, isFavorite } = useToggleFavorite();
  const { handleRemoveBoard, getIsPendingRemove } = useRemoveBoard();

  if (isFavoritePage && !isFavorite(board)) {
    return;
  }

  return (
    <BoardListCard
      board={board}
      rightTopAction={
        <BoardsFavoriteToggle
          isFavorite={isFavorite(board)}
          onToggle={() => handleToggleFavorite(board)}
        />
      }
      bottomActions={
        <Button
          variant="destructive"
          onClick={() => handleRemoveBoard(board.id)}
          disabled={getIsPendingRemove(board.id)}
        >
          Удалить
        </Button>
      }
    />
  );
}
