export function formateDate({ date }: { date: string }) {
  return Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(date));
}
