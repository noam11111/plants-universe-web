import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPlusCircle, FaUserCircle } from 'react-icons/fa';


const NavbarComponent: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img
                        src="/logo.png"
                        alt="PlantsUniverse Logo"
                        className="logo"
                    />
                    PlantsUniverse
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                <FaHome className="me-2" /> Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/add-post" className="nav-link">
                                <FaPlusCircle className="me-2" /> Add Post
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link">
                                <FaUserCircle className="me-2" /> Profile
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;
