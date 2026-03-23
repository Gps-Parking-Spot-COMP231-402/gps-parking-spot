const ParkingSpot = require("../models/ParkingSpot");

// GET all parking spots
const getAllParkingSpots = async (req, res) => {
  try {
    const spots = await ParkingSpot.find();
    res.status(200).json(spots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create a parking spot
const createParkingSpot = async (req, res) => {
  try {
    const spot = await ParkingSpot.create(req.body);
    res.status(201).json(spot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET search parking spots
const searchParkingSpots = async (req, res) => {
  try {
    const { location, maxPrice } = req.query;

    let query = {};

    // filter by location (case-insensitive)
    if (location) {
      query.locationName = { $regex: location, $options: "i" };
    }

    // filter by max price
    if (maxPrice) {
      query.pricePerHour = { $lte: Number(maxPrice) };
    }

    const spots = await ParkingSpot.find(query);

    res.status(200).json(spots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EXPORT ALL FUNCTIONS
module.exports = {
  getAllParkingSpots,
  createParkingSpot,
  searchParkingSpots,
};