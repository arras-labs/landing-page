import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PoolJoinPage } from "./pages/Pooljoin.page.tsx";
import { PoolDetailPage } from "./pages/Pooldetail.page.tsx";
import Home from "./pages/Home.page.tsx";
import IntroHouseReveal from "./pages/Introhouse.page.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <IntroHouseReveal />
              <Home />
            </>
          }
        />
        <Route path="/pool/:id" element={<PoolDetailPage />} />
        <Route path="/pool/:id/join" element={<PoolJoinPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
