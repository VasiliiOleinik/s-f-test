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
