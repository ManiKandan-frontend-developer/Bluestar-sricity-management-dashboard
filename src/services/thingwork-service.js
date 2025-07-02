import HttpClient from "./http";

class ThingworxService {
  //original code
  thingworxurl =
    // prev working code
    //"http://192.168.0.192:8080/Thingworx/Things/BSL_Wada_ProcessAudit_TH/Services/";
  "https://ifactorysricity.bluestarindia.com/Thingworx/Things/BSL_Management_Dashboard_TH/Services/"
  //"http://192.168.0.177:8080/Thingworx/Things/BSL_Management_Dashboard_TH/Services/"
  // "http://192.168.0.194:80/Thingworx/Things/BSL_Management_Dashboard_TH/Services"

  // thingworxurl1 = "http://172.16.28.74:8080/Thingworx/Things/BSL_Analytics_Configuration_TH/services/"
  http = new HttpClient();
  config = {
    headers: {
       //appkey: "2d06674a-f215-4607-8924-240e2c684a7f",
      //appkey: "babf4bee-0c58-44d3-bf52-ae5d7c069e9b",
      appkey:"1f20b506-a2c9-436b-99cd-e69b85bad652"
      // Accept: "application/json",
      // ContentType: "application/json",
    },
  };

  // config1 = {
  //   headers:{
  //     appkey:"fa8cce9b-f8b8-46c1-bcf9-efc0df22a156"
  //   }
  // };

  // predictive maintenance services
 
  // getMachineList(){
  //   return this.http.post(this.thingworxurl1 + "GetMachinelist", {}, this.config1);
  // };
  //     getMachineProperty(data){
  //   return this.http.post(this.thingworxurl1 + "GetSVGPropertyValues", data, this.config1);
  // };


  getTarget(data) {
    return this.http.post(this.thingworxurl + "MonthTarget_V1",data, this.config);
  }

  getIDU_LivePartCount() {
    return this.http.post(this.thingworxurl + "GetIDU_LivePartCount",{}, this.config);
  }

  getLivePartCount() {
    return this.http.post(this.thingworxurl + "Get_LivePartcount",{}, this.config);
  }
  getLiveDowntime() {
    return this.http.post(this.thingworxurl + "Get_LiveDowntime",{}, this.config);
  }
  getLiveOEE() {
    return this.http.post(this.thingworxurl + "Get_LiveOEE",{}, this.config);
  }
  getLiveYest() {
    return this.http.post(this.thingworxurl + "Yest_DataCopy",{}, this.config);
  }

  
  

  

  getGetODU_LivePartCount() {
    return this.http.post(this.thingworxurl + "GetODU_LivePartCount",{}, this.config);
  }

  getIDU_LivePartOee() {
    return this.http.post(this.thingworxurl + "GetIDU_LiveOEE",{}, this.config);
  }

  getODU_LivePartOee() {
    return this.http.post(this.thingworxurl + "GetODU_LiveOEE",{}, this.config);
  }

  getIDU_LivePartDowntimeHours() {
    return this.http.post(this.thingworxurl + "GetIDU_LiveDowntime",{}, this.config);
  }

  getODU_LivePartDowntimeHours() {
    return this.http.post(this.thingworxurl + "GetODU_LiveDowntime",{}, this.config);
  }



  getGet_Live_OEE_and_DT() {
    return this.http.post(this.thingworxurl + "Get_Live_OEE_and_DT",{}, this.config);
  }

  
  

  getYestData() {
    return this.http.post(this.thingworxurl + "Yest_Data", {}, this.config);
  }

  getMonthData() {
    return this.http.post(this.thingworxurl + "Month_Data", {} , this.config);
  }

  getMonthwiseDowntime() {
    return this.http.post(this.thingworxurl + "MonthWise_DTinHours", {}, this.config);
  }

  getMonthwiseOee() {
    return this.http.post(this.thingworxurl + "MonthWiseAvgOEE", {} , this.config);
  }
   


}
export default ThingworxService;