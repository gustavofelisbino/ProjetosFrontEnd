import { Routes, Route, Navigate } from "react-router-dom";
import AxiosPage from "../modules/Axios/pages/index";
import ListaFrutasPage from "../modules/ListaFrutas/pages/index";
import PaginaInicialPage from "../modules/PaginaInicial/index";
import ProjetoCompletoPage from "../modules/ProjetoCompleto/pages/PaginaInicial";


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
            <Route path="/pagina-inicial" element={<PaginaInicialPage />} />
            <Route path="/axios" element={<AxiosPage />} />
            <Route path="/lista-frutas" element={<ListaFrutasPage />} />
            <Route path="/projeto-completo" element={<ProjetoCompletoPage />} />
        </Routes>
    );
};