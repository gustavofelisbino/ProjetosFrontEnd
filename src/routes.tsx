import { Routes, Route } from 'react-router-dom';
import PaginaInicial from './modules/PaginaInicial/pages/PaginaInicial';
import Frutas from './modules/ListaFrutas/pages/index';
import AxiosPage from './modules/Axios/pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PaginaInicial />} />
      <Route path="/frutas" element={<Frutas />} />
      <Route path="/axios" element={<AxiosPage />} />
    </Routes>
  );
};
