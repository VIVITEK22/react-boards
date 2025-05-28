import type { ApiSchemas } from "@/shared/api/schema";
import { ROUTES } from "@/shared/model/routes";
import { Card, CardContent, CardTitle } from "@/shared/ui/kit/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/ui/kit/dropdown-menu";
import { EllipsisIcon } from "lucide-react";
import { generatePath, Link } from "react-router-dom";

export function BoardsListItem({
  board,
  rightActions,
  dropdownMenuActions,
}: {
  board: ApiSchemas["Board"];
  rightActions: React.ReactNode;
  dropdownMenuActions: React.ReactNode;
}) {
  return (
    <Card className="w-full">
      <CardContent className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>
            <Link
              to={generatePath(ROUTES.BOARD, { boardId: board.id })}
              className="hover:underline"
            >
              {board.name}
            </Link>
          </CardTitle>
          <div className="flex gap-4">
            <p className="text-sm text-gray-500">
              Создана: {new Date(board.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              Последнее открытие:{" "}
              {new Date(board.lastOpenedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {rightActions}
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer!">
              <EllipsisIcon size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>{dropdownMenuActions}</DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
