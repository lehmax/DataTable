import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import DataTable from "../lib/components/DataTable";
import { exampleColumns, exampleData } from "./data";

describe("Test DataTable Component", () => {
  describe("Given I use DataTable component with data, columns, title and default options", () => {
    beforeAll(() => {
      render(
        <DataTable
          title="Title Example"
          data={exampleData.slice(0, 20)}
          columns={exampleColumns}
        />
      );
    });

    afterAll(() => {
      cleanup();
    });

    it("should render the DataTable component", () => {
      expect(screen.getByRole("grid") as HTMLElement).toBeInTheDocument();
    });

    it.each(exampleColumns)(
      "should render the table headers : $label",
      ({ label }) => {
        const items = screen.getAllByText(label);
        expect(items).toHaveLength(2);
      }
    );

    it.each(exampleData.slice(0, 1))(
      "should render the table row : $firstName, $lastName",
      ({ firstName, lastName }) => {
        expect(screen.getByText(firstName)).toBeInTheDocument();
        expect(screen.getByText(lastName)).toBeInTheDocument();
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

  describe("Given I use DataTable component without extra features", () => {
    beforeAll(() => {
      render(
        <DataTable
          data={exampleData.slice(0, 20)}
          columns={exampleColumns}
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
});
