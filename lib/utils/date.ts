/**
 * Parse a date string in the format yyyy-mm-dd or yyyy/mm/dd or dd-mm-yyyy or dd/mm/yyyy
 * @param dateStr The date string to parse
 * @returns The parsed date or null if the date string is invalid
 */
export const parseDate = (dateStr: string): Date | null => {
  const regexes = [
    {
      regex: /^(\d{4})[-/](\d{2})[-/](\d{2})$/, // yyyy-mm-dd or yyyy/mm/dd
      order: ["year", "month", "day"],
    },
    {
      regex: /^(\d{2})[-/](\d{2})[-/](\d{4})$/, // mm-dd-yyyy or mm/dd/yyyy
      order: ["day", "month", "year"],
    },
  ];

  for (const { regex, order } of regexes) {
    const match = dateStr.match(regex);
    if (match) {
      const dateParts: { [key: string]: number } = {};

      order.forEach((key, index) => {
        dateParts[key] = parseInt(match[index + 1]);
      });

      dateParts["month"] -= 1; // 0-based month index for Date object constructor

      return new Date(dateParts["year"], dateParts["month"], dateParts["day"]);
    }
  }

  return null;
};
