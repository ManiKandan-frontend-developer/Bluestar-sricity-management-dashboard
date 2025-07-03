import React, { Component } from 'react';
import './App.css';
import { Col, Image, Row, Typography, Spin ,Button, Modal, Form, Input, message } from 'antd';
import Logo from './images/Bluestar logo.png';
import { CiBoxList } from "react-icons/ci";
import BarChart from './components/react-barchat';
import ThingworxService from './services/thingwork-service';
import MonthlyChart from './components/monthly-production-chart';
import VerticalGroupedBarChart from './components/stacked-bar';



const style = {
  childDiv: {
    boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.07)',
    borderRadius: '10px',
    background: '#FFFFFF',
    // width: '48%',
    // margin: "0 auto",
    // marginBottom: "4px",
   // maxHeight: '196px',
   // minHeight: '196px',
    // minHeight: 'calc(198vh / 7)',
    // maxHeight:'calc(198vh / 7)'
    minHeight: 'calc(85vh / 3)',
    maxHeight: 'calc(85vh / 3)',
    width:"97%",
    marginBottom:"10px"
  },
  childDiv1: {
    boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.07)',
    borderRadius: '10px',
    background: '#FFFFFF',
    // width: '48%',
    // margin: "0 auto",
    // marginBottom: "4px",
   // maxHeight: '196px',
   // minHeight: '196px',
    // minHeight: 'calc(198vh / 7)',
    // maxHeight:'calc(198vh / 7)'
    minHeight: 'calc(85vh / 3)',
    maxHeight: 'calc(85vh / 3)',
    width:"98.3%",
    marginBottom:"10px"
  },
  smallheader: {
    color: "#2D769F",
    fontSize: "17px",
    fontWeight: 600,
    paddingLeft: "13px"
  }
};
const lineColors = {
  IDU: "blue",
  ODU: "volcano",
  "IDU 2": "green",
  "ODU 2": "orange",
  CSAC: "purple",
};
const shifts1 = ["Shift A", "Shift B", "Shift C"];
const lines = Object.keys(lineColors);
class App extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
  
    const currentDate = new Date();

    // Get previous date by subtracting 1 day from the current date
    const previousDate = new Date(currentDate);
    previousDate.setDate(previousDate.getDate() - 1);

    // Get current month
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

    const currentYear = currentDate.getFullYear();

    // Set state with current date, previous date, and current month


    this.state = {
      // currentDate: currentDate.toLocaleDateString(),
      currentDate: new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      }).format(currentDate),
      previousDate: new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      }).format(previousDate),
     // previousDate: previousDate.toLocaleDateString(),
  

      currentMonth: currentMonth,
      currentYear:currentYear,
      monthwiseoee: [],
      MachineName: [],
      monthwisedowntime: [],
      MachineNamedowntime: [],
      isLoading: false,
      visible: false,
      // previousDate:"",
      // currentMonth:"",
    };

    //this.interval = setInterval(this.fetchData, 10000); // 10 seconds in milliseconds
  }
  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.formRef.current
      .validateFields()
      .then((values) => {
        console.log('Received values of form: ', values);
        if(values){
          this.thingworxService
      .getTarget({IDU_Target:values?.IDU, ODU_Target:values?.ODU,IDU2_Target:values?.IDU2,ODU2_Target:values?.ODU2,CSAC_Target:values?.CSAC})
      .then((response) => {
        if(response.data.rows?.[0]?.result === "Updated Successfully"){
         message.success("Updated Successfully")
        }
        // this.setState({ IDUdata: response.data.rows });
      })
      .catch((error) => {
        console.error("Error fetching Score: ", error);
      }); 
        }
        this.setState({
          visible: false,
        });
        this.formRef.current.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
 
  fetchLiveData=()=>{
    this.thingworxService.getLivePartCount().then((res)=>{
     console.log(res,"xxvbn") 
     this.setState({AllData:res.data?.rows},()=>{

     })
    })
  }
  fetchLiveDowntime=()=>{
  this.thingworxService.getLiveDowntime().then((res)=>{
    this.setState({AllDataDowntime:res.data?.rows},()=>{

    })
  })  
  }
  fetchLiveOEE=()=>{
    this.thingworxService.getLiveOEE().then((res)=>{
      this.setState({AllDataOEE:res.data?.rows},()=>{
  
      })
    })  
    }
    fetchLiveYest=()=>{
      this.thingworxService.getLiveYest().then((res)=>{
        this.setState({AllDataYest:res.data?.rows},()=>{
    
        })
      })  
      }
    
  

  fetchData = () => {
    this.fetchLiveData();
    this.fetchLiveDowntime();
    this.fetchLiveOEE();
    this.fetchLiveYest();
    // this.fetchIDULiveData();
    // this.fetchODULiveData();
    this.fetchLive_OEE_and_DT();
    this.fetchMonthData();
    this.fetchYestData();
    this.fetchMonthWiseDowntime();
    this.fetchMonthwiseOee();
    this.fetchIDULiveDowntimeHours();
    this.fetchODULiveDowntimeHours();
    this.fetchIDULiveOeePercentage();
    this.fetchODULiveOeePercentage();
  }
  // state={
  //   monthwiseoee:[],
  //   MachineName:[],
  //   monthwisedowntime:[],
  //   MachineNamedowntime:[],
  //   isLoading:false,
  //   previousDate:"",
  //   currentMonth:"",

  // }
  thingworxService = new ThingworxService();
  componentDidMount() {
    this.setState({ isLoading: true });
    this.startAutoRefresh();
    // this.setState((state) => ({ ...state, isLoading: true }));
    Promise.all([
      // this.fetchMachine(),
      this.fetchLiveData(),
      this.fetchLiveDowntime(),
      this.fetchLiveOEE(),
      this.fetchLiveYest(),
      // this.fetchIDULiveData(),
      // this.fetchODULiveData(),
      this.fetchLive_OEE_and_DT(),
      this.fetchMonthData(),
      this.fetchYestData(),
      this.fetchMonthWiseDowntime(),
      this.fetchMonthwiseOee(),
      this.fetchIDULiveDowntimeHours(),
      this.fetchODULiveDowntimeHours(),
      this.fetchIDULiveOeePercentage(),
    this.fetchODULiveOeePercentage()
    ]).then((response) => {
      // if(response){
      // //this.setState((state) => ({ ...state, isLoading: false }));



      // }
    });


  }
  startAutoRefresh = () => {
    this.refreshInterval = setInterval(() => {
      this.fetchData();
    }, 10000); // 10 minutes in milliseconds
  };

  // fetchMachine = () => {
  //   this.thingworxService
  //     .getMachineList()
  //     .then((response) => {
  //       console.log("data: ", response);
        
  //       // this.setState({ IDUdata: response.data.rows });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching Score: ", error);
  //     });
  // };


  fetchIDULiveOeePercentage = () => {
    this.thingworxService
      .getIDU_LivePartOee()
      .then((response) => {
        this.setState({ IDULiveOeePercentage: response.data.rows });
      })
      .catch((error) => {
        console.error("Error fetching Score: ", error);
      });
  };

  fetchODULiveOeePercentage = () => {
    this.thingworxService
      .getODU_LivePartOee()
      .then((response) => {
        this.setState({ ODULiveOeePercentage: response.data.rows });
      })
      .catch((error) => {
        console.error("Error fetching Score: ", error);
      });
  };



  fetchIDULiveData = () => {
    this.thingworxService
      .getIDU_LivePartCount()
      .then((response) => {
        this.setState({ IDUdata: response.data.rows });
      })
      .catch((error) => {
        console.error("Error fetching Score: ", error);
      });
  };

  fetchIDULiveDowntimeHours = () => {
    this.thingworxService
      .getIDU_LivePartDowntimeHours()
      .then((response) => {
        this.setState({ IDUdowntimeHours: response.data.rows });
      })
      .catch((error) => {
        console.error("Error fetching Score: ", error);
      });
  };

  fetchODULiveDowntimeHours = () => {
    this.thingworxService
      .getODU_LivePartDowntimeHours()
      .then((response) => {
        this.setState({ ODUdowntimeHours: response.data.rows });
      })
      .catch((error) => {
        console.error("Error fetching Score: ", error);
      });
  };


  fetchODULiveData = () => {
    this.thingworxService
      .getGetODU_LivePartCount()
      .then((response) => {
        this.setState({ ODUdata: response.data.rows });
      })
      .catch((error) => {
        console.error("Error fetching Score: ", error);
      });
  };
  fetchYestData = () => {
    this.thingworxService
      .getYestData()
      .then((response) => {
        this.setState({
          dailyProduction: response.data.rows,
          dailyProdDate: response.data.rows[0].Date.replace(/-/g, '/'),
        });
        
        if(this.state?.dailyProduction){
          const shiftAIDU = this.state?.dailyProduction?.find((e) => {
            return e.MachineName === "IDU Line" && e.Shift === "Shift A";
        });
        const shiftBIDU = this.state?.dailyProduction?.find((e) => {
          return e.MachineName === "IDU Line" && e.Shift === "Shift B";
      });
      const shiftCIDU = this.state?.dailyProduction?.find((e) => {
        return e.MachineName === "IDU Line" && e.Shift === "Shift C";
    });
    const shiftAODU = this.state?.dailyProduction?.find((e) => {
      return e.MachineName === "ODU Line" && e.Shift === "Shift A";
  });
  const shiftBODU = this.state?.dailyProduction?.find((e) => {
    return e.MachineName === "ODU Line" && e.Shift === "Shift B";
});
const shiftCODU = this.state?.dailyProduction?.find((e) => {
  return e.MachineName === "ODU Line" && e.Shift === "Shift C";
});
        this.setState({shiftAIDU:shiftAIDU?.PartCount,shiftBIDU:shiftBIDU?.PartCount,shiftCIDU:shiftCIDU?.PartCount,shiftAODU:shiftAODU?.PartCount,shiftBODU:shiftBODU?.PartCount,shiftCODU:shiftCODU?.PartCount})
        // console.log(shiftA,"shiftA")
        //  if(MachineName ){

        //  }  
        }
      })
      .catch((error) => {
        console.error("Error fetching Score: ", error);
      });
  };
  fetchLive_OEE_and_DT = () => {
    this.thingworxService
      .getGet_Live_OEE_and_DT()
      .then((response) => {
        this.setState({ LiveOee: response.data.rows });
      })
      .catch((error) => {
        console.error("Error fetching Score: ", error);
      });
  };
  fetchMonthData = () => {
    this.thingworxService
      .getMonthData()
      .then((response) => {
        const monthgraphdata = response.data.rows?.map((e) => {
          return e.SUM_PartCount;
      }); 
      const monthgraphTarget = response.data.rows?.map((e) => {
        return e.Target;
    }); 
        this.setState({
          monthgraphdata:monthgraphdata,
          monthgraphTarget:monthgraphTarget,
          
          monthdata: response.data.rows,
          monthTargetIdu: response.data.rows[0].Target,
          monthTargetOdu: response.data.rows[1].Target,
         });
        if(this.state?.monthdata){
          const shiftAIDU = this.state?.monthdata?.find((e) => {
            return e.MachineName === "IDU Line" && e.Shift === "Shift A";
        });
        const shiftBIDU = this.state?.monthdata?.find((e) => {
          return e.MachineName === "IDU Line" && e.Shift === "Shift B";
      });
      const shiftCIDU = this.state?.monthdata?.find((e) => {
        return e.MachineName === "IDU Line" && e.Shift === "Shift C";
    });
    const shiftAODU = this.state?.monthdata?.find((e) => {
      return e.MachineName === "ODU Line" && e.Shift === "Shift A";
  });
  const shiftBODU = this.state?.monthdata?.find((e) => {
    return e.MachineName === "ODU Line" && e.Shift === "Shift B";
});
const shiftCODU = this.state?.monthdata?.find((e) => {
  return e.MachineName === "ODU Line" && e.Shift === "Shift C";
});
        this.setState({shiftAIDUMonth:shiftAIDU?.SUM_PartCount,shiftBIDUMonth:shiftBIDU?.SUM_PartCount,shiftCIDUMonth:shiftCIDU?.SUM_PartCount,shiftAODUMonth:shiftAODU?.SUM_PartCount,shiftBODUMonth:shiftBODU?.SUM_PartCount,shiftCODUMonth:shiftCODU?.SUM_PartCount})
        // console.log(shiftA,"shiftA")
        //  if(MachineName ){

        //  }  
        }
      })
      .catch((error) => {
        console.error("Error fetching Score: ", error);
      });
  };
  fetchMonthWiseDowntime = () => {
    this.thingworxService
      .getMonthwiseDowntime()
      .then((response) => {
        let monthwisedowntime = response?.data?.rows?.map(
          (obj) => obj.SUM_Downtime

        );
        let MachineName = response?.data?.rows?.map(
          (obj) => obj.MachineName
        );

        this.setState({ monthwisedowntime: monthwisedowntime, MachineNamedowntime: MachineName });
      })
      .catch((error) => {
        console.error("Error fetching Score: ", error);
      });
  };
  fetchMonthwiseOee = () => {
    this.thingworxService
      .getMonthwiseOee()
      .then((response) => {
        if (response) {
          this.setState({ isLoading: false });
        }
        let monthwiseoee = response?.data?.rows?.map(
          (obj) => obj.AVERAGE_OEE
        );
        let MachineName = response?.data?.rows?.map(
          (obj) => obj.MachineName
        );

        this.setState({ monthwiseoee: monthwiseoee, MachineName: MachineName });
      })
      .catch((error) => {
        console.error("Error fetching Score: ", error);
      });
  };
  formatPercent = (percent) => {
    if (percent > 100) {
      return (
        <div>
          <span>{`${percent - 100}%`}</span>
          <span style={{ fontSize: '12px', color: '#8B908F' }}>+100%</span>
        </div>
      );
    }
    return `${percent}%`;
  };
  normalizeShift = (shift) => {
    if (!shift || shift === "N/A") return "";
    const [first, ] = shift.trim().split(" ");
    return `Shift ${first}`;
  }
   buildMatrix = (data) => {
    return shifts1?.map((shift) => {
      const row = { shift };
      lines?.forEach((line) => {
        const found = data?.find(
          (d) => d.Shift === shift && d.MachineName.includes(line)
        );
        row[line] = found?.PartCount || 0;
      });
      return row;
    });
  };
  render() {
    console.log("monthdata",this.state?.monthdata)
    console.log("sujithtarget: ", this.state.dailyProdDate)
    const categories = ["IDU", "ODU", "IDU2", "ODU2", "CSAC"];
const shifts = ["AShift", "BShift", "CShift"];


const shiftLabels = ["Shift A", "Shift B", "Shift C"];
const data = this.state?.AllData?.[0] || {};
const livedowntime = this.state?.AllDataDowntime?.[0] || {};
const liveOee = this.state?.AllDataOEE?.[0] || {};


// Use IDU_CurrShift globally for blinking
const rawShift = data?.IDU_CurrShift || "N/A";
const currentShift = this.normalizeShift(rawShift);
const labelMap = {
  IDU: "IDU",
  ODU: "ODU",
  IDU2: "IDU 2",
  ODU2: "ODU 2",
  CSAC: "CSAC"
};

 
   

    console.log("this.state?.ODUdata?.[1]?.BShift_Count", this.state?.ODUdata)

    return (
      <div style={{ background: '#FAFAFA' }}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:"10px"}}>
        <div>
          <Image src={Logo} preview={false} />
        </div>
        <div style={{ display: 'flex', gap: '5px', paddingTop: '0.3%', alignItems: "center",paddingRight:"12px" }}>
          <CiBoxList size={18} color='#004E9F' style={{ fontWeight: 600 }} />
          <Typography
            style={{
              fontFamily: 'Inter',
              fontSize: '18px',
              fontWeight: 600,
              color: '#004E9F',
            }}
          >
            MANAGEMENT DASHBOARD OVERVIEW
          </Typography>
        </div>
        <div style={{ display: 'flex', gap: '5px', paddingTop: '0.3%', alignItems: "center",paddingRight:"12px" }}>
        <Button style={{height:"25px",width:"70px",display:"flex",justifyContent:"center",alignItems:"center",background:"#004E9F",color:"white",padding:"10px"}} onClick={this.showModal}>
          Target
        </Button>
        </div>
        </div>
        {this.state?.isLoading ? (
          <span style={{ height: "85vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Spin size="large" />
          </span>
        ) : (
           <>
        
            <Row  style={{ display: "flex", justifyContent: "space-around" ,flexWrap: "wrap",paddingLeft:"12px"}}>
              <Col xs={24} sm={12} lg={8} >
                <div style={style.childDiv}>
                  <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", paddingRight: "26px" }}>
                    <Typography style={style.smallheader}>REALTIME PRODUCTION</Typography>
                    <Typography style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 400, color: "#8B908F" }}>{this.state?.currentDate}</Typography>
                  </div>
                  {/* <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div style={{ width: "30%" }}>
                      <Typography style={{ marginBottom: "1px", fontFamily: "Inter", color: "#495B68", fontSize: "16px", fontWeight: 600 }}>IDU</Typography>
                      
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#8B908F", fontSize: "15px" }} className={this.state?.IDUdata?.[0]?.Curr_Shift == "A Shift" ? "blink" : ""}>Shift A</Typography></div>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#2C4F9C", fontSize: "18px" }}>{this.state?.IDUdata?.[0]?.AShift_Count}</Typography></div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#8B908F", fontSize: "15px" }} className={this.state?.IDUdata?.[0]?.Curr_Shift == "B Shift" ? "blink" : ""}>Shift B</Typography></div>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#2C4F9C", fontSize: "18px" }}>{this.state?.IDUdata?.[0]?.BShift_Count ? this.state?.IDUdata?.[0]?.BShift_Count : 0}</Typography></div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#8B908F", fontSize: "15px" }} className={this.state?.IDUdata?.[0]?.Curr_Shift == "C Shift" ? "blink" : ""}>Shift C</Typography></div>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#2C4F9C", fontSize: "18px" }}>{this.state?.IDUdata?.[0]?.CShift_Count ? this.state?.IDUdata?.[0]?.CShift_Count : 0}</Typography></div>
                      </div>
                    </div>
                    <Divider type='vertical' style={{ height: "122px" }} />
                    <div style={{ width: "30%" }}>
                      <Typography style={{ marginBottom: "1px", fontFamily: "Inter", color: "#495B68", fontSize: "16px", fontWeight: 600 }}>ODU</Typography>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#8B908F", fontSize: "15px" }} className={this.state?.IDUdata?.[0]?.Curr_Shift == "A Shift" ? "blink" : ""}>Shift A</Typography></div>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#2C4F9C", fontSize: "18px" }}>{this.state?.ODUdata?.[0]?.AShift_Count ? this.state?.ODUdata?.[0]?.AShift_Count : 0}</Typography></div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#8B908F", fontSize: "15px" }} className={this.state?.IDUdata?.[0]?.Curr_Shift == "B Shift" ? "blink" : ""}>Shift B</Typography></div>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#2C4F9C", fontSize: "18px" }}>{this.state?.ODUdata?.[0]?.BShift_Count ? this.state?.ODUdata?.[0]?.BShift_Count : 0}</Typography></div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#8B908F", fontSize: "15px" }} className={this.state?.IDUdata?.[0]?.Curr_Shift == "C Shift" ? "blink" : ""}>Shift C</Typography></div>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#2C4F9C", fontSize: "18px" }}>{this.state?.ODUdata?.[0]?.CShift_Count ? this.state?.ODUdata?.[0]?.CShift_Count : 0}</Typography></div>
                      </div>
                    </div>
                  </div> */}
<div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
  {/* First column - Shift labels */}
  <div style={{marginBottom: "12px",marginLeft:"5px" }}>
    <Typography
      style={{
        marginBottom: "6px",
        fontFamily: "Inter",
        color: "#495B68",
        fontSize: "16px",
        fontWeight: 600,
      }}
    >
      Shift
    </Typography>
    {shiftLabels.map((label, idx) => (
      <div key={idx} style={{ marginBottom: "10px" }}>
        <Typography
          className={currentShift === label ? "blink" : ""}
          style={{
            fontFamily: "Inter",
            fontWeight: 600,
            color: "#8B908F",
            fontSize: "16px",
          }}
        >
          {label}
        </Typography>
      </div>
    ))}
  </div>

  {/* Category columns */}
  {categories.map((cat, index) => (
    <div key={index} style={{  marginBottom: "12px" }}>
      <Typography
        style={{
          marginBottom: "6px",
          fontFamily: "Inter",
          color: "#495B68",
          fontSize: "16px",
          fontWeight: 600,
          textAlign:"center"
        }}
      >
        {labelMap[cat] || cat}
      </Typography>

      {shifts.map((shift, idx) => {
        const key = `${cat}_${shift}`;
        const value = data?.[key] ?? 0;

        return (
          <div key={shift} style={{ marginBottom: "6px" }}>
            <Typography
              style={{
                fontFamily: "Inter",
                fontWeight: 600,
                color: "#2C4F9C",
                fontSize: "18px",
                textAlign:"center"
              }}
            >
              {value}
            </Typography>
          </div>
        );
      })}
    </div>
  ))}
</div>


                </div>
              </Col>
              <Col xs={24} sm={12} lg={8} >
                <div style={style.childDiv}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingRight: "26px" }}>
                    <Typography style={style.smallheader}>YESTERDAY PRODUCTION</Typography>
                    <Typography style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 400, color: "#8B908F" }}> {this.state?.dailyProdDate}</Typography>
                  </div>
                  <VerticalGroupedBarChart data={this.state?.AllDataYest}/>

                  {/* <Row style={{ fontWeight: 600, marginBottom: 8 }}>
        <Col span={4}></Col>
        {lines?.map((line) => (
          <Col span={4} key={line} style={{ textAlign: "center" }}>
            <Tag color={lineColors[line]}>{line}</Tag>
          </Col>
        ))}
      </Row>

      {/* Data rows: shift + values */}
      {/* {matrix?.map((row) => (
        <Row key={row.shift} style={{ marginBottom: 8,padding:"5px 3px 0px 5px" }}>
          <Col span={4}>
            <Typography
          //className={currentShift === row.shift ? "blink" : ""}
          style={{
            fontFamily: "Inter",
            fontWeight: 600,
            color: "#8B908F",
            fontSize: "16px",
          }}
        >
          {row.shift}
        </Typography>
          </Col>
          {lines?.map((line) => (
            <Col span={4} key={line} style={{ textAlign: "center", color: row[line] > 0 ? "#003366" : "#888" }}>
              
              <Typography
              style={{
                fontFamily: "Inter",
                fontWeight: 600,
                color: "#2C4F9C",
                fontSize: "18px",
                textAlign:"center"
              }}
            >
              {row[line]}
            </Typography>
            </Col>
          ))}
        </Row>
      ))}  */}
                  {/* <div style={{ display: "flex", justifyContent: "space-evenly" }}>

                    <div style={{ width: "30%" }}>
                      <Typography style={{ fontFamily: "Inter", color: "#495B68", fontSize: "16px", fontWeight: 600 }}>IDU</Typography>
                   
                      <span style={{position:"relative",right:"37px"}}>
                      <DonutChart 
                      shiftA={this.state?.shiftAIDU  ? this.state?.shiftAIDU : 0 }
                      shiftB={this.state?.shiftBIDU  ? this.state?.shiftBIDU : 0 }
                      shiftC={this.state?.shiftCIDU  ? this.state?.shiftCIDU : 0 }
                      />
                      </span>
                      <div style={{width:"200px",position:"relative",right:"33px",display:"flex",justifyContent:"space-evenly"}}>
                        <div style={{display:"flex",gap:"5px"}}>
                        <Typography style={{color:'#FFB800',fontWeight:"bolder",fontFamily: "Inter"}}>A</Typography> 
                        <Typography style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 400 }}>{this.state?.shiftAIDU  ? this.state?.shiftAIDU : 0 }</Typography>
                        </div>
                        <div style={{display:"flex",gap:"5px"}}>
                        <Typography style={{color:'#33FF57',fontWeight:"bolder",fontFamily: "Inter"}}>B</Typography> 
                        <Typography style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 400 }}>{this.state?.shiftBIDU  ? this.state?.shiftBIDU : 0 }</Typography>
                        </div>
                        <div style={{display:"flex",gap:"5px"}}>
                        <Typography style={{color:'#543DFF',fontWeight:"bolder",fontFamily: "Inter"}} >C</Typography> 
                        <Typography style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 400 }}>{this.state?.shiftCIDU  ? this.state?.shiftCIDU : 0 }</Typography>
                        </div>
                     
                      </div>

                      
                    </div>
                    <Divider type='vertical' style={{ height: "122px" }} />

                    <div style={{ width: "30%" }}>
                      <Typography style={{ fontFamily: "Inter", color: "#495B68", fontSize: "16px", fontWeight: 600 }}>ODU</Typography>
                     
                      <span style={{position:"relative",right:"37px"}}>
                       <DonutChart
                         shiftA={this.state?.shiftAODU  ? this.state?.shiftAODU : 0 }
                         shiftB={this.state?.shiftBODU  ? this.state?.shiftBODU : 0 }
                         shiftC={this.state?.shiftCODU  ? this.state?.shiftCODU : 0 }
                       />
                       </span>
                       <div style={{width:"200px",position:"relative",right:"33px",display:"flex",justifyContent:"space-evenly"}}>
                        <div style={{display:"flex",gap:"5px"}}>
                        <Typography style={{color:'#FFB800',fontWeight:"bolder",fontFamily: "Inter"}}>A</Typography> 
                        <Typography style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 400 }}>{this.state?.shiftAODU  ? this.state?.shiftAODU : 0 }</Typography>
                        </div>
                        <div style={{display:"flex",gap:"5px"}}>
                        <Typography style={{color:'#33FF57',fontWeight:"bolder",fontFamily: "Inter"}}>B</Typography> 
                        <Typography style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 400 }}>{this.state?.shiftBODU  ? this.state?.shiftBODU : 0 }</Typography>
                        </div>
                        <div style={{display:"flex",gap:"5px"}}>
                        <Typography style={{color:'#543DFF',fontWeight:"bolder",fontFamily: "Inter"}} >C</Typography> 
                        <Typography style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 400 }}>{this.state?.shiftCODU  ? this.state?.shiftCODU : 0 }</Typography>
                        </div>
                       
                      </div>
                      
                    </div>
                  </div> */}
                 
                </div>
              </Col>
              <Col xs={24} sm={12} lg={8} >
                <div style={style.childDiv}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingRight: "26px" }}>
                    <Typography style={style.smallheader}>MONTHLY PRODUCTION</Typography>
                    
                    <Typography style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 400, color: "#8B908F" }}>{this.state?.currentMonth} {this.state?.currentYear}</Typography>
                  </div>
                  <MonthlyChart color={"#009FFF"} 
                //  data={this.state?.monthdata?.[0]?.SUM_PartCount ? this.state?.monthdata?.[0]?.SUM_PartCount : "0"} 
                //   target={this.state?.monthdata?.[0]?.Target ? this.state?.monthdata?.[0]?.Target : "0"} />  
                  data={this.state?.monthgraphdata ? this.state?.monthgraphdata : []} 
                   target={this.state?.monthgraphTarget ? this.state?.monthgraphTarget : []} 
                   categories={["IDU","ODU","IDU2","ODU2","CSAC"]}/> 
                  {/* <div style={{ display: "flex", justifyContent: "space-evenly" }}>

                    <div style={{ width: "30%" }}>
                      <Typography style={{ fontFamily: "Inter", color: "#495B68", fontSize: "16px", fontWeight: 600 }}>IDU</Typography>
                   
                       <span style={{position:"relative",right:"37px",top:"-13%"}}>
                       {/* <MonthlyChart color={"#543DFF"} data={this.state?.monthdata?.[0]?.SUM_PartCount ? this.state?.monthdata?.[0]?.SUM_PartCount : 0} categories={["IDU"]}/> */}
                       {/* <MonthlyChart color={"#009FFF"} data={this.state?.monthdata?.[0]?.SUM_PartCount ? this.state?.monthdata?.[0]?.SUM_PartCount : "0"} target={this.state?.monthdata?.[0]?.Target ? this.state?.monthdata?.[0]?.Target : "0"}   categories={["IDU"]}/> */}
                    
                      {/* </span> */}
                       
                      
                     
                    {/* </div>
                    <Divider type='vertical' style={{ height: "122px" }} />

                    <div style={{ width: "30%" }}>
                      <Typography style={{ fontFamily: "Inter", color: "#495B68", fontSize: "16px", fontWeight: 600 }}>ODU</Typography>
                     
                      
                      <span style={{position:"relative",right:"37px",top:"-13%"}}>
                       <MonthlyChart color={"#009FFF"} 
                       data={this.state?.monthdata?.[1]?.SUM_PartCount ? this.state?.monthdata?.[1]?.SUM_PartCount : "0"}
                        target={this.state?.monthdata?.[1]?.Target ? this.state?.monthdata?.[1]?.Target : "0"}   
                          categories={["ODU"]}/>
                      
                       </span>
                  
                    </div> */}
                  {/* </div>  */}
                  {/* <div style={{marginTop:"-13%", display:"flex", justifyContent:"space-around"}}>
                    <Col>
                    <Row style={{ display:"flex", alignContent:"center", alignItems:"center", justifyContent:"center"}}>
                      <Col>
                      <MinusOutlined style={{color:"red", height:"6px", width:"25px", background:"red"}} />
                      </Col>
                      <Col>
                       <Typography style={{fontSize:"15px"}}>Target: {this.state.monthTargetIdu}</Typography>
                       
                      </Col>
                      </Row>
                      </Col>
                      <Col>
                      <Row style={{display:"flex", justifyContent:"center", alignContent:"center", alignItems:"center"}}>
                      <Col>
                      
                    <MinusOutlined style={{color:"red", height:"6px", width:"25px", background:"red"}} />
                    </Col>
                    <Col>
                     <Typography style={{fontSize:"15px"}}>Target: {this.state?.monthTargetOdu}</Typography> 
                     </Col>
                      </Row>
                      </Col>
                      </div> */}
                     
                </div>
              </Col>
            </Row>
            <Row   style={{display: "flex", justifyContent: "space-around" ,flexWrap: "wrap",paddingLeft:"12px"}}>
              <Col xs={24} sm={12} lg={8}  >
                <div style={style.childDiv}>
                <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", paddingRight: "26px" }}>
                    <Typography style={style.smallheader}>LIVE OEE</Typography>
                   {/* <Typography style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 400, color: "#8B908F" }}>{this.state?.currentDate}</Typography> */}
                  </div>
                  {/* <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div style={{ width: "30%" }}>
                      <Typography style={{ marginBottom: "1px", fontFamily: "Inter", color: "#495B68", fontSize: "16px", fontWeight: 600 }}>IDU</Typography>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#8B908F", fontSize: "15px" }} className={this.state?.IDUdata?.[0]?.Curr_Shift == "A Shift" ? "blink" : ""}>Shift A</Typography></div>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#2C4F9C", fontSize: "18px" }}>{this.state?.IDULiveOeePercentage?.[0]?.AShift_OEE ? this.state?.IDULiveOeePercentage?.[0]?.AShift_OEE : 0 }%</Typography></div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#8B908F", fontSize: "15px" }} className={this.state?.IDUdata?.[0]?.Curr_Shift == "B Shift" ? "blink" : ""}>Shift B</Typography></div>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#2C4F9C", fontSize: "18px" }}>{this.state?.IDULiveOeePercentage?.[0]?.BShift_OEE ? this.state?.IDULiveOeePercentage?.[0]?.BShift_OEE : 0}%</Typography></div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#8B908F", fontSize: "15px" }} className={this.state?.IDUdata?.[0]?.Curr_Shift == "C Shift" ? "blink" : ""}>Shift C</Typography></div>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#2C4F9C", fontSize: "18px" }}>{this.state?.IDULiveOeePercentage?.[0]?.CShift_OEE ? this.state?.IDULiveOeePercentage?.[0]?.CShift_OEE : 0}%</Typography></div>
                      </div>
                    </div>
                    <Divider type='vertical' style={{ height: "122px" }} />
                    <div style={{ width: "30%" }}>
                      <Typography style={{ marginBottom: "1px", fontFamily: "Inter", color: "#495B68", fontSize: "16px", fontWeight: 600 }}>ODU</Typography>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#8B908F", fontSize: "15px" }} className={this.state?.IDUdata?.[0]?.Curr_Shift == "A Shift" ? "blink" : ""}>Shift A</Typography></div>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#2C4F9C", fontSize: "18px" }}>{this.state?.ODULiveOeePercentage?.[0]?.AShift_OEE ? this.state?.ODULiveOeePercentage?.[0]?.AShift_OEE : 0 }%</Typography></div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#8B908F", fontSize: "15px" }} className={this.state?.IDUdata?.[0]?.Curr_Shift == "B Shift" ? "blink" : ""}>Shift B</Typography></div>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#2C4F9C", fontSize: "18px" }}>{this.state?.ODULiveOeePercentage?.[0]?.BShift_OEE ? this.state?.ODULiveOeePercentage?.[0]?.BShift_OEE : 0 }%</Typography></div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#8B908F", fontSize: "15px" }} className={this.state?.IDUdata?.[0]?.Curr_Shift == "C Shift" ? "blink" : ""}>Shift C</Typography></div>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#2C4F9C", fontSize: "18px" }}>{this.state?.ODULiveOeePercentage?.[0]?.CShift_OEE ? this.state?.ODULiveOeePercentage?.[0]?.CShift_OEE : 0 }%</Typography></div>
                      </div>
                    </div>
                  </div>
                </div> */}
                                  <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
  {/* First column - Shift labels */}
  <div style={{marginBottom: "12px",marginLeft:"5px" }}>
    <Typography
      style={{
        marginBottom: "6px",
        fontFamily: "Inter",
        color: "#495B68",
        fontSize: "16px",
        fontWeight: 600,
      }}
    >
      Shift
    </Typography>
    {shiftLabels.map((label, idx) => (
      <div key={idx} style={{ marginBottom: "10px" }}>
        <Typography
          className={currentShift === label ? "blink" : ""}
          style={{
            fontFamily: "Inter",
            fontWeight: 600,
            color: "#8B908F",
            fontSize: "16px",
          }}
        >
          {label}
        </Typography>
      </div>
    ))}
  </div>

  {/* Category columns */}
  {categories.map((cat, index) => (
    <div key={index} style={{  marginBottom: "12px" }}>
      <Typography
        style={{
          marginBottom: "6px",
          fontFamily: "Inter",
          color: "#495B68",
          fontSize: "16px",
          fontWeight: 600,
          textAlign:"center"
        }}
      >
        {labelMap[cat] || cat}
      </Typography>

      {shifts.map((shift, idx) => {
        const key = `${cat}_${shift}`;
        const value = liveOee?.[key] ?? 0;

        return (
          <div key={shift} style={{ marginBottom: "6px" }}>
            <Typography
              style={{
                fontFamily: "Inter",
                fontWeight: 600,
                color: "#2C4F9C",
                fontSize: "18px",
                textAlign:"center"
              }}
            >
              {value}
            </Typography>
          </div>
        );
      })}
    </div>
  ))}
</div>
</div>
                
              </Col>
              <Col xs={24} sm={12} lg={16} >
                <div style={style.childDiv1}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingRight: "26px" }}>
                    <Typography style={style.smallheader}>DEPARTMENT WISE OEE%</Typography>
                    <Typography style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 400, color: "#8B908F" }}>{this.state?.currentMonth} {this.state?.currentYear}</Typography>
                  </div>
                  <BarChart color={"#009FFF"} data={this.state?.monthwiseoee} categories={this.state?.MachineName} />
                </div>
              </Col>
            </Row>
            <Row   style={{ display: "flex", justifyContent: "space-around",flexWrap: "wrap",paddingLeft:"12px" }}>
              <Col xs={24} sm={12} lg={8} >
                <div style={style.childDiv}>
                  <div style={{ marginBottom: "10px" }}>
                    <Typography style={style.smallheader}>LIVE DOWNTIME (Mins)</Typography>
                  </div>
                  {/* <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div style={{ width: "30%" }}>
                      <Typography style={{ marginBottom: "1px", fontFamily: "Inter", color: "#495B68", fontSize: "16px", fontWeight: 600 }}>IDU</Typography>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#8B908F", fontSize: "15px" }} className={this.state?.IDUdata?.[0]?.Curr_Shift == "A Shift" ? "blink" : ""}>Shift A</Typography></div>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#2C4F9C", fontSize: "18px" }}>{this.state?.IDUdowntimeHours?.[0]?.AShift_DT ? this.state?.IDUdowntimeHours?.[0]?.AShift_DT : 0 }</Typography></div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#8B908F", fontSize: "15px" }} className={this.state?.IDUdata?.[0]?.Curr_Shift == "B Shift" ? "blink" : ""}>Shift B</Typography></div>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#2C4F9C", fontSize: "18px" }}>{this.state?.IDUdowntimeHours?.[0]?.BShift_DT ? this.state?.IDUdowntimeHours?.[0]?.BShift_DT : 0}</Typography></div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#8B908F", fontSize: "15px" }} className={this.state?.IDUdata?.[0]?.Curr_Shift == "C Shift" ? "blink" : ""}>Shift C</Typography></div>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#2C4F9C", fontSize: "18px" }}>{this.state?.IDUdowntimeHours?.[0]?.CShift_DT ? this.state?.IDUdowntimeHours?.[0]?.CShift_DT : 0}</Typography></div>
                      </div>
                    </div>
                    <Divider type='vertical' style={{ height: "122px" }} />
                    <div style={{ width: "30%" }}>
                      <Typography style={{ marginBottom: "1px", fontFamily: "Inter", color: "#495B68", fontSize: "16px", fontWeight: 600 }}>ODU</Typography>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#8B908F", fontSize: "15px" }} className={this.state?.IDUdata?.[0]?.Curr_Shift == "A Shift" ? "blink" : ""}>Shift A</Typography></div>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#2C4F9C", fontSize: "18px" }}>{this.state?.ODUdowntimeHours?.[0]?.AShift_DT ? this.state?.ODUdowntimeHours?.[0]?.AShift_DT : 0 }</Typography></div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#8B908F", fontSize: "15px" }} className={this.state?.IDUdata?.[0]?.Curr_Shift == "B Shift" ? "blink" : ""}>Shift B</Typography></div>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#2C4F9C", fontSize: "18px" }}>{this.state?.ODUdowntimeHours?.[0]?.BShift_DT ? this.state?.ODUdowntimeHours?.[0]?.BShift_DT : 0 }</Typography></div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#8B908F", fontSize: "15px" }} className={this.state?.IDUdata?.[0]?.Curr_Shift == "C Shift" ? "blink" : ""}>Shift C</Typography></div>
                        <div><Typography style={{ fontFamily: "Inter", fontWeight: 600, color: "#2C4F9C", fontSize: "18px" }}>{this.state?.ODUdowntimeHours?.[0]?.CShift_DT ? this.state?.ODUdowntimeHours?.[0]?.CShift_DT : 0 }</Typography></div>
                      </div>
                    </div>
                  </div> */}
                  <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
  {/* First column - Shift labels */}
  <div style={{marginBottom: "12px",marginLeft:"5px" }}>
    <Typography
      style={{
        marginBottom: "6px",
        fontFamily: "Inter",
        color: "#495B68",
        fontSize: "16px",
        fontWeight: 600,
      }}
    >
      Shift
    </Typography>
    {shiftLabels.map((label, idx) => (
      <div key={idx} style={{ marginBottom: "10px" }}>
        <Typography
          className={currentShift === label ? "blink" : ""}
          style={{
            fontFamily: "Inter",
            fontWeight: 600,
            color: "#8B908F",
            fontSize: "16px",
          }}
        >
          {label}
        </Typography>
      </div>
    ))}
  </div>

  {/* Category columns */}
  {categories.map((cat, index) => (
    <div key={index} style={{  marginBottom: "12px" }}>
      <Typography
        style={{
          marginBottom: "6px",
          fontFamily: "Inter",
          color: "#495B68",
          fontSize: "16px",
          fontWeight: 600,
          textAlign:"center"
        }}
      >
        {labelMap[cat] || cat}
      </Typography>

      {shifts.map((shift, idx) => {
        const key = `${cat}_${shift}`;
        const value = livedowntime?.[key] ?? 0;

        return (
          <div key={shift} style={{ marginBottom: "6px" }}>
            <Typography
              style={{
                fontFamily: "Inter",
                fontWeight: 600,
                color: "#2C4F9C",
                fontSize: "18px",
                textAlign:"center"
              }}
            >
              {value}
            </Typography>
          </div>
        );
      })}
    </div>
  ))}
</div>
               
                </div>
              </Col>
              <Col xs={24} sm={12} lg={16} span={8}>
                <div style={style.childDiv1}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingRight: "26px" }}>
                    <Typography style={style.smallheader}>DEPARTMENT WISE DOWNTIME (HOURS)</Typography>
                    <Typography style={{ fontFamily: "Inter", fontSize: "14px", fontWeight: 400, color: "#8B908F" }}>{this.state?.currentMonth} {this.state?.currentYear}</Typography>
                  </div>
                  <BarChart color={"#de1414"} data={this.state?.monthwisedowntime} categories={this.state?.MachineNamedowntime} />
                </div>
              </Col>
            </Row>
            <Modal
            width={400}
          title="MONTHLY PRODUCTION"
          open={this.state.visible}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
          onCancel={this.handleCancel}
        >
          <Form
           style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}
            ref={this.formRef}
            layout="vertical"
            name="popup_form"
            initialValues={{
              field1: '',
              field2: '',
            }}
          >
            <Form.Item
              name="IDU"
              label="IDU Target"
              rules={[
                {
                  required: true,
                  message: 'Please enter idu target!',
                },
              ]}
            >
              <Input autoComplete='off' style={{width:"300px"}} />
            </Form.Item>
            <Form.Item
              name="ODU"
              label="ODU Target"
              rules={[
                {
                  required: true,
                  message: 'Please enter odu target!',
                },
              ]}
            >
              <Input autoComplete='off'  style={{width:"300px"}}/>
            </Form.Item>
            <Form.Item
              name="IDU2"
              label="IDU 2 Target"
              rules={[
                {
                  required: true,
                  message: 'Please enter Idu 2 target!',
                },
              ]}
            >
              <Input autoComplete='off'  style={{width:"300px"}}/>
            </Form.Item>
            <Form.Item
              name="ODU2"
              label="ODU 2 Target"
              rules={[
                {
                  required: true,
                  message: 'Please enter odu 2 target!',
                },
              ]}
            >
              <Input autoComplete='off'  style={{width:"300px"}}/>
            </Form.Item>
            <Form.Item
              name="CSAC"
              label="CSAC Target"
              rules={[
                {
                  required: true,
                  message: 'Please enter CSAC target!',
                },
              ]}
            >
              <Input autoComplete='off'  style={{width:"300px"}}/>
            </Form.Item>
          </Form>
        </Modal>
          {/* </Row> */}
        </>
        )}
      </div>
    );
  }
}

export default App;
