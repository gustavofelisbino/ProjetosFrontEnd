import axios from "axios";

const api = axios.create({
    baseURL: "https://dummyjson.com"
});

export const GetFrutas = async () => {
    try {
        const response = await api.get("/users");
        return response.data.products;
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        throw error;
    }
};

export const GetFrutaById = async (id: number) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data.products;
    } catch (error) {
        console.error(`Erro ao buscar usuário com ID ${id}:`, error);
        throw error;
    }
};

export const CreateFruta = async (user: any) => {
    try {
        const response = await api.post("/users", user);
        return response.data.products;
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw error;
    }
};

export const UpdateFruta = async (id: number, user: any) => {
    try {
        const response = await api.put(`/users/${id}`, user);
        return response.data.products;
    } catch (error) {
        console.error(`Erro ao atualizar usuário com ID ${id}:`, error);
        throw error;
    }
};

export const DeleteFruta = async (id: number) => {
    try {
        const response = await api.delete(`/users/${id}`);
        return response.data.products;
    } catch (error) {
        console.error(`Erro ao deletar usuário com ID ${id}:`, error);
        throw error;
    }
};

api.interceptors.response.use(
    response => response,
    error => {
        console.error("Erro na API:", error);
        throw error;
    }
);

export default api;
