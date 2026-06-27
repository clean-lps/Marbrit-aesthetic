const DATE_FORMATTER = new Intl.DateTimeFormat("es-ES", {
  dateStyle: "long",
});

const RELATIVE_FORMATTER = new Intl.RelativeTimeFormat("es-ES", {
  numeric: "auto",
});

const DIVISIONS: { amount: number; unit: Intl.RelativeTimeFormatUnit }[] = [
  { amount: 60, unit: "second" },
  { amount: 60, unit: "minute" },
  { amount: 24, unit: "hour" },
  { amount: 7, unit: "day" },
  { amount: 30, unit: "week" },
  { amount: 12, unit: "month" },
  { amount: 1_000_000, unit: "year" },
];

export function formatDate(date: Date | string) {
  return DATE_FORMATTER.format(new Date(date));
}

export function formatRelative(date: Date | string) {
  const now = new Date();
  const target = new Date(date);
  const diff = target.getTime() - now.getTime();
  const absDiff = Math.abs(diff);

  let seconds = Math.floor(absDiff / 1000);

  for (const division of DIVISIONS) {
    if (seconds < division.amount) {
      return RELATIVE_FORMATTER.format(
        Math.sign(diff) * seconds,
        division.unit,
      );
    }
    seconds = Math.floor(seconds / division.amount);
  }

  return RELATIVE_FORMATTER.format(Math.sign(diff) * seconds, "year");
}
