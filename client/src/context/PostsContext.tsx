import { ReactNode, useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { getPosts } from "../services/posts";
import { Post } from "../interfaces/post";
import { useUserContext } from "./UserContext";

type PostsContextType = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  isLoading: boolean;
  fetchPosts: () => Promise<void>;
} | null;

const PostsContext = createContext<PostsContextType>(null);

export const usePostsContext = () => useContext(PostsContext);

export const PostsContextProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUserContext() ?? {};

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setPosts(await getPosts());
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        isLoading,
        fetchPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
