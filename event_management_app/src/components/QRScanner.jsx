import React, { useState, useEffect, useRef } from "react";
import moment from "moment-timezone";
import { BrowserMultiFormatReader } from "@zxing/library";
import axios from "axios";
import { Button, Alert } from "react-bootstrap";
import { baseURL } from "./config/baseURL";
import ParticipantDetails from "./ParticipantDetails";
import toast from "react-hot-toast";

const QRScanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastScannedId, setLastScannedId] = useState(null);

  const videoRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());
  const errorThrottle = useRef(Date.now());

  const getAdminToken = () => localStorage.getItem("token");

  const startCamera = () => {
    if (videoRef.current && codeReader.current) {
      codeReader.current
        .decodeFromVideoDevice(null, videoRef.current, (result, error) => {
          if (result) {
            const url = new URL(result.getText());
            const participantId = url.pathname.split("/").pop();

            // Prevent redundant updates for the same QR code
            if (participantId !== lastScannedId) {
              setScannedData(participantId);
              setLastScannedId(participantId);
            }
          } else if (error) {
            // Throttle error logging to once per second
            const now = Date.now();
            if (error.name !== "NotFoundException" && now - errorThrottle.current > 1000) {
              console.error("Error scanning QR code:", error);
              errorThrottle.current = now;
            }
          }
        })
        .catch((err) => {
          console.error("Error initializing QR code scanner:", err);
        });
    }
  };

  const stopCamera = () => {
    if (codeReader.current) {
      codeReader.current.reset();
    }
  };

  useEffect(() => {
    startCamera();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopCamera();
      } else {
        startCamera();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopCamera();
    };
  }, []);

  const updateEntryTime = async (participantId) => {
    const adminToken = getAdminToken();
    if (!adminToken) {
      setError("Admin not logged in");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      };

      const response = await axios.put(
        `${baseURL}/api/admin/update-entery-time/${participantId}`,
        { entry_time: moment().tz("Asia/Kolkata").format() },
        config
      );

      if (response.data.alreadyUpdated) {
        setError("Entry time already updated for this participant.");
      } else {
        setSuccess("Entry time updated successfully.");
        toast.success("Entry time updated successfully.");
      }
    } catch (error) {
      setError(error.response ? error.response.data.error : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scannedData) {
      updateEntryTime(scannedData);
    }
  }, [scannedData]);

  const handleReset = () => {
    stopCamera();
    setScannedData(null);
    setLastScannedId(null);
    setSuccess("");
    setError("");
    startCamera(); // Restart the camera after resetting
  };

  return (
    <div className="text-center">
      <h2>Scan the QR</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <div className="my-4">
        <video
          ref={videoRef}
          style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}
          autoPlay
        />
      </div>

      {scannedData && (
        <div className="my-4">
          <h4>Participant ID: {scannedData}</h4>
          <ParticipantDetails id={scannedData} />
        </div>
      )}

      <Button
        variant="danger"
        className="mt-3"
        onClick={handleReset}
        disabled={loading}
      >
        Reset Scanner
      </Button>
    </div>
  );
};

export default QRScanner;
