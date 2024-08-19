import { DataType } from "../types";

export const sortCollection = (
  collection: DataType[],
  key: string,
  order: "ascending" | "descending" = "ascending"
) => {
  return [...collection].sort((a, b) => {
    const valueA = a[key] as string;
    const valueB = b[key] as string;

    if (!valueA && !valueB) return 0;

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
