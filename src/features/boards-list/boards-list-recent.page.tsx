import { useState } from "react";
import { useBoardsList } from "./model/use-boards-list";

import { BoardsListLayout } from "./ui/boards-list-layout/boards-list-layout";
import { ViewModeChange, type ViewMode } from "./ui/view-mode-change";
import { BoardsListLayoutHeader } from "./ui/boards-list-layout/boards-list-layout-header";
import {
  BoardsListLayoutContent,
  BoardsListLayoutContentGroup,
} from "./ui/boards-list-layout/boards-list-layout-content";
import { useRecentGroups } from "./model/use-recent-groups";
import { BoardCard } from "./compose/board-card";
import { BoardItem } from "./compose/board-item";
import { BoardsSidebar } from "./ui/boards-sidebar";

function BoardsListRecentPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const boardsQuery = useBoardsList({
    limit: 12,
    sort: "lastOpenedAt",
  });

  const groups = useRecentGroups(boardsQuery.boardsList);

  return (
    <BoardsListLayout
      sidebar={<BoardsSidebar />}
      header={
        <BoardsListLayoutHeader
          title={
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Последние доски</h1>
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
        >
          <BoardsListLayoutContentGroup
            isPending={boardsQuery.isPending}
            groups={groups.map((group) => ({
              title: group.title,
              items: {
                grid: group.items.map((board) => (
                  <BoardCard key={board.id} board={board} />
                )),
                list: group.items.map((board) => (
                  <BoardItem key={board.id} board={board} />
                )),
              }[viewMode],
            }))}
            viewMode={viewMode}
          />
        </BoardsListLayoutContent>
      }
    />
  );
}

export default BoardsListRecentPage;
