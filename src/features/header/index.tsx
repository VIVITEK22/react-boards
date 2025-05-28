import { ROUTES } from "@/shared/model/routes";
import { useSession } from "@/shared/model/session";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/kit/button";

export function AppHeader() {
  const { session, logout } = useSession();
  if (session) {
    return (
      <header className="bg-background border-b border-border/40 shadow-sm py-3 px-4 mb-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xl font-semibold">Project</div>

          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {session.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="hover:bg-destructive/10"
              >
                Выйти
              </Button>
            </div>
          ) : (
            <Button asChild variant="default" size="sm">
              <Link to={ROUTES.LOGIN}>Войти</Link>
            </Button>
          )}
        </div>
      </header>
    );
  }
}
