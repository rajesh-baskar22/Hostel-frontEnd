import React from "react";
import "./App.css";
import AdminPage from "./Pages/AdminPage";
import HomePage from "./Pages/HomePage";
import ResidentPage from "./Pages/ResidentPage";
import ProtectedRoutes from "../src/components/Utils/ProtectedRoutes";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import PageNotFound from "./error/PageNotFound";
import { useAuth } from "./Services/AuthProvider";
import StaffPage from "./Pages/StaffPage";

function App() {
  const { role } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<HomePage />} />

        <Route element={<ProtectedRoutes />}>
          {/* Validating admin only allowed route  */}
          {role === "Admin" ? (
            <Route path="/admin/*" element={<AdminPage />} />
          ) : (
            <Route path="/admin/*" element={<Navigate to="/" />} />
          )}

          {/* ------------------------------------------------------ */}
          {/* Validating admin and resident allowed route  */}
          {role === "staff" ? (
            <Route path="/staff/*" element={<StaffPage />} />
          ) : (
            <Route path="/staff/*" element={<Navigate to="/" />} />
          )}
          {/* ----------------------------------------------------------- */}
          {/* Validating resident only allowed route  */}
          {role === "Resident" ? (
            <Route path="/resident/*" element={<ResidentPage />} />
          ) : (
            <Route path="/resident/*" element={<Navigate to="/" />} />
          )}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
