import http from "./httpService";

const apiEndpoint = process.env.REACT_APP_URL ;

export async function saveData(data) {
  try {
    await delay(3000);
    
    const dataparam={ ...data }
    //return http.post(apiEndpoint ,dataparam );
    return true;
  } catch (error) {
    throw error;
  }
}

export async function getTaxInfo(value) {
  try {
    await delay(3000);
    return gettaxinfo(value);
    // return http.get(apiEndpoint, {
    //   params: {
    //     name:value 
    //   }});
  } catch (error) {
    throw error;
  }
}

export function  autoCompleteData(value) {
  try {
   
    return getrrn(value);
    // return http.get(apiEndpoint + "/autoCompleteData", {
    //   params: {
    //     name:value 
    //   }});
  } catch (error) {
     const retval=[];
     return  retval;
  }
}


const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

const getrrn=(inprrn)=>{
    const startsWithN = mockrrn.filter((rrnr) => rrnr.startsWith(inprrn));
    return startsWithN;
}

const gettaxinfo=(inprrn)=>{
    const startsWithN = mockData.filter((data) => data.rrn===inprrn);
    return startsWithN;
}


const mockrrn=["abcdef","abcdfe","abchj","abplhg","ayhkd","ujklk"];

const mockData=[
 {rrn:"abcdef",letterDate:"20220602",letterNumber:"12345",bc:20,requestDate:"20220601"}
,{rrn:"abcdfe",letterDate:"20220103",letterNumber:"234",bc:30,requestDate:"20220314"}
,{rrn:"abchj",letterDate:"20210621",letterNumber:"6765",bc:40,requestDate:"202201018"}
,{rrn:"abplhg",letterDate:"20221015",letterNumber:"198982345",bc:50,requestDate:"20220422"}
,{rrn:"ayhkd",letterDate:"20221103",letterNumber:"4354534",bc:60,requestDate:"20221108"}
,{rrn:"ujklk",letterDate:"20220301",letterNumber:"135345134",bc:70,requestDate:"20220810"}
];

