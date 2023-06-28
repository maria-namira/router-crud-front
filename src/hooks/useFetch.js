import { useEffect, useState } from 'react';

export default function useFetch(url, endpoint, options = null) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const errorHandler = (value) => setError(value); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${url}${endpoint}`, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData(url, endpoint, options);
  }, [url, endpoint, options]);

  return { data, error, loading, errorHandler };
}