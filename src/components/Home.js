// src/components/Home.js
import React, { useState } from "react";
import Calendar from "react-calendar";
import axios from "axios"; // Import axios
import "./Home.css"; // Import the updated CSS file

const backendUrl = "http://172.20.10.6:5000/api/CURD/model1"; // Replace with your backend IP address

const Home = ({ onLogout }) => {
  const [date, setDate] = useState(new Date()); 
  const [showDraftPopup, setShowDraftPopup] = useState(false);
  const [draftContent, setDraftContent] = useState('');
  const [notification, setNotification] = useState('');
  const [recentMoM, setRecentMoM] = useState(null); // State to store the recent MoM
  const [showRecentMoMPopup, setShowRecentMoMPopup] = useState(false); // State to control the recent MoM popup

  const handleCalendarChange = async (selectedDate) => {
    setDate(selectedDate);
    await fetchMoMs(selectedDate); // Fetch MoMs when the date changes
  };

  const handleCreateMoM = () => {
    setShowDraftPopup(true); // Show the draft popup
  };

  const handleCloseDraft = () => {
    setShowDraftPopup(false); // Close the draft popup
    setDraftContent(''); // Reset the draft content
  };

  const handleSubmitDraft = async () => {
    try {
      //const response = await axios.post(`${backendUrl}/create-mom`, {
        const response = await axios.post("http://172.20.10.6:5000/api/CRUD/model1/create-mom", {
        content: draftContent,
        date: date.toISOString(),
      });
      console.log("Response:", response); // Log the response for debugging
      setShowDraftPopup(false);
      setNotification('MOM Submitted Successfully!');
      setTimeout(() => setNotification(''), 3000); // Clear the notification after 3 seconds
    } catch (error) {
      console.error("Error submitting MOM:", error);
      setNotification('Failed to Submit MOM.');
      setTimeout(() => setNotification(''), 3000); // Clear the notification after 3 seconds
    }
  };

  const fetchMoMs = async (selectedDate) => {
    try {
      //const response = await axios.get(`${backendUrl}/moms?date=${selectedDate.toISOString()}`);
      const response = await axios.get(`${backendUrl}/moms?date=${selectedDate.toISOString()}`);
      console.log("Fetched MOMs:", response.data);
    } catch (error) {
      console.error("Error fetching MOMs:", error);
    }
  };

  const fetchRecentMoM = async () => {
    try {
      const response = await axios.get("http://172.20.10.6:5000/api/CRUD/model1/1/recent-mom"); // API to get the most recent MoM
      setRecentMoM(response.data); // Store the recent MoM data
      setShowRecentMoMPopup(true); // Show the recent MoM popup
    } catch (error) {
      console.error("Error fetching recent MOM:", error);
    }
  };

  const handleCloseRecentMoM = () => {
    setShowRecentMoMPopup(false); // Close the recent MoM popup
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="logo-section">
          <img
            src="https://via.placeholder.com/40"
            alt="App Logo"
            className="app-logo"
          />
          <span className="app-name">MOMSync</span>
        </div>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </header>

      {/* Vertical Navigation Bar */}
      <nav className="vertical-nav">
        <div className="profile-section">
          <img
            src="https://via.placeholder.com/50"
            alt="Profile"
            className="profile-image"
          />
          <div className="profile-details">
            <span className="profile-name">Damini Vaidya</span>
            <span className="profile-email">damini.vaidya@ubs.com</span>
          </div>
        </div>
        <div className="nav-item">
          <input
            type="text"
            placeholder="Search meetings..."
            className="search-bar"
          />
        </div>
        <div className="nav-item">
          <button onClick={fetchRecentMoM} className="recent-mom-button">
            Check Recent MOM
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Calendar Section */}
        <div className="calendar-section">
          <Calendar onChange={handleCalendarChange} value={date} />
          {isToday(date) && ( // Check if the current selected date is today
            <button className="create-mom-button" onClick={handleCreateMoM}>
              Create MoM
            </button>
          )}
        </div>

        {/* Draft Popup */}
        {showDraftPopup && (
          <div className="draft-popup">
            <div className="draft-content">
              <h3>Create Draft for MoM</h3>
              <textarea
                rows="5"
                placeholder="Type your MOM here..."
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
              ></textarea>
              <button onClick={handleSubmitDraft}>Submit</button>
              <button onClick={handleCloseDraft}>Close</button>
            </div>
          </div>
        )}

        {/* Recent MoM Popup */}
        {showRecentMoMPopup && recentMoM && (
          <div className="recent-mom-popup">
            <div className="recent-mom-content">
              <h3>Recent MOM</h3>
              <p>{recentMoM.content}</p>
              <button onClick={handleCloseRecentMoM}>Close</button>
            </div>
          </div>
        )}

        {/* Notification */}
        {notification && (
          <div className="notification">
            <p>{notification}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 MOMSync. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
