import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner, Alert, Form, Row, Col, Button } from "react-bootstrap";
import Paginate from "./Paginate"; // Import the provided Paginate component
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
  const [sportsByParticipant, setSportsByParticipant] = useState({});
  const [selectedSportName, setSelectedSportName] = useState("");
  const [sportsList, setSportsList] = useState([]);


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
        (selectedPlace ? p.place === selectedPlace : true) &&
        (selectedState ? p.state === selectedState : true) 
        (selectedSportName
          ? sportsByParticipant[p.id]?.some(
              (sport) => sport.name === selectedSportName
            )
          : true) // Filter by sport name if selected
    );
    setFilteredParticipants(filtered);
    setCurrentPage(1);
  };

 
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedPlace("");
    setSelectedState("");
    setSelectedSportName(""); // Clear the sport filter
    setFilteredParticipants(participants);
    setCurrentPage(1);
  };

  const paginatedParticipants = filteredParticipants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const uniquePlaces = [...new Set(participants.map((p) => p.place))];
  const uniqueStates = [...new Set(participants.map((p) => p.state))];

  const fetchSportsByParticipantId = async (participantId) => {
    try {
      const response = await axios.post(`${baseURL}/api/getsportsbyparticipantid`, {
        participantId: participantId,
      });
      setSportsList(response.data.sports); 
      console.log(response.data, "------------------------available sports");
      setSportsByParticipant((prev) => ({
        ...prev,
        [participantId]: response.data.sports,
      }));
    } catch (error) {
      console.error("Error fetching sports", error);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);
  
  useEffect(() => {
    if (participants.length > 0) {
      // Fetch sports for each participant when participants are loaded
      participants.forEach((participant) => {
        if (!sportsByParticipant[participant.id]) {
          fetchSportsByParticipantId(participant.id);
        }
      });
    }
  }, [participants]);

  
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
            <Col md={3}>
              <Form.Select
                value={selectedSportName}
                onChange={(e) => setSelectedSportName(e.target.value)}
              >
                <option value="">Filter by Sport</option>
                {sportsList.map((sport) => (
                  <option key={sport.id} value={sport.name}>
                    {sport.name}
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
                <th>Registered Sports</th>
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
                    <td>{p.entry_time || "Not Entered"}</td>
                    <td>
                    {sportsByParticipant[p.id] && sportsByParticipant[p.id].length > 0 ? (
                      <Form.Control as="select" value={selectedSportName} onChange={(e) => setSelectedSportName(e.target.value)}>
                        <option value="">registered sports</option>
                        {sportsByParticipant[p.id].map((sport) => (
                          <option key={sport.id} value={sport.name}>
                            {sport.name}
                          </option>
                        ))}
                      </Form.Control>
                    ) : (
                      <div>No sports found</div>
                    )}
                  </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
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
