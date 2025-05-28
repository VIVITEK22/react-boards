import "react-router-dom";
import { CONFIG } from "./config";

export const ROUTES = {
  HOME: CONFIG.BASE_URL,
  LOGIN: `${CONFIG.BASE_URL}login`,
  REGISTER: `${CONFIG.BASE_URL}register`,
  BOARDS: `${CONFIG.BASE_URL}boards`,
  BOARDS_FAVORITE: `${CONFIG.BASE_URL}boards/favorite`,
  BOARDS_RECENT: `${CONFIG.BASE_URL}boards/recent`,
  BOARD: `${CONFIG.BASE_URL}boards/:boardId`,
} as const;

export type PathParams = {
  ["/react-boards/boards/:boardId"]: {
    boardId: string;
  };
  ["/boards/:boardId"]: {
    boardId: string;
  };
};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}
