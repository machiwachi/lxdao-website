/* eslint-disable no-undef */
import axios from 'axios';
import { getLocalStorage } from '@/utils/utility';

if (typeof window !== 'undefined') {
  const accessToken = getLocalStorage('accessToken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

axios.defaults.baseURL = 'https://api-dev.lxdao.io'; //process.env.NEXT_PUBLIC_LXDAO_BACKEND_API;

function refreshAPIToken() {
  if (typeof window !== 'undefined') {
    const accessToken = getLocalStorage('accessToken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }
}

export { refreshAPIToken };
export default axios;
