import { useEffect, useState } from "react";
import PostComponent from "../components/Post";
import UserProfile from "../components/UserProfile";
import { Post } from "../interfaces/post";
import { usePostsContext } from "../context/PostsContext";
import { updateUser } from "../services/users";
import { useUserContext } from "../context/UserContext";

const Profile = () => {
  const { posts, setPosts } = usePostsContext();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;
  const { user, refetchUser } = useUserContext() ?? {};

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredPosts: Post[] = posts.filter(
    (post) => post.owner._id === user?._id
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

  const handleSaveProfile = async (
    updatedUsername: string,
    updatedProfilePhoto: string | null
  ) => {
    //TODO still have a problem with the refresh
    if (user) {
      await updateUser({
        email: user.email,
        _id: user._id!,
        username: updatedUsername,
        photoSrc: updatedProfilePhoto || user?.photoSrc,
      });
      refetchUser && refetchUser();
    }
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
          {user && (
            <div className="col-6 mt-4" style={{ width: "30%" }}>
              <UserProfile
                username={user.username}
                email={user.email}
                profilePhoto={user.photoSrc || null}
                onSaveProfile={handleSaveProfile}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
