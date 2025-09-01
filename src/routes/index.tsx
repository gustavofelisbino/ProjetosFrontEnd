import { Routes, Route, Navigate } from "react-router-dom";
import App from "../modules/PaginaInicial/pages/PaginaInicial";
import Axios from "../modules/Axios/pages";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
            <Route path="/pagina-inicial" element={<App />} />
            <Route path="/axios" element={<Axios />} />
        </Routes>
    );
};