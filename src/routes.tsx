import { Routes, Route } from 'react-router-dom';
import Frutas from './modules/ListaFrutas/pages/index';
import AxiosPage from './modules/Axios/pages';
import PaginaInicialPage from './modules/PaginaInicial/index';
import ProjetoCompletoPage from './modules/ProjetoCompleto/pages/PaginaInicial';
import type { FC } from 'react';

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PaginaInicialPage />} />
      <Route path="/frutas" element={<Frutas />} />
      <Route path="/axios" element={<AxiosPage />} />
      <Route path="/projeto-completo" element={<ProjetoCompletoPage />} />
    </Routes>
  );
};
