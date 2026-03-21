import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./SearchParkingPage.css";
import parkingImage from "../assets/entrypagepic.jpg";

function SearchParkingPage() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    if (!location.trim()) {
      alert("Please enter a location.");
      return;
    }

    navigate("/parking-results", {
      state: { location },
    });
  };

  return (
    <div className="search-page">
      <div className="search-card">
        <img
          src={parkingImage}
          alt="Parking Illustration"
          className="search-image"
        />

        <h1 className="search-title">Search Parking</h1>

        <p className="search-subtitle">
          Enter a city, address, or airport to find available parking spots.
        </p>

        <div className="search-form">
          <input
            type="text"
            placeholder="Enter location"
            className="search-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button className="btn primary" onClick={handleSearch}>
            Search
          </button>

          <button className="btn ghost" onClick={() => navigate("/guest")}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchParkingPage;