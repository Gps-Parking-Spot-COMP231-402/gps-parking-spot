import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ParkingCard from "../components/ParkingCard";
import MapView from "../components/MapView";
import { getApiBase, parseResponseSafely } from "../utils/api";
import "./ParkingResultsPage.css";

const API_BASE = getApiBase();

function ParkingResultsPage() {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [reserveMessage, setReserveMessage] = useState("");
  const [isReserving, setIsReserving] = useState(false);

  const locationHook = useLocation();
  const navigate = useNavigate();

  const fetchParkingSpots = useCallback(async ({ silent = false } = {}) => {
    const params = new URLSearchParams(locationHook.search);

    const location = params.get("location") || "";
    const maxPrice = params.get("maxPrice") || "";
    const freeOnly = params.get("freeOnly") || "0";

    if (!silent) {
      setLoading(true);
    } else {
      setIsRefreshing(true);
    }

    setError("");

    try {
      const response = await fetch(
        `${API_BASE}/api/parking/search?location=${encodeURIComponent(location)}&maxPrice=${encodeURIComponent(maxPrice)}&freeOnly=${encodeURIComponent(freeOnly)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch parking spots");
      }

      const data = await parseResponseSafely(response);
      setParkingSpots(data);
      setLastUpdated(new Date());
      setSelectedSpot((prev) => {
        if (data.length === 0) {
          return null;
        }

        if (!prev) {
          return data[0];
        }

        const keep = data.find((spot) => spot._id === prev._id);
        return keep || data[0];
      });
    } catch (err) {
      setError(err.message || "Failed to fetch parking spots");
    } finally {
      if (!silent) {
        setLoading(false);
      }
      setIsRefreshing(false);
    }
  }, [locationHook.search]);

  useEffect(() => {
    fetchParkingSpots();
  }, [fetchParkingSpots]);

  const handleReserve = async () => {
    if (!selectedSpot?._id) {
      setReserveMessage("Please select a parking spot first.");
      return;
    }

    let user = null;

    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch {
      user = null;
    }

    if (!user?._id) {
      setReserveMessage("Please log in first.");
      return;
    }

    setIsReserving(true);
    setReserveMessage("");

    try {
      const response = await fetch(
        `${API_BASE}/api/parking/${selectedSpot._id}/reserve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
            durationHours: 1,
            promoCode: promoCode,
          }),
        }
      );

      const data = await parseResponseSafely(response);

      if (!response.ok) {
        throw new Error(data?.message || "Reservation failed");
      }

      setReserveMessage(data?.message || "Reservation successful");
    } catch (err) {
      setReserveMessage(err.message || "Reservation failed");
    } finally {
      setIsReserving(false);
    }
  };

  const params = useMemo(() => {
    return new URLSearchParams(locationHook.search);
  }, [locationHook.search]);
  
  const searchLocation = params.get("location") || "";
  const searchMaxPrice = params.get("maxPrice") || "";
  const freeOnlyEnabled = ["1", "true"].includes(
    (params.get("freeOnly") || "0").toLowerCase()
  );

  if (loading) return <div className="loading-container"><p>Loading parking spots...</p></div>;
  if (error) return <div className="error-container"><p>Error: {error}</p></div>;

  return (
    <div className="parking-results-page">
      <div className="results-header">
        <div>
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <h2>Search Results</h2>
          <p className="search-criteria">
            Location: <strong>{searchLocation}</strong>
            {searchMaxPrice && ` • Max Price: $${searchMaxPrice}/hr`}
            {freeOnlyEnabled ? " • Free parking only" : ""}
          </p>
          <p className="results-live-status">
            {isRefreshing ? "Syncing..." : "Manual updates only"}
            {lastUpdated ? ` • Last updated ${lastUpdated.toLocaleTimeString()}` : ""}
          </p>
          <button
            type="button"
            className="manual-refresh-btn"
            onClick={() => fetchParkingSpots({ silent: true })}
            disabled={isRefreshing}
          >
            {isRefreshing ? "Refreshing..." : "Refresh Results"}
          </button>
        </div>
      </div>

      {parkingSpots.length === 0 ? (
        <p className="no-results">No parking spots found matching your criteria.</p>
      ) : (
        <div className="results-container">
          <section className="spots-list">
            <h3>Available Parking Lots ({parkingSpots.length})</h3>
            {parkingSpots.map((spot) => (
              <ParkingCard
                key={spot._id}
                spot={spot}
                isSelected={selectedSpot?._id === spot._id}
                onSelect={setSelectedSpot}
              />
            ))}
          </section>

          <aside className="results-map">
            <MapView
              spot={selectedSpot}
              spots={parkingSpots}
              onSelectSpot={setSelectedSpot}
            />

            {selectedSpot && (
              <div className="reservation-panel">
                <h3>Reserve This Spot</h3>
                <p>
                  <strong>{selectedSpot.name || selectedSpot.location}</strong>
                </p>

                <label htmlFor="promoCode">Enter Free Code</label>
                <input
                  id="promoCode"
                  type="text"
                  placeholder="FREE2026"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  className="promo-input"
                />

                <button
                  type="button"
                  className="reserve-button"
                  onClick={handleReserve}
                  disabled={isReserving}
                >
                  {isReserving ? "Reserving..." : "Reserve Spot"}
                </button>

                {reserveMessage && (
                  <p className="reserve-message">{reserveMessage}</p>
                )}
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default ParkingResultsPage;