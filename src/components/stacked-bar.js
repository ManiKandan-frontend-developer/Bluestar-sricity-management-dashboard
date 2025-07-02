import React from "react";
import ReactApexChart from "react-apexcharts";

// Your production data
const productionData = [
  { MachineName: "IDU Line", PartCount: 0, Shift: "Shift B" },
  { MachineName: "IDU Line", PartCount: 0, Shift: "Shift A" },
  { MachineName: "IDU Line", PartCount: 0, Shift: "Shift C" },
  { MachineName: "ODU Line", PartCount: 0, Shift: "Shift B" },
  { MachineName: "ODU Line", PartCount: 0, Shift: "Shift A" },
  { MachineName: "ODU Line", PartCount: 0, Shift: "Shift C" },
  { MachineName: "IDU Line 2", PartCount: 0, Shift: "Shift B" },
  { MachineName: "IDU Line 2", PartCount: 0, Shift: "Shift A" },
  { MachineName: "IDU Line 2", PartCount: 0, Shift: "Shift C" },
  { MachineName: "ODU Line 2", PartCount: 0, Shift: "Shift B" },
  { MachineName: "ODU Line 2", PartCount: 0, Shift: "Shift A" },
  { MachineName: "ODU Line 2", PartCount: 0, Shift: "Shift C" },
  { MachineName: "CSAC Line", PartCount: 116, Shift: "Shift B" },
  { MachineName: "CSAC Line", PartCount: 25, Shift: "Shift A" },
  { MachineName: "CSAC Line", PartCount: 1, Shift: "Shift C" },
];

// Map long names to short names
const lineNameMap = {
  "IDU Line": "IDU",
  "ODU Line": "ODU",
  "IDU Line 2": "IDU 2",
  "ODU Line 2": "ODU 2",
  "CSAC Line": "CSAC",
};

const VerticalGroupedBarChart = (props) => {
  const shifts = ["Shift A", "Shift B", "Shift C"];
  const machineLines = ["IDU", "ODU", "IDU 2", "ODU 2", "CSAC"];

  // Build series per shift
  const series = shifts.map((shift) => {
    const data = machineLines.map((line) => {
      const item = props?.data?.find(
        (entry) =>
          lineNameMap[entry.MachineName] === line && entry.Shift === shift
      );
      return item ? item.PartCount : 0;
    });
    return {
      name: shift,
      data,
    };
  });

  const options = {
    chart: {
      type: "bar",
      height: 400,
      stacked: false,
      toolbar: {
        show: false, 
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        dataLabels: {
          position: "top", // ✅ key for vertical bars
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -17, // ✅ push label above bar
      style: {
        fontSize: "12px",
        colors: ["#000"],
      },
    },
    xaxis: {
      categories: machineLines,
    //   title: {
    //     text: "Machine",
    //   },
    },
    yaxis: {
    //   title: {
    //     text: "Part Count",
    //   },
    },
    // colors: ["#1677ff", "#52c41a", "#faad14"],
     colors: ["#3F2468", "#7959A7", "#A587D3"],
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
  };

  return (
    <div>
      {/* <h3 style={{ color: "#1769aa" }}>REALTIME PRODUCTION</h3> */}
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={150}
      />
    </div>
  );
};

export default VerticalGroupedBarChart;
