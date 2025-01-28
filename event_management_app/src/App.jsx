import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ParticipantRegistration from './components/ParticipantRegistration';
import { Toaster } from 'react-hot-toast';
import AdminNavbar from './components/header/AdminNavbar';
import QRScanner from './components/QRScanner';
import AdminLogin from './components/AdminLogin';
import ParticipantsTable from './components/ParticipantTable';
import Sports from './components/Sports';

function App() {
  // Get role from localStorage to protect admin routes
  const userRole = localStorage.getItem('role'); // Should be set when the user logs in

  // Protected Route Component for Admin
  const ProtectedRoute = ({ children }) => {
    if (userRole !== 'ADMIN') {
      return <Navigate to="/qr-scanner" />;
    }
    return children;
  };

  // Paths to exclude Header and Footer (for example, login page)
  const excludePaths = ['/register'];
  // const excludePaths = [''];

  return (
    <Router>
      <Toaster /> 
      {/* <AdminNavbar /> */}
      {!excludePaths.includes(window.location.pathname) && <AdminNavbar />} 
      
      <div className="app-content">
        <Routes>
          <Route path="/" element={<ParticipantsTable />} />
          
          {/* Protected Admin Route */}
          {/* <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <ParticipantsTable />
              </ProtectedRoute>
            }
          /> */}

          {/* Other Routes */}
          <Route path="/register" element={<ParticipantRegistration />} />
          <Route path="/qr-scanner" element={<QRScanner />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<ParticipantsTable />} />
          <Route path="/add-sports" element={<Sports />} />


          {/* Redirect if route not found */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      {/* {!excludePaths.includes(window.location.pathname) && <Footer />} Conditionally render Footer */}
    </Router>
  );
}

export default App;
