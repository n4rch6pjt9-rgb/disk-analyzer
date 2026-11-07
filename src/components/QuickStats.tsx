import { diskInfo, getUsageLevel, suggestions, tempFiles } from '../data/diskData';
import { formatSize } from '../utils/formatSize';

const alertStyles = {
  normal: {
    value: 'Normal',
    icon: 'fa-circle-check',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
  },
  warning: {
    value: 'Atenção',
    icon: 'fa-triangle-exclamation',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
  },
  critical: {
    value: 'Crítico',
    icon: 'fa-triangle-exclamation',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
  },
};

export default function QuickStats() {
  const totalTemp = tempFiles.reduce((acc, f) => acc + f.size, 0);
  const totalRecoverable = suggestions.reduce((acc, s) => acc + s.potentialSavings, 0);
  const lowRiskSavings = suggestions
    .filter(s => s.risk === 'low')
    .reduce((acc, s) => acc + s.potentialSavings, 0);

  const stats = [
    {
      label: 'Espaço Recuperável',
      value: `${totalRecoverable.toFixed(1)} GB`,
      icon: 'fa-database',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
    },
    {
      label: 'Limpeza Segura',
      value: `${lowRiskSavings.toFixed(1)} GB`,
      icon: 'fa-shield-halved',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      label: 'Arquivos Temporários',
      value: formatSize(totalTemp),
      icon: 'fa-clock',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
    },
    {
      label: 'Alertas',
      ...alertStyles[getUsageLevel(diskInfo.usedPercentage)],
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`${stat.bgColor} border ${stat.borderColor} rounded-xl p-4 transition-transform hover:scale-[1.02]`}
        >
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
