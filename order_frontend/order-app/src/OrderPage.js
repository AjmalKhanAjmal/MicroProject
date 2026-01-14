import React from "react";
import axios from "axios";

function OrderPage() {

  const createOrder = async () => {
    try {
      await axios.post("http://localhost:5000/api/orders", {
        items: ["Beer", "Wine"]
      });

      alert("Order created successfully");
    } catch (error) {
      console.error(error);
      alert("Error creating order");
    }
  };

  return (
    <div>
      <h2>Place Order</h2>
      <button onClick={createOrder}>
        Create Order
      </button>
    </div>
  );
}

export default OrderPage;
