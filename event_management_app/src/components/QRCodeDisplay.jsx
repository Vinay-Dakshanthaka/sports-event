import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Card, Button } from "react-bootstrap";

const QRCodeDisplay = ({ uniqueLink }) => {
  const qrCodeCanvasRef = useRef(null);

  // Function to download the QR code
  const downloadQRCode = () => {
    const canvas = qrCodeCanvasRef.current;
    if (canvas) {
      // Create a new canvas to add padding and white background
      const paddedCanvas = document.createElement("canvas");
      const ctx = paddedCanvas.getContext("2d");

      // Set the desired padding (e.g., 20px)
      const padding = 20;
      const qrCodeSize = canvas.width;
      
      // Set the new canvas size (original QR code size + padding)
      paddedCanvas.width = qrCodeSize + padding * 2;
      paddedCanvas.height = qrCodeSize + padding * 2;

      // Fill the new canvas with a white background
      ctx.fillStyle = "#ffffff"; // White background color
      ctx.fillRect(0, 0, paddedCanvas.width, paddedCanvas.height);

      // Draw the QR code onto the new canvas with padding
      ctx.drawImage(canvas, padding, padding);

      // Convert the padded canvas to a downloadable image
      const pngUrl = paddedCanvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      // Create a download link
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "participant-qr-code.png";
      downloadLink.click();
    }
  };

  return (
    <Card className="shadow-sm p-4 text-center d-flex align-items-center">
      <h5 className="mb-4">Download and show this QR code at entry time</h5>
      <div
        style={{
          display: "inline-block",
          backgroundColor: "#ffffff", // White background for QR code display
        }}
      >
        <QRCodeCanvas
          ref={qrCodeCanvasRef}
          value={uniqueLink}
          size={300}
          level={"H"}
          bgColor="#ffffff" // Ensure the QR code itself has a white background
        />
      </div>
      <Button variant="primary" className="mt-3" onClick={downloadQRCode}>
        Download QR Code
      </Button>
    </Card>
  );
};

export default QRCodeDisplay;
