import { DataType } from "../types";
import { parseDate } from "./date";

export const sortCollection = (
  collection: DataType[],
  key: string,
  order: "ascending" | "descending" = "ascending"
) => {
  return [...collection].sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (!valueA && !valueB) return 0;

    // Put empty values at the asc: end, desc: start
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

    if (!dateB && dateA) {
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
