import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

// ✅ Connect to backend WebSocket server
const socket = io("http://localhost:3003", {
  transports: ["websocket"], // force WebSocket (avoid polling issues)
});

export default function App() {
  const restaurantId = "restaurant123";
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // 1️⃣ Log when socket connects
    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      socket.emit("joinRestaurant", restaurantId);
      console.log(`📡 Joined room: ${restaurantId}`);
    });

    // 2️⃣ Listen for new orders
    const handleNewOrder = (orderData) => {
      console.log("🔥 New order received:", orderData);
      setOrders((prev) => [orderData, ...prev]);
    };
    socket.on("newOrder", handleNewOrder);

    // 3️⃣ Handle disconnects
    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    // Cleanup when component unmounts
    return () => {
      socket.off("newOrder", handleNewOrder);
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [restaurantId]);

  const createOrder = async () => {
    const order = { id: Date.now(), item: "Pizza", qty: 2 };
    console.log("🟡 Sending order:", order);

    await fetch("http://localhost:3003/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ restaurantId, orderData: order }),
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Orders for {restaurantId}</h1>
      <button onClick={createOrder}>Create new order</button>
      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            {o.item} — qty: {o.qty}
          </li>
        ))}
      </ul>
    </div>
  );
}
