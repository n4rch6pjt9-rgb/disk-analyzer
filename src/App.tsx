import { useState, useEffect } from 'react';
import DiskGauge from './components/DiskGauge';
import CategoryChart from './components/CategoryChart';
import CleanupSuggestions from './components/CleanupSuggestions';
import TempFilesTable from './components/TempFilesTable';
import LargeFilesTable from './components/LargeFilesTable';
import QuickStats from './components/QuickStats';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'files' | 'cleanup'>('overview');
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const scanning = scanProgress < 100;

  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => Math.min(prev + Math.random() * 15, 100));
      }, 200);
      return () => clearInterval(interval);
    }
  }, [scanning]);

  const tabs = [
    { id: 'overview' as const, label: 'Visão Geral', icon: 'fa-chart-pie' },
    { id: 'files' as const, label: 'Arquivos', icon: 'fa-folder-tree' },
    { id: 'cleanup' as const, label: 'Limpeza', icon: 'fa-broom' },
  ];

  if (scanning) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
            <div
              className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{Math.min(Math.round(scanProgress), 100)}%</span>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Analisando Disco C:</h2>
          <p className="text-gray-400 text-sm mb-4">
            {scanProgress < 30 && 'Verificando sistema de arquivos...'}
            {scanProgress >= 30 && scanProgress < 60 && 'Analisando categorias de arquivos...'}
            {scanProgress >= 60 && scanProgress < 85 && 'Calculando espaço recuperável...'}
            {scanProgress >= 85 && 'Gerando recomendações...'}
          </p>
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(scanProgress, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950/20 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <header className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                  <i className="fa-solid fa-hard-drive text-white"></i>
                </div>
                Analista de Disco
              </h1>
              <p className="text-gray-400 text-sm mt-1 ml-[52px]">
                Análise completa do disco C: • Última verificação: agora
              </p>
            </div>
            <button
              onClick={() => setScanProgress(0)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl text-sm text-gray-300 hover:text-white transition-all flex items-center gap-2 self-start"
            >
              <i className="fa-solid fa-rotate"></i>
              Re-analisar
            </button>
          </div>
        </header>

        {/* Quick Stats */}
        <section className="mb-6">
          <QuickStats />
        </section>

        {/* Tab Navigation */}
        <nav className="mb-6 flex gap-1 bg-gray-800/50 p-1 rounded-xl border border-gray-700/50 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              aria-label={tab.label}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <i className={`fa-solid ${tab.icon} text-xs`}></i>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Content */}
        <main>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <DiskGauge />
              </div>
              <div className="lg:col-span-2">
                <CategoryChart />
              </div>
              <div className="lg:col-span-3">
                <CleanupSuggestions selectedItems={selectedItems} onSelectionChange={setSelectedItems} />
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TempFilesTable />
              <LargeFilesTable />
            </div>
          )}

          {activeTab === 'cleanup' && (
            <div className="grid grid-cols-1 gap-6">
              <CleanupSuggestions selectedItems={selectedItems} onSelectionChange={setSelectedItems} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TempFilesTable />
                <LargeFilesTable />
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-500">
            ⚠️ Esta é uma simulação demonstrativa. Os dados exibidos são ilustrativos e não refletem o estado real do seu disco.
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Para uma limpeza real, use as ferramentas nativas do Windows: Limpeza de Disco, Armazenamento e Configurações.
          </p>
        </footer>
      </div>
    </div>
  );
}
