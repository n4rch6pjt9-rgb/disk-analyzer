import { useEffect, useState } from 'react';
import { suggestions, type CleanupSuggestion } from '../data/diskData';

interface CleanupSuggestionsProps {
  selectedItems: Set<string>;
  onSelectionChange: (items: Set<string>) => void;
}

export default function CleanupSuggestions({ selectedItems, onSelectionChange }: CleanupSuggestionsProps) {
  const [phase, setPhase] = useState<'idle' | 'cleaning' | 'cleaned'>('idle');
  const cleaning = phase === 'cleaning';
  const cleaned = phase === 'cleaned';

  useEffect(() => {
    if (phase === 'cleaning') {
      const timeout = setTimeout(() => {
        onSelectionChange(new Set());
        setPhase('cleaned');
      }, 2000);
      return () => clearTimeout(timeout);
    }
    if (phase === 'cleaned') {
      const timeout = setTimeout(() => setPhase('idle'), 3000);
      return () => clearTimeout(timeout);
    }
  }, [phase, onSelectionChange]);

  const toggleItem = (id: string) => {
    const newSet = new Set(selectedItems);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    onSelectionChange(newSet);
  };

  const selectAll = () => {
    if (selectedItems.size === suggestions.length) {
      onSelectionChange(new Set());
    } else {
      onSelectionChange(new Set(suggestions.map(s => s.id)));
    }
  };

  const totalSavings = suggestions
    .filter(s => selectedItems.has(s.id))
    .reduce((acc, s) => acc + s.potentialSavings, 0);

  const getRiskBadge = (risk: CleanupSuggestion['risk']) => {
    switch (risk) {
      case 'low':
        return <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">Seguro</span>;
      case 'medium':
        return <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">Moderado</span>;
      case 'high':
        return <span className="px-2 py-0.5 text-xs rounded-full bg-red-500/20 text-red-400 border border-red-500/30">Alto</span>;
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <i className="fa-solid fa-wand-magic-sparkles text-amber-400"></i>
          Recomendações de Limpeza
        </h2>
        <button
          onClick={selectAll}
          disabled={cleaning}
          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
        >
          {selectedItems.size === suggestions.length ? 'Desmarcar tudo' : 'Selecionar tudo'}
        </button>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {suggestions.map((suggestion) => (
          <label
            key={suggestion.id}
            className={`relative block p-3 rounded-xl border cursor-pointer transition-all duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-400 ${
              selectedItems.has(suggestion.id)
                ? 'bg-blue-500/10 border-blue-500/50 shadow-lg shadow-blue-500/5'
                : 'bg-gray-700/30 border-gray-700/50 hover:bg-gray-700/50'
            }`}
          >
            <input
              type="checkbox"
              className="sr-only"
              checked={selectedItems.has(suggestion.id)}
              disabled={cleaning}
              onChange={() => toggleItem(suggestion.id)}
            />
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                selectedItems.has(suggestion.id)
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-gray-500'
              }`}>
                {selectedItems.has(suggestion.id) && (
                  <i className="fa-solid fa-check text-white text-xs"></i>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <i className={`fa-solid ${suggestion.icon} text-sm`} style={{ color: selectedItems.has(suggestion.id) ? '#60a5fa' : '#9ca3af' }}></i>
                  <span className="text-sm font-medium text-white">{suggestion.title}</span>
                  {getRiskBadge(suggestion.risk)}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{suggestion.description}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-sm font-bold text-green-400">-{suggestion.potentialSavings.toFixed(1)} GB</span>
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Action bar */}
      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-sm text-gray-400">
              {selectedItems.size} item(s) selecionado(s)
            </span>
            <span className="text-sm text-green-400 ml-2 font-medium">
              = {totalSavings.toFixed(1)} GB recuperáveis
            </span>
          </div>
          <button
            onClick={() => setPhase('cleaning')}
            disabled={selectedItems.size === 0 || cleaning}
            className={`px-5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              cleaning
                ? 'bg-blue-600 text-white cursor-wait'
                : cleaned
                ? 'bg-green-600 text-white'
                : selectedItems.size === 0
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'
            }`}
          >
            {cleaning ? (
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-spinner fa-spin"></i>
                Limpando...
              </span>
            ) : cleaned ? (
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-check"></i>
                Concluído!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-broom"></i>
                Limpar Agora
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
