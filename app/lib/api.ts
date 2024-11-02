import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
    baseURL: 'http://192.168.1.111:8000/api/',
    timeout: 1000
});

// Optionally, you can also add interceptors
api.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem('@token');
      console.log('tokenn', token) // or from another storage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
);
  
export default api;