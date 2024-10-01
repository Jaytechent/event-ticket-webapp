import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Use the environment variable
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
