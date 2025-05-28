import { privateRqClient } from "@/shared/api/private-instance";
import { keepPreviousData } from "@tanstack/react-query";
import { useCallback, type RefCallback } from "react";

type UseBoardsListProps = {
  limit?: number;
  search?: string;
  sort?: "createdAt" | "updatedAt" | "lastOpenedAt" | "name";
  isFavorite?: boolean;
};

export function useBoardsList({
  limit = 10,
  search,
  sort,
  isFavorite,
}: UseBoardsListProps) {
  const { fetchNextPage, data, isFetchingNextPage, isPending, hasNextPage } = privateRqClient.useInfiniteQuery(
    "get",
    "/boards",
    {
      params: { query: { page: 1, limit, search, sort, isFavorite } },
    },
    {
      initialPageParam: 1,
      pageParamName: "page",
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (lastPage.totalPages > Number(lastPageParam)) {
          return Number(lastPageParam) + 1;
        }
        return null;
      },
      placeholderData: keepPreviousData
    },
  );

  const cursorRef: RefCallback<HTMLDivElement> = useCallback(
    (el) => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        { threshold: 0.5 },
      );
      if (el) {
        observer.observe(el);

        return () => observer.disconnect();
      }
    },
    [fetchNextPage],
  );

  const boardsList = data?.pages.flatMap((page) => page.list) ?? [];

  return { boardsList, isFetchingNextPage, isPending, hasNextPage, cursorRef };
}
