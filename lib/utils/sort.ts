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

    if (key === "id") {
      return order === "ascending"
        ? parseInt(valueA) - parseInt(valueB)
        : parseInt(valueB) - parseInt(valueA);
    }

    // Order by date
    if (isValidDate(valueA) && isValidDate(valueB)) {
      return order === "ascending"
        ? new Date(valueA).getTime() - new Date(valueB).getTime()
        : new Date(valueB).getTime() - new Date(valueA).getTime();
    }

    return order === "ascending"
      ? valueA.localeCompare(valueB, "en")
      : valueB.localeCompare(valueA, "en");
  });
};

const isValidDate = (date: string) => {
  return !isNaN(Date.parse(date));
};
