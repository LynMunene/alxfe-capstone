import { create } from "zustand";

const useCartStore = create((set) => ({
  // Hardcoded categories
  categories: [
    { id: 1, name: "Burgers", color: "#f88408" },
    { id: 2, name: "Drinks", color: "#9fd6eb" },
    { id: 3, name: "Desserts", color: "#ff416d" },
    { id: 4, name: "Salads", color: "#82d155" },
  ],

  // Hardcoded orders (menu items)
  orders: [
    { id: 101, categoryId: 1, name: "Cheeseburger", price: 5.99 },
    { id: 102, categoryId: 1, name: "Double Burger", price: 8.49 },
    { id: 201, categoryId: 2, name: "Coca-Cola", price: 1.99 },
    { id: 202, categoryId: 2, name: "Orange Juice", price: 2.49 },
    { id: 301, categoryId: 3, name: "Chocolate Cake", price: 3.99 },
    { id: 302, categoryId: 3, name: "Ice Cream", price: 2.99 },
    { id: 401, categoryId: 4, name: "Caesar Salad", price: 4.49 },
    { id: 402, categoryId: 4, name: "Greek Salad", price: 4.99 },
  ],

  cart: [],

  // Add an item to the cart
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),

  // Remove an item from the cart
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  // Increase quantity
  increaseQuantity: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),

  // Decrease quantity
  decreaseQuantity: (id) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),

  // Clear cart
  clearCart: () => set({ cart: [] }),

  // Calculate total price
  getTotalPrice: () =>
    set((state) => ({
      total: state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    })),
}));

export default useCartStore;
