import axios from 'axios';

const API_URL = 'http://localhost:5192/api/frutas';

export interface Fruta {
  id?: number;
  fruta: string;
  valor: number;
  dataVencimento: string;
  status?: 'Ativo' | 'Inativo';
  descricao?: string;
}

export const getFrutas = async (): Promise<Fruta[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getFrutaById = async (id: number): Promise<Fruta> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addFruta = async (fruta: Fruta): Promise<Fruta> => {
  const response = await axios.post(API_URL, fruta);
  return response.data;
};

export const updateFruta = async (id: number, fruta: Fruta): Promise<Fruta> => {
  const response = await axios.put(`${API_URL}/${id}`, fruta);
  return response.data;
};

export const deleteFruta = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
