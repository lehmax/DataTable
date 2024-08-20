import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import DataTable from "../lib/components/DataTable";
import {
  exampleColumns,
  exampleColumns2,
  exampleData,
  exampleData2,
} from "../test/data";

type errorType = {
  message: string;
};

function fallbackRender({ error }: { error: errorType }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallbackRender={fallbackRender}>
      <DataTable
        title="Employees"
        data={exampleData}
        columns={exampleColumns}
        searchColumns={["firstName", "lastName", "department"]}
      />
      <DataTable
        data={exampleData2}
        columns={exampleColumns2}
        search={true}
        ordering={false}
        paginate={false}
      />
    </ErrorBoundary>
  </StrictMode>
);
