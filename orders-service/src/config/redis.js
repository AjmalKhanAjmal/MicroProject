
// const redis = require('ioredis');
// require("dotenv").config();

// const client = redis.createClient({
//     url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
// });

// client.connect().then(() => {
//     console.log("Redis Connected..."  , client );
// }).catch((err) => {
//     console.log("Redis error: ", err);
// });

// client.on('error', (err) => {
//     console.log("error ", err);
// });

// module.exports = { client};

const Redis = require("ioredis");

const client = new Redis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null
});

client.on("connect", () => {
  console.log("✅ Redis connected");
});

client.on("error", err => {
  console.error("❌ Redis error:", err);
});

module.exports = {client};


// src/config/redis.js

// const Redis = require("ioredis");

// const client = new Redis({
//   host: process.env.REDIS_HOST || "127.0.0.1",
//   port: process.env.REDIS_PORT || 6379,
//   maxRetriesPerRequest: null,
//   enableOfflineQueue: true,
// });

// client.on("connect", () => console.log("✅ Redis connected"));
// client.on("error", err => console.error("❌ Redis error:", err));

// module.exports = {client};
