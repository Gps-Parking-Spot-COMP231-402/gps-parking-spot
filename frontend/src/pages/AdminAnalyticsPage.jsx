import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { getApiBase, parseResponseSafely } from "../utils/api";
import "./AdminAnalyticsPage.css";

const API_BASE = getApiBase();

function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState({
    mostUsedParking: [],
    peakHours: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadAnalytics = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${API_BASE}/api/admin/analytics`);
        const data = await parseResponseSafely(response);

        if (!response.ok) {
          throw new Error(data.message || "Failed to load analytics.");
        }

        if (isMounted) {
          setAnalytics({
            mostUsedParking: Array.isArray(data.mostUsedParking)
              ? data.mostUsedParking
              : [],
            peakHours: Array.isArray(data.peakHours) ? data.peakHours : [],
          });
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Unable to load analytics.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadAnalytics();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalTrackedBookings = useMemo(() => {
    return analytics.mostUsedParking.reduce((sum, item) => sum + item.count, 0);
  }, [analytics.mostUsedParking]);

  const topParkingSpot =
    analytics.mostUsedParking.length > 0
      ? analytics.mostUsedParking.reduce((max, item) =>
          item.count > max.count ? item : max
        )
      : null;

  const busiestHour =
    analytics.peakHours.length > 0
      ? analytics.peakHours.reduce((max, item) =>
          item.count > max.count ? item : max
        )
      : null;

  return (
    <>
      <Navbar userName="Admin" />

      <div className="admin-analytics-page">
        <div className="admin-analytics-container">
          <div className="analytics-hero-card">
            <div className="analytics-hero-content">
              <p className="analytics-hero-label">Admin Panel</p>
              <h1 className="analytics-hero-title">Analytics Dashboard</h1>
              <p className="analytics-hero-subtitle">
                Monitor parking activity and review system insights.
              </p>
            </div>
          </div>

          <div className="analytics-stats-grid">
            <div className="analytics-stat-card">
              <div className="analytics-stat-label">Tracked Bookings</div>
              <div className="analytics-stat-value">
                {loading ? "..." : totalTrackedBookings}
              </div>
            </div>

            <div className="analytics-stat-card">
              <div className="analytics-stat-label">Unique Parking Spots</div>
              <div className="analytics-stat-value">
                {loading ? "..." : analytics.mostUsedParking.length}
              </div>
            </div>

            <div className="analytics-stat-card">
              <div className="analytics-stat-label">Peak Hour Slots</div>
              <div className="analytics-stat-value">
                {loading ? "..." : analytics.peakHours.length}
              </div>
            </div>

            <div className="analytics-stat-card">
              <div className="analytics-stat-label">Top Spot</div>
              <div className="analytics-stat-value">
                {loading ? "..." : topParkingSpot ? topParkingSpot.spot : "N/A"}
              </div>
            </div>
          </div>

          <div className="analytics-content-grid">
            <div className="analytics-card">
              <h2 className="analytics-card-title">Most Used Parking Spots</h2>

              {loading ? (
                <p className="analytics-empty">Loading analytics...</p>
              ) : error ? (
                <p className="analytics-empty">{error}</p>
              ) : analytics.mostUsedParking.length === 0 ? (
                <p className="analytics-empty">
                  No parking usage data available.
                </p>
              ) : (
                <div className="analytics-list">
                  {analytics.mostUsedParking.map((item, index) => (
                    <div className="analytics-list-item" key={index}>
                      <span className="analytics-list-name">
                        Spot {item.spot}
                      </span>
                      <span className="analytics-list-value">
                        {item.count} booking(s)
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="analytics-card">
              <h2 className="analytics-card-title">System Overview</h2>

              <div className="analytics-list">
                <div className="analytics-list-item">
                  <span className="analytics-list-name">Busiest hour</span>
                  <span className="analytics-list-value">
                    {loading
                      ? "..."
                      : busiestHour
                      ? `${busiestHour.hour}:00`
                      : "N/A"}
                  </span>
                </div>

                <div className="analytics-list-item">
                  <span className="analytics-list-name">Top parking spot</span>
                  <span className="analytics-list-value">
                    {loading
                      ? "..."
                      : topParkingSpot
                      ? topParkingSpot.spot
                      : "N/A"}
                  </span>
                </div>

                <div className="analytics-list-item">
                  <span className="analytics-list-name">
                    Total tracked bookings
                  </span>
                  <span className="analytics-list-value">
                    {loading ? "..." : totalTrackedBookings}
                  </span>
                </div>

                <div className="analytics-list-item">
                  <span className="analytics-list-name">
                    Available analytics modules
                  </span>
                  <span className="analytics-list-value">2</span>
                </div>
              </div>
            </div>
          </div>

          <div className="analytics-table-card">
            <h2 className="analytics-card-title">Peak Hours</h2>

            {loading ? (
              <p className="analytics-empty">Loading analytics...</p>
            ) : error ? (
              <p className="analytics-empty">{error}</p>
            ) : analytics.peakHours.length === 0 ? (
              <p className="analytics-empty">No peak hour data available.</p>
            ) : (
              <table className="analytics-table">
                <thead>
                  <tr>
                    <th>Hour</th>
                    <th>Bookings</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.peakHours.map((item, index) => (
                    <tr key={index}>
                      <td>{item.hour}:00</td>
                      <td>{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminAnalyticsPage;