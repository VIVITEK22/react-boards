import { type SortOptions, SORT_OPTIONS } from "@/shared/sort-options";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui/kit/select";

export function BoardsListSort({
  sort,
  setSort,
}: {
  sort: SortOptions;
  setSort: (sort: SortOptions) => void;
}) {
  return (
    <Select
      value={sort}
      onValueChange={(value) => setSort(value as typeof sort)}
    >
      <SelectTrigger className="w-[224px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
