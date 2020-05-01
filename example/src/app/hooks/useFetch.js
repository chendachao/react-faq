import React, { useState, useEffect } from 'react';
import axios from "axios";

// https://www.pluralsight.com/guides/hierarchy-of-components-and-how-to-get-async-data
export function useFetch({url}) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axios.get(url);
      setLoading(false);
      setData(response.data);
    })();
  }, []);

  return [data, isLoading];
}
