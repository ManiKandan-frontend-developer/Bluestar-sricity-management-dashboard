import React from "react"
import ReactApexChart from "react-apexcharts"

class RadialBar extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [170],
        options: {
          chart: {
            height: 140,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                      offsetY: -100,
                      show: false,
                      color: '#fff',
                      fontSize: '17px',
                    },
                    value: {
                      color: '#495B68',
                      fontSize: '20px',
                      show: true,
                      offsetY: 30,
                    },
                   
                },
              hollow: {
                size: '40%',
              },
            //   track: {
            //     background: '#2196F3', // Change this to the desired color
            //   }
            },
          },
        //   title:{
        //     text:"IDU"
        //     },
        colors: [this.props?.color],
          labels: ['Cricket'],
        },
      
      
      };
    }

  

    render() {
      return (
        <div>
          <div id="chart">
            <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={160} />
          </div>
          {/* <div id="html-dist"></div> */}
        </div>
      );
    }
  }
  export default RadialBar