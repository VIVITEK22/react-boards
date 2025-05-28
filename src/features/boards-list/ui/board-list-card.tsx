import type { ApiSchemas } from "@/shared/api/schema";
import { ROUTES } from "@/shared/model/routes";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/shared/ui/kit/card";
import { generatePath, Link } from "react-router-dom";

export function BoardListCard({
  board,
  bottomActions,
  rightTopAction,
}: {
  board: ApiSchemas["Board"];
  bottomActions: React.ReactNode;
  rightTopAction: React.ReactNode;
}) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-center justify-between">
        <CardTitle><Link to={generatePath(ROUTES.BOARD, { boardId: board.id })} className="hover:underline">{board.name}</Link></CardTitle>
          {rightTopAction}
        </div>
      </CardHeader>
      <CardContent className="text-sm text-gray-500">
        <p>
          Создана: {new Date(board.createdAt).toLocaleDateString()}
        </p>
        <p>
          Последнее открытие: {new Date(board.lastOpenedAt).toLocaleDateString()}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end">{bottomActions}</CardFooter>
    </Card>
  );
}
