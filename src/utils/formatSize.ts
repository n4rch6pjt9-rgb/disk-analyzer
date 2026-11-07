// Sizes in the mock data are decimal (1 GB = 1000 MB)
export function formatSize(mb: number) {
  if (mb >= 1000) return `${(mb / 1000).toFixed(1)} GB`;
  return `${mb} MB`;
}
