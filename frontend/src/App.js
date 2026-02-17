import React, { useState } from 'react';
import axios from 'axios';
import { Leaf, FlaskConical, Map, Send } from 'lucide-react';
import './App.css';

function App() {
  const [inputs, setInputs] = useState({ chemical: '', crop: '', acres: 1 });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Replace URL with your Render/Local Python API link
      const response = await axios.post('http://localhost:10000/recommend', inputs);
      setData(response.data);
    } catch (err) {
      alert("Error connecting to AI Backend");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <header>
        <h1>Agri-Safe AI</h1>
        <p>Sustainable Organic Alternatives Recommendation</p>
      </header>

      <div className="form-card">
        <div className="input-group">
          <FlaskConical size={20} />
          <input placeholder="Chemical Name (e.g. Urea)" onChange={(e) => setInputs({...inputs, chemical: e.target.value})} />
        </div>
        <div className="input-group">
          <Leaf size={20} />
          <input placeholder="Crop (e.g. Maize)" onChange={(e) => setInputs({...inputs, crop: e.target.value})} />
        </div>
        <div className="input-group">
          <Map size={20} />
          <input type="number" placeholder="Acres" onChange={(e) => setInputs({...inputs, acres: e.target.value})} />
        </div>
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "AI is thinking..." : "Get Recommendation"} <Send size={18} />
        </button>
      </div>

      {data && (
        <div className="result-section">
          <h2>Recommended: {data.alternative}</h2>
          <div className="grid">
            <div className="info-box"><strong>Dosage:</strong> {data.dosage}</div>
            <div className="info-box"><strong>Timing:</strong> {data.application_time}</div>
          </div>
          <div className="advice-box">
            <h3>Expert AI Advice:</h3>
            <p>{data.llm_advice}</p>
          </div>
          <p className="safety-note">⚠️ {data.safety_note}</p>
        </div>
      )}
    </div>
  );
}

export default App;