<div align="center">
  <h1 align="center">
    DataTable
    <br />
    <br />
  </h1>
</div>

<p align="center">
  <a href="https://www.npmjs.com/package/@lehmax/datatable">
    <img src="https://img.shields.io/npm/v/@lehmax/datatable?style=flat-square" alt="NPM version" />
  </a>
  <a href="https://www.npmjs.com/package/@lehmax/datatable">
    <img src="https://img.shields.io/npm/dt/@lehmax/datatable?style=flat-square" alt="NPM downloads" />
  </a>
</p>

> ! Note: This project is not ready for production use. !

## Introduction

`DataTable` is a simple table component for React with search, pagination, and ordering features.

## Installation

```sh
npm add @lehmax/datatable
```

## Usage

```jsx
import DataTable from "@lehmax/datatable";

<DataTable
  title="Employees"
  data={[
    { column1: "value1", column2: "value2", ... },
    ...
  ]}
  columns={[
    { id: "column1", label: "Column 1", ... },
    ...
  ]}
  searchColumns={["column1", ...]}
/>;
```

```jsx
import DataTable from "@lehmax/datatable";

<DataTable
  title="Employees"
  data={[
    { column1: "value1", column2: "value2", ... },
    ...
  ]}
  columns={[
    { id: "column1", label: "Column 1", ... },
    ...
  ]}
  searchColumns={["column1", ...]}
  search={false}
  paginate={false}
  ordering={false}
/>;
```

## License

[MIT Licensed.](./LICENSE)

inspired by [DataTables](https://datatables.net/)
