import { createAxiosInstance } from "../config/axiosInstance";
import { UpdateUser } from "../interfaces/user";

const axiosInstance = createAxiosInstance(
  `${import.meta.env.VITE_SERVER_URL}/users`
);

export const getMe = async () => {
  return (await axiosInstance.get(`/me`)).data;
};

export const updateUser = async (user: UpdateUser) => {
  return (await axiosInstance.put(`/${user._id}`, user)).data;
};
