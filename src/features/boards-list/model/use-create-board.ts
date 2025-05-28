import { privateRqClient } from "@/shared/api/private-instance";
import { useQueryClient } from "@tanstack/react-query";

export function useCreateBoard() {
  const queryClient = useQueryClient();

  const createBoard = privateRqClient.useMutation("post", "/boards", {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        privateRqClient.queryOptions("get", "/boards"),
      );
    },
  }).mutateAsync;

  return { createBoard };
}
