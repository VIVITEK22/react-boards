import { privateRqClient } from "@/shared/api/private-instance";
import { useQueryClient } from "@tanstack/react-query";
import { startTransition } from "react";
import { toast } from "sonner";

export function useRemoveBoard() {
  const queryClient = useQueryClient();

  const removeBoard = privateRqClient.useMutation(
    "delete",
    "/boards/{boardId}",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          privateRqClient.queryOptions("get", "/boards"),
        );
      },
    },
  );

  const handleRemoveBoard = (boardId: string) => {
    startTransition(async () => {
      try {
        await removeBoard.mutateAsync({ params: { path: { boardId } } });
      } catch {
        toast.error("Ошибка при удалении доски");
      }
    });
  };

  return {
    handleRemoveBoard,
    getIsPendingRemove: (boardId: string) =>
      removeBoard.isPending &&
      removeBoard.variables?.params?.path?.boardId === boardId,
  };
}
