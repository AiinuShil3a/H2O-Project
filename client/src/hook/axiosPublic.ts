import axios from "axios";

const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_H2O_URL,
  });

export default axiosPublic;