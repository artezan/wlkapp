export function FormatDatesFront(dateInput: Date): string {
  const day: string = new Date(dateInput).getDate().toString();
  const month: string = (new Date(dateInput).getMonth() + 1).toString();
  const year: string = new Date(dateInput).getFullYear().toString();
  const date = day + '/' + month + '/' + year;
  return date;
}
