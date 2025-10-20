// // server.js
// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import cors from "cors";

// const app = express();
// app.use(cors({ origin: "http://localhost:5173", credentials: true })); // allow your frontend origin
// app.use(express.json());

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: "http://localhost:5173", credentials: true },
// });

// io.on("connection", (socket) => {
//   console.log("Socket connected:", socket.id);

//   // frontend should emit joinRestaurant with the restaurant id
//   socket.on("joinRestaurant", (restaurantId) => {
//     console.log(`Socket ${socket.id} joining room ${restaurantId}`);
//     socket.join(restaurantId);
//   });

//   socket.on("disconnect", () => {
//     console.log("Socket disconnected:", socket.id);
//   });
// });

// // example API to create an order and emit to a specific restaurant room
// app.post("/api/orders", (req, res) => {
//   const { restaurantId, orderData } = req.body;

//   // here you would save orderData to DB...
//   console.log("Creating order for restaurant:", restaurantId, orderData);

//   // send event only to sockets in that restaurant room
//   io.to(restaurantId).emit("newOrder", orderData);

//   return res.json({ success: true });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
