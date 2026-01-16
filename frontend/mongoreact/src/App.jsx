import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Vercel par host hone ke baad URL automatic adjust hoga
    const apiURL = window.location.hostname === 'localhost' 
      ? 'http://localhost:5000/api/save' 
      : '/api/save';

    try {
      await axios.post(apiURL, formData);
      alert("Success! Data saved to MongoDB.");
      setFormData({ name: '', email: '' });
    } catch (err) {
      alert("Error saving data");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h2>Save to MongoDB</h2>
        <input 
          type="text" placeholder="Name" required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '200px' }}
        />
        <input 
          type="email" placeholder="Email" required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '200px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer', background: 'blue', color: 'white', border: 'none' }}>
          Save Data
        </button>
      </form>
    </div>
  );
}

export default App;