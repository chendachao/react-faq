import { useState, useEffect } from 'react';
import axios from "axios";

// https://www.pluralsight.com/guides/hierarchy-of-components-and-how-to-get-async-data
export function useFetch({url, options}) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setTimeout(async () => {
        const response = await axios.get(url, {
          ...options
        });
        setData(response.data);
        setLoading(false);
      }, 300);
    })();
  }, []);

  return [data, isLoading];
}
