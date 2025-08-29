import React, { useState } from "react";
import { menus } from "../../constants";
import { GrRadialSelected } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import useCartStore from "../../store/useCartStore";

const MenuCard = () => {
  const [selected, setSelected] = useState(menus[0]);
  const [itemCounts, setItemCounts] = useState({}); 
  const [activeItem, setActiveItem] = useState(null);

  const addItem = useCartStore((state) => state.addItem);

  const increment = (id) => {
    setActiveItem(id);
    setItemCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const decrement = (id) => {
    setActiveItem(id);
    if (!itemCounts[id] || itemCounts[id] <= 0) return;
    
    setItemCounts(prev => ({
      ...prev,
      [id]: prev[id] - 1
    }));
  };
  const handleAddToCart = (item) => {
    const count = itemCounts[item.id] || 0;
    if (count === 0) return;
  
    const { id, name, price } = item;
    const newObj = {
      id, 
      name,
      pricePerQuantity: price,
      quantity: count,
      price: price * count,
    };
  
    addItem(newObj);
  
    setItemCounts((prev) => ({
      ...prev,
      [item.id]: 0,
    }));
  };
  

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Categories */}
      <h2 className="text-2xl font-bold text-white mb-4">Menu Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className={`flex flex-col items-start justify-between rounded-lg p-3 h-36 cursor-pointer transition-all duration-200 `}
            style={{ backgroundColor: menu.bgColor }}
            onClick={() => {
              setSelected(menu);
              setActiveItem(null);
            }}
          >
            <div className="relative w-full">
              {/* Selected icon at top-right */}
              {selected.id === menu.id && (
                <div className="absolute top-0 right-0  rounded-full p-1">
                  <GrRadialSelected className="text-white" size={16} />
                </div>
              )}

              <div className="flex flex-col items-start">
                {/* Icon */}
                <div className="text-white text-xl mb-1">{menu.icon}</div>

                {/* Name */}
                <h3 className="text-white text-lg font-semibold truncate w-full">
                  {menu.name}
                </h3>

                {/* Items count */}
                <p className="text-gray-200 text-sm font-medium">
                  {menu.items.length} Item{menu.items.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="border-gray-100 border-t-1 my-6" />

      {/* Selected menu items */}
      <h2 className="text-2xl font-bold text-white mb-4">{selected.name} Items</h2>
      {selected.items.length === 0 ? (
        <div className="text-center py-10 text-#fffff">
          No items available in this category
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {selected.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-4 rounded-xl h-40 bg-[#11315] hover:bg-gray-750 transition-colors duration-200 border border-gray-700"
            >
              <div className="flex items-start justify-between w-full mb-4">
                <h3 className="text-white text-lg font-semibold pr-2 truncate">
                  {item.name}
                </h3>
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={!itemCounts[item.id] || itemCounts[item.id] === 0}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    itemCounts[item.id] > 0 
                      ? 'bg-green-700 text-green-200 hover:bg-green-600' 
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <FaShoppingCart size={18} />
                </button>
              </div>
              <div className="flex items-center justify-between w-full">
                <p className="text-white text-l font-bold">ksh {item.price}</p>
                <div className="flex items-center justify-between bg-gray-900 px-3 py-2 rounded-lg gap-4 w-28">
                  <button
                    onClick={() => decrement(item.id)}
                    className={`text-lg font-bold `}
                  >
                    &minus;
                  </button>
                  <span className="text-white font-medium text-center min-w-[20px]">
                    {itemCounts[item.id] || 0}
                  </span>
                  <button
                    onClick={() => increment(item.id)}
                    className={`text-lg font-bold 
                        text-yellow-500 hover:text-yellow-400

                  `}
                  >
                    &#43;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuCard;