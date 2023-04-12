import React, { useRef, useState,useEffect } from "react";
import Keyboard from "react-simple-keyboard";

import "react-simple-keyboard/build/css/index.css";
import "./vKeyBoard.css";
import farsiLayout from "simple-keyboard-layouts/build/layouts/farsi";
import englishLayout from "simple-keyboard-layouts/build/layouts/english";

const VKeyBoard =  ({keyboardOpen,setInputVal,onlyNumeric,vKeyBoardinput,showVkeyborad}) => {
  
  const [layoutName, setLayoutName] = useState("default");
  const keyboard = useRef();
  var buttonTheme={buttonTheme:[{
      class: "hg-red",
      buttons: "{escape}"
    }]}
  
  const display={ display: {
    "{escape}": "Exit",
    "{tab}": "tab ⇥",
    "{bksp}": "backspace ⌫",
    "{enter}": "enter ↵",
    "{lock}": "caps lock ",
    "{shift}": "shift ⇧",
    "{metaleft}": "En/Fa ",
    "{space}":"Space"
  } }
     
  useEffect(() => {
      let tempLayout;
      if (onlyNumeric===true) 
       tempLayout={layout: {
         default: ["1 2 3", "4 5 6", "7 8 9", "{shift} 0 _", "{escape} {bksp}"],
         shift: ["! / #", "$ % ^", "& * (", "{shift} ) +", "{escape} {bksp}"]
       }}
       else
       tempLayout=insertCahngeLangIntoLayout(englishLayout);
       setLayout(tempLayout);
  }, [onlyNumeric]);

  useEffect(() => {
    keyboard.current.setInput(vKeyBoardinput);
    
}, [vKeyBoardinput]);
  
    const insertCahngeLangIntoLayout=(inpLayout)=>{
      let defaultLayout=[...inpLayout.layout.default];
      defaultLayout[0] =defaultLayout[0].replace('`',"{escape}") ;
      defaultLayout[4] ="{metaleft} {space}" ;
      
      let shiftLayout=[...inpLayout.layout.shift];
      shiftLayout[0] =shiftLayout[0].replace('~',"{escape}") ;
      shiftLayout[4] ="{metaleft} {space}" ;
      
     
      const retlayout ={layout:{default: defaultLayout,
               shift: shiftLayout
          }}
          return retlayout;
       }
    const [layout, setLayout] = useState(insertCahngeLangIntoLayout(englishLayout));
   
       
    const changeLan=()=>{
       
        if (layout.layout.default[1].search("q")!==-1)
         setLayout(insertCahngeLangIntoLayout(farsiLayout))
       else
         setLayout(insertCahngeLangIntoLayout(englishLayout))
       
    }
  
    const onChange = input => {
      
      setInputVal(input);
     
    };
  
    const handleShift = () => {
      const newLayoutName = layoutName === "default" ? "shift" : "default";
      setLayoutName(newLayoutName);
    };
  
    const onKeyPress = button => {
      if (button === "{shift}" || button === "{lock}") handleShift();
      if (button === "{metaleft}" ) changeLan();
      if (button === "{escape}" ) showVkeyborad(false);
    };
    
  
    return (
      <div className={`position-absolute ${!keyboardOpen ? "hidden" : ""}`}>
        <Keyboard
          keyboardRef={r => (keyboard.current = r)}
          theme={"hg-theme-default hg-layout-default myTheme"}
          layoutName={layoutName}
          onChange={onChange}
          onKeyPress={onKeyPress}
          rtl={true}
          {...display}
          {...layout}
          {...buttonTheme}
        />
        </div>
    );
  };
  

export default VKeyBoard;
