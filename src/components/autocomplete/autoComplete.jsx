import React, { useState, useEffect,useRef } from "react";
import Input from "../input/input";
import "./autoComplete.css";
const AutoComplete = ({ filteredSearch,onChange,input,setSearchInput,setFilteredSearch,getData,Label,isautofocus,coreClass,labelColor }) => {
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
     });
  const elementRef = useRef();
  useEffect(() => {
    if(elementRef.current)
    setDimensions({
        width: elementRef.current.offsetWidth,
     });
    
     setActiveSuggestionIndex(0);
    setShowSuggestions(true);

    function handleResize() {
         setDimensions({
         width: elementRef.current.offsetWidth,
      });
    }
    window.addEventListener("resize", handleResize);
  }, []);


  const onClick = (e) => {
    setFilteredSearch([]);
    setSearchInput(e.target.innerText);
    getData(e.target.innerText)
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  const onKeyUp = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
        setSearchInput(filteredSearch[activeSuggestionIndex]);
      setActiveSuggestionIndex(0);
      setShowSuggestions(false);
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestionIndex === 0) {
        return;
      }

      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestionIndex - 1 === filteredSearch.length) {
        return;
      }

      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
    else if (e.keyCode === 27)  // User pressed Esc
      setShowSuggestions(false);
    else{
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    
    }

  };

  const SuggestionsListComponent = () => {
    return filteredSearch.length ? (
      <ul className={`suggestions ${coreClass}`} style={{ width: dimensions.width }}>
        {filteredSearch.map((suggestion, index) => {
          let className;

          //   // Flag the active suggestion with a class
            if (index === activeSuggestionIndex) {
              className = "suggestion-active";
            }

          return (
            <li className={className} key={suggestion} onClick={onClick}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : null;
  };

  return (
    <div ref={elementRef}>

{/* <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
      /> */}
      <Input
        tabIndex="0"
        name="search"
        type="text"
        labelcolor={labelColor}
        onChange={onChange}
        onKeyUp={onKeyUp}
        label={Label}
        value={input}
        maxLength="37"
        effect={false}
        isautofocus={isautofocus}
        coreClass={coreClass}
        autoComplete="off"
      />

      {showSuggestions && input && <SuggestionsListComponent />}
    </div>
  );
};

export default AutoComplete;
