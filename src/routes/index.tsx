import { Routes, Route, Navigate } from "react-router-dom";
import App from "../modules/PaginaInicial/pages";
import Frutas from "../modules/ListaFrutas/pages";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
            <Route path="/pagina-inicial" element={<App />} />
            <Route path="/frutas" element={<Frutas />} />
        </Routes>
    );
};