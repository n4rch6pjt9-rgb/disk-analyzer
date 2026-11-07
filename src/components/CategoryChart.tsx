import { categories } from '../data/diskData';

export default function CategoryChart() {
  const maxSize = Math.max(...categories.map(c => c.size));

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <i className="fa-solid fa-chart-bar text-purple-400"></i>
        Uso por Categoria
      </h2>

      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.name} className="group">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <i className={`fa-solid ${category.icon} text-xs`} style={{ color: category.color }}></i>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{category.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">
                  {category.recoverable}% recuperável
                </span>
                <span className="text-sm font-medium text-white">{category.size} GB</span>
              </div>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out group-hover:opacity-80"
                style={{
                  width: `${(category.size / maxSize) * 100}%`,
                  backgroundColor: category.color,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span>Total: {categories.reduce((acc, c) => acc + c.size, 0).toFixed(1)} GB</span>
        </div>
      </div>
    </div>
  );
}
