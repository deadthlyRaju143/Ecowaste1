import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import './EventsPage.css';

const BASE_URL = 'http://localhost:5000';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
  axios.get(`${BASE_URL}/api/events/upcoming`)
    .then(res => {
      console.log('✅ Events from backend:', res.data);
      setEvents(res.data);
    })
    .catch(err => console.error('❌ Error fetching events:', err));
}, []);


  const handleJoin = async (eventId) => {
    if (!token) {
      alert("Please login to participate in events.");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/events/participate/${eventId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('✅ You have joined the event!');
    } catch (err) {
      console.error('Error joining event:', err);
      alert('❌ Failed to join event.');
    }
  };

  return (
    <div className="events-container">
      <h2>Upcoming Events</h2>

      {events.length === 0 ? (
        <p>No upcoming events found.</p>
      ) : (
        <ul className="event-list">
          {events.map(event => (
            <li key={event._id} className="event-item">
              <strong>{event.title}</strong> – {moment(event.date).format('MMMM D, YYYY')} – {event.location}
              <p>{event.description}</p>
              <button onClick={() => handleJoin(event._id)}>Participate</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventsPage;
