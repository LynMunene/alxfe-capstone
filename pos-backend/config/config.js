require("dotenv").config();

const config = Object.freeze({
  // Server Configuration
  port: process.env.PORT || 3000,
  databaseURI: process.env.MONGODB_URI || "mongodb://localhost:27017",
  nodeEnv: process.env.NODE_ENV || "development",

  // JWT Configuration
  accessTokenSecret: process.env.JWT_SECRET

});

module.exports = config;