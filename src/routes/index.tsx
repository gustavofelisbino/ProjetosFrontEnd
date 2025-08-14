import { Routes, Route, Navigate } from "react-router-dom";
import App from "../pages/paginainicial";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
            <Route path="/pagina-inicial" element={<App />} />
        </Routes>
    );
};