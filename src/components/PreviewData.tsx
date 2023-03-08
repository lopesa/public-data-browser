import * as d3 from "d3";
import { DSVParsedArray, DSVRowString } from "d3";
import { useEffect, useState } from "react";
import styles from "styles/PreviewData.module.scss";
import PapaParse from "papaparse";
import * as XLSX from "xlsx";
import DataGrid from "react-data-grid";
import { read, utils } from "xlsx";
import { useGetSpreadsheetDataQuery } from "services/apiSlice";

interface PreviewDataProps {
  url: string;
}
const PreviewData = ({ url }: PreviewDataProps) => {
  const NUM_PREVIEW_ROWS = 200;
  // const [data, setData] = useState<void | string[][]>();
  const [dataSubset, setDataSubset] = useState<string[][]>([]);
  const [dataKeys, setDataKeys] = useState<string[]>();
  const [totalRowsAvailable, setTotalRowsAvailable] = useState<number>(0);
  const { data, error, isLoading, isFetching, refetch, isError } =
    useGetSpreadsheetDataQuery(url);
  // const [data, setData] = useState<void | DSVRowString<string>[]>();
  // const [dataSubset, setDataSubset] = useState<d3.DSVRowString<string>[]>([]);
  // const [columns, setColumns] = useState([]);
  // const [rows, setRows] = useState([]);
  // const parseData = (
  //   data: void | DSVParsedArray<DSVRowString<string>>
  // ): d3.DSVRowString<string>[] | void => {
  //   if (!data?.length) {
  //     return;
  //   }
  //   const previewSet = data.slice(0, NUM_PREVIEW_ROWS);
  //   return previewSet;
  //   // setData(previewSet);

  //   // debugger;
  // };

  // for xml
  // useEffect(() => {
  //   (async () => {
  //     const proxiedRequestUrl = `http://localhost:8080/${url}`;

  //     // for xls files
  //     const wb = read(await (await fetch(proxiedRequestUrl)).arrayBuffer(), {
  //       WTF: true,
  //     });

  //     /* use sheet_to_json with header: 1 to generate an array of arrays */
  //     const data: any = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
  //       header: 1,
  //     });

  //     const testColumns = data[0].map((r: any) => ({ key: r, name: r }));

  //     const testRows = data.slice(1).map((r: any) =>
  //       r.reduce((acc: any, x: any, i: any) => {
  //         acc[data[0][i]] = x;
  //         return acc;
  //       }, {})
  //     );

  //     debugger;

  //     /* see react-data-grid docs to understand the shape of the expected data */
  //     // setColumns(data[0].map((r: any) => ({ key: r, name: r })));
  //     // setRows(
  //     //   data.slice(1).map((r: any) =>
  //     //     r.reduce((acc: any, x: any, i: any) => {
  //     //       acc[data[0][i]] = x;
  //     //       return acc;
  //     //     }, {})
  //     //   )
  //     // );
  //   })();
  // });
  useEffect(() => {
    // debugger;
    if (!data?.data?.length) {
      return;
    }
    setDataKeys(data?.data[0]);
    setDataSubset(data?.data.slice(1) || []);
    setTotalRowsAvailable(data?.totalRows || 0);
  }, [data]);

  // useEffect(() => {
  //   (async () => {
  //     const proxiedRequestUrl = `http://localhost:8080/${url}`;
  //     const data = await (await fetch(proxiedRequestUrl)).text();
  //     const parsedCsvData: PapaParse.ParseResult<string[]> =
  //       PapaParse.parse(data);
  //     setData(parsedCsvData.data);
  //     const dataSubset = parsedCsvData.data.slice(0, NUM_PREVIEW_ROWS);
  //     setDataKeys(dataSubset.shift());
  //     setDataSubset(dataSubset || []);
  //     if (!dataSubset?.length) {
  //       return;
  //     }
  //   })();
  // }, [url]);

  return (
    <div className={styles.PreviewDataContainer}>
      <div>Data Preview</div>
      <div>
        Total preview rows: {dataSubset.length} / {totalRowsAvailable} total
        rows
        {/* Total preview rows: {dataSubset.length} / {data?.length} total rows */}
      </div>
      {(dataSubset.length && (
        <div className={styles.DataTableContainer}>
          <table className={styles.DataTable}>
            {dataKeys && (
              <tr className={styles.DataTableHeader}>
                {dataKeys.map((key) => (
                  <th key={key} className={styles.DataTableHeaderCell}>
                    {key}
                  </th>
                ))}
              </tr>
            )}
            {dataSubset.map((row, index) => {
              return (
                <tr key={index} className={styles.DataTableRow}>
                  {row.map((cell, index) => (
                    <td key={index} className={styles.DataTableCell}>
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </table>
        </div>
      )) || <div>fetching data</div>}
    </div>
  );
};
export default PreviewData;
