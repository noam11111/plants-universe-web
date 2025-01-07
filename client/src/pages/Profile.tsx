import React, { useEffect, useState } from "react";
import postsData from "../data/posts.json";
import Post from "../components/Post";
import UserProfile from "../components/UserProfile";

const Profile: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;
  const currentUsername = "PlantLover";
  const [posts, setPosts] = useState<Post[]>([]);
  const [userProfile, setUserProfile] = useState({
    username: "PlantLover",
    email: "plantlover@example.com",
    profilePhoto: "/path/to/profile-photo.jpg", // Replace with actual image path or state
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredPosts: Post[] = postsData.filter(
    (post) => post.username === currentUsername
  );
  useEffect(() => {
    setPosts(
      filteredPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
      )
    );
  }, [currentPage]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const editPost = (post: Post) => {
    console.log("edittttt");
    setPosts(
      posts.map((currPost) =>
        currPost.id === post.id ? { editMode: true, ...post } : post
      )
    );
  };
  const deletePost = (post: Post) => {
    // TODO post delete
  };

  const handleSaveProfile = (
    updatedUsername: string,
    updatedProfilePhoto: string | null
  ) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      username: updatedUsername,
      profilePhoto: updatedProfilePhoto || prevProfile.profilePhoto,
    }));
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="mt-4 d-flex flex-column justify-content-center col-6">
            {/* Posts Section */}
            <div
              className="row flex-grow-1"
              style={{ minHeight: "300px", height: "600px" }}
            >
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <div className="col-12 mb-3" key={index}>
                    <Post
                      deletePost={() => deletePost(post)}
                      editPost={() => editPost(post)}
                      onEditSave={(updatedPost: Post) =>
                        console.log(updatedPost)
                      }
                      key={post.id}
                      post={post}
                    />
                  </div>
                ))
              ) : (
                <div className="col-12 d-flex justify-content-center align-items-center">
                  <p className="text-center">No posts available.</p>
                </div>
              )}
            </div>

            {/* Pagination Section */}
            <div className="row">
              <div className="col-12 text-center">
                {totalPages > 0 ? (
                  [...Array(totalPages).keys()].map((num) => (
                    <button
                      key={num}
                      className={`btn btn-${
                        num + 1 === currentPage ? "success" : "outline-success"
                      } mx-1`}
                      onClick={() => handlePageChange(num + 1)}
                    >
                      {num + 1}
                    </button>
                  ))
                ) : (
                  <button className="btn btn-outline-secondary" disabled>
                    No Pages
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="col-6 mt-4" style={{ width: "30%" }}>
            <UserProfile
              username={userProfile.username}
              email={userProfile.email}
              profilePhoto={userProfile.profilePhoto}
              onSaveProfile={handleSaveProfile}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
