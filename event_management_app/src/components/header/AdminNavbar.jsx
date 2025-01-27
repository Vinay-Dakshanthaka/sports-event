import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const AdminNavbar = () => {
    const navigate = useNavigate();



    // Handle logout
    const handleLogout = () => {
        // Clear any authentication tokens and role data
        localStorage.removeItem('role');
        localStorage.removeItem('authToken'); // Assuming you store your token here
        toast.success('Logged out successfully');
        navigate('/login'); // Redirect to login
    };

    const isLoggedIn = localStorage.getItem('token') !== null;

    return (
        <>
            <Toaster />

            {/* Admin Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    {/* Brand Logo */}
                    {/* <Link className="navbar-brand" to="/admin-dashboard">Admin Panel</Link> */}

                    {/* Toggle button for responsive navbar */}
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

                    {/* Navbar Links */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/admin-dashboard">Participants</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link active" to="/register">Register Participant</Link>
                            </li> */}
                            <li className="nav-item">
                                <Link className="nav-link active" to="/qr-scanner">QR Scanner</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/admin-login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/add-sports">Sports Details</Link>
                            </li>

                            <li className="nav-item">
                                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                            </li>

                            {/* <li className="nav-item">
                                {isLoggedIn ? (
                                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                ) : (
                                    <Link className="btn btn-outline-info" to="/admin-login">Login</Link>
                                )}
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default AdminNavbar;
