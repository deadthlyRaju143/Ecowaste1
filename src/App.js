import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';

import Homepage from '../src/pages/Homepage.js';
import Dashboard from '../src/pages/Dashboard.js';
import WasteRequestForm from '../src/pages/wasterequest.js';
import RecyclingTips from '../src/pages/recylingtips.js';
import Login from '../src/pages/Login.js';
import Register from '../src/pages/Register.js';
import WasteSortingGuide from './pages/WasteSortingGuide.js';
import EventsPage from './pages/EventsPage.js';
import UserProfile from './pages/UserProfile.js';
import ForgotPassword from './pages/ForgotPassword.js';
import ResetPassword from './pages/ResetPassword.js';

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-ecoGray font-sans">
      <nav className="bg-ecoGreen text-white sticky top-0 z-50 shadow-eco">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          
          {/* 👇 ECOWASTE title with dynamic redirect */}
          <Link
            to={isLoggedIn ? "/profile" : "/"}
            className="text-3xl font-bold tracking-tight hover:text-ecoAccent transition-colors duration-200"
          >
            ECOWASTE
          </Link>

          <div className="space-x-6 flex items-center">
            <Link to="/" className="hover:text-ecoAccent transition-colors duration-200">Home</Link>
            <Link to="/dashboard" className="hover:text-ecoAccent transition-colors duration-200">Dashboard</Link>
            <Link to="/request" className="hover:text-ecoAccent transition-colors duration-200">Request Pickup</Link>
            <Link to="/events" className="hover:text-ecoAccent transition-colors duration-200">CommunityEvents</Link>
            <Link to="/tips" className="hover:text-ecoAccent transition-colors duration-200">Recycling Tips</Link>
            <Link to="/sorting" className="hover:text-ecoAccent transition-colors duration-200">WasteSortingGuide</Link>

            {isLoggedIn ? (
              <>
                <Link to="/profile" className="hover:text-ecoAccent transition-colors duration-200">UserProfile</Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-ecoAccent transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-ecoAccent transition-colors duration-200">Login</Link>
                <Link to="/register" className="hover:text-ecoAccent transition-colors duration-200">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/request" element={<WasteRequestForm />} />
        <Route path="/tips" element={<RecyclingTips />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sorting" element={<WasteSortingGuide />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>

      <footer className="bg-ecoDarkGray text-white py-12 mt-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">About ECOWASTE</h3>
            <p className="text-sm">We are dedicated to fostering sustainable waste management and recycling practices in communities worldwide.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/request" className="hover:text-ecoAccent">Schedule Pickup</Link></li>
              <li><Link to="/tips" className="hover:text-ecoAccent">Recycling Tips</Link></li>
              <li><Link to="/events" className="hover:text-ecoAccent">Community Events</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">Email: support@ecowaste.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 text-center">
          <p className="text-sm">© 2025 ECOWASTE. Committed to a sustainable future.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
