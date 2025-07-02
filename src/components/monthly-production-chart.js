// import React from "react";
// import ReactApexChart from "react-apexcharts";

// const MonthlyChart = ({ data, categories, title, width, color }) => {
// //   console.log("data",data)
//   const options = {
//     chart: {
//       type: "bar",
//       toolbar: {
//         show: false // Hides the toolbar
//       }
//     },
//     plotOptions: {
//       bar: {
//         endingShape: "rounded",
//         borderRadius: 6,
//         borderRadiusApplication: "end",
//         columnWidth: "60%",
//         dataLabels: {
//           position: "top",
//         },
//       },
//     },
//     yaxis:{
//       // title: {
//       //   text: "kWh",
//       //   style: {
//       //     fontSize: '18px',
//       //     fontWeight: 500,
//       //     color: '#7B8BC1'
//       //   }
      
//       // },
     
//       labels: {
//         formatter: function (val) {
//           if (val === Infinity || val === -Infinity) {
//             return '';
//           }
//           else if (val >= 100000) {
//                return (val / 100000).toFixed(1) + 'L';
//              } 
//           else{
//           return val === 0 ? '0' : val;
//         }},
      
//         style: {
//           colors: '#6D747C', // set label color
//           fontSize: '13px', // set label font size
//           fontFamily: 'Inter', // set label font family
//           fontWeight: 300, // set label font weight
//         },
//         rotate: 0,
//       },

//       grid: {
//         show:true,
//         strokeDashArray: [5,5],
//         borderColor: '#',
//         strokeOpacity: 0.5,
//         position: 'back',
//       }, 
//     },
//     xaxis: {
//       categories: categories ? categories : [] ,
//       labels: {
//         style: {
//           // Customize X-axis label style here
//           colors: ["#666666"], // X-axis label color
//           fontSize: "13px", // X-axis label font size
//           fontWeight: 500,
//         },
//         rotate: 0,
//       },
//     },
//     grid: {
//       xaxis: {
//         lines: {
//           show: false,
//         },
//       },

//       strokeDashArray: [4, 8],
//     },

//     dataLabels: {
//       formatter: function (val) {
//         return val === 0 ? "0" : val.toFixed();
//       },
//       enabled: true,
//       offsetY: -20,
//       style: {
//         fontSize: "15px",
//         colors: ["#304758"],
//       },
//     },
//     title: {
//       text: title,
//       style: {
//         // Customize title style here
//         fontWeight: 500,
//         fontSize: "16px", // Title font size
//         color: "#444444", // Title color
//       },
//     },
//     colors: [color],
   
//   };

//   const series = [
//     {
//       name: "Data",
//       data: data ? data : [],
//     },
//   ];
//   const getChartHeight = () => {
//     // You can adjust these values based on your design requirements
//     if (window.innerWidth >= 1700) {
//       return 300;
//     } else if (window.innerWidth >= 1470) {
//       return 250;
//     } else if (window.innerWidth >= 1350) {
//       return 210;
//     } else if (window.innerWidth >= 768) {
//       return 210;
//     } else {
//       return 200;
//     }
//   };
  
//   return (
//     <ReactApexChart
//       options={options ? options : {}}
//       series={series ? series : [] }
//       type="bar"
//       // height={getChartHeight()}
//       height={130}
//      //  height={calculatedHeight}
//       //height={"5vh"}
//       style={{ width: width || "100%" }}
//     />
//   );
// };

// export default MonthlyChart;


// import React from "react";
// import ReactApexChart from "react-apexcharts";

// const MonthlyChart = ({ data = [], categories = [], title, width = "100%", color = "#000" }) => {
//   const options = {
//     chart: {
//       type: "bar",
//       toolbar: {
//         show: false // Hides the toolbar
//       }
//     },
//     plotOptions: {
//       bar: {
//         endingShape: "rounded",
//         borderRadius: 6,
//         borderRadiusApplication: "end",
//         columnWidth: "60%",
//         dataLabels: {
//           position: "top",
//         },
//       },
//     },
//     yaxis: {
//       labels: {
//         formatter: function (val) {
//           if (val === Infinity || val === -Infinity) {
//             return '';
//           }
//           if (val >= 100000) {
//             return (val / 100000).toFixed(1) + 'L';
//           }
//           return val === 0 ? '0' : val;
//         },
//         style: {
//           colors: '#6D747C', // set label color
//           fontSize: '13px', // set label font size
//           fontFamily: 'Inter', // set label font family
//           fontWeight: 300, // set label font weight
//         },
//         rotate: 0,
//       },
//       grid: {
//         show: true,
//         strokeDashArray: [5, 5],
//         borderColor: '#',
//         strokeOpacity: 0.5,
//         position: 'back',
//       },
//     },
//     xaxis: {
//       categories: categories,
//       labels: {
//         style: {
//           colors: ["#666666"], // X-axis label color
//           fontSize: "13px", // X-axis label font size
//           fontWeight: 500,
//         },
//         rotate: 0,
//       },
//     },
//     grid: {
//       xaxis: {
//         lines: {
//           show: false,
//         },
//       },
//       strokeDashArray: [4, 8],
//     },
//     dataLabels: {
//       formatter: function (val) {
//         return val === 0 ? "0" : val.toFixed();
//       },
//       enabled: true,
//       offsetY: -20,
//       style: {
//         fontSize: "15px",
//         colors: ["#304758"],
//       },
//     },
//     title: {
//       text: title,
//       style: {
//         fontWeight: 500,
//         fontSize: "16px", // Title font size
//         color: "#444444", // Title color
//       },
//     },
//     colors: [color],
//   };

//   const series = [
//     {
//       name: "Data",
//       data: data,
//     },
//   ];

//   const getChartHeight = () => {
//     if (window.innerWidth >= 1700) {
//       return 300;
//     } else if (window.innerWidth >= 1470) {
//       return 250;
//     } else if (window.innerWidth >= 1350) {
//       return 210;
//     } else if (window.innerWidth >= 768) {
//       return 210;
//     } else {
//       return 200;
//     }
//   };

//   return (
//     <ReactApexChart
//       options={options}
//       series={series}
//       type="bar"
//       height={130}
//       style={{ width: width }}
//     />
//   );
// };

// export default MonthlyChart;



import React from "react";
import ReactApexChart from "react-apexcharts";

const MonthlyChart = ({
  data = [],
  categories = [],
  target=[],
  title = "",
  width = "100%",
  color = "#000",
  height = 145
}) => {
  const options = {
    chart: {
      type: "bar",
      toolbar: {
        show: false // Hides the toolbar
      },
    },
    legend: {
      show: false, // ✅ hides the legend
    },
    tooltip: {
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const value = series[seriesIndex][dataPointIndex];
        const category = w.globals.labels[dataPointIndex];
        const goalValue = w.globals.initialSeries[seriesIndex].data[dataPointIndex].goals[0].value;

        return (
          `<div class="custom-tooltip">
            <div class="tooltip-title">${category}</div>
            <div class="tooltip-content">
              <span class="tooltip-label">Data:</span>
              <span class="tooltip-value">${value}</span>
            </div>
            <div class="tooltip-content">
              <span class="tooltip-label">Target:</span>
              <span class="tooltip-value">${goalValue}</span>
            </div>
          </div>`
        );
      }
    },
    plotOptions: {
      bar: {
        endingShape: "rounded",
        borderRadius: 2,
        borderRadiusApplication: "end",
        columnWidth: "50%",
        dataLabels: {
          position: "top",
          // offsetY:-40
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          if (val === Infinity || val === -Infinity) return '';
          if (val >= 100000) return (val / 100000).toFixed(1) + 'L';
          return val === 0 ? '0' : val;
        },
      // labels: {
      //   formatter: function (val) {
      //     if (val === Infinity || val === -Infinity) {
      //       return '';
      //     }
      //     if (val >= 100000) {
      //       return (val / 100000).toFixed(1) + 'L';
      //     }
      //     return val === 0 ? '0' : val;
      //   },
      //   style: {
      //     colors: '#6D747C', // set label color
      //     fontSize: '13px', // set label font size
      //     fontFamily: 'Inter', // set label font family
      //     fontWeight: 300, // set label font weight
      //   },
      //   rotate: 0,
      // },
      grid: {
        show: true,
        strokeDashArray: [5, 5],
        borderColor: '#',
        strokeOpacity: 0.5,
        position: 'back',
      },
    }
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
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
      // formatter: function (val) {
      //   return val === 0 ? "0" : val.toFixed();
      // },
      // enabled: true,
      // offsetY: -20,
      // style: {
      //   fontSize: "15px",
      //   colors: ["black"],
      // },
      enabled: true,
      enabledOnSeries: [0, 1], // enable for both bar and target series
      formatter: function (val, opts) {
        if (opts.seriesIndex === 1) {
          return `${val}`;
        }
        return val; // default bar value
      },
      offsetY: -16,
      style: {
        fontSize: '13px',
        colors: ['#000', '#ED0F0F'], // bar value and target value colors
      },
    },
    title: {
      text: title,
      style: {
        fontWeight: 500,
        fontSize: "16px", // Title font size
        color: "#444444", // Title color
      },
    },
    colors: [color],
  };

  const series = [
    {
      name: 'Data',
      type: 'bar',
      data: data?.map((val, index) => ({
        x: categories[index],
        y: val,
        goals: [
          {
            name: 'Target',
            value: target[index],
            strokeHeight: 3,
            strokeColor: '#ED0F0F',
          },
        ],
      })),
    },
    {
      name: 'Target Value',
      type: 'scatter',
      data: target?.map((tgt, index) => ({
        x: categories[index],
        y: tgt , // slight offset above the red line
      })),
    },
    // {
    //   name: 'Data',
    //   data: [
    //     {
    //       x: categories,
    //       y: data ? data?.[0] : [],
    //     goals: [
    //         {
    //           name: 'limit',
    //           value: target?.[0],
    //           strokeHeight: 5,
    //           strokeColor: '#ED0F0F'
    //         }
    //       ]
        
    //     },
    //     {
    //       x: categories,
    //       y: data ? data?.[1] : [],
    //     goals: [
    //         {
    //           name: 'limit',
    //           value: target?.[1],
    //           strokeHeight: 5,
    //           strokeColor: '#ED0F0F'
    //         }
    //       ]
        
    //     },
    //     {
    //       x: categories,
    //       y: data ? data?.[2] : [],
    //     goals: [
    //         {
    //           name: 'limit',
    //           value: target?.[2],
    //           strokeHeight: 5,
    //           strokeColor: '#ED0F0F'
    //         }
    //       ]
        
    //     },
    //     {
    //       x: categories,
    //       y: data ? data?.[3] : [],
    //     goals: [
    //         {
    //           name: 'limit',
    //           value: target?.[3],
    //           strokeHeight: 5,
    //           strokeColor: '#ED0F0F'
    //         }
    //       ]
        
    //     },
    //     {
    //       x: categories,
    //       y: data ? data?.[4] : [],
    //     goals: [
    //         {
    //           name: 'limit',
    //           value: target?.[4],
    //           strokeHeight: 5,
    //           strokeColor: '#ED0F0F'
    //         }
    //       ]
        
    //     }
      // ]
      // }
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height={height}
      style={{ width: width }}
    />
  );
};

export default MonthlyChart;


