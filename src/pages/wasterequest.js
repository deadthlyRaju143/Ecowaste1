import { useState } from 'react';
import axios from 'axios';
import './wasterequest.css';

function WasteRequestForm() {
  const [formData, setFormData] = useState({
    wasteType: '',
    date: '',
    address: '',
    notes: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // token stored during login
      await axios.post(
        'http://localhost:5000/api/waste/submit',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('Pickup request submitted successfully!');
      setFormData({ wasteType: '', date: '', address: '', notes: '' });
    } catch (err) {
      console.error(err);
      setMessage('Error submitting request. Please login or try again.');
    }
  };

  return (
    <div className="form-container animate-slide-up">
      <h2 className="form-title">Schedule Waste Pickup</h2>
      {message && <div className="form-message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Waste Type</label>
          <select
            name="wasteType"
            value={formData.wasteType}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Select Type</option>
            <option value="Organic">Organic</option>
            <option value="Recyclable">Recyclable</option>
            <option value="General">General</option>
            <option value="Hazardous">Hazardous</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Pickup Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-input"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label className="form-label">Additional Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="form-input"
            rows="3"
            placeholder="Any special instructions?"
          ></textarea>
        </div>

        <button type="submit" className="form-button">
          Submit Request
        </button>
      </form>
    </div>
  );
}

export default WasteRequestForm;
