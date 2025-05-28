export const SORT_OPTIONS = [
  { value: "name", label: "Имени" },
  { value: "createdAt", label: "Дате создания" },
  { value: "updatedAt", label: "Дате обновления" },
  { value: "lastOpenedAt", label: "Дате последнего открытия" },
] as const;

export type SortOptions = "name" | "createdAt" | "updatedAt" | "lastOpenedAt";