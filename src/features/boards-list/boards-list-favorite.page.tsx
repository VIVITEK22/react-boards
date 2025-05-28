import { useState } from "react";
import { useDebounceValue } from "@/shared/lib/react";
import { useBoardsList } from "./model/use-boards-list";
import { useBoardsFilters } from "./model/use-boards-filters";

import { BoardsListSearch } from "./ui/boards-list-search";
import { BoardsListSort } from "./ui/boards-list-sort";
import { BoardsListLayout } from "./ui/boards-list-layout/boards-list-layout";
import { ViewModeChange, type ViewMode } from "./ui/view-mode-change";
import { BoardsListLayoutFilters } from "./ui/boards-list-layout/boards-list-layout-header";
import { BoardsListLayoutHeader } from "./ui/boards-list-layout/boards-list-layout-header";
import { BoardsListLayoutContent } from "./ui/boards-list-layout/boards-list-layout-content";
import { BoardCard } from "./compose/board-card";
import { BoardItem } from "./compose/board-item";
import { BoardsSidebar } from "./ui/boards-sidebar";

function BoardsListFavoritePage() {
  const boardsFilters = useBoardsFilters();
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const boardsQuery = useBoardsList({
    limit: 12,
    search: useDebounceValue(boardsFilters.search, 500),
    sort: boardsFilters.sort,
    isFavorite: true,
  });

  return (
    <BoardsListLayout
      sidebar={<BoardsSidebar />}
      header={
        <BoardsListLayoutHeader
          title={<h1 className="text-2xl font-bold">Список избранных досок</h1>}
          filters={
            <BoardsListLayoutFilters
              sort={
                <BoardsListSort
                  sort={boardsFilters.sort}
                  setSort={boardsFilters.setSort}
                />
              }
              filters={
                <BoardsListSearch
                  search={boardsFilters.search}
                  setSearch={boardsFilters.setSearch}
                />
              }
            />
          }
          actions={
            <div className="flex w-full justify-end">
              <ViewModeChange value={viewMode} onChange={setViewMode} />
            </div>
          }
        />
      }
      content={
        <BoardsListLayoutContent
          isPending={boardsQuery.isPending}
          isFetchingNextPage={boardsQuery.isFetchingNextPage}
          hasNextPage={boardsQuery.hasNextPage}
          cursorRef={boardsQuery.cursorRef}
          isEmpty={
            boardsQuery.boardsList.length === 0 && !boardsQuery.isPending
          }
          viewMode={viewMode}
          renderList={() =>
            boardsQuery.boardsList.map((board) => (
              <BoardItem key={board.id} board={board} isFavoritePage />
            ))
          }
          renderGrid={() =>
            boardsQuery.boardsList.map((board) => (
              <BoardCard key={board.id} board={board} isFavoritePage />
            ))
          }
        />
      }
    />
  );
}

export default BoardsListFavoritePage;
