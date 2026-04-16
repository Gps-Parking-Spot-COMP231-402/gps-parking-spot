const mongoose = require("mongoose");
<<<<<<< HEAD
const dns = require("dns");

const connectDB = async () => {
  try {
    const dnsServers = (process.env.DNS_SERVERS || "8.8.8.8,1.1.1.1")
      .split(",")
      .map((server) => server.trim())
      .filter(Boolean);

    if (dnsServers.length > 0) {
      dns.setServers(dnsServers);
    }

=======

const connectDB = async () => {
  try {
>>>>>>> 5cb4643a5592311ee50eb522db2a5c4ff9038eb6
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;