import { useGetBaseDepartmentOfAgricultureDataQuery } from "services/department-of-agriculture";

function IndexDataList() {
  const { data, error, isLoading } =
    useGetBaseDepartmentOfAgricultureDataQuery("");

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {data?.dataset &&
        data.dataset.map((item, index) => (
          <div key={index}>{item.description}</div>
        ))}
      {/* {error && <div>Error: {error}</div>} */}
      {error && <div>Error: {`${error}`}</div>}
    </>
  );
}

export default IndexDataList;
