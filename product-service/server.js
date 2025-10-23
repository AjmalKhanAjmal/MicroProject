const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const Redis = require("ioredis");

const { readProductFile } = require('./src/services/product_file_service')
dotenv.config();

const app = express();
const redisClient = new Redis(process.env.REDIS_URL);
const db = require("./src/config/db");
const routes = require("./src/routes/product_routes");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// ✅ Create HTTP + Socket server
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true },
});

// ✅ Socket.IO setup
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("joinRestaurant", (restaurantId) => {
    console.log(`Socket ${socket.id} joining room ${restaurantId}`);
    socket.join(restaurantId);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// ✅ API route for creating orders
app.post("/api/orders", (req, res) => {
  const { restaurantId, orderData } = req.body;
  console.log("Creating order for restaurant:", restaurantId, orderData);

  io.to(restaurantId).emit("newOrder", orderData); // emit event only to that restaurant room

  return res.json({ success: true });
});

// ✅ Redis middleware for products API
app.use("/api/products", (req, res, next) => {
  req.redisClient = redisClient;
  next();
}, routes);

// ✅ Start the server
db.sync({ alter: true })
  .then(() => {
    console.log("Tables synchronized");
    const PORT = process.env.SERVER_PORT || 5000;
    server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((error) => console.error("Database sync error:", error.message));
