import React, { useState } from 'react';
import axios from 'axios';
import { FlaskConical, Map, Send, Sprout } from 'lucide-react';
import '../styles/recommend.css'; // We will create this specific CSS file

const CROP_OPTIONS = ["Maize", "Rice", "Wheat", "Cotton", "Sugarcane", "Pulses"];

export default function Recommend() {
  const [inputs, setInputs] = useState({ chemical: '', crop: '', acres: 1 });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!inputs.chemical || !inputs.crop) {
      alert("Please enter both the chemical and the crop.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:10000/recommend', inputs);
      setData(response.data);
    } catch (err) {
      alert("Error connecting to AI Backend. Make sure your Python server is running.");
    }
    setLoading(false);
  };

  return (
    <div className="recommend-viewport">
      <div className="recommend-container animate-fade-in">
        <header className="form-header">
          <h1>Agri-Safe AI</h1>
          <p>Sustainable Organic Alternatives Recommendation</p>
        </header>

        <div className="glass-form-card">
          {/* Chemical Input */}
          <div className="input-group">
            <FlaskConical size={20} className="form-icon" />
            <input 
              placeholder="Chemical Name (e.g. Urea)" 
              onChange={(e) => setInputs({...inputs, chemical: e.target.value})} 
            />
          </div>

          {/* Crop Dropdown */}
          <div className="input-group">
            <Sprout size={20} className="form-icon" />
            <select 
              value={inputs.crop} 
              onChange={(e) => setInputs({ ...inputs, crop: e.target.value })}
            >
              <option value="" disabled>Select a Crop</option>
              {CROP_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Acres Input */}
          <div className="input-group">
            <Map size={20} className="form-icon" />
            <input 
              type="number" 
              placeholder="Acres" 
              min="1"
              onChange={(e) => setInputs({...inputs, acres: e.target.value})} 
            />
          </div>

          <button className="recommend-btn" onClick={handleSearch} disabled={loading}>
            {loading ? "AI is thinking..." : "Get Recommendation"} <Send size={18} />
          </button>
        </div>

        {data && (
          <div className="result-card animate-slide-up">
            <h2>Recommended: {data.alternative}</h2>
            <div className="result-grid">
              <div className="res-box"><strong>Dosage:</strong> {data.dosage}</div>
              <div className="res-box"><strong>Timing:</strong> {data.application_time}</div>
            </div>
            <div className="ai-advice-box">
              <h3>Expert AI Advice:</h3>
              <p>{data.llm_advice}</p>
            </div>
            <p className="safety-warning">⚠️ {data.safety_note}</p>
          </div>
        )}
      </div>
    </div>
  );
}