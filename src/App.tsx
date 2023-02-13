import React from "react";
// import logo from "./logo.svg";
// import { Counter } from "./features/counter/Counter";
import IndexDataList from "components/IndexDataList";
import "./App.css";

import { useGetBaseDepartmentOfAgricultureDataQuery } from "services/department-of-agriculture";
import type {
  DepartmentOfAgriculture,
  DepartmentOfAgricultureDataItem,
} from "types/department-of-agriculture";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Counter /> */}
        <h1>Public Data Browser</h1>
        <h3>A Central Place to Browse Public data</h3>
      </header>
      <div style={{ margin: "0 auto", padding: "0 100px" }}>
        <IndexDataList datasetId="departmentOfAgriculture" />
      </div>
    </div>
  );
}

export default App;
