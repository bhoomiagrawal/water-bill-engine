import { useState } from "react";


interface ApiResponse {
  result: null | any; 
  inProgress: boolean;
  error: string | null;
}


interface FetchRequestOptions {
  body?: Record<string, unknown> | FormData;
  params?: string[];
  query?: Record<string, string>;
}

export function useInternalService(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', initialValues: Record<string, any> | null) {
  const [response, setResponse] = useState<ApiResponse>({
    result: null,
    inProgress: false,
    error: null,
  });

  const fetchRequest = async (
    body?: Record<string, unknown> | FormData,
    params?: string[],
    query?: Record<string, string>
  ): Promise<void> => {
    setResponse({
      result: null,
      inProgress: true,
      error: null,
    });

    try {
      let location = url;

      if (params && params.length > 0) {
        location = `${url}/${params.join("/")}`;
      }

      if (query && Object.keys(query).length > 0) {
        const queryString = new URLSearchParams(query).toString();
        location = `${location}?${queryString}`;
      }

      const options: RequestInit = {
        method: method.toUpperCase(),
        headers: {},
      };

      if (body && (method === "POST" || method === "PUT")) {
        if (body instanceof FormData) {
          options.body = body;
        } else {
          options.body = JSON.stringify(body);
          options.headers = { "Content-Type": "application/json" };
        }
      }

      const res = await fetch(location, options);

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Fetch error:", errorData);
        throw new Error(errorData.error || "Unknown error");
      }

      const result = await res.json();

      setResponse({
        result,
        inProgress: false,
        error: null,
      });
    } catch (error: any) {
      console.error("Request failed:", error);
      setResponse({
        result: null,
        inProgress: false,
        error: error.message,
      });
    }
  };

  return [fetchRequest, response.result, response.inProgress, response.error];
}
