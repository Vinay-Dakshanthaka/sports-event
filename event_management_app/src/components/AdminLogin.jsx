import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { baseURL } from "./config/baseURL";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); // to navigate to admin dashboard after login

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    
    // Check if username and password are provided
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${baseURL}/api/admin/login`, { username, password });
      console.log(response.data.admin.token)
      
      localStorage.setItem("token", response.data.admin.token);
      
      
      setSuccess("Login successful");
      toast.success("Login Successful")
      setTimeout(() => {
        
        navigate("/qr-scanner"); 
        window.location.reload;
      }, 1500);
      
    } catch (err) {
      console.log('Error while sign in : ', err)
      setError(err.response ? err.response.data.error : "An error occurred during login");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container text-center" style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Admin Login</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleLogin} className="my-4">
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Form>
    </div>
  );
};

export default AdminLogin;
