import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing the edit and delete icons
import DropzoneComponent from "./Dropzone";
import { Post } from "../interfaces/post";

interface PostProps {
  post: Post;
  deletePost?: () => void; // Optional function for deleting the post
  onEditSave?: (updatedPost: Post) => void; // Function to save edited post
  onLikeToggle?: (postId: string) => void; // Function to handle like toggle
  onCommentAdd?: (postId: string, comment: string) => void; // Function to handle adding comments
}

const PostComponent: React.FC<PostProps> = ({
  post,
  deletePost,
  onEditSave,
  onLikeToggle,
  onCommentAdd,
}) => {
  const [isEditing, setIsEditing] = useState(post.editMode || false);
  const [description, setDescription] = useState(post.content);
  const [postPhoto, setPostPhoto] = useState(post.photoSrc);

  const handleSave = () => {
    if (onEditSave) {
      onEditSave({
        ...post,
        content: description,
        photoSrc: postPhoto,
        editMode: false,
      });
    }
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
      {(onEditSave || deletePost) && (
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
          {onEditSave && !isEditing && (
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
      </div>
    </div>
  );
};

export default PostComponent;
