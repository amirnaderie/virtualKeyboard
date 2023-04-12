import _ from "lodash";
export function dateFormat(inputValue) {
  let ret = "";
  if (inputValue.length > 9) {
    const hasTcharacter = inputValue.indexOf("T");
    ret = hasTcharacter !== -1 ? inputValue.replace("T", " ") : inputValue;

    const hasdashcharacter = ret.indexOf("-");
    ret = hasdashcharacter !== -1 ? ret.replaceAll("-", "/") : ret;

    const hasmilisecond = ret.indexOf(".");
    ret = hasmilisecond !== -1 ? ret.slice(0, hasmilisecond) : ret;
  } else if (inputValue.length === 8)
    ret =
      inputValue.substr(0, 4) +
      "/" +
      inputValue.substr(4, 2) +
      "/" +
      inputValue.substr(6, 2);

  return ret;
}
export function timeFormat(inputValue) {
  let ret = "";
  if (inputValue.length === 8 && inputValue.indexOf(":"))
    return inputValue;
  if (inputValue.length === 6) {
    ret =
    inputValue.substr(0, 2) +
    ":" +
    inputValue.substr(2, 2) +
    ":" +
    inputValue.substr(4, 2);
  }
  return ret;
}

export function change_Array_Element_Value(
  array,
  conditioned_elemntname,
  condition_value,
  elemntname,
  foo
) {
  let changedarray = null;
  if (Array.isArray(array)) {
    changedarray = array.map((p) => {
      if (conditioned_elemntname)
        return p[conditioned_elemntname] === condition_value
          ? { ...p, [elemntname]: foo(p[elemntname]) }
          : p;
      else return { ...p, [elemntname]: foo(p[elemntname]) };
    });
    return changedarray;
  } else {
    if (conditioned_elemntname)
      changedarray =
      array[conditioned_elemntname] === condition_value
          ? { ...array, [elemntname]: foo(array[elemntname]) }
          : array;
    else changedarray = { ...array, [elemntname]: foo(array[elemntname]) };
  }
  return changedarray;
}
// export function change_Array_Element_Value(array,conditioned_elemntname,condition_value,elemntname,newvalue)  {
//     const changedarray=array.map(p =>
//       {
//           if (conditioned_elemntname!==undefined)
//            return (p[conditioned_elemntname]===condition_value?{ ...p,[elemntname]: newvalue}:p)
//         else
//            return ({ ...p,[elemntname]: newvalue})
//       }
//           );
//       return  changedarray;
//       }

export function search_Allitems_in_Allobjects_Ofarray(myArray, value) {
  let items = {};
  let retArray = [];

  if (value === "") return myArray;

  for (var i = 0; i < myArray.length; i++) {
    items = Object.getOwnPropertyNames(myArray[i]); // Object.keys(myArray[i]).length;
    for (var j = 0; j < items.length; j++) {
      if (typeof myArray[i][items[j]] === "string") {
        if (
          myArray[i][items[j]].toLowerCase().indexOf(value.toLowerCase()) !== -1
        ) {
          retArray.push(myArray[i]);
          break;
        }
      } else if (typeof myArray[i][items[j]] === "number" && !isNaN(value)) {
        if (myArray[i][items[j]] === Number(value)) {
          retArray.push(myArray[i]);
          break;
        }
      }
    }
  }
  return retArray;
}

// for thousands separators
export const addCommas = (num) =>{
  if (num>999)
   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  else if (num<1&&num>0 )
  return num.toFixed(2);
  else
  return num;
}
export const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

export const CompareTwoArrays=(arr1,arr2)=>{
  const cmp= _.isMatch(arr1, arr2)&& _.isMatch(arr2, arr1);
  return cmp;
}


export const sanitizeFileName=(fileName)=>{
  return fileName.replaceAll('+','_').replaceAll('&','_').replaceAll('%','_');
}
