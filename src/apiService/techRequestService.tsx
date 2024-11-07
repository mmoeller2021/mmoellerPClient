import axios from "axios";

const uri = "https://localhost:7163/api/technical-request";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "http://localhost:3000",
};

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

// export const addTechRequest = async (body: any) => {
//   try {
//     const response = await api.post("", body);
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     console.error("Unable to add request", error);
//   }
// };

export const addTechRequest = async (body: any) => {
  return await fetch(uri, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => console.error("Unable to add request", error));
};

export const deleteTechRequest = (id: number) => {
  return fetch(`${uri}/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => console.error("Unable to delete request", error));
};

export const updateTechRequest = async (body: any, id: number) => {
  return await fetch(`${uri}/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => console.error("Unable to update request", error));
};

export const getTechRequestsById = async (id: number) => {
  return await fetch(`${uri}/${id}`, {
    method: "GET",
    headers,
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) =>
      console.error("Unable to retrieve data for this id", error)
    );
};
