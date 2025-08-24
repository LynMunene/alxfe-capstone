import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cart: [],

  // Add item to cart
  addItem: (item) =>
    set((state) => {
      const existing = state.cart.find((i) => i.id === item.id);
      
      if (existing) {
        // Item exists - increase quantity and update total price
        return {
          cart: state.cart.map((i) =>
            i.id === item.id
              ? { 
                  ...i, 
                  quantity: i.quantity + 1,
                  totalPrice: (i.quantity + 1) * i.unitPrice
                }
              : i
          ),
        };
      }
      
      // New item - add with initial quantity and calculate total price
      return { 
        cart: [...state.cart, { 
          ...item, 
          unitPrice: item.price, // Store original unit price
          quantity: item.quantity || 1,
          totalPrice: item.price * (item.quantity || 1) // Calculate total
        }] 
      };
    }),

  // Increase item quantity
  increaseItem: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id 
          ? { 
              ...item, 
              quantity: item.quantity + 1,
              totalPrice: (item.quantity + 1) * (item.unitPrice || item.price)
            } 
          : item
      ),
    })),

  // Decrease item quantity
  decreaseItem: (id) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === id 
            ? { 
                ...item, 
                quantity: item.quantity - 1,
                totalPrice: (item.quantity - 1) * (item.unitPrice || item.price)
              } 
            : item
        )
        .filter((item) => item.quantity > 0),
    })),

  // Remove item
  removeItem: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  // Clear cart
  clearCart: () => set({ cart: [] }),

  // Get cart total (sum of all item total prices)
  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  },

  // Get item count
  getItemCount: () => {
    const { cart } = get();
    return cart.reduce((count, item) => count + item.quantity, 0);
  },

  // Place order
  placeOrder: () =>
    set((state) => {
      if (state.cart.length === 0) {
        alert("Your cart is empty!");
        return state;
      }
      
      // Calculate order totals
      const subtotal = state.cart.reduce((sum, item) => sum + item.totalPrice, 0);
      const tax = subtotal * 0.16; // 16% tax
      const total = subtotal + tax;
      
      alert(`✅ Order placed successfully!\nSubtotal: $${subtotal.toFixed(2)}\nTax: $${tax.toFixed(2)}\nTotal: $${total.toFixed(2)}`);
      
      return { cart: [] };
    })
}));

export default useCartStore;