import type { SortOptions } from "@/shared/sort-options";
import { useState } from "react";

export function useBoardsFilters() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOptions>("name");

  return {
    search,
    setSearch,
    sort,
    setSort,
  };
}
