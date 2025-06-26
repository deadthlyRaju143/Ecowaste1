import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [recentPickups, setRecentPickups] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/waste/my-requests', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecentPickups(res.data.reverse()); 
      } catch (err) {
        console.error(err);
        setError('Failed to fetch pickups. Please login.');
      }
    };

    fetchPickups();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Your Dashboard</h2>

      <div className="dashboard-grid">
        {/* Recent Pickups */}
        <div className="dashboard-card">
          <h3 className="dashboard-title">Recent Pickups</h3>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <ul className="dashboard-list">
            {recentPickups.length === 0 ? (
              <li>No pickups found.</li>
            ) : (
              recentPickups.slice(0, 5).map((pickup, index) => (
                <li key={index}>
                  <span>{pickup.wasteType}</span>
                  <span>{pickup.date}</span>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Recycling Stats (Static for now) */}
        <div className="dashboard-card">
          <h3 className="dashboard-title">Recycling Stats</h3>
          <div className="dashboard-stats">
            <div><span>Plastic</span><span>15kg</span></div>
            <div><span>Paper</span><span>10kg</span></div>
            <div><span>Organic</span><span>25kg</span></div>
          </div>
        </div>

        {/* Your Impact (Static for now) */}
        <div className="dashboard-card">
          <h3 className="dashboard-title">Your Impact</h3>
          <p className="dashboard-impact">
            You've reduced 50kg of waste this year, saving approximately 0.5 tons of CO₂ emissions!
          </p>
          <Link to="/profile" className="dashboard-link">View Profile</Link>
        </div>
      </div>

      {/* Next Steps */}
      <div className="dashboard-next">
        <h3 className="dashboard-title">Your Next Steps</h3>
        <p>Join an upcoming community cleanup or learn more about waste sorting.</p>
        <div className="dashboard-actions">
          <Link to="/events" className="dashboard-button">Find Events</Link>
          <Link to="/sorting" className="dashboard-button">Sorting Guide</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
