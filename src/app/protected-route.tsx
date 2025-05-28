import { enableMocking } from "@/shared/api/mocks";
import { ROUTES } from "@/shared/model/routes";
import { prefetchSessionAndRefresh, useSession } from "@/shared/model/session";
import { Navigate, Outlet, redirect } from "react-router-dom";

export function ProtectedRoute() {
  const { session } = useSession();

  if (!session) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}

export async function protectedLoader() {
  await enableMocking();

  const token = await prefetchSessionAndRefresh();

  if (!token) {
    return redirect(ROUTES.LOGIN);
  }

  return null;
}