import { ErrorBoundary } from "react-error-boundary";
import DataTable from "./components/DataTable";
import {
  exampleColumns,
  exampleColumns2,
  exampleData,
  exampleData2,
} from "./data";

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

function App() {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <DataTable
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
  );
}

export default App;
