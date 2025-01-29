import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Toaster, toast } from 'react-hot-toast';

const AdminNavbar = () => {
    const navigate = useNavigate();

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('authToken'); // Assuming you store your token here
        toast.success('Logged out successfully');
        navigate('/login'); // Redirect to login
    };

    const isLoggedIn = localStorage.getItem('token') !== null;

    return (
        <>
            <Toaster />
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
                <Container>
                    {/* Brand Logo */}
                    <Navbar.Brand as={Link} to="/admin-dashboard">
                        Admin Panel
                    </Navbar.Brand>

                    {/* Toggle button for responsive navbar */}
                    <Navbar.Toggle aria-controls="navbar-nav" />

                    {/* Navbar Links */}
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/admin-dashboard">
                                Participants
                            </Nav.Link>
                            <Nav.Link as={Link} to="/register">
                                Register Participant
                            </Nav.Link>
                            <Nav.Link as={Link} to="/qr-scanner">
                                QR Scanner
                            </Nav.Link>
                            <Nav.Link as={Link} to="/admin-login">
                                Login
                            </Nav.Link>
                            <Nav.Link as={Link} to="/add-sports">
                                Sports Details
                            </Nav.Link>
                            <Button
                                variant="danger"
                                className="ms-lg-2 mt-2 mt-lg-0"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default AdminNavbar;
