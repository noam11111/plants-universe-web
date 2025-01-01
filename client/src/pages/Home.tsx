import React, { useState } from 'react';
import postsData from '../data/posts.json';
import Post from "../components/Post";

const Home: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedPosts = postsData.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    );

    return (
        <div className="home container mt-4">
            {paginatedPosts.map((post, index) => (
                <Post
                    key={index}
                    username={post.username}
                    userPhoto={post.userPhoto}
                    postPhoto={post.postPhoto}
                    description={post.description}
                />
            ))}
            <div className="pagination mt-4">
                {[...Array(Math.ceil(postsData.length / postsPerPage)).keys()].map((num) => (
                    <button
                        key={num}
                        className={`btn btn-${num + 1 === currentPage ? 'success' : 'outline-success'} mx-1`}
                        onClick={() => handlePageChange(num + 1)}
                    >
                        {num + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Home;