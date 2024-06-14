import { rejects } from "assert";
import { getAccessToken } from "../lib/actions";

const apiService = {
  get: async function (
    url: string,
    accept?: string,
    contentType?: string
  ): Promise<any> {
    console.log("GET", url);

    const tokenId = await getAccessToken();
    return new Promise((resolve, reject) => {
      const headers: { [key: string]: string } = {};
      if (tokenId) {
        headers["Authorization"] = `Bearer ${tokenId}`;
      }
      if (accept) {
        headers["Accept"] = accept;
      }
      if (contentType) {
        headers["Content-Type"] = contentType;
      }

      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "GET",
        headers: headers,
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
  post: async function (
    url: string,
    data: any,
    contentType?: any,
    accept?: any
  ): Promise<any> {
    console.log("POST", url);
    console.log("data", data);
    const headers: { [key: string]: string } = {};
    const tokenId = await getAccessToken();
    if (tokenId) {
      headers["Authorization"] = `Bearer ${tokenId}`;
    }
    if (contentType) {
      headers["Content-Type"] = contentType;
    }
    if (accept) {
      headers["Accept"] = accept;
    }

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "POST",
        body: data,
        headers: headers,
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
