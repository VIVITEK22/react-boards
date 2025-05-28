import { Skeleton } from "@/shared/ui/kit/skeleton";

export function BoardsListGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton key={index} className="h-48" />
      ))}
    </div>
  );
}

export function BoardsListContentListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton key={index} className="h-16" />
      ))}
    </div>
  );
}