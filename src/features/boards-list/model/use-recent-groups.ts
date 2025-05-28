import type { ApiSchemas } from "@/shared/api/schema";
import { differenceInCalendarDays } from "date-fns";

type BoardGroup = {
  title: string;
  items: ApiSchemas["Board"][];
};

export function useRecentGroups(boards: ApiSchemas["Board"][]) {
  const today = new Date();
  const groups: BoardGroup[] = [
    { title: "Сегодня", items: [] },
    { title: "Вчера", items: [] },
    { title: "На этой неделе", items: [] },
    { title: "Давно", items: [] },
  ];

  boards.forEach((board) => {
    const date = new Date(board.lastOpenedAt);
    const diff = differenceInCalendarDays(today, date);

    if (diff === 0) {
      groups[0].items.push(board);
    } else if (diff === 1) {
      groups[1].items.push(board);
    } else if (diff < 7) {
      groups[2].items.push(board);
    } else {
      groups[3].items.push(board);
    }
  });

  return groups;
}
