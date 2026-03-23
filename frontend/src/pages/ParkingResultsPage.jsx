import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ParkingResultsPage() {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const locationHook = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(locationHook.search);

    const location = params.get("location") || "";
    const maxPrice = params.get("maxPrice") || "";

    const fetchParkingSpots = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/parking/search?location=${encodeURIComponent(location)}&maxPrice=${encodeURIComponent(maxPrice)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch parking spots");
        }

        const data = await response.json();
        setParkingSpots(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParkingSpots();
  }, [locationHook.search]);

  if (loading) return <p>Loading parking spots...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Parking Results</h2>

      {parkingSpots.length === 0 ? (
        <p>No parking spots found.</p>
      ) : (
        parkingSpots.map((spot) => (
          <div key={spot._id}>
            <h3>{spot.locationName}</h3>
            <p>Address: {spot.address}</p>
            <p>Price per hour: ${spot.pricePerHour}</p>
            <p>Available: {spot.available ? "Yes" : "No"}</p>
            <p>{spot.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ParkingResultsPage;