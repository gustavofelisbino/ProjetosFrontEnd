import { Routes, Route } from 'react-router-dom';
import Frutas from './modules/ListaFrutas/pages/index';
import AxiosPage from './modules/Axios/pages';
import PaginaInicial from './modules/PaginaInicial';
import ProjetoCompleto from './modules/ProjetoCompleto/pages/PaginaInicial';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PaginaInicial />} />
      <Route path="/frutas" element={<Frutas />} />
      <Route path="/axios" element={<AxiosPage />} />
      <Route path="/projeto-completo" element={<ProjetoCompleto />} />
    </Routes>
  );
};
