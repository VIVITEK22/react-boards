import { useState } from "react";
import { useDebounceValue } from "@/shared/lib/react";
import { useBoardsList } from "./model/use-boards-list";
import { useBoardsFilters } from "./model/use-boards-filters";
import { useCreateBoard } from "./model/use-create-board";

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
import { Button } from "@/shared/ui/kit/button";
import { PlusIcon } from "lucide-react";

function BoardsListPage({
  templateGallery,
  templateModalCreate,
}: {
  templateGallery: React.ReactNode;
  templateModalCreate: ({
    onCreate,
    triggerButton,
  }: {
    onCreate: ({ name }: { name: string }) => Promise<unknown>;
    triggerButton: React.ReactNode;
  }) => React.ReactNode;
}) {
  const boardsFilters = useBoardsFilters();
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const { createBoard } = useCreateBoard();

  const boardsQuery = useBoardsList({
    limit: 12,
    search: useDebounceValue(boardsFilters.search, 500),
    sort: boardsFilters.sort,
  });

  return (
    <BoardsListLayout
      templateGallery={templateGallery}
      sidebar={<BoardsSidebar />}
      header={
        <BoardsListLayoutHeader
          title={<h1 className="text-2xl font-bold">Список досок</h1>}
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
            <>
              {templateModalCreate({
                onCreate: async ({ name }) => await createBoard({ body: { name } }),
                triggerButton: (
                  <Button>
                    <PlusIcon />
                    Создать доску
                  </Button>
                ),
              })}
              <ViewModeChange value={viewMode} onChange={setViewMode} />
            </>
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
              <BoardItem key={board.id} board={board} />
            ))
          }
          renderGrid={() =>
            boardsQuery.boardsList.map((board) => (
              <BoardCard key={board.id} board={board} />
            ))
          }
        />
      }
    />
  );
}

export default BoardsListPage;
