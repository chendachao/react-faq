import { useState, useEffect } from 'react';
import { withCacheFetch, request } from "../utils";

// https://www.pluralsight.com/guides/hierarchy-of-components-and-how-to-get-async-data
export function useFetch({url, options}) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // withCacheFetch
  const fetchData = async (url, options) => {
    const response = await withCacheFetch(request, url, options);
    return response;
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      setTimeout(async () => {
        const response = await fetchData(url, options);
        setData(response);
        setLoading(false);
      }, 3000);
    })();
  }, [url, options]);

  return [data, isLoading, fetchData];
}
