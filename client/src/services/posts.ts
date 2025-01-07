import { createAxiosInstance } from "../config/axiosInstance";

const axiosInstance = createAxiosInstance(
  `${import.meta.env.VITE_SERVER_URL}/posts`
);

export const getPosts = async () => {
  return (await axiosInstance.get(`/`)).data;
};
