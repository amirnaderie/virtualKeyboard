import React from "react";
import DatePicker from "react-datepicker2";
import "./datePicker.css";

const MyDatePicker = ({
  name,
  label,
  error,
  labelcolor = "text-dark",
  coreClass = "",
  errorClass="",
  direction = "rtl",
  handleclick,
  ...rest
}) => {
  // const [init,setInit]=useState(null)

    return (
    <div className="form-group position-relative">
     
        <label
          htmlFor={name}
          className={`${direction}==="rtl"?pull-right:""  ${labelcolor} col-12 col-lg-6 mb-2 d-block`}
        >
          {label}
        </label>
        <div className={`${coreClass}`}>
          {/* {!init && <input type="text" className={`rounded py-1 col-12 ${coreClass}`} onClick={()=>{setInit(true); handleclick(name,true);}} />} */}
           <DatePicker name={name} {...rest} className={`rounded py-1 col-12 ltr  text-left ${error?" invalid ":" "} `} />
          {/* {init && <DatePicker name={name} {...rest} className={`rounded py-1 col-12 ${coreClass}`} />} */}
        </div>
        {error && (
          <div className={`text-danger position-absolute ${errorClass}`}>
            <small>{error.message}</small>
          </div>
        )}
     
    </div>
  );
};

export default MyDatePicker;
