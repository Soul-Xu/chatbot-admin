import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'data/kms',
  timeout: 1000,
  // 你可以在这里添加更多的配置
});

export default axiosClient;