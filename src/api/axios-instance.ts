import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: ' https://api.staging.bsport.io/api/v1',
  headers: {
    Authorization: 'Token f18688960a8942c83d238b04e88389ac126bf55c',
  },
});
