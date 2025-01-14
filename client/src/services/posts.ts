import { createAxiosInstance } from "../config/axiosInstance";
import { Post } from "../interfaces/post";

const axiosInstance = createAxiosInstance(
  `${import.meta.env.VITE_SERVER_URL}/posts`
);

export const getPosts = async () => {
  return (await axiosInstance.get(`/`)).data;
};

export const createPost = async (post: Post) => {
  return (await axiosInstance.post(`/`, post)).data;
};

export const updatePost = async (post: Post) => {
  return (await axiosInstance.put(`/${post._id}`, post)).data;
};

export const deletePostById = async (postId: string) => {
  return (await axiosInstance.delete(`/${postId}`)).data;
};
