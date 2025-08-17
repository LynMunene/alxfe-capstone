export default function CategoryCard({ category, onClick }) {
    return (
      <div
        onClick={() => onClick(category.id)}
        className="p-6 rounded-lg shadow-lg hover:scale-105 transition cursor-pointer"
        style={{ backgroundColor: category.color }}
      >
        <h3 className="font-bold text-lg">{category.name}</h3>
        <p className="text-sm">{category.itemsCount} Items</p>
      </div>
    );
  }
  