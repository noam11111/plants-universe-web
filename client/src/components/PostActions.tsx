import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { PostComment } from "../interfaces/comment";

interface PostActionsProps {
  likesNumber: number;
  likedByUser: boolean;
  comments: PostComment[];
  onLikeToggle: () => void;
  onCommentAdd: (commentContent: string) => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  likesNumber,
  likedByUser,
  comments,
  onLikeToggle,
  onCommentAdd,
}) => {
  const [newCommentContent, setNewCommentContent] = useState("");

  const handleLikeToggle = () => {
    onLikeToggle();
  };

  const handleAddComment = () => {
    if (newCommentContent.trim() !== "") {
      onCommentAdd(newCommentContent);
      setNewCommentContent("");
    }
  };

  return (
    <div className="post-actions mt-1">
      <div className="d-flex align-items-center mb-1">
        {/* Like button and count */}
        <button
          className={`btn btn-light ${
            likedByUser ? "text-danger" : "text-secondary"
          }`}
          onClick={handleLikeToggle}
          style={{ border: "none", background: "transparent", padding: "3px" }}
        >
          <FaHeart size={20} />
        </button>
        <span className="ml-1">{likesNumber} Likes</span>
      </div>

      {/* Comments count */}
      <div className="mb-1">
        <span>{comments.length} Comments</span>
      </div>

      {/* Add comment input */}
      <div className="d-flex align-items-center">
        <input
          type="text"
          className="form-control"
          placeholder="Add a comment..."
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
        />
        <button className="btn btn-success m-1" onClick={handleAddComment}>
          Post
        </button>
      </div>
    </div>
  );
};

export default PostActions;
