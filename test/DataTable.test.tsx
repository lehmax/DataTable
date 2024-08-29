import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import DataTable from "../lib/components/DataTable";
import { exampleColumns3, exampleData3 } from "./data";

describe("Render Datatable", () => {
  beforeAll(() => {
    render(
      <DataTable
        title="Title Example"
        data={exampleData3}
        columns={exampleColumns3}
      />
    );
  });

  afterAll(() => {
    cleanup();
  });

  it("should render the DataTable component", () => {
    expect(screen.getByRole("grid") as HTMLElement).toBeInTheDocument();
  });

  it.each(exampleColumns3)(
    "should render the table headers : $label",
    ({ label }) => {
      const items = screen.getAllByText(label);
      expect(items).toHaveLength(2);
    }
  );

  it.each(exampleData3.slice(0, 1))(
    "should render the table row : $firstName, $lastName",
    ({ name, email }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(email)).toBeInTheDocument();
    }
  );

  it("should render a search input", () => {
    expect(
      screen.getByText("Search", { selector: "label" })
    ).toBeInTheDocument();
  });

  it("should render an items per page selector", () => {
    expect(
      screen.getByText("Entries per page", { selector: "label" })
    ).toBeInTheDocument();
  });

  it("should render a pagination", () => {
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("should render a caption", () => {
    expect(
      screen.getByText("Title Example", { selector: "caption" })
    ).toBeInTheDocument();
  });
});

describe("Render DataTable without extra features", () => {
  beforeAll(() => {
    render(
      <DataTable
        data={exampleData3}
        columns={exampleColumns3}
        paginate={false}
        search={false}
        ordering={false}
      />
    );
  });

  afterAll(() => {
    cleanup();
  });

  it("should not render a search input", () => {
    expect(
      screen.queryByText("Search", { selector: "label" })
    ).not.toBeInTheDocument();
  });

  it("should not render an items per page selector", () => {
    expect(
      screen.queryByText("Entries per page", { selector: "label" })
    ).not.toBeInTheDocument();
  });

  it("should not render a pagination", () => {
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});

describe("Test pagination", () => {
  const user = userEvent.setup();

  beforeAll(() => {
    render(<DataTable data={exampleData3} columns={exampleColumns3} />);
  });

  afterAll(() => {
    cleanup();
  });

  it("should display next page on click on next button", async () => {
    const button = screen.getByRole("button", {
      name: "Go to next page",
    });
    const currentPage = screen.getByText("John Doe");
    expect(currentPage).toBeInTheDocument();
    await user.click(button);
    expect(screen.getByText("Lucas Allen")).toBeVisible();
    expect(currentPage).not.toBeVisible();
  });

  it("should display previous page on click on previous button", async () => {
    const button = screen.getByRole("button", {
      name: "Go to previous page",
    });
    const currentPage = screen.getByText("Lucas Allen");
    expect(currentPage).toBeInTheDocument();
    await user.click(button);
    expect(screen.getByText("John Doe")).toBeVisible();
    expect(currentPage).not.toBeVisible();
  });

  it("should display last page on click on last page button", async () => {
    const button = screen.getByRole("button", {
      name: "Go to last page",
    });
    const currentPage = screen.getByText("John Doe");
    expect(currentPage).toBeInTheDocument();
    await user.click(button);
    expect(screen.getByText("Lucas Allen")).toBeVisible();
    expect(currentPage).not.toBeVisible();
  });

  it("should display first page on click on first page button", async () => {
    const button = screen.getByRole("button", {
      name: "Go to first page",
    });
    const currentPage = screen.getByText("Lucas Allen");
    expect(currentPage).toBeInTheDocument();
    await user.click(button);
    expect(screen.getByText("John Doe")).toBeVisible();
    expect(currentPage).not.toBeVisible();
  });

  it("should display page 2 when click on page 2 button", async () => {
    const button = screen.getByRole("button", {
      name: "Go to page 2",
    });
    const currentPage = screen.getByText("John Doe");
    expect(currentPage).toBeInTheDocument();
    await user.click(button);
    expect(screen.getByText("Lucas Allen")).toBeVisible();
    expect(currentPage).not.toBeVisible();
  });
});

describe("Test search", () => {
  afterEach(() => {
    cleanup();
  });

  it("should filter data when typing in search input (restricted to 1column)", async () => {
    render(
      <DataTable
        data={exampleData3}
        columns={exampleColumns3}
        searchColumns={["name"]}
      />
    );

    const searchInput = screen.getByLabelText("Search");
    const firstRow = screen.getByText("John Doe");
    const secondRow = screen.getByText("Michael Brown");

    expect(firstRow).toBeVisible();
    expect(secondRow).toBeVisible();
    await userEvent.type(searchInput, "John");
    expect(firstRow).toBeVisible();
    expect(secondRow).not.toBeVisible();
  });

  it("should filter data when typing in search input", async () => {
    const headerFooterRow = 2;
    render(
      <DataTable
        data={exampleData3}
        columns={exampleColumns3}
        entriesPerPage={20}
      />
    );

    const searchInput = screen.getByLabelText("Search");
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(20 + headerFooterRow);
    await userEvent.type(searchInput, "White");
    const rowsFiltered = screen.getAllByRole("row");
    expect(rowsFiltered).toHaveLength(1 + headerFooterRow);
  });
});

describe("Test ordering", () => {
  const user = userEvent.setup();

  beforeAll(() => {
    render(
      <DataTable
        data={[
          { id: "2", name: "B" },
          { id: "4", name: "A" },
          { id: "8", name: "E" },
          { id: "10", name: "C" },
          { id: "11", name: "D" },
        ]}
        columns={[
          { label: "ID", id: "id" },
          { label: "Name", id: "name" },
        ]}
      />
    );
  });

  afterAll(() => {
    cleanup();
  });

  it("should sort data when clicking on column header", async () => {
    const header = screen.getByTestId("name");
    expect(header).toHaveAttribute("aria-sort", "none");

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("B");
    expect(rows[2]).toHaveTextContent("A");
    expect(rows[3]).toHaveTextContent("E");
    expect(rows[4]).toHaveTextContent("C");
    expect(rows[5]).toHaveTextContent("D");

    await user.click(header);

    expect(header).toHaveAttribute("aria-sort", "ascending");
    const rowsAsc = screen.getAllByRole("row");

    expect(rowsAsc[1]).toHaveTextContent("A");
    expect(rowsAsc[2]).toHaveTextContent("B");
    expect(rowsAsc[3]).toHaveTextContent("C");
    expect(rowsAsc[4]).toHaveTextContent("D");
    expect(rowsAsc[5]).toHaveTextContent("E");

    await user.click(header);

    expect(header).toHaveAttribute("aria-sort", "descending");
    const rowsDesc = screen.getAllByRole("row");
    expect(rowsDesc[1]).toHaveTextContent("E");
    expect(rowsDesc[2]).toHaveTextContent("D");
    expect(rowsDesc[3]).toHaveTextContent("C");
    expect(rowsDesc[4]).toHaveTextContent("B");
    expect(rowsDesc[5]).toHaveTextContent("A");

    await user.click(header);

    expect(header).toHaveAttribute("aria-sort", "none");
    const rowsReset = screen.getAllByRole("row");
    expect(rowsReset[1]).toHaveTextContent("B");
    expect(rowsReset[2]).toHaveTextContent("A");
    expect(rowsReset[3]).toHaveTextContent("E");
    expect(rowsReset[4]).toHaveTextContent("C");
    expect(rowsReset[5]).toHaveTextContent("D");
  });
});
