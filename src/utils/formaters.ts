export function formateDate({
  date,
  excludeTime,
}: {
  date: string;
  excludeTime?: boolean;
}) {
  return Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: !excludeTime ? "short" : undefined,
    timeZone: "utc",
  }).format(new Date(date));
}
