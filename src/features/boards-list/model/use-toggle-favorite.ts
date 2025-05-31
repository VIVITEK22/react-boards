import { privateRqClient } from "@/shared/api/private-instance";
import { useQueryClient } from "@tanstack/react-query";
import { startTransition, useOptimistic } from "react";
import { toast } from "sonner";

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  const [favorite, setFavorite] = useOptimistic<Record<string, boolean>>({});

  const toggleFavorite = privateRqClient.useMutation(
    "put",
    "/boards/{boardId}/favorite",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          privateRqClient.queryOptions("get", "/boards"),
        );
      },
    },
  );

  const handleToggleFavorite = (board: { id: string; isFavorite: boolean }) => {
    if (
      toggleFavorite.isPending &&
      toggleFavorite.variables?.params?.path.boardId === board.id
    )
      return;

    const newFavoriteState = !board.isFavorite;
    setFavorite((prev) => ({ ...prev, [board.id]: newFavoriteState }));

    startTransition(async () => {
      try {
        await toggleFavorite.mutateAsync({
          params: { path: { boardId: board.id } },
          body: { isFavorite: newFavoriteState },
        });
      } catch {
        setFavorite((prev) => ({ ...prev, [board.id]: board.isFavorite }));
        toast.error("Не удалось изменить избранное");
      }
    });
  };

  const isFavorite = (board: { id: string; isFavorite: boolean }) =>
    favorite[board.id] ?? board.isFavorite;

  return {
    favorite,
    handleToggleFavorite,
    isFavorite,
  };
}
