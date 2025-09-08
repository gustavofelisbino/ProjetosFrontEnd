import axios from "axios";

export type Fruta = {
  id?: number;
  fruta: string;
  valor: number;
  dataVencimento: string;
  descricao?: string;
  status?: string;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  timeout: 10000,
});

export const getFrutas = async (): Promise<Fruta[]> => {
  const { data } = await api.get("/api/frutas");
  return data;
};

export const getFrutaById = async (id: number): Promise<Fruta> => {
  const { data } = await api.get(`/api/frutas/${id}`);
  return data;
};

export const createFruta = async (payload: Fruta): Promise<Fruta> => {
  const { data } = await api.post("/api/frutas", payload);
  return data;
};

export const deleteFruta = async (id: number): Promise<void> => {
  await api.delete(`/api/frutas/${id}`);
};

export const updateFruta = async (id: number, payload: Fruta): Promise<Fruta> => {
  const { data } = await api.put(`/api/frutas/${id}`, payload);
  return data;
};

export default api;