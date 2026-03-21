import { useLocation, useNavigate } from "react-router-dom";
import "./ParkingResultsPage.css";

function ParkingResultsPage() {
  const currentLocation = useLocation();
  const navigate = useNavigate();
  const searchLocation = currentLocation.state?.location || "";

  const parkingSpots = [
    {
      id: 1,
      name: "Airport Parking",
      location: "Toronto",
      price: "$20/day",
      type: "EV",
      distance: "5 minute drive",
      address: "6301 Silver Dart Dr, Mississauga, ON",
    },
    {
      id: 2,
      name: "Downtown Lot",
      location: "Toronto",
      price: "$15/day",
      type: "Standard",
      distance: "5 minute drive",
      address: "123 King St W, Toronto, ON",
    },
    {
      id: 3,
      name: "Mississauga Garage",
      location: "Mississauga",
      price: "$10/day",
      type: "Accessible",
      distance: "5 minute drive",
      address: "456 Square One Dr, Mississauga, ON",
    },
  ];

  const filteredSpots = parkingSpots.filter((spot) =>
    spot.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  return (
    <div className="results-page">
      <div className="results-card">
        <h1 className="results-title">Available Parking</h1>

        <p className="results-subtitle">
          Results for: <strong>{searchLocation}</strong>
        </p>

        <div className="parking-list">
          {filteredSpots.length > 0 ? (
            filteredSpots.map((spot) => (
              <div key={spot.id} className="parking-item">
                <h3>{spot.name}</h3>
                <p>
                  <strong>Location:</strong> {spot.location}
                </p>
                <p>
                  <strong>Price:</strong> {spot.price}
                </p>
                <p>
                  <strong>Type:</strong> {spot.type}
                </p>
                <p>
                  <strong>Distance:</strong> {spot.distance}
                </p>

                <button
                  className="btn primary"
                  onClick={() =>
                    navigate("/navigation", {
                      state: { spot },
                    })
                  }
                >
                  Select
                </button>
              </div>
            ))
          ) : (
            <p className="no-results">No parking spots found</p>
          )}
        </div>

        <button className="btn ghost" onClick={() => navigate("/search")}>
          Back
        </button>
      </div>
    </div>
  );
}

export default ParkingResultsPage;