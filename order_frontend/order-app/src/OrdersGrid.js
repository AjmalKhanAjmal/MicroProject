import React, { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "./socket";

function OrdersGrid() {
  const [orders, setOrders] = useState([{id : 1, status : "active"}]);

  // fetch existing orders
  const getOrders = async () => {
    // const res = await axios.get("http://localhost:5000/api/orders");

    console.log("get  ordersss ");
    
    setOrders([{ id: 2, status: "active" }]);
  }; 

  useEffect(() => {
    // 1️⃣ Load existing orders
    getOrders();

    // 2️⃣ Listen to socket event
    socket.on("orderCreated", (newOrder) => {
      console.log("Socket event received:", newOrder);

      // update grid automatically
      setOrders((prev) => [...prev, newOrder]);
    });

    // 3️⃣ Cleanup (VERY IMPORTANT)
    return () => {
      socket.off("orderCreated");
    };
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>All Orders</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Items</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              {/* <td>{o.items}</td> */}
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersGrid;
