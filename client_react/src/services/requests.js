import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:7245",
});

export const getAlunos = async (authorization) => {
  const response = await api.get("/api/aluno", authorization);
  console.log("getAlunos response", response.data);
  return response.data;
};

export const getAlunoById = async (id, authorization) => {
  const response = await api.get(`/api/aluno/${id}`, authorization);
  return response.data;
};

export const createAluno = async (aluno, authorization) => {
  console.log("createAluno aluno", aluno);
  const response = await api.post("/api/aluno", aluno, authorization);
  return response.data;
};

export const updateAluno = async (id, aluno, authorization) => {
  const response = await api.put(`/api/aluno/${id}`, aluno, authorization);
  return response.data;
};

export const deleteAluno = async (id, authorization) => {
  const response = await api.delete(`/api/aluno/${id}`, authorization);
  return response.data;
};

export const login = async (data) => {
  const response = await api.post("/Login", data);
  console.log("requests response", response);

  return response.data;
}


