import { createAxiosInstance } from "../config/axiosInstance";
import { CreatePost, Post } from "../interfaces/post";

const axiosInstance = createAxiosInstance(
  `${import.meta.env.VITE_SERVER_URL}/posts`
);

export const getPosts = async () => {
  return (await axiosInstance.get(`/`)).data;
};

export const createPost = async (post: CreatePost) => {
  const formData = new FormData();
  const { photo, ...postInfo } = post;

  if (photo) {
    formData.append("file", photo);
  }

  formData.append("post", JSON.stringify(postInfo));

  await axiosInstance.post(`/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updatePost = async (post: Post) => {
  return (await axiosInstance.put(`/${post._id}`, post)).data;
};

export const deletePostById = async (postId: string) => {
  return (await axiosInstance.delete(`/${postId}`)).data;
};
