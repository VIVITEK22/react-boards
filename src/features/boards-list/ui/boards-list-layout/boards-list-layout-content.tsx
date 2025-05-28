import { Skeleton } from "@/shared/ui/kit/skeleton";
import type { ViewMode } from "../view-mode-change";
import { BoardsListGridSkeleton } from "./boards-list-skeletons";
import { BoardsListContentListSkeleton } from "./boards-list-skeletons";

export function BoardsListLayoutContent({
  renderGrid,
  renderList,
  cursorRef,
  isFetchingNextPage,
  hasNextPage,
  children,
  isPending,
  viewMode,
  isEmpty,
}: {
  renderGrid?: () => React.ReactNode;
  renderList?: () => React.ReactNode;
  children?: React.ReactNode;
  cursorRef: React.RefCallback<HTMLDivElement>;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  isPending: boolean;
  viewMode: ViewMode;
  isEmpty: boolean;
}) {
  return (
    <>
      {isEmpty && <p className="text-center pt-10">Нет досок</p>}
      {viewMode === "list" && renderList && (
        <BoardsListLayoutList isPending={isPending}>
          {renderList()}
        </BoardsListLayoutList>
      )}
      {viewMode === "grid" && renderGrid && (
        <BoardsListLayoutGrid isPending={isPending}>
          {renderGrid()}
        </BoardsListLayoutGrid>
      )}
      {children}
      <div ref={cursorRef} className="pb-6 text-center">
        {isFetchingNextPage ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </div>
          )
        ) : (
          !hasNextPage &&
          !isPending &&
          !isEmpty && (
            <p className="text-center text-sm text-gray-500 pt-2">
              Досок больше нет
            </p>
          )
        )}
      </div>
    </>
  );
}

export function BoardsListLayoutList({
  children,
  isPending,
}: {
  children: React.ReactNode;
  isPending: boolean;
}) {
  if (isPending) {
    return <BoardsListContentListSkeleton />;
  }
  return <div className="flex flex-col gap-4">{children}</div>;
}

export function BoardsListLayoutGrid({
  children,
  isPending,
}: {
  children: React.ReactNode;
  isPending: boolean;
}) {
  if (isPending) {
    return <BoardsListGridSkeleton />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  );
}

export function BoardsListLayoutContentGroup({
  groups,
  viewMode,
  isPending,
}: {
  groups: {
    title: string;
    items: React.ReactNode;
  }[];
  isPending: boolean;
  viewMode: ViewMode;
}) {
  if (isPending && viewMode === "grid") {
    return <BoardsListGridSkeleton />;
  } else if (isPending && viewMode === "list") {
    return <BoardsListContentListSkeleton />;
  }
  return (
    <div className="flex flex-col gap-8">
      {groups.map((group) => (
        <div key={group.title} className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">{group.title}</h2>
          <div className="flex flex-col gap-4">
            {viewMode === "list" ? (
              <div className="flex flex-col gap-4">{group.items}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
