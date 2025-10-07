import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PoolDetailPage, PoolJoinPage } from "./pages/PoolJoin.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pool/:id" element={<PoolDetailPage />} />
        <Route path="/pool/:id/join" element={<PoolJoinPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
