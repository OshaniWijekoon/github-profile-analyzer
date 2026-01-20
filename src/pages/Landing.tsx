import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/home"); // navigate to Home page
  };

  return (
    <div className="page-wrapper">
      <div className="card">
        <h1 className="card-title">GitHub Profile Analyzer</h1>
        <p className="card-subtitle">Analyze GitHub profiles</p>
        <button className="card-button" onClick={handleEnter}>
          Enter
        </button>
      </div>
    </div>
  );
};

export default Landing;
