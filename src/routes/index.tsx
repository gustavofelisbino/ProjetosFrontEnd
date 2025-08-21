import { Routes, Route, Navigate } from "react-router-dom";
import App from "../pages/paginainicial";
import Frutas from "../pages/frutas";
import DetalhesFrutas from "../pages/DetalhesFrutas";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
            <Route path="/pagina-inicial" element={<App />} />
            <Route path="/frutas" element={<Frutas />} />
            <Route path="/detalhes-frutas" element={<DetalhesFrutas />} />
        </Routes>
    );
};