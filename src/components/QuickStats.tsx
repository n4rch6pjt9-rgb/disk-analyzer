import { diskInfo, suggestions } from '../data/diskData';

export default function QuickStats() {
  const totalRecoverable = suggestions.reduce((acc, s) => acc + s.potentialSavings, 0);
  const lowRiskSavings = suggestions.filter(s => s.risk === 'low').reduce((acc, s) => acc + s.potentialSavings, 0);

  const stats = [
    { label: 'Espaço Recuperável', value: `${totalRecoverable.toFixed(1)} GB`, icon: 'fa-database', color: 'text-green-400', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/20' },
    { label: 'Limpeza Segura', value: `${lowRiskSavings.toFixed(1)} GB`, icon: 'fa-shield-halved', color: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20' },
    { label: 'Arquivos Temporários', value: '34.6 GB', icon: 'fa-clock', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/20' },
    { label: 'Alertas', value: `${diskInfo.usedPercentage > 80 ? 'Crítico' : 'Normal'}`, icon: diskInfo.usedPercentage > 80 ? 'fa-triangle-exclamation' : 'fa-circle-check', color: diskInfo.usedPercentage > 80 ? 'text-red-400' : 'text-green-400', bgColor: diskInfo.usedPercentage > 80 ? 'bg-red-500/10' : 'bg-green-500/10', borderColor: diskInfo.usedPercentage > 80 ? 'border-red-500/20' : 'border-green-500/20' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div key={stat.label} className={`${stat.bgColor} border ${stat.borderColor} rounded-xl p-4 transition-transform hover:scale-[1.02]`}>
          <div className="flex items-center gap-2 mb-2">
            <i className={`fa-solid ${stat.icon} ${stat.color} text-sm`}></i>
            <span className="text-xs text-gray-400">{stat.label}</span>
          </div>
          <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
        </div>
      ))}
    </div>
  );
}
