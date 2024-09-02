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
npm i @lehmax/datatable
```
```sh
yarn add @lehmax/datatable
```
```sh
pnpm add @lehmax/datatable
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

### Props

| **Property**       | **Type** |**Default**   | **Required** | **Description**                                                                                  |
|--------------------|--------------------|------------------|--------------|-------------------------------------------------------------------------------------------|
| `title`            | `string`           |                 | No           | The title of the data table.                                                                         |
| `data`             | `array of objects` |                  | Yes          | The data to display in the table. Each object should have an `id` field and dynamic keys.            |
| `data[].id`        | `string`           |                  | Yes          | The unique identifier for each data entry.                                                          |                                                      |
| `columns`          | `array of objects` |                 | Yes          | The columns to display in the table. Each object should have a `label` and an `id`.                 |
| `columns[].label`  | `string`           |                  | Yes          | The label of the column to display in the table header.                                              |
| `columns[].id`     | `string`           |                 | Yes          | The identifier corresponding to the key in the data object.                                          |
| `searchColumns`    | `string[]` or `"all"` |   `"all"`          | No           | The columns to search on. `"all"` searches across all columns.                                       |
| `ordering`         | `boolean` | `true`                         | No           | If `true`, enables column sorting.                                                                   |
| `search`           | `boolean`  | `true`                            | No           | If `true`, enables search functionality in the table.                                                |
| `paginate`         | `boolean` |  `true`                           | No           | If `true`, enables pagination of the data in the table.                                              |
| `entriesPerPage`   | `number`   |  `10`                   | No           | Number of entries per page if pagination is enabled.                                                 |


## License

[MIT Licensed.](./LICENSE)

inspired by [DataTables](https://datatables.net/)
