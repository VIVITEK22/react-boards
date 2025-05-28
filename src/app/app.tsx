import { Outlet } from "react-router-dom";

export function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
    </div>
  );
}
