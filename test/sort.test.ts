import { describe, expect, it } from "vitest";
import { sortCollection } from "../lib/utils/sort";

describe("Test sort collection", () => {
  const collection = [
    { id: "2", name: "Bob", age: "35", date: "02/02/2022" },
    { id: "3", name: "Alice", age: "25", date: "13/06/2024" },
    { id: "1", name: "John", age: "30", date: "01/01/2022" },
    { id: "4", name: "Xavier", age: "35", date: "31/12/2021" },
  ];

  const collection2 = [
    { id: "2", name: "Bob", age: "", date: "02222023" },
    { id: "3", name: "Alice", age: "32", date: "13/06/2024" },
    { id: "1", name: "John", age: "30", date: "01/01/2022" },
    { id: "4", name: "Xavier", age: "35", date: "31/12/2021" },
  ];

  it("should sort by id key", () => {
    const sortedCollection = sortCollection(collection, "id");

    expect(sortedCollection).toEqual([
      { id: "1", name: "John", age: "30", date: "01/01/2022" },
      { id: "2", name: "Bob", age: "35", date: "02/02/2022" },
      { id: "3", name: "Alice", age: "25", date: "13/06/2024" },
      { id: "4", name: "Xavier", age: "35", date: "31/12/2021" },
    ]);

    const sortedCollectionDesc = sortCollection(collection, "id", "descending");

    expect(sortedCollectionDesc).toEqual([
      { id: "4", name: "Xavier", age: "35", date: "31/12/2021" },
      { id: "3", name: "Alice", age: "25", date: "13/06/2024" },
      { id: "2", name: "Bob", age: "35", date: "02/02/2022" },
      { id: "1", name: "John", age: "30", date: "01/01/2022" },
    ]);
  });

  it("should sort asc by local alphabetic order", () => {
    const sortedCollection = sortCollection(collection, "name");

    expect(sortedCollection).toEqual([
      { id: "3", name: "Alice", age: "25", date: "13/06/2024" },
      { id: "2", name: "Bob", age: "35", date: "02/02/2022" },
      { id: "1", name: "John", age: "30", date: "01/01/2022" },
      { id: "4", name: "Xavier", age: "35", date: "31/12/2021" },
    ]);
  });

  it("should sort desc by local alphabetic order", () => {
    const sortedCollection = sortCollection(collection, "name", "descending");

    expect(sortedCollection).toEqual([
      { id: "4", name: "Xavier", age: "35", date: "31/12/2021" },
      { id: "1", name: "John", age: "30", date: "01/01/2022" },
      { id: "2", name: "Bob", age: "35", date: "02/02/2022" },
      { id: "3", name: "Alice", age: "25", date: "13/06/2024" },
    ]);
  });

  it("should sort asc by date key", () => {
    const sortedCollection = sortCollection(collection, "date");

    expect(sortedCollection).toEqual([
      { id: "4", name: "Xavier", age: "35", date: "31/12/2021" },
      { id: "1", name: "John", age: "30", date: "01/01/2022" },
      { id: "2", name: "Bob", age: "35", date: "02/02/2022" },
      { id: "3", name: "Alice", age: "25", date: "13/06/2024" },
    ]);
  });

  it("should sort dsc by date key", () => {
    const sortedCollection = sortCollection(collection, "date", "descending");

    expect(sortedCollection).toEqual([
      { id: "3", name: "Alice", age: "25", date: "13/06/2024" },
      { id: "2", name: "Bob", age: "35", date: "02/02/2022" },
      { id: "1", name: "John", age: "30", date: "01/01/2022" },
      { id: "4", name: "Xavier", age: "35", date: "31/12/2021" },
    ]);
  });

  it("should sort by key with wrong date values", () => {
    const sortedCollection = sortCollection(collection2, "date");

    expect(sortedCollection).toEqual([
      { id: "4", name: "Xavier", age: "35", date: "31/12/2021" },
      { id: "1", name: "John", age: "30", date: "01/01/2022" },
      { id: "3", name: "Alice", age: "32", date: "13/06/2024" },
      { id: "2", name: "Bob", age: "", date: "02222023" },
    ]);
  });

  it("should sort by key with empty values", () => {
    const sortedCollection = sortCollection(collection2, "age");

    expect(sortedCollection).toEqual([
      { id: "1", name: "John", age: "30", date: "01/01/2022" },
      { id: "3", name: "Alice", age: "32", date: "13/06/2024" },
      { id: "4", name: "Xavier", age: "35", date: "31/12/2021" },
      { id: "2", name: "Bob", age: "", date: "02222023" },
    ]);
  });
});
