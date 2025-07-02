// import React from 'react';
// import ReactApexChart from 'react-apexcharts';
// class DonutChart extends React.Component {
//   constructor(props) {

//     super(props);

//     this.state = {
//       series: [
//         {
//           name: 'shift A',
//           data: this.props?.shiftA,
//         },
//         {
//           name: 'shift B',
//           data: this.props?.shiftB,
//         },
//         {
//             name: 'shift C',
//             data:this.props?.shiftC,
//           },
//       ],
//       // series: [1800, 2000, 1500],
//       options: {
//         chart: {
//           width: 380,
//           type: 'donut',
//         },
//         dataLabels: {
//           enabled: false,
//         },

//         responsive: [
//           {
//             breakpoint: 480,
//             options: {
//               chart: {
//                 width: 200,
//               },
//               legend: {
//                 show: false,
//               },
//             },
//           },
//         ],
//         legend: {
//           position: 'right',
//          offsetY:-7,
//          offsetX:2
//           // height: 230,
//         },
//         labels: ['Shift A', 'Shift B','Shift C'], // Labels colors: ['#FF5733', '#33FF57'],for each data
//         colors: ['#FFB800', '#33FF57',"#543DFF"],// Colors for each
//         annotations: {
//           // Annotations to display data values in the center
//           points: this.state?.series.map((item, index) => {
//             return {
//               x: '50%', // Center horizontally
//               y: '50%', // Center vertically
//               marker: {
//                 size: 0,
//               },
//               label: {
//                 text: `${item.data}`, // Display data value
//                 style: {
//                   fontSize: '22px',
//                   color: '#333', // Color of the text
//                   background: 'transparent', // Background color of the text box
//                 },
//               },
//             };
//           }),
//         },
//       },
//     };
//   }

 

//   render() {
//     console.log("props",this?.props)
//     return (
//       <div>
//         <div>
//           <div class="chart-wrap">
//             <div id="chart">
//               <ReactApexChart
//                 options={this.state.options}
//                 series={this.state.series?.map((e) => e.data)}
//                 type="donut"
//                 width={220}
//               />
//             </div>
//           </div>

         
//         </div>
//         <div id="html-dist"></div>
//       </div>
//     );
//   }
// }
// export default DonutChart;


import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const DonutChart = (props) => {
  console.log("props",props)
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      width: 380,
      type: 'donut',
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      position: 'right',
      offsetY: -7,
      offsetX: 2
    },
    labels: ['Shift A', 'Shift B', 'Shift C'],
    colors: ['#FFB800', '#33FF57', '#543DFF'],
    annotations: {
      points: series.map((item, index) => {
        return {
          x: '50%',
          y: '50%',
          marker: {
            size: 0,
          },
          label: {
            text: `${item.data}`,
            style: {
              fontSize: '22px',
              color: '#333',
              background: 'transparent',
            },
          },
        };
      }),
    },
  });

  useEffect(() => {
    setSeries([
      { name: 'shift A', data: props?.shiftA },
      { name: 'shift B', data: props?.shiftB },
      { name: 'shift C', data: props?.shiftC },
    ]);
  }, [props]);

  return (
    <div>
      <div>
        <div className="chart-wrap">
          <div id="chart">
            <ReactApexChart
              options={options}
              series={series.map((e) => e.data)}
              type="donut"
              width={220}
            />
          </div>
        </div>
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default DonutChart;

