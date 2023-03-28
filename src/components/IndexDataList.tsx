import DataItemsAccordion from "components/DataItemsAccordion";
import { useEffect, useState } from "react";
import { DatasetsAvailable } from "types/dataset-index-type";
import PDBCheckbox from "./PDB_Checkbox";
import styles from "styles/IndexDataList.module.scss";
import { InitialIndexDataItem } from "types/types-general";

interface IndexDataListProps {
  data: InitialIndexDataItem[];
}

function IndexDataList({ data }: IndexDataListProps) {
  const [filteredData, setFilteredData] =
    useState<InitialIndexDataItem[]>(data);
  const [showXml, setShowXml] = useState(false);
  const [showXls, setShowXls] = useState(false);
  const [showCsv, setShowCsv] = useState(false);
  const [openAllAccordions, setOpenAllAccordions] = useState(false);

  useEffect(() => {
    type DataType = "xml" | "csv" | "xls" | "xlsx";
    const includesArray: DataType[] = [];
    if (showXml) {
      includesArray.push("xml");
    }
    if (showCsv) {
      includesArray.push("csv");
    }
    if (showXls) {
      includesArray.push("xls");
      includesArray.push("xlsx");
    }

    if (!includesArray.length) {
      setFilteredData(data);
      return;
    }
    const filtered = data.filter((item: any) => {
      if (!item.dataTypesByFileExtension?.length) {
        return false;
      }
      for (let i = 0; i < includesArray.length; i++) {
        if (item.dataTypesByFileExtension.includes(includesArray[i])) {
          return true;
        }
      }
      return false;
    });
    setFilteredData(filtered);
  }, [showXml, showCsv, showXls, data]);

  return (
    <div className={styles.IndexDataListContainer}>
      {filteredData && (
        <h4>
          <span>Total Num Items: {data.length}</span>/
          {filteredData && (
            <span> Current Num Items: {filteredData.length}</span>
          )}
        </h4>
      )}
      <div className={styles.CheckboxGroupContainer}>
        <PDBCheckbox label="Show items with Xml" onCheckedChange={setShowXml} />
        <PDBCheckbox label="Show items with Xls" onCheckedChange={setShowXls} />
        <PDBCheckbox label="Show items with CSV" onCheckedChange={setShowCsv} />
        <PDBCheckbox
          label="Open all accordions"
          onCheckedChange={setOpenAllAccordions}
        />
      </div>
      {filteredData && (
        <DataItemsAccordion
          dataItems={filteredData}
          datasetId={DatasetsAvailable.departmentOfAgriculture}
          openAll={openAllAccordions}
        />
      )}
    </div>
  );
}

export default IndexDataList;
