import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

function Homepage() {
  return (
    <div className="homepage-container">
      <div className="homepage-hero">
        <h2 className="homepage-title">Welcome to ECOWASTE</h2>
        <p className="homepage-subtitle">
          Empowering communities to manage waste sustainably through innovative recycling solutions and collective action.
        </p>

        {/* ✅ Changed "Get Started" to navigate to /dashboard instead of /request */}
        <Link to="/dashboard" className="homepage-button">Get Started</Link>

        {/* Login / Register Buttons */}
        <div className="homepage-auth-links">
          <Link to="/login" className="homepage-auth-button">Login</Link>
          <Link to="/register" className="homepage-auth-button">Register</Link>
        </div>
      </div>

      <div className="homepage-cards">
        <div className="homepage-card">
          <h3 className="homepage-card-title">Request a Pickup</h3>
          <p className="homepage-card-text">Schedule waste collection with ease and contribute to a cleaner environment.</p>
          <Link to="/request" className="homepage-card-button">Request Now</Link>
        </div>
        <div className="homepage-card">
          <h3 className="homepage-card-title">Track Your Impact</h3>
          <p className="homepage-card-text">Monitor your recycling contributions and see your environmental impact.</p>
          <Link to="/dashboard" className="homepage-card-button">View Dashboard</Link>
        </div>
        <div className="homepage-card">
          <h3 className="homepage-card-title">Join Our Community</h3>
          <p className="homepage-card-text">Participate in local events and learn sustainable practices.</p>
          <Link to="/events" className="homepage-card-button">Explore Events</Link>
        </div>
      </div>

      <div className="homepage-info">
        <h3 className="homepage-info-title">Why Choose ECOWASTE?</h3>
        <div className="homepage-info-grid">
          <div>
            <h4 className="homepage-info-subtitle">Sustainable Solutions</h4>
            <p>Our platform promotes recycling and waste reduction to protect the planet.</p>
          </div>
          <div>
            <h4 className="homepage-info-subtitle">Community Engagement</h4>
            <p>Connect with others to share knowledge and drive local change.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
