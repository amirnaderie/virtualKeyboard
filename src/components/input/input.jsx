import React,{useState } from "react";
import './input.css';
const Input = ({
  type = "text",
  label,
  labelcolor = "text-dark",
  error,
  isautofocus = false,
  direction = "rtl",
  labelClass="",
  coreClass = "",
  errorClass="",
  effect=false,
  childInputRef ,
  ...rest
}) => {
  const [isMyInputFocused, setIsMyInputFocused] = useState(false);

 
   
  const handlekeydown = (e) => {
    if (e.target.type !== "number")
      return true
    else if (e.target.type === "number"
       && !( e.keyCode === 8 ||  e.keyCode === 46 || e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 9 )
      )
      if (!((e.keyCode >= 48 && e.keyCode <= 57) ||(e.keyCode >= 96 && e.keyCode <= 105)) 
        ||e.target.value.toString().length > e.target.maxLength
      )
        e.preventDefault();
  };


     return (
    <div className="form-group  input-contain">
      
       {/* {(!effect&& <label htmlFor={rest.name} className={`${direction==="rtl"?"pull-right":""} ${labelcolor}`}> */}
       {(!effect&& <label htmlFor={rest.name} className={labelClass + ` ${labelcolor} mb-2 d-block`}>
           {label}
         </label>)}
       
        <input {...rest}  type={type} name={rest.name} id={rest.name} autoFocus={isautofocus} ref={childInputRef} onKeyDown={handlekeydown}
        className={`rounded py-1 col-12 ${error?" invalid ":" "} ${coreClass} `} onFocus={() => setIsMyInputFocused(true)} 
        placeholder={((isMyInputFocused===true&& rest.value===""&&effect)||!effect)?rest.placeholder:""}
        onBlur={() => setIsMyInputFocused(false)}
        value={rest.value===""?"":rest.value}    aria-labelledby={`placeholder-${rest.name}`}/>
       
       
        {(effect&& <label className="placeholder-text  mb-2" htmlFor={rest.name} id={`placeholder-${rest.name}`}>
            <div className="text">{label}</div>
        </label>)} 
   
        {error && (
        <div className={`text-danger position-absolute ${errorClass}`}>
          <small>{error.message}</small>
        </div>
      )}
    </div>
  );
};

export default Input;
