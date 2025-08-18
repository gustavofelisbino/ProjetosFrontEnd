import { Routes, Route, Navigate } from "react-router-dom";
import App from "../pages/paginainicial";
import Frutas from "../pages/frutas";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
            <Route path="/pagina-inicial" element={<App />} />
            <Route path="/frutas" element={<Frutas />} />
        </Routes>
    );
};