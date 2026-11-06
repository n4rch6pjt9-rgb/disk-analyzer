export interface DiskCategory {
  name: string;
  size: number;
  color: string;
  icon: string;
  description: string;
  recoverable: number;
}

export interface TempFile {
  path: string;
  size: number;
  lastAccessed: string;
  type: string;
}

export interface LargeFile {
  name: string;
  path: string;
  size: number;
  type: string;
}

export interface CleanupSuggestion {
  id: string;
  title: string;
  description: string;
  potentialSavings: number;
  risk: 'low' | 'medium' | 'high';
  icon: string;
  category: string;
}

export const diskInfo = {
  totalSpace: 512,
  usedSpace: 423.7,
  freeSpace: 88.3,
  usedPercentage: 82.7,
  fileSystem: 'NTFS',
  driveLabel: 'Windows',
  healthStatus: 'Saudável',
  fragmentation: 12,
};

export const categories: DiskCategory[] = [
  { name: 'Sistema Windows', size: 45.2, color: '#3b82f6', icon: 'fa-windows', description: 'Arquivos do sistema operacional', recoverable: 5 },
  { name: 'Programas Instalados', size: 87.4, color: '#8b5cf6', icon: 'fa-cube', description: 'Aplicativos e softwares', recoverable: 30 },
  { name: 'Arquivos do Usuário', size: 156.8, color: '#10b981', icon: 'fa-user', description: 'Documentos, downloads, mídia', recoverable: 40 },
  { name: 'Arquivos Temporários', size: 34.6, color: '#f59e0b', icon: 'fa-clock', description: 'Cache, logs, temp', recoverable: 90 },
  { name: 'Jogos', size: 62.3, color: '#ef4444', icon: 'fa-gamepad', description: 'Steam, Epic, etc.', recoverable: 50 },
  { name: 'Atualizações Windows', size: 18.9, color: '#06b6d4', icon: 'fa-download', description: 'Windows Update cache', recoverable: 85 },
  { name: 'Lixeira', size: 8.2, color: '#6b7280', icon: 'fa-trash', description: 'Arquivos deletados', recoverable: 100 },
  { name: 'Hibernação/Paginação', size: 10.3, color: '#ec4899', icon: 'fa-moon', description: 'hiberfil.sys e pagefile.sys', recoverable: 60 },
];

export const tempFiles: TempFile[] = [
  { path: 'C:\\Windows\\Temp', size: 12400, lastAccessed: '2024-01-15', type: 'Sistema' },
  { path: 'C:\\Users\\User\\AppData\\Local\\Temp', size: 8900, lastAccessed: '2024-01-18', type: 'Usuário' },
  { path: 'C:\\Windows\\SoftwareDistribution\\Download', size: 6200, lastAccessed: '2024-01-10', type: 'Windows Update' },
  { path: 'C:\\Users\\User\\AppData\\Local\\Google\\Chrome\\Cache', size: 4300, lastAccessed: '2024-01-19', type: 'Navegador' },
  { path: 'C:\\Users\\User\\AppData\\Local\\Microsoft\\Edge\\Cache', size: 2100, lastAccessed: '2024-01-19', type: 'Navegador' },
  { path: 'C:\\Users\\User\\AppData\\Local\\npm-cache', size: 1800, lastAccessed: '2024-01-12', type: 'Desenvolvimento' },
  { path: 'C:\\Users\\User\\AppData\\Local\\pip\\cache', size: 950, lastAccessed: '2024-01-08', type: 'Desenvolvimento' },
  { path: 'C:\\Windows\\Prefetch', size: 320, lastAccessed: '2024-01-19', type: 'Sistema' },
  { path: 'C:\\Users\\User\\AppData\\Roaming\\Discord\\Cache', size: 1600, lastAccessed: '2024-01-19', type: 'Aplicativo' },
  { path: 'C:\\Users\\User\\AppData\\Local\\Spotify\\Storage', size: 780, lastAccessed: '2024-01-18', type: 'Aplicativo' },
];

export const largeFiles: LargeFile[] = [
  { name: 'pagefile.sys', path: 'C:\\', size: 8192, type: 'Sistema' },
  { name: 'hiberfil.sys', path: 'C:\\', size: 6144, type: 'Sistema' },
  { name: 'GTA V', path: 'C:\\Games\\Rockstar Games', size: 45000, type: 'Jogo' },
  { name: 'Visual Studio 2022', path: 'C:\\Program Files\\Microsoft Visual Studio', size: 32000, type: 'Programa' },
  { name: 'Adobe Photoshop', path: 'C:\\Program Files\\Adobe', size: 12000, type: 'Programa' },
  { name: 'node_modules (projeto)', path: 'C:\\Users\\User\\Projects\\app', size: 4500, type: 'Desenvolvimento' },
  { name: 'Docker Desktop', path: 'C:\\Program Files\\Docker', size: 8200, type: 'Programa' },
  { name: 'filme_backup.mkv', path: 'C:\\Users\\User\\Downloads', size: 15000, type: 'Mídia' },
];

export const suggestions: CleanupSuggestion[] = [
  { id: 'temp', title: 'Limpar Arquivos Temporários', description: 'Remover arquivos temporários do sistema e de aplicativos que não são mais necessários.', potentialSavings: 34.6, risk: 'low', icon: 'fa-broom', category: 'Temporários' },
  { id: 'recycle', title: 'Esvaziar Lixeira', description: 'A lixeira contém 8.2 GB de arquivos que podem ser permanentemente removidos.', potentialSavings: 8.2, risk: 'low', icon: 'fa-trash-can', category: 'Lixeira' },
  { id: 'updates', title: 'Limpar Cache do Windows Update', description: 'Remover atualizações antigas já instaladas que ocupam espaço desnecessário.', potentialSavings: 16.1, risk: 'low', icon: 'fa-download', category: 'Atualizações' },
  { id: 'browser', title: 'Limpar Cache dos Navegadores', description: 'Remover cache e dados temporários do Chrome e Edge.', potentialSavings: 6.4, risk: 'low', icon: 'fa-globe', category: 'Navegadores' },
  { id: 'hibernation', title: 'Desativar Hibernação', description: 'Desativar hibernação remove o arquivo hiberfil.sys. Você perderá a capacidade de hibernar o PC.', potentialSavings: 6.0, risk: 'medium', icon: 'fa-moon', category: 'Sistema' },
  { id: 'programs', title: 'Remover Programas Não Utilizados', description: 'Identificar e desinstalar programas que não são usados há mais de 6 meses.', potentialSavings: 26.2, risk: 'medium', icon: 'fa-cube', category: 'Programas' },
  { id: 'downloads', title: 'Organizar Pasta Downloads', description: 'Mover ou remover arquivos antigos da pasta Downloads para liberar espaço.', potentialSavings: 15.0, risk: 'low', icon: 'fa-folder-open', category: 'Usuário' },
  { id: 'dev-cache', title: 'Limpar Cache de Desenvolvimento', description: 'Remover caches do npm, pip e node_modules de projetos antigos.', potentialSavings: 7.3, risk: 'low', icon: 'fa-code', category: 'Desenvolvimento' },
];
