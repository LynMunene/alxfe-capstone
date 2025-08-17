import useCartStore from "../../store";

export default function Cart() {
  const { cart } = useCartStore();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  return (
    <div className="p-6 text-white flex flex-col h-full justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-2">Order #101</h2>
        <p className="text-orange-400 mb-4">Dine in</p>

        <div className="space-y-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between bg-gray-700 p-2 rounded"
            >
              <span>{item.name} x{item.qty}</span>
              <span>ksh {item.price * item.qty}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-1">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>ksh {subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax 16%</span>
            <span>ksh {tax.toFixed(0)}</span>
          </div>
          <div className="flex justify-between font-bold text-yellow-400">
            <span>Total</span>
            <span>ksh {total.toFixed(0)}</span>
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className="mt-4">
        <p className="mb-2">Payment method</p>
        <div className="flex gap-4 mb-4">
          <button className="bg-gray-200 text-black px-4 py-2 rounded">Cash</button>
          <button className="bg-gray-200 text-black px-4 py-2 rounded">Mpesa</button>
        </div>
        <button className="bg-white text-black w-full py-3 rounded-lg font-bold">
          Pay
        </button>
      </div>
    </div>
  );
}
