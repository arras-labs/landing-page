import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.page.tsx";
import IntroHouseReveal from "./pages/Introhouse.page.tsx";
import HousePool from "./pages/HousePool.page.tsx.tsx";

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
        <Route path="/pool/:id" element={<HousePool />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
