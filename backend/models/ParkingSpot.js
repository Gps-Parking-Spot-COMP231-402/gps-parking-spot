const mongoose = require("mongoose");

const parkingSpotSchema = new mongoose.Schema(
  {
    locationName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    totalSpaces: {
      type: Number,
      default: 1,
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ParkingSpot", parkingSpotSchema);