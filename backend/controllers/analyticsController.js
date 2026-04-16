const BookingHistory = require("../models/BookingHistory");

exports.getAnalytics = async (req, res) => {
  try {
    const bookings = await BookingHistory.find();

    const parkingCount = {};
    const hourCount = {};

    bookings.forEach((booking) => {
      const spot = booking.spotCode || "Unknown";
      parkingCount[spot] = (parkingCount[spot] || 0) + 1;

      const hour = new Date(booking.createdAt).getHours();
      hourCount[hour] = (hourCount[hour] || 0) + 1;
    });

    const mostUsedParking = Object.entries(parkingCount).map(([spot, count]) => ({
      spot,
      count,
    }));

    const peakHours = Object.entries(hourCount).map(([hour, count]) => ({
      hour,
      count,
    }));

    res.json({ mostUsedParking, peakHours });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({ message: "Failed to load analytics" });
  }
};