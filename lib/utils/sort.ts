import { DataType } from "../types";

export const sortCollection = (
  collection: DataType[],
  key: string,
  order: "ascending" | "descending" = "ascending"
) => {
  return [...collection].sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (!valueA && !valueB) return 0;
    if (!valueA) return order === "ascending" ? 1 : -1;
    if (!valueB) return order === "ascending" ? -1 : 1;

    if (key === "id") {
      return order === "ascending"
        ? parseInt(valueA) - parseInt(valueB)
        : parseInt(valueB) - parseInt(valueA);
    }

    // Order by date
    const dateA = parseDate(valueA);
    const dateB = parseDate(valueB);
    if (dateA && dateB) {
      return order === "ascending"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    }

    if (!dateA && dateB) {
      return order === "ascending" ? 1 : -1;
    }

    if (dateA && !dateB) {
      return order === "ascending" ? -1 : 1;
    }

    if (!dateA && !dateB) {
      return order === "ascending"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return 0;
  });
};

const parseDate = (dateStr: string): Date | null => {
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
