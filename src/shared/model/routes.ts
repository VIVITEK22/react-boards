import "react-router-dom";
import { CONFIG } from "./config";

export const ROUTES = {
  HOME: CONFIG.BASE_URL,
  LOGIN: `/login`,
  REGISTER: `/register`,
  BOARDS: `/boards`,
  BOARDS_FAVORITE: `/boards/favorite`,
  BOARDS_RECENT: `/boards/recent`,
  BOARD: `/boards/:boardId`,
} as const;

export type PathParams = {
  [ROUTES.BOARD]: {
    boardId: string;
  };
};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
