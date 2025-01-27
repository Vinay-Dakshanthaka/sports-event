import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Spinner, Table } from "react-bootstrap";
import { baseURL } from "./config/baseURL";

const ParticipantDetails = ({ id }) => {
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchParticipant = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${baseURL}/api/participants/${id}`);
      setParticipant(response.data.participant);
    } catch (error) {
      console.error("Error fetching participant details: ", error);
      setError(
        error.response?.data?.error || "Failed to fetch participant details."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "Yet to be updated";
    const date = new Date(dateTime);
    return date.toLocaleString(); // Convert to a readable date and time format
  };

  useEffect(() => {
    if (id) {
      fetchParticipant();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" role="status" />
        <p>Loading participant details...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!participant) {
    return <p className="text-center my-4">No participant data available.</p>;
  }

  return (
    <div className="table-responsive my-4">
      <h3 className="text-center">Participant Details</h3>
      <Table bordered hover className="mx-auto" style={{ maxWidth: "600px" }}>
        <tbody>
          <tr>
            <th>ID</th>
            <td>{participant.id}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{participant.name}</td>
          </tr>
          <tr>
            <th>Place</th>
            <td>{participant.place}</td>
          </tr>
          <tr>
            <th>State</th>
            <td>{participant.state}</td>
          </tr>
          <tr>
            <th>Registration Time</th>
            <td>{formatDateTime(participant.registration_time)}</td>
          </tr>
          {/* <tr>
            <th>Entry Time</th>
            <td>{formatDateTime(participant.entry_time)}</td>
          </tr> */}
        </tbody>
      </Table>
    </div>
  );
};

export default ParticipantDetails;
