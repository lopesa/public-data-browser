import { useGetBaseDepartmentOfAgricultureDataQuery } from "services/department-of-agriculture";
import DataItemDialog from "components/DataItemDialog";

function IndexDataList() {
  const { data, error, isLoading } =
    useGetBaseDepartmentOfAgricultureDataQuery("");

  debugger;

  return (
    <div style={{ textAlign: "left", fontSize: "9px" }}>
      {data?.dataset && <h4>Num Items: {data?.dataset.length}</h4>}
      {isLoading && <div>Loading...</div>}
      {data?.dataset &&
        data.dataset.map((item, index) => (
          <DataItemDialog key={index} dataItem={item} />
        ))}
      {error && <div>Error: {`${error}`}</div>}
    </div>
  );
}

export default IndexDataList;
