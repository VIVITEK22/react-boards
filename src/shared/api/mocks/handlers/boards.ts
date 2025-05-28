import { HttpResponse, delay } from "msw";
import { http } from "../http";
import type { ApiSchemas } from "../../schema";
import { verifyTokenOrThrow } from "../session";

const BOARD_CATEGORIES = [
  "Marketing",
  "Development",
  "Design",
  "Sales",
  "HR",
  "Finance",
  "Operations",
  "Research",
];

const generateMockBoards = (count: number): ApiSchemas["Board"][] => {
  return Array.from({ length: count }, (_, index) => {
    const category = BOARD_CATEGORIES[index % BOARD_CATEGORIES.length];
    const createdAt = new Date(
      Date.now() - Math.random() * 10000000000,
    ).toISOString();
    const updatedAt = new Date(
      Date.now() - Math.random() * 5000000000,
    ).toISOString();
    const lastOpenedAt = new Date(
      Date.now() - Math.random() * 1000000000,
    ).toISOString();

    return {
      id: `board-${index + 1}`,
      name: `${category} Board ${index + 1}`,
      isFavorite: Math.random() > 0.7, // 30% досок будут избранными
      createdAt,
      updatedAt,
      lastOpenedAt,
    };
  });
};

const boards: ApiSchemas["Board"][] = generateMockBoards(100);

type SortableFields = "createdAt" | "updatedAt" | "lastOpenedAt" | "name";

export const boardsHandlers = [
  // Get all boards
  http.get("/boards", async ({ request }) => {
    const res = await verifyTokenOrThrow(request);
    if (res !== null) {
      return new HttpResponse(res, { status: 401 });
    }

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 10;
    const isFavorite = url.searchParams.get("isFavorite");
    const search = url.searchParams.get("search");
    const sort = url.searchParams.get("sort") as SortableFields | null;

    let filteredBoards = [...boards];

    if (isFavorite === "true") {
      filteredBoards = filteredBoards.filter(
        (board) => board.isFavorite === (isFavorite === "true"),
      );
    }

    if (search) {
      filteredBoards = filteredBoards.filter((board) =>
        board.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (sort) {
      filteredBoards.sort((a, b) => {
        if (sort === "name") {
          return a.name.localeCompare(b.name);
        }
        return new Date(b[sort]).getTime() - new Date(a[sort]).getTime();
      });
    }

    const start = (page - 1) * limit;
    const paginatedBoards = filteredBoards.slice(start, start + limit);

    await delay();
    return HttpResponse.json({
      list: paginatedBoards,
      total: filteredBoards.length,
      totalPages: Math.ceil(filteredBoards.length / limit),
    });
  }),

  // Get board by id
  http.get("/boards/{boardId}", async ({ params, request }) => {
    const res = await verifyTokenOrThrow(request);
    if (res !== null) {
      return new HttpResponse(res, { status: 401 });
    }

    const { boardId } = params as { boardId: string };
    const board = boards.find((b) => b.id === boardId);

    if (!board) {
      return new HttpResponse(null, { status: 404 });
    }

    await delay();
    return HttpResponse.json(board);
  }),

  // Create board
  http.post("/boards", async () => {
    const newBoard: ApiSchemas["Board"] = {
      id: `board-${boards.length + 1}`,
      name: `New Board ${boards.length + 1}`,
      isFavorite: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastOpenedAt: new Date().toISOString(),
    };

    boards.push(newBoard);

    await delay();
    return HttpResponse.json(newBoard, { status: 201 });
  }),

  // Rename board
  http.put("/boards/{boardId}/rename", async ({ params, request }) => {
    const res = await verifyTokenOrThrow(request);
    if (res !== null) {
      return new HttpResponse(res, { status: 401 });
    }

    const { boardId } = params as { boardId: string };
    let board = boards.find((b) => b.id === boardId);

    if (!board) {
      return new HttpResponse(null, { status: 404 });
    }

    const { name } = (await request.json()) as ApiSchemas["RenameBoard"];
    board = { ...board, name, updatedAt: new Date().toISOString() };

    await delay();
    return HttpResponse.json(board);
  }),

  // Update board favorite status
  http.put("/boards/{boardId}/favorite", async ({ params, request }) => {
    const res = await verifyTokenOrThrow(request);
    if (res !== null) {
      return new HttpResponse(res, { status: 401 });
    }
    const { boardId } = params;
    const board = boards.find((board) => board.id === boardId);

    if (!board) {
      return HttpResponse.json(
        { message: "Доска не найдена", code: "NOT_FOUND" },
        { status: 404 },
      );
    }

    const data = (await request.json()) as ApiSchemas["UpdateBoardFavorite"];
    board.isFavorite = data.isFavorite;
    board.updatedAt = new Date().toISOString();

    return HttpResponse.json(board, { status: 201 });
  }),

  // Delete board
  http.delete("/boards/{boardId}", async ({ params, request }) => {
    const res = await verifyTokenOrThrow(request);
    if (res !== null) {
      return new HttpResponse(res, { status: 401 });
    }

    const { boardId } = params as { boardId: string };
    const boardIndex = boards.findIndex((b) => b.id === boardId);

    if (boardIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    boards.splice(boardIndex, 1);

    return new HttpResponse(null, { status: 204 });
  }),
];
