export const noPrefix = "noPrefix";

/**
 * Takes in a list of strings and formats them as follows
 * - 1-item lists are just returned as a string
 * - 2-item lists are formatted as "A and B"
 * - everything else is formatted as "A, B, and C"
 */
export const formatList = (list: string[]): string => {
  if (list.length === 0) return "";
  if (list.length === 1) return list[0] ?? "";
  if (list.length === 2) return list.join(" and ");

  const [last, ...initial] = list.reverse();
  return `${initial.reverse().join(", ")}, and ${last}`;
};

export const formatDate = (dateStr?: string) => {
  if (!dateStr) return "Present";

  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const formatDateRange = ({
  startDate,
  endDate,
  isOngoing,
}: {
  startDate?: string;
  endDate?: string;
  isOngoing: boolean;
}): string | undefined => {
  if (!startDate) return "";

  const start = formatDate(startDate);
  const end = isOngoing ? "Present" : formatDate(endDate);

  return `${start} – ${end}`;
};
