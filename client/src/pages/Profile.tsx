import React, { useEffect, useState } from "react";
import PostComponent from "../components/Post";
import UserProfile from "../components/UserProfile";
import { Post } from "../interfaces/post";
import { usePostsContext } from "../context/PostsContext";

const Profile: React.FC = () => {
  const { posts, setPosts } = usePostsContext();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;
  const currentUsername = "PlantLover";
  const [userProfile, setUserProfile] = useState({
    username: "PlantLover",
    email: "plantlover@example.com",
    profilePhoto: "/path/to/profile-photo.jpg", // Replace with actual image path or state
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredPosts: Post[] = posts.filter(
    (post) => post.owner.username === currentUsername
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
                    <PostComponent
                      enableChanges={true}
                      key={post._id}
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
