import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:7245",
});

export const getAlunos = async (authorization) => {
  // Retorna os dados (response.data). Não passar `token` como segundo argumento do then.
  const response = await api.get("/api/aluno", authorization);
  console.log("getAlunos response", response.data);
  return response.data;
};

export const getAlunoById = async (id) => {
  const response = await api.get(`/api/aluno/${id}`);
  return response.data;
};

export const createAluno = async (aluno) => {
  const response = await api.post("/api/aluno", aluno);
  return response.data;
};

export const updateAluno = async (id, aluno) => {
  const response = await api.put(`/api/aluno/${id}`, aluno);
  return response.data;
};

export const deleteAluno = async (id) => {
  const response = await api.delete(`/api/aluno/${id}`);
  return response.data;
};

export const login = async (data) => {
  const response = await api.post("/Login", data);
  console.log("requests response", response);

  return response.data;
}


