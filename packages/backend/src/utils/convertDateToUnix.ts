export function convertDateToUnix(date: Date): number {
  return new Date(date).valueOf();
}
