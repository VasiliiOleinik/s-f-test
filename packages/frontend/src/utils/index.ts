export function validateNumber(value: unknown): string {
  if (typeof value === 'string') {
    const sanitized = value.replace(/[^0-9.-]/g, '');

    if (/^-?\d*\.?\d*$/.test(sanitized)) {
      return sanitized;
    }

    return '';
  }
  return '';
}

export function formatDateForInput(
  timestamp: string | number | undefined
): string {
  if (!timestamp) return '';

  const date = new Date(Number(timestamp));
  if (isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
