import { cn } from "@/shared/lib/css";
import { ROUTES } from "@/shared/model/routes";
import { StarIcon } from "lucide-react";
import { ClockIcon } from "lucide-react";
import { HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function BoardsSidebar({ className }: { className?: string }) {
  return (
    <div className={cn("w-64 space-y-5 border-r py-4 pr-4 flex-shrink-0", className)}>
      <div className="flex items-center gap-2">
        <h4 className="text-sm font-medium text-gray-500 pl-2">Навигация</h4>
      </div>
      <div className="flex flex-col gap-4 font-medium">
        <Link to={ROUTES.BOARDS} className="flex items-center gap-3 hover:bg-gray-100 rounded-md p-2">
          <HomeIcon size={20} className="mt-0.5" />
          Доски
        </Link>
        <Link to={ROUTES.BOARDS_RECENT} className="flex items-center gap-3 hover:bg-gray-100 rounded-md p-2">
          <ClockIcon size={20} className="mt-0.5" />
          Недавние
        </Link>
        <Link to={ROUTES.BOARDS_FAVORITE} className="flex items-center gap-3 hover:bg-gray-100 rounded-md p-2">
          <StarIcon size={20} />
          Избранные
        </Link>
      </div>
    </div>
  );
}
