/* eslint-disable no-undef */
import axios from 'axios';
import { getLocalStorage } from '@/utils/utility';

if (typeof window !== 'undefined') {
  const accessToken = getLocalStorage('accessToken');
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_LXDAO_BACKEND_API;

export default axios;
