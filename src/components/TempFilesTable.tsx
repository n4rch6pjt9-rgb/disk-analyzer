import { tempFiles } from '../data/diskData';

export default function TempFilesTable() {
  const totalSize = tempFiles.reduce((acc, f) => acc + f.size, 0);
  const formatSize = (mb: number) => mb >= 1000 ? `${(mb / 1000).toFixed(1)} GB` : `${mb} MB`;
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Sistema': return 'text-blue-400 bg-blue-400/10';
      case 'Usuário': return 'text-green-400 bg-green-400/10';
      case 'Windows Update': return 'text-cyan-400 bg-cyan-400/10';
      case 'Navegador': return 'text-purple-400 bg-purple-400/10';
      case 'Desenvolvimento': return 'text-amber-400 bg-amber-400/10';
      case 'Aplicativo': return 'text-pink-400 bg-pink-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <i className="fa-solid fa-clock text-yellow-400"></i>
          Arquivos Temporários
        </h2>
        <span className="text-sm text-gray-400">Total: <span className="text-yellow-400 font-medium">{formatSize(totalSize)}</span></span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-700/50">
              <th className="pb-2 font-medium">Localização</th>
              <th className="pb-2 font-medium">Tipo</th>
              <th className="pb-2 font-medium text-right">Tamanho</th>
              <th className="pb-2 font-medium text-right">Último Acesso</th>
            </tr>
          </thead>
          <tbody>
            {tempFiles.map((file, index) => (
              <tr key={index} className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors">
                <td className="py-2.5 pr-4"><span className="text-gray-300 font-mono text-xs break-all">{file.path}</span></td>
                <td className="py-2.5 pr-4"><span className={`px-2 py-0.5 rounded-full text-xs ${getTypeColor(file.type)}`}>{file.type}</span></td>
                <td className="py-2.5 text-right"><span className="text-white font-medium">{formatSize(file.size)}</span></td>
                <td className="py-2.5 text-right"><span className="text-gray-400 text-xs">{file.lastAccessed}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
