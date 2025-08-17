export default function ItemCard({ item, onAdd }) {
    return (
      <div
        onClick={onAdd}
        className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer flex flex-col justify-between"
      >
        <h4 className="font-semibold">{item.name}</h4>
        <p className="text-yellow-400">ksh {item.price}</p>
      </div>
    );
  }
  