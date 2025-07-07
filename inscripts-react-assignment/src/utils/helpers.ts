export function formatDate(date: string): string {
  // Assumes date is in DD-MM-YYYY
  return date;
}

export function formatValue(value: number): string {
  return value.toLocaleString('en-IN');
}

export function truncateUrl(url: string, maxLength = 20): string {
  if (url.length <= maxLength) return url;
  return url.slice(0, maxLength) + '...';
} 