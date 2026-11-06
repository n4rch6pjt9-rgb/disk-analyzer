import { largeFiles } from '../data/diskData';

export default function LargeFilesTable() {
  const formatSize = (mb: number) => mb >= 1000 ? `${(mb / 1000).toFixed(1)} GB` : `${mb} MB`;
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Sistema': return { icon: 'fa-gear', color: 'text-blue-400' };
      case 'Jogo': return { icon: 'fa-gamepad', color: 'text-red-400' };
      case 'Programa': return { icon: 'fa-cube', color: 'text-purple-400' };
      case 'Desenvolvimento': return { icon: 'fa-code', color: 'text-amber-400' };
      case 'Mídia': return { icon: 'fa-film', color: 'text-pink-400' };
      default: return { icon: 'fa-file', color: 'text-gray-400' };
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <i className="fa-solid fa-weight-hanging text-red-400"></i>
          Maiores Arquivos
        </h2>
        <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded-lg">Top {largeFiles.length} arquivos</span>
      </div>
      <div className="space-y-2">
        {largeFiles.map((file, index) => {
          const typeInfo = getTypeIcon(file.type);
          return (
            <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-gray-700/20 hover:bg-gray-700/40 transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-gray-700/50 flex items-center justify-center flex-shrink-0">
                <i className={`fa-solid ${typeInfo.icon} ${typeInfo.color} text-sm`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white font-medium truncate">{file.name}</span>
                  <span className="text-xs text-gray-500 px-1.5 py-0.5 bg-gray-700/50 rounded">{file.type}</span>
                </div>
                <span className="text-xs text-gray-500 font-mono truncate block">{file.path}</span>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-sm font-bold text-white">{formatSize(file.size)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
