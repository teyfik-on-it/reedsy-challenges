import env from '@/config';
import Axios from 'axios';

const httpClient = Axios.create({
  baseURL: env.api.endpoint,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpClient;
