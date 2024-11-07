import axios from "axios";

const uri = "https://localhost:7163/api/technical-request";

const api = axios.create({
  baseURL: uri,
});

export interface TechnicalRequest {
  id: number;
  email: string;
  description: string;
  dueDate: Date;
}

export const getTechRequests = async () => {
  return await api.get("").then((response) => {
    console.log(response);
    return response;
  });
};

export const addTechRequest = async (body: any) => {
  try {
    const response = await api.post("", body);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Unable to add request", error);
  }
};


export const deleteTechRequest = async (id: number) => {
  return await api.delete(`/${id}`).then((response) => {
    console.log(response);
    return response;
  }
);
};

export const updateTechRequest = async (body: any, id: number) => {
  return await api.put(`/${id}`, body).then((response) => {
    console.log(response);
    return response;
  });
};

export const getTechRequestsById = async (id: number) => {
  return await api.get(`/${id}`).then((response) => {
    console.log(response);
    return response;
  });
}

