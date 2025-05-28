import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { CONFIG } from "@/shared/model/config";
import type { ApiPaths, ApiSchemas } from "@/shared/api/schema";
import { prefetchSessionAndRefresh } from "../model/session";

export const privateFetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
});

export const privateRqClient = createClient(privateFetchClient);

privateFetchClient.use({
  async onRequest({ request }) {
    const token = await prefetchSessionAndRefresh();

    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    } else {
      return new Response(
        JSON.stringify({
          code: "NOT_AUTHORIZED",
          message: "You are not authorized to access this resource",
        } as ApiSchemas["Error"]),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
  }
})