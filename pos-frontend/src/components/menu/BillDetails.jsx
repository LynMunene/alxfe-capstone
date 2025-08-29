import React, { useState, useEffect } from "react";
import useCartStore from "../../store/useCartStore";

const BillDetails = () => {
    const cart = useCartStore((state) => state.cart);
    const removeItem = useCartStore((state) => state.removeItem);
    const decreaseItem = useCartStore((state) => state.decreaseItem);
    const placeOrder = useCartStore((state) => state.placeOrder);
    const clearCart = useCartStore((state) => state.clearCart); // Added this line

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const taxRate = 0.16;

  // Calculate totals 
  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  useEffect(() => {
    // Reset order status when cart changes
    if (cart.length === 0 && orderInfo) {
      setOrderInfo(null);
    }
  }, [cart, orderInfo]);

  const handlePlaceOrder = () => {
    // Added missing if condition for payment method check
    if (!paymentMethod) {
      alert("Please select a payment method!");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setIsPlacingOrder(true);

    try {
      const orderData = {
        id: new Date().getTime(),
        items: [...cart], // Create a copy to avoid reference issues
        bills: {
          subtotal,
          tax,
          total,
        },
        paymentMethod,
        orderStatus: "In Progress",
        createdAt: new Date(),
      };

      setOrderInfo(orderData);
      
      // Clear cart after placing order
      clearCart(); // This will now work
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing your order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // Early return if cart is empty
  if (cart.length === 0) {
    return (
      <div className="p-5 text-center">
        <p className="text-[#ababab]">Your cart is empty</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">
          Items ({cart.length})
        </p>
        <h1 className="text-[#f5f5f5] text-md font-bold">ksh {subtotal.toFixed(2)}</h1>
      </div>

      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Tax ({taxRate * 100}%)</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">ksh {tax.toFixed(2)}</h1>
      </div>

      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Total With Tax</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">ksh {total.toFixed(2)}</h1>
      </div>

      {/* Payment Method */}
      <div className="flex items-center gap-3 px-5 mt-4">
        <button
          onClick={() => setPaymentMethod("Cash")}
          className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg font-semibold ${
            paymentMethod === "Cash"
              ? "bg-[#383737] text-white"
              : "text-[#ababab]"
          }`}
        >
          Cash
        </button>
        <button
          onClick={() => setPaymentMethod("Mpesa")}
          className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg font-semibold ${
            paymentMethod === "Mpesa"
              ? "bg-[#383737] text-white"
              : "text-[#ababab]"
          }`}
        >
          Mpesa
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 px-5 mt-4">
        
        <button
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
          className="bg-[#ffffff] px-4 py-2 w-full rounded-lg text-[#1f1f1f] font-semibold text-lg disabled:opacity-50"
        >
          {isPlacingOrder ? "Processing..." : "Place Order"}
        </button>
      </div>
    </>
  );
};

export default BillDetails;