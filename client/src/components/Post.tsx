import React from "react";

interface PostProps {
  username: string;
  userPhoto: string;
  postPhoto: string;
  description: string;
}

const Post: React.FC<PostProps> = ({
  username,
  userPhoto,
  postPhoto,
  description,
}) => {
  return (
    <div className="post card mb-3" style={{ width: "40vw", height: "40vh" }}>
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <img
            src={userPhoto}
            alt={username}
            className="rounded-circle user-photo m-2"
            style={{ width: "30px", height: "30px" }}
          />
          <span className="ml-3">{username}</span>
        </div>
        <img
          src={postPhoto}
          alt="Post"
          className="post-photo mb-3"
          style={{ width: "30vw", height: "20vh" }}
        />
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Post;
