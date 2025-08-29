// src/https/index.js
export const getOrders = async () => {
    return {
      data: {
        data: [
          {
            _id: "1",
            orderNumber: 412,
            status: "progress",
            items: [
              { name: "Fish and chips", quantity: 1, price: 450},
              { name: "Lemonade", quantity: 1, price: 100 },
              { name: "Cappuccino", quantity: 3, price: 500},
              { name: "Apple pie", quantity: 3, price: 300},
            ],
          },
          {
            _id: "2",
            orderNumber: 413,
            status: "completed",
            items: [
              { name: "Burger", quantity: 2, price: 350},
              { name: "Coke", quantity: 2, price:  150},
            ],
          },
        ],
      },
    };
  };
  