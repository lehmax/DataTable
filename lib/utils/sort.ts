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

    return order === "ascending"
      ? valueA.localeCompare(valueB, "en", {
          numeric: true,
          sensitivity: "base",
        })
      : valueB.localeCompare(valueA, "en", {
          numeric: true,
          sensitivity: "base",
        });
  });
};
