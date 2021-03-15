/* eslint-disable react-hooks/rules-of-hooks */
import useSWR from 'swr';
import axios from 'axios';

const BASE_URL =
  'https://us-central1-cafetablebooking.cloudfunctions.net/listAllUsers';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function fetchAuthUsers() {
  const { data, error } = useSWR(BASE_URL, fetcher);
  return {
    data: data || [],
    isLoading: !error && !data,
    isError: error,
  };
}
