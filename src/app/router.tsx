import { ROUTES } from "@/shared/model/routes";
import { createBrowserRouter, redirect } from "react-router-dom";
import { App } from "@/app/app";
import { Providers } from "@/app/providers";
import { AppHeader } from "@/features/header";
import { protectedLoader, ProtectedRoute } from "./protected-route";
import { TemplateGallery, TemplateModal } from "@/features/board-templates";
import { lazy } from "react";

const BoardPage = lazy(() => import("@/features/board/board.page"));

const BoardsListPage = lazy(
  () => import("@/features/boards-list/boards-list.page"),
);
const BoardsListFavoritePage = lazy(
  () => import("@/features/boards-list/boards-list-favorite.page"),
);
const BoardsListRecentPage = lazy(
  () => import("@/features/boards-list/boards-list-recent.page"),
);

const LoginPage = lazy(() => import("@/features/auth/login.page"));
const RegisterPage = lazy(() => import("@/features/auth/register.page"));

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        loader: protectedLoader,
        element: (
          <>
            <AppHeader />
            <ProtectedRoute />
          </>
        ),
        children: [
          {
            path: ROUTES.BOARDS,
            element: (
              <BoardsListPage
                templateGallery={<TemplateGallery />}
                templateModalCreate={templateModalBind}
              />
            ),
          },
          {
            path: ROUTES.BOARD,
            element: <BoardPage />,
          },
          {
            path: ROUTES.BOARDS_FAVORITE,
            element: <BoardsListFavoritePage />,
          },
          {
            path: ROUTES.BOARDS_RECENT,
            element: <BoardsListRecentPage />,
          },
        ],
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.REGISTER,
        element: <RegisterPage />,
      },
      {
        path: ROUTES.HOME,
        loader: () => redirect(ROUTES.BOARDS),
      },
    ],
  },
]);

function templateModalBind({
  onCreate,
  triggerButton,
}: {
  onCreate: ({ name }: { name: string }) => Promise<unknown>;
  triggerButton: React.ReactNode;
}) {
  return <TemplateModal dialogTrigger={triggerButton} onCreate={onCreate} />;
}