import React,{Component} from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import LeftPanelOptions from "./leftPanelOptions";
import LeftPanelOptionsCB from "./leftPanelOptionsCB";
class Mobiles extends Component{
 filterParams=(arr,queryParams)=>{
  let {RAM,ROM,price}=queryParams;
  arr=this.filterParam(arr,"RAM",RAM);
arr=this.filterParam(arr,"ROM",ROM);
return arr;
}   
 filterParam=(arr,name,values)=>{
  if(!values) return arr;
  let valuesArr=values.split(",");
  let arr1=arr.filter(a=>valuesArr.find(val=>val===a[name]));
  return arr1;
 
 }
 addToQueryString=(str,paramName,paramValue)=>paramValue?
  str?`${str}&${paramName}=${paramValue}`:`${paramName}=${paramValue}`:str;
 
 makeSearchString=(options)=>{
  let {RAM,ROM,price}=options;
let searchStr="";
searchStr=this.addToQueryString(searchStr,"RAM",RAM);
searchStr=this.addToQueryString(searchStr,"ROM",ROM);
searchStr=this.addToQueryString(searchStr,"price",price);
return searchStr;
 }
 handleOptionChange=(options)=>{
this.callURL("/mobiles",options);
 }
 callURL=(URL,options)=>{
  let searchString=this.makeSearchString(options);
  this.props.history.push({
    pathname:URL,search:searchString,
  });
 }
 makeAllOptions=(arr)=>{
  let json={};
  json.RAM=this.getDifferentValues(arr,"RAM");
  json.ROM=this.getDifferentValues(arr,"ROM");
  json.price=this.getDifferentValues(arr,"price");
  return json;
 }
 getDifferentValues=(arr,name)=>arr.reduce((acc,curr)=>acc.find(val=>val===curr[name])?acc:[...acc,curr[name]],[]);
    render(){
    const {mobiles}=this.props;
    const {brand}=this.props.match.params;
    let allOptions=this.makeAllOptions(mobiles);
 let l= brand?mobiles.filter((n)=>n.brand===brand):mobiles;
    let queryParams=queryString.parse(this.props.location.search);
    let searchString=this.makeSearchString(queryParams);
    let l1=this.filterParams(l,queryParams);
    let l2=queryParams.price==="Below 10,000"?
    l1.filter(n=>n.price<10000):
    queryParams.price==="10,000 or more"?
    l1.filter(n=>n.price>=10000):
    l1;
    console.log(queryParams.price);
    return(
            <div className="container">
            <div className="row">
            <div className="col-3">
                <LeftPanelOptionsCB 
                allOptions={allOptions}
                options={queryParams}
                onOptionChange={this.handleOptionChange} /> 
                </div>
                <div className="col-9">
         
           {l2.map((n)=>
           <React.Fragment>
            <div className="row">
           <div className="col border">
            {n.name} 
           </div>
           <div className="col border">
            {n.brand} 
           </div>
           <div className="col border">
            {n.RAM} 
           </div>
           <div className="col border">
            {n.ROM} 
           </div>
           <div className="col border">
            {n.price} 
           </div>
           </div>
           </React.Fragment>
           )}
           </div>
           </div>
           </div>
        )
        }
}
export default Mobiles;