import moment from 'moment-timezone';
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import QRCodeDisplay from "./QRCodeDisplay";
import Select from 'react-select';  // Import react-select
import { baseURL } from "./config/baseURL";

const ParticipantRegistration = () => {
  const [availableSports, setAvailableSports] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    place: "",
    state: "",
    selectedSports: [], // Store selected sports
  });

  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [uniqueLink, setUniqueLink] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the current time in IST (Indian Standard Time) using moment-timezone
    const registration_time = moment().tz("Asia/Kolkata").format(); // Get the time in IST and format it to ISO string

    console.log('IST time : ', registration_time); // Log the formatted time

    try {
      const response = await axios.post(`${baseURL}/api/participants`, {
        ...formData,
        registration_time, // Send the time in the formatted ISO string
      });
       console.log(response.data,"--------------participants")
      const { participant } = response.data;
      const participatesports = await axios.post(`${baseURL}/api/addSportsForParticipant`,{
        participantId : response.data.participant.id,
        sportIds : formData.selectedSports,
      })
      setUniqueLink(participant.unique_link);
      setQrCodeUrl(participant.unique_link);
      setFormSubmitted(true); // Mark form as submitted

      toast.success("Participant registered successfully!");

      // Trigger the download of the QR code automatically after registration
      setTimeout(() => downloadQRCode(), 500); // Add delay before triggering download
    } catch (error) {
      console.error("Error registering participant:", error);
      toast.error("Failed to register participant. Please try again.");
    }
  };

  // Fetch available sports from the backend when the component mounts
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/getsports`);
        setAvailableSports(response.data); // Set available sports in state
        // console.log(response.data,"---------sports")
      } catch (error) {
        console.error('Error fetching sports:', error);
      }
    };

    fetchSports();
  }, []);

  const handleSportChange = (selectedOptions) => {
    // Update selected sports when user selects or unselects options
    const selectedSports = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData({
      ...formData,
      selectedSports,
    });
  };

  // Convert available sports to options for react-select
  const sportsOptions = availableSports.map(sport => ({
    value: sport.id,
    label: sport.name
  }));

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          {/* Conditional rendering: Show form if not submitted */}
          {!formSubmitted ? (
            <Card className="shadow-sm p-4">
              <h2 className="text-center mb-4">Registration Form</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="phone" className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="place" className="mb-3">
                  <Form.Label>Place</Form.Label>
                  <Form.Control
                    type="text"
                    name="place"
                    placeholder="Enter your place"
                    value={formData.place}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="state" className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    placeholder="Enter your state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                {/* Sports Selection Dropdown */}
                <Form.Group controlId="sports" className="mb-3">
                  <Form.Label>Available Sports</Form.Label>
                  <Select
                    isMulti
                    name="selectedSports"
                    options={sportsOptions}
                    value={sportsOptions.filter(option => formData.selectedSports.includes(option.value))}
                    onChange={handleSportChange}
                    closeMenuOnSelect={false}
                    placeholder="Select sports"
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">
                  Register
                </Button>
              </Form>
            </Card>
          ) : (
            // Show the QR code after successful form submission
            <QRCodeDisplay uniqueLink={uniqueLink} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ParticipantRegistration;
