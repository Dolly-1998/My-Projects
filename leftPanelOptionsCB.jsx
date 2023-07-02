import React,{Component} from "react";
class LeftPanelOptionsCB extends Component{
state={
    prices:["Below 10,000","10,000 or more"]
};
    handleChange=(e)=>{
        let {currentTarget:input}=e;
        let options={...this.props.options};
            
        if(input.type==="checkbox"){

        options[input.name]=this.updateCB(options[input.name],input.checked,input.value);
        }
        else{
            options[input.name]=input.value;
            }
        
        this.props.onOptionChange(options);
    }
    updateCB=(str,check,value)=>{
    let inputArr=str?str.split(","):[];
    if (check) inputArr.push(value);
    else {
        let index=inputArr.findIndex((n)=>n===value);
        if(index>=0) inputArr.splice(index,1);
    }
    return inputArr.join(",");
    }
       
    makeCB=(arr,values,name,label)=>{
return(
<React.Fragment>
    <label className="form-check-label font-weight-bold">{label}</label>
    {arr.map((n)=>
    <div className="form-check" key={n}>
        <input className="form-check-input" value={n}
        type="checkbox" name={name}
        checked={values.find((val)=>val===n)}
        onChange={this.handleChange}
        />
        <label className="form-check">{n}</label>
    </div>
    )}
</React.Fragment>
)    
}  
makeRadios=(arr,selVal,name,label)=>{
    return(
        <React.Fragment>
 <label className="form-check-label font-weight-bold"><h6>
  {label}</h6></label><br/>
 {arr.map((n)=>
 
 <div className="form-check">
 <div>
    <input className="form-check-input" type="radio"
    name={name} value={n}
    checked={selVal===n} 
    onChange={this.handleChange}/>
    <label className="form-check-label">{n}</label>
</div>

</div>
    )}        </React.Fragment>
    )} 

    render(){
        let {prices}=this.state;
    let {RAM="",ROM="",price=""}=this.props.options;
    let {allOptions}=this.props;  
      return(
 
 <div className="container">
       
<div className="row border bg-light">
    <div className="col-12">
<button className="btn btn-primary btn-sm m-2" onClick={()=>this.props.onOptionChange({})}>Clear All</button>
    <br/>    {this.makeCB(allOptions.RAM,RAM.split(","),"RAM","Select RAm")}
    </div>
    <div className="col-12">
        {this.makeCB(allOptions.ROM,ROM.split(","),"ROM","Select ROM")}
    </div>
    <div className="col-12">
        {this.makeRadios(prices,price,"price","Select Price")}
    </div>
</div>
        </div>
    )
}
}
export default LeftPanelOptionsCB;