import { useState } from "react";
import DropzoneComponent from "./Dropzone";
import { Post } from "../interfaces/post";
import PostActions from "./PostActions";
import { createComment } from "../services/comment";
import { useUserContext } from "../context/UserContext";
import { deletePostById, updatePost } from "../services/posts";
import { usePostsContext } from "../context/PostsContext";
import { FaEdit, FaTrash } from "react-icons/fa";

interface PostProps {
  post: Post;
  enableChanges?: boolean;
  enablePostActions?: boolean;
}

const PostComponent = ({
  post,
  enableChanges,
  enablePostActions,
}: PostProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(post.content);
  const [postPhoto, setPostPhoto] = useState(post.photoSrc);
  const { user } = useUserContext() ?? {};
  const { setPosts, posts } = usePostsContext();

  const isLikedByCurrUser = (): boolean => {
    return post.likedBy.find((currUser) => currUser?._id === user?._id)
      ? true
      : false;
  };
  const onEditSave = () => {
    // setPosts(
    //   posts.map((currPost) =>
    //     currPost._id === post._id ? { editMode: true, ...post } : post
    //   )
    // );

    updatePost({ ...post, content: description });
  };
  const deletePost = () => {
    deletePostById(post._id);
  };
  const onLikeToggle = () => {
    const prevPosts = posts;
    try {
      if (user) {
        let newLikedBy;
        if (isLikedByCurrUser()) {
          newLikedBy = post.likedBy.filter(
            (currUser) => currUser._id !== user?._id
          );
        } else {
          newLikedBy = [user, ...post.likedBy];
        }
        const newPost: Post = {
          ...post,
          likedBy: newLikedBy,
        };
        updatePostInState(newPost);
        updatePost(newPost);
      }
    } catch (error) {
      console.error(error);
      setPosts(prevPosts);
    }
  };

  const onCommentAdd = (commentContent: string) => {
    if (user) {
      const newPost: Post = {
        ...post,
        comments: [{ content: commentContent, user }, ...post.comments],
      };
      updatePostInState(newPost);
      createComment(post._id, { content: commentContent, user: user });
    }
  };

  const updatePostInState = (newPost: Post) => {
    setPosts(posts.map((post) => (post._id === newPost._id ? newPost : post)));
  };

  const handleSave = () => {
    onEditSave();

    setIsEditing(false);
  };

  return (
    <div
      className="post card mb-3"
      style={{
        width: "40vw",
        height: "40vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {enableChanges && (
        <div
          className="edit-buttons"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            display: "flex",
            gap: "10px",
          }}
        >
          {enableChanges && !isEditing && (
            <button
              className="btn btn-light"
              style={{ border: "none", background: "transparent" }}
              onClick={() => setIsEditing(true)} // Trigger edit mode
            >
              <FaEdit size={20} />
            </button>
          )}
          {deletePost && (
            <button
              className="btn btn-light"
              style={{ border: "none", background: "transparent" }}
              onClick={deletePost} // Trigger deletePost function on click
            >
              <FaTrash size={20} />
            </button>
          )}
        </div>
      )}

      <div className="card-body" style={{ padding: "1rem" }}>
        <div className="d-flex align-items-center mb-1">
          <img
            src={post.owner.photoSrc ? post.owner.photoSrc : "/temp-user.png"}
            alt={post.owner.username}
            className="rounded-circle user-photo m-2"
            style={{ width: "30px", height: "30px" }}
          />
          <span className="ml-3">{post.owner.username}</span>
        </div>

        {isEditing ? (
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control mb-3"
              rows={3} // Adjusted to make it fit better in the card
              style={{ height: "40px", resize: "none" }} // Set height to fit
            />
            <DropzoneComponent
              onFileSelect={(file) => setPostPhoto(URL.createObjectURL(file!))}
              selectedFile={null}
            />
            <button className="btn btn-success mt-1" onClick={handleSave}>
              Save
            </button>
          </div>
        ) : (
          <>
            <img
              src={postPhoto}
              alt="Post"
              className="post-photo mb-1"
              style={{ width: "30vw", height: "20vh" }}
            />
            <p>{description}</p>
          </>
        )}

        {enablePostActions && (
          <PostActions
            comments={post.comments}
            likesNumber={post.likedBy.length}
            likedByUser={isLikedByCurrUser()}
            key={post._id}
            onCommentAdd={onCommentAdd}
            onLikeToggle={onLikeToggle}
          ></PostActions>
        )}
      </div>
    </div>
  );
};

export default PostComponent;
