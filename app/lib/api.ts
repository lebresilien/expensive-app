import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: 'http://192.168.100.4:8000/api/'
  //baseURL: 'https://expensive-app.etsmanagementimmo.com/api/'
});

// Optionally, you can also add interceptors
api.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem('@token');
      // or from another storage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
);
  
export default api;