const express = require("express");
const router = express.Router();
const {
  getAllParkingSpots,
  createParkingSpot,
  searchParkingSpots,
} = require("../controllers/parkingController");

router.get("/search", searchParkingSpots);   // ✅ THIS IS IMPORTANT
router.get("/", getAllParkingSpots);
router.post("/", createParkingSpot);

module.exports = router;