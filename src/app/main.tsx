import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { enableMocking } from "@/shared/api/mocks";
import { Fallback } from "./fallback";

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Suspense fallback={<Fallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </StrictMode>
  );
});
