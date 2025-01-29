import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast'; 
import { FaTrash } from 'react-icons/fa'; 
import { Modal, Button, Table, Form } from 'react-bootstrap';  
import { baseURL } from "./config/baseURL";


function Sports() {
  const [sportName, setSportName] = useState('');
  const [availableSports, setAvailableSports] = useState([]);
  const [showModal, setShowModal] = useState(false);

  
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/getsports`);
        setAvailableSports(response.data);
      } catch (error) {
        console.error('Error fetching sports:', error);
      }
    };

    fetchSports();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sportName) {
      toast.error('Sport name is required!');
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/api/sports`, { name: sportName });
      toast.success('Sport added successfully!');
      setSportName('');
      const updatedSportsResponse = await axios.get(`${baseURL}/api/getsports`);
      setAvailableSports(updatedSportsResponse.data);
      setShowModal(false);
    } catch (error) {
      toast.error('Error adding sport');
      console.error(error);
    }
  };

  const handleDelete = async (sportId) => {
    try {
      const response = await axios.delete(`${baseURL}/api/sports/${sportId}`);
      toast.success('Sport deleted successfully!');
      const updatedSportsResponse = await axios.get(`${baseURL}/api/getsports`);
      setAvailableSports(updatedSportsResponse.data);
    } catch (error) {
      toast.error('Error deleting sport');
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Sports Management</h1>

      {/* Button to open the modal */}
      <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
        Add a New Sport
      </Button>

      {/* Modal for adding a new sport */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Sport</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="sportName">
              <Form.Label>Sport Name:</Form.Label>
              <Form.Control
                type="text"
                value={sportName}
                onChange={(e) => setSportName(e.target.value)}
                placeholder="Enter sport name"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Add Sport
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <h2 className="mt-4">Available Sports</h2>

      {/* Responsive Table */}
      <div className="table-responsive">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>SNO</th>
              <th>Sport Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {availableSports.length > 0 ? (
              availableSports.map((sport,index) => (
                <tr key={sport.id}>
                  <td>{index+1}</td>
                  <td>{sport.name}</td>
                  <td>
                    <FaTrash
                      onClick={() => handleDelete(sport.id)}
                      className="text-danger cursor-pointer"
                      title="Delete Sport"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No sports available.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Sports;
