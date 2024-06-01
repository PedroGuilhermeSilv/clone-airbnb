import { rejects } from "assert";

const apiService = {
  get: async function (url: string): Promise<any> {
    console.log("GET", url);

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("response", json);

          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  post: async function (url: string, data: any): Promise<any> {
    console.log("POST", url);
    console.log("data", data);

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("response", json);

          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default apiService;
