import { Message } from 'element-ui';
import axios from 'axios';

const myRequest = axios.create({
  baseURL: '/api',
});
myRequest.interceptors.response.use((response) => {
  console.log('response', response);
  if (response.data.code === 0) {
    Message.error(response.data.msg);
    return Promise.reject(response.data.msg);
  } else if (response.data.code === 1) {
    return response.data;
  }
});

export { myRequest };
