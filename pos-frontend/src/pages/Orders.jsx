import React, { useState, useEffect } from "react";
import OrderCard from "../components/OrderCard";
import { getOrders } from "../https/index";

const Orders = () => {
  const [status, setStatus] = useState("all");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    document.title = " Orders";

    const fetchOrders = async () => {
      const res = await getOrders();
      setOrders(res.data.data);
    };

    fetchOrders();
  }, []);

  // filter orders
  const filteredOrders =
    status === "all"
      ? orders
      : orders.filter((order) => order.status === status);

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 sm:px-10 py-4">
        <div className="flex items-center gap-4">
          
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
            Orders
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4">
          {["all", "progress", "ready", "completed"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`text-[#ababab] text-sm sm:text-lg rounded-lg px-3 sm:px-5 py-2 font-semibold 
              ${status === s ? "bg-[#383838] text-white" : ""}`}
            >
              {s === "all"
                ? "All"
                : s === "progress"
                ? "In Progress"
                : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-16 py-4 scrollbar-hide">
        {filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No orders available</p>
        )}
      </div>

      
    </section>
  );
};

export default Orders;
