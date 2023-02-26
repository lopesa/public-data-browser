import * as d3 from "d3";
import { DSVParsedArray, DSVRowString } from "d3";
import React from "react";
import { useEffect, useState } from "react";
import styles from "styles/PDBChart.module.scss";

interface PDBChartProps {
  chartItemUrl: string;
}

const PDBChart = React.forwardRef(({ chartItemUrl }: PDBChartProps, ref) => {
  const [data, setData] = useState<void | DSVParsedArray<
    DSVRowString<string>
  >>();

  useEffect(() => {
    // debugger;
    (async () => {
      const proxiedRequestUrl = `http://localhost:8080/${chartItemUrl}`;
      const result = await d3
        .csv(proxiedRequestUrl, (d) => d)
        .catch((e) => {
          // debugger;
          console.log(e);
        });
      // debugger;
      setData(result);
    })();
    //   debugger;
    //   return d;
    //   // return {
    //   //   year: new Date(+d.Year, 0, 1), // convert "Year" column to Date
    //   //   make: d.Make,
    //   //   model: d.Model,
    //   //   length: +d.Length // convert "Length" column to number
    //   // };
    // });
  }, [chartItemUrl]);

  // useEffect(() => {
  //   if (!data) {
  //     return;
  //   }
  //   debugger;
  //   // const svg = d3
  //   //   .select(ChartRef.current)
  //   //   .append("svg")
  //   //   .attr("width", 700)
  //   //   .attr("height", 300);

  //   // svg
  //   //   .selectAll("rect")
  //   //   .data(data)
  //   //   .enter()
  //   //   .append("rect")
  //   //   .attr("x", (d, i) => i * 70)
  //   //   .attr("y", (d, i) => 300 - 10 * d)
  //   //   .attr("width", 65)
  //   //   .attr("height", (d, i) => d * 10)
  //   //   .attr("fill", "green");
  //   // drawChart()
  // }, [data]);
  // // const ChartRef = useRef<HTMLDivElement>(null);

  return (
    <p className={styles.PDBChartContainerDiv}>
      Public Data Browser Chart Component
    </p>
  );
});

export default PDBChart;
