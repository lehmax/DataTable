import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import Pagination from "../lib/components/Pagination";
import { DataTableProvider } from "../lib/context/DataTableContext";
import { exampleData3 } from "./data";

const Wrapper = ({ children }) => {
  return (
    <DataTableProvider initialData={exampleData3}>{children}</DataTableProvider>
  );
};

describe("Test pagination", () => {
  it("should render a pagination", () => {
    render(<Pagination />, { wrapper: Wrapper });
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
