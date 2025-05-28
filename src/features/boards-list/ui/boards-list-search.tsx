import { Input } from "@/shared/ui/kit/input";

export function BoardsListSearch({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (search: string) => void;
}) {
  return (
    <div className="flex-1 min-w-[400px]">
      <Input
        placeholder="Поиск досок..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
