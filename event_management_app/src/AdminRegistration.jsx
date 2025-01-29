import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AdminRegistration = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminData, setAdminData] = useState({ username: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddAdmin = async () => {
    try {
      const response = await fetch('http://localhost:3030/api/admin/save-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });

      if (response.ok) {
        setSuccessMessage('Admin added successfully!');
        setErrorMessage('');
        setAdminData({ name: '', password: '' });
        setIsModalOpen(false);
      } else {
        setErrorMessage('Failed to add admin. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-2xl font-bold mb-4">Admin Registration</h1>

      {successMessage && <p className="text-success mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-danger mb-4">{errorMessage}</p>}

      <Button
        onClick={() => setIsModalOpen(true)}
        variant="primary"
      >
        Add Admin
      </Button>

      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formAdminName">
              <Form.Label>Admin Name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={adminData.name}
                onChange={handleInputChange}
                placeholder="Enter admin name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAdminPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={adminData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleAddAdmin}
          >
            Save Admin
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminRegistration;
