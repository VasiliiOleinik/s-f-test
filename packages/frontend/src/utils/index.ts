export function validateNumber(value: unknown): number | string {
  if (typeof value === 'number' && !isNaN(value)) {
    return value;
  }

  const parsed = parseFloat(value as string);
  if (!isNaN(parsed)) {
    return parsed;
  }

  return '';
}

export function formatDateForInput(timestamp: string | number | undefined): string {
  if (!timestamp) return '';

  const date = new Date(Number(timestamp));
  if (isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}