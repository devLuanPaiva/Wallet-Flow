import { useCallback } from "react";
import useSection from "./useSection";

const URL_BASE = process.env.NEXT_PUBLIC_URL_BASE;

export default function useAPI() {
  const { token } = useSection();
  const httpGET = useCallback(
    async function (url: string): Promise<any> {
      const path = url.startsWith("/") ? url : `/${url}`;
      try {
        const resp = await fetch(`${URL_BASE}${path}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return extractData(resp);
      } catch (err) {
        console.error("Error ao executar requisição:", err);
        throw err;
      }
    },
    [token]
  );
  const httpPOST = useCallback(
    async function (url: string, body: any): Promise<any> {
      try {
        const path = url.startsWith("/") ? url : `/${url}`;
        const resp = await fetch(`${URL_BASE}${path}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
        return extractData(resp);
      } catch (err) {
        console.error("Error ao executar requisição:", err);
        throw err;
      }
    },
    [token]
  );

  const httpPUT = useCallback(
    async function (url: string, body: any): Promise<any> {
      try {
        const path = url.startsWith("/") ? url : `/${url}`;
        const resp = await fetch(`${URL_BASE}${path}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
        return extractData(resp);
      } catch (err) {
        console.error("Error ao executar requisição:", err);
        throw err;
      }
    },
    [token]
  );
  async function extractData(resp: Response) {
    const content = await resp.text();
    const contentType = resp.headers.get("content-type");
    if (![200, 201, 204].includes(resp.status)) {
        const error = JSON.parse(content);
        throw new Error(error.message || 'Erro na requisição');
    }
    if (contentType?.includes("application/json")) {
      return JSON.parse(content);
    }
    return content;
  }

  return { httpGET, httpPOST, httpPUT };
}
