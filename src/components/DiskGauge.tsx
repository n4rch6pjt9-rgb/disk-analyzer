import { diskInfo, getUsageLevel } from '../data/diskData';

const gaugeColors = {
  normal: '#10b981',
  warning: '#f59e0b',
  critical: '#ef4444',
};

export default function DiskGauge() {
  const { usedSpace, totalSpace, freeSpace, usedPercentage, fileSystem, driveLabel, healthStatus, fragmentation } = diskInfo;
  
  // SVG circle calculations
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (usedPercentage / 100) * circumference;


  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <i className="fa-solid fa-hard-drive text-blue-400"></i>
        Disco C: ({driveLabel})
      </h2>
      
      <div className="flex flex-col items-center">
        {/* Circular Gauge */}
        <div className="relative w-48 h-48 mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#374151"
              strokeWidth="12"
            />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={gaugeColors[getUsageLevel(usedPercentage)]}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{usedPercentage.toFixed(1)}%</span>
            <span className="text-xs text-gray-400">utilizado</span>
          </div>
        </div>

        {/* Space info */}
        <div className="w-full space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Usado</span>
            <span className="text-white font-medium">{usedSpace} GB</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Livre</span>
            <span className="text-green-400 font-medium">{freeSpace} GB</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total</span>
            <span className="text-white font-medium">{totalSpace} GB</span>
          </div>
          <hr className="border-gray-700 my-2" />
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Sistema de Arquivos</span>
            <span className="text-gray-300">{fileSystem}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Saúde do Disco</span>
            <span className="text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
              {healthStatus}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Fragmentação</span>
            <span className="text-yellow-400">{fragmentation}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
