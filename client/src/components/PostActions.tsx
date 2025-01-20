import { FaHeart } from "react-icons/fa";
import { PostComment } from "../interfaces/comment";
import { useNavigate } from "react-router-dom";

interface PostActionsProps {
  postId: string;
  likesNumber: number;
  likedByUser: boolean;
  comments: PostComment[];
  onLikeToggle: () => void;
  inFeed?: boolean;
}

const PostActions = ({
  postId,
  likesNumber,
  likedByUser,
  comments,
  onLikeToggle,
  inFeed,
}: PostActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="post-actions mt-1">
      <div className="d-flex align-items-center mb-1">
        <button
          className={`btn btn-light ${
            likedByUser ? "text-danger" : "text-secondary"
          }`}
          onClick={onLikeToggle}
          style={{ border: "none", background: "transparent", padding: "3px" }}
        >
          <FaHeart size={20} />
        </button>
        <span className="ml-1">{likesNumber} Likes</span>
      </div>

      {inFeed ? (
        <button
          className={"mb-1 btn btn-light"}
          onClick={() => navigate(`/post/${postId}`)}
        >
          <span>{comments.length} Comments</span>
        </button>
      ) : (
        <span>{comments.length} Comments</span>
      )}
    </div>
  );
};

export default PostActions;
