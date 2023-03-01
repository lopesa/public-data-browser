import * as d3 from "d3";
import { DSVParsedArray, DSVRowString } from "d3";
import { useEffect, useState } from "react";
import styles from "styles/PreviewData.module.scss";

interface PreviewDataProps {
  url: string;
}
const PreviewData = ({ url }: PreviewDataProps) => {
  const NUM_PREVIEW_ROWS = 200;
  const [data, setData] = useState<void | DSVRowString<string>[]>();
  const [dataSubset, setDataSubset] = useState<d3.DSVRowString<string>[]>([]);
  const [dataKeys, setDataKeys] = useState<string[]>();
  const parseData = (
    data: void | DSVParsedArray<DSVRowString<string>>
  ): d3.DSVRowString<string>[] | void => {
    if (!data?.length) {
      return;
    }
    const previewSet = data.slice(0, NUM_PREVIEW_ROWS);
    return previewSet;
    // setData(previewSet);

    // debugger;
  };
  useEffect(() => {
    (async () => {
      const proxiedRequestUrl = `http://localhost:8080/${url}`;
      const result = await d3
        .csv(proxiedRequestUrl, (d) => d)
        .catch((e) => {
          console.log(e);
        });
      // debugger;
      setData(result);
      const dataSubset = parseData(result);
      setDataSubset(dataSubset || []);
      if (!dataSubset?.length) {
        return;
      }
      const keys = Object.keys(dataSubset[0]);
      setDataKeys(keys);
    })();
  }, [url]);
  return (
    <div className={styles.PreviewDataContainer}>
      <div>Data Preview</div>
      <div>
        Total preview rows: {dataSubset.length} / {data?.length} total rows
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
                  {dataKeys?.map((key) => (
                    <td key={key} className={styles.DataTableCell}>
                      {row[key]}
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
