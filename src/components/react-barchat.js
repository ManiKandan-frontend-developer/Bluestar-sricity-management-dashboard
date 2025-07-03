import React from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = ({ data, categories, title, width, color }) => {
  console.log("data2222",data)
  const options = {
    chart: {
      type: "bar",
      toolbar: {
        show: false // Hides the toolbar
      }
    },
    plotOptions: {
      bar: {
        endingShape: "rounded",
        borderRadius: 6,
        borderRadiusApplication: "end",
        columnWidth: "40%",
        dataLabels: {
          position: "top",
        },
      },
    },
    yaxis:{
      // title: {
      //   text: "kWh",
      //   style: {
      //     fontSize: '18px',
      //     fontWeight: 500,
      //     color: '#7B8BC1'
      //   }
      
      // },
     
      labels: {
        formatter: function (val) {
          if (val === Infinity || val === -Infinity) {
            return '';
          }
          else if (val >= 100000) {
               return (val / 100000).toFixed(1) + 'L';
             } 
          else{
          return val === 0 ? '0' : val;
        }},
      
        style: {
          colors: '#6D747C', // set label color
          fontSize: '13px', // set label font size
          fontFamily: 'Inter', // set label font family
          fontWeight: 300, // set label font weight
        },
        rotate: 0,
      },

      grid: {
        show:true,
        strokeDashArray: [5,5],
        borderColor: '#',
        strokeOpacity: 0.5,
        position: 'back',
      }, 
    },
    xaxis: {
      categories: categories ? categories : [] ,
      labels: {
        style: {
          // Customize X-axis label style here
          colors: ["#666666"], // X-axis label color
          fontSize: "13px", // X-axis label font size
          fontWeight: 500,
        },
        rotate: 0,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },

      strokeDashArray: [4, 8],
    },

    dataLabels: {
      formatter: function (val) {
        return val === 0 ? "0" : val.toFixed();
      },
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: "15px",
        colors: ["#304758"],
      },
    },
    title: {
      text: title,
      style: {
        // Customize title style here
        fontWeight: 500,
        fontSize: "16px", // Title font size
        color: "#444444", // Title color
      },
    },
    colors: [color],
   
  };

  const series = [
    {
      name: "Data",
      data: data ? data : [],
    },
  ];
  
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      // height={getChartHeight()}
      height={150}
     //  height={calculatedHeight}
      //height={"5vh"}
      style={{ width: width || "100%" }}
    />
  );
};

export default BarChart;
