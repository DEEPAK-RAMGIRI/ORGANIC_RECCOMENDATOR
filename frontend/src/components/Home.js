import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigate hook
import '../styles/home.css'; 

export default function Home() {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="landing-wrapper">
      <div className="container animate-fade-in">
        <section className="content-area">
          <h1 className="main-heading">
            Organic <br /> <span>Reccomendator</span>
          </h1>
          <p className="description-text">
            We recommend organic alternatives over chemicals to preserve soil health and your future.
          </p>
          <div className="cta-container">
            {/* Click event now triggers navigation */}
            <button className="primary-btn" onClick={() => navigate('/recommend')}>
              LET'S GO
            </button>
          </div>
        </section>

        <section className="visual-area">
          <div className="hero-frame">
            <img 
              src="https://raw.githubusercontent.com/DEEPAK-RAMGIRI/ORGANIC_RECCOMENDATOR/main/images/main.jpg" 
              alt="Organic Agriculture" 
              className="hero-image"
            />
          </div>
        </section>
      </div>
    </div>
  );
}