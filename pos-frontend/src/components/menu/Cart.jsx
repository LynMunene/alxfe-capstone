import React, { useEffect, useRef } from "react";
import { IoIosRemove } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import useCartStore from "../../store/useCartStore";

const Cart = () => {
  const cartData = useCartStore((state) => state.cart);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const increaseItem = useCartStore((state) => state.increaseItem);

  
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [cartData]);

  const handleIncrease = (itemId) => {
    increaseItem(itemId); 
    // Price update is handled automatically by the store
  };

  const handleDecrease = (itemId) => {
    decreaseItem(itemId); 
    // Price update is handled automatically by the store
  };

  return (
    <div className="px-4 py-2">
      <h1 className="text-lg text-[#e4e4e4] font-semibold tracking-wide">
        Order Details
      </h1>
      <div className="mt-4 overflow-y-scroll scrollbar-hide h-[380px]" ref={scrollRef}>
        {cartData.length === 0 ? (
          <p className="text-[#FFFFFF] text-sm flex justify-center items-center h-[380px]">
            Your cart is empty. Start adding items!
          </p>
        ) : (
          cartData.map((item) => (
            <div key={item.id} className="bg-[#222528] bg-opacity-40 rounded-lg px-4 py-4 mb-2">
              <div className="flex items-center justify-between">
                <h1 className="text-[#FFFFFF] font-semibold tracking-wide text-md">
                  {item.name}
                </h1>
                <p className="text-[#FFFFFF] font-semibold">x{item.quantity}</p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className="text-red-500 cursor-pointer p-1 rounded-full hover:bg-red-500/20 transition-colors"
                    
                  >
                    <IoIosRemove size={20} />
                  </button>
                  <span className="text-white font-medium mx-1">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item.id)}
                    className="text-green-500 cursor-pointer p-1 rounded-full hover:bg-green-500/20 transition-colors"
                  >
                    <IoAdd size={20} />
                  </button>
                </div>
                <p className="text-[#F3FF18] text-md font-bold">
                  ksh {item.price}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;