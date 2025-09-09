import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  console.log(response);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "뭔가 잘못 댐");
  }

  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsloading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "뭔가 잘못 댐");
      }
      setIsloading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
  };
}
