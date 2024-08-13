import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import DataTable from "../src/components/DataTable";

test("renders DataTable component", () => {
  const data = [
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Smith", age: 30 },
  ];

  const columns = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "age", label: "Age" },
  ];

  const cellSelector = { selector: "td" };

  render(<DataTable data={data} columns={columns} />);

  // Assert that the DataTable component is rendered
  expect(screen.getByRole("grid")).toBeInTheDocument();

  // Assert that the table headers are rendered
  expect(screen.getByText("Name")).toBeInTheDocument();
  expect(screen.getByText("Age")).toBeInTheDocument();

  // Assert that the table rows are rendered
  expect(screen.getByText("John Doe", cellSelector)).toBeInTheDocument();
  expect(screen.getByText("25", cellSelector)).toBeInTheDocument();

  expect(screen.getByText("Jane Smith", cellSelector)).toBeInTheDocument();
  expect(screen.getByText("30", cellSelector)).toBeInTheDocument();
});
