import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner, Alert, Form, Row, Col, Button } from "react-bootstrap";
import Paginate from "./Paginate";
import { baseURL } from "./config/baseURL";

const ParticipantsTable = () => {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchParticipants = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseURL}/api/admin/fetch-all-participants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response : ", response)
      setParticipants(response.data.particpants);
      setFilteredParticipants(response.data.particpants);
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to fetch participants. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = participants.filter(
      (p) =>
        (p.name && p.name.toLowerCase().includes(query)) ||
        (p.phone && p.phone.includes(query))
    );
    setFilteredParticipants(filtered);
    setCurrentPage(1);
  };

  const handleFilter = () => {
    const filtered = participants.filter(
      (p) =>
        (selectedPlace ? p.place?.toLowerCase() === selectedPlace.toLowerCase() : true) &&
        (selectedState ? p.state?.toLowerCase() === selectedState.toLowerCase() : true)
    );
    setFilteredParticipants(filtered);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedPlace("");
    setSelectedState("");
    setFilteredParticipants(participants);
    setCurrentPage(1);
  };

  const paginatedParticipants = filteredParticipants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const uniquePlaces = [
    ...new Map(
      participants
        .filter((p) => p.place)
        .map((p) => [p.place.toLowerCase(), p.place])
    ).values(),
  ];

  const uniqueStates = [
    ...new Map(
      participants
        .filter((p) => p.state)
        .map((p) => [p.state.toLowerCase(), p.state])
    ).values(),
  ];


  const formatEntryTime = (entryTime) => {
    if (!entryTime) return "Not Entered";

    const date = new Date(entryTime);
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };

    return date.toLocaleString('en-US', options);
  };


  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Participants List</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Control
                type="text"
                placeholder="Search by Name or Phone"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Col>
            <Col md={3}>
              <Form.Select
                value={selectedPlace}
                onChange={(e) => setSelectedPlace(e.target.value)}
              >
                <option value="">Filter by Place</option>
                {uniquePlaces.map((place, index) => (
                  <option key={index} value={place}>
                    {place}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="">Filter by State</option>
                {uniqueStates.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={3} className="d-flex justify-content-between">
              <Button variant="primary" onClick={handleSearch}>
                Search
              </Button>
              <Button variant="success" onClick={handleFilter}>
                Apply Filters
              </Button>
              <Button variant="secondary" onClick={handleClearFilters}>
                Clear
              </Button>
            </Col>
          </Row>
          <Table responsive striped bordered hover>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Place</th>
                <th>State</th>
                <th>Entry Time</th>
                <th>Sports</th>
              </tr>
            </thead>
            <tbody>
              {paginatedParticipants.length > 0 ? (
                paginatedParticipants.map((p, index) => (
                  <tr key={p.id}>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{p.name || "N/A"}</td>
                    <td>{p.email || "N/A"}</td>
                    <td>{p.phone || "N/A"}</td>
                    <td>{p.place || "N/A"}</td>
                    <td>{p.state || "N/A"}</td>
                    <td>{formatEntryTime(p.entry_time)}</td>
                    <td>
                      {p.Sports && p.Sports.length > 0 ? (
                        <ul className="list-unstyled mb-0">
                          {p.Sports.map((sport) => (
                            <li key={sport.id}>{sport.name}</li>
                          ))}
                        </ul>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No participants found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <Paginate
            currentPage={currentPage}
            totalItems={filteredParticipants.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
};

export default ParticipantsTable;
