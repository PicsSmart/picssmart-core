import { useEffect, useState } from 'react';
import axiosProvider from '../../../services/apiService/index';

const useApi = (url, method = 'GET', body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const methods = {
    GET: getApi,
    POST: postApi,
    DELETE: deleteApi,
    PUT: putApi
  };

  const handler = methods[method];

  const handliingRequests = async () => {
    await handler(url, body)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    handliingRequests();
  }, [url]);

  return { data, loading, error };
};

const getApi = (url) => {
  return axiosProvider.get(url);
};

const postApi = (url, body) => {
  return axiosProvider.post(url, body);
};

const deleteApi = (url) => {
  return axiosProvider.delete(url);
};

const putApi = (url, body) => {
  return axiosProvider.put(url, body);
};

export default useApi;
