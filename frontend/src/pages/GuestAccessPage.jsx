import { useNavigate } from "react-router-dom";
import "./GuestAccessPage.css";
import parkingImage from "../assets/entrypagepic.jpg";

function GuestAccessPage() {
  const navigate = useNavigate();

  return (
    <div className="guest-page">
      <div className="guest-card">
        <img
          src={parkingImage}
          alt="Parking Illustration"
          className="guest-image"
        />

        <h1 className="guest-title">Guest Access</h1>

        <p className="guest-subtitle">
          Continue without creating an account. You can search and view parking
          spots, but some features may be limited.
        </p>

        <div className="guest-buttons">
          <button
            className="btn primary"
            onClick={() => navigate("/search")}
          >
            Continue as Guest
          </button>

          <button
            className="btn secondary"
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>

          <button
            className="btn ghost"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default GuestAccessPage;