import type { ApiSchemas } from "@/shared/api/schema";
import { BoardsFavoriteToggle } from "../ui/boards-favorite-toggle";
import { DropdownMenuItem } from "@/shared/ui/kit/dropdown-menu";
import { useRemoveBoard } from "../model/use-remove-board";
import { useToggleFavorite } from "../model/use-toggle-favorite";
import { BoardsListItem } from "../ui/boards-list-item";

export function BoardItem({
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
    <BoardsListItem
      board={board}
      rightActions={
        <BoardsFavoriteToggle
          isFavorite={isFavorite(board)}
          onToggle={() => handleToggleFavorite(board)}
        />
      }
      dropdownMenuActions={
        <DropdownMenuItem
          variant="destructive"
          disabled={getIsPendingRemove(board.id)}
          onClick={() => handleRemoveBoard(board.id)}
        >
          Удалить
        </DropdownMenuItem>
      }
    />
  );
}
