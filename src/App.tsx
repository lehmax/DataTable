import DataTable from "./components/DataTable";
import { exempleColumns, exempleData } from "./data";

function App() {
  return (
    <>
      <DataTable data={exempleData} columns={exempleColumns} />
    </>
  );
}

export default App;
