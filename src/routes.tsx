import { Routes, Route } from 'react-router-dom';
import PaginaInicial from './modules/PaginaInicial/pages/PaginaInicial';
import Frutas from './modules/ListaFrutas/pages/index';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PaginaInicial />} />
      <Route path="/frutas" element={<Frutas />} />
    </Routes>
  );
};
