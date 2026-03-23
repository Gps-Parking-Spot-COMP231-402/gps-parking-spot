import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchParkingPage() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    // simple validation
    if (!location) {
      alert("Please enter a location");
      return;
    }

    navigate(
      `/parking-results?location=${encodeURIComponent(
        location
      )}&maxPrice=${encodeURIComponent(maxPrice)}`
    );
  };

  return (
    <div>
      <h2>Search Parking</h2>

      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchParkingPage;