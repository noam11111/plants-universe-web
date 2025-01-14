import { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { getPosts } from "../services/posts";
import { Post } from "../interfaces/post";

type PostsContextType = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
};

const PostsContext = createContext<PostsContextType>({
  posts: [],
  setPosts: () => {},
});

export const usePostsContext = () => useContext(PostsContext);

export const PostsContextProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const posts = await getPosts();
        if (posts) {
          setPosts(posts);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
