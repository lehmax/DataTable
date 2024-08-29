import { describe, expect, it } from "vitest";
import { parseDate } from "../lib/utils/date";

describe("Test parseDate function", () => {
  it("should parse date in yyyy-mm-dd format", () => {
    expect(parseDate("2024-10-20")).toEqual(new Date(2024, 9, 20));
  });

  it("should parse date in yyyy/mm/dd format", () => {
    expect(parseDate("2024/10/20")).toEqual(new Date(2024, 9, 20));
  });

  it("should parse date in dd-mm-yyyy format", () => {
    expect(parseDate("20-10-2024")).toEqual(new Date(2024, 9, 20));
  });

  it("should parse date in dd/mm/yyyy format", () => {
    expect(parseDate("20/10/2024")).toEqual(new Date(2024, 9, 20));
  });

  it("should return null if date format is invalid", () => {
    expect(parseDate("azerty")).toBeNull();
    expect(parseDate("2024-10")).toBeNull();
    expect(parseDate("1/1/1")).toBeNull();
  });
});
