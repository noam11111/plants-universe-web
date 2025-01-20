import { Post } from "../interfaces/post";
import { useParams } from "react-router-dom";
import PostComponent from "../components/Post";
import { createComment } from "../services/comment";
import PostComments from "../components/PostComments";
import { useUserContext } from "../context/UserContext";
import { usePostsContext } from "../context/PostsContext";

const PostDetails = () => {
  const { setPosts, posts, isLoading } = usePostsContext() ?? {};
  const { user } = useUserContext() ?? {};
  const { id } = useParams();

  const post = posts?.find((post) => post._id == id);

  const onCommentAdd = (commentContent: string) => {
    if (user && post) {
      const newPost: Post = {
        ...post,
        comments: [{ content: commentContent, user }, ...post.comments],
      };
      updatePostInState(newPost);
      createComment(post._id, { content: commentContent, user: user });
    }
  };

  const updatePostInState = (newPost: Post) => {
    setPosts?.(
      posts?.map((post) => (post._id === newPost._id ? newPost : post)) ?? []
    );
  };

  return isLoading ? (
    <div
      className="spinner-border text-success"
      style={{ width: "15rem", height: "15rem" }}
    />
  ) : post ? (
    <div className="my-5">
      <button
        type="button"
        className="btn btn-light px-4 py-2"
        onClick={() => window.history.back()}
        style={{
          position: "absolute",
          left: "10vw",
        }}
      >
        <i className="bi bi-arrow-left"></i> Back
      </button>
      <div
        className="card p-4"
        style={{ width: "400px", borderRadius: "12px" }}
      >
        <PostComponent post={post}></PostComponent>
        <PostComments
          onCommentAdd={onCommentAdd}
          comments={post.comments}
        ></PostComments>
      </div>
    </div>
  ) : (
    <div>post not found.. </div>
  );
};

export default PostDetails;
