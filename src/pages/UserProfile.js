import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css';

function UserProfile() {
  const [userData, setUserData] = useState({});
  const [pickups, setPickups] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      console.log("🔐 Using token:", token); // debug log

      if (!token) {
        setError('Please login to view your profile.');
        return;
      }

      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [userRes, pickupsRes, eventsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/auth/me', { headers }),
          axios.get('http://localhost:5000/api/waste/my-requests', { headers }),
          axios.get('http://localhost:5000/api/events/my-events', { headers }),
        ]);

        setUserData(userRes.data);
        setPickups(pickupsRes.data);
        setEvents(eventsRes.data);
      } catch (err) {
        console.error('❌ Error fetching profile data:', err);
        setError('Failed to load profile data. Please ensure you are logged in.');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      {error && <p className="error-text">{error}</p>}

      {!error && (
        <>
          {/* User Info */}
          <div className="profile-section">
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> {userData.name || 'N/A'}</p>
            <p><strong>Email:</strong> {userData.email || 'N/A'}</p>
          </div>

          {/* Pickup History */}
          <div className="profile-section">
            <h3>Pickup History</h3>
            {pickups.length === 0 ? (
              <p>No pickup records.</p>
            ) : (
              <ul>
                {pickups.map((pickup, i) => (
                  <li key={i}>{pickup.date} - {pickup.wasteType}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Event Participation */}
          <div className="profile-section">
            <h3>Event Participation</h3>
            {events.length === 0 ? (
              <p>No event participation yet.</p>
            ) : (
              <ul>
                {events.map((event, i) => (
                  <li key={i}>{event.name} on {event.date}</li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfile;
