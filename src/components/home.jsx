import React, { useState } from "react";
import VKeyBoard from "./virtualkeyboard/vKeyBoard";

const Home = () => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [input, setInput] = useState("");
  const [vKeyBoardinput, setVKeyBoardinput] = useState("");
  const [onlyNumeric, setOnlyNumeric] = useState(false);
  const showVkeyborad = (state) => {
    setKeyboardOpen(state);
  };
  const onChangeInput = (event) => {
    const tmpInput = event.target.value;
    setInput(tmpInput);
    setVKeyBoardinput(tmpInput);
  };

  const swithFromOrToNumeric = () => {
    setOnlyNumeric(!onlyNumeric);
  };

  const setInputVal = (inp) => {
    setInput(inp);
  };

  return (
    <div className="App">
      <div className="m-5 position-relative">
        <input
          value={input}
          placeholder={"Tap on the virtual keyboard to start"}
          onChange={onChangeInput}
          onFocus={() => showVkeyborad(true)}
          
        />
        <VKeyBoard
          keyboardOpen={keyboardOpen}
          vKeyBoardinput={vKeyBoardinput}
          onlyNumeric={onlyNumeric}
          setInputVal={setInputVal}
          showVkeyborad={showVkeyborad}
        />
      </div>
      <div>
        <button onClick={swithFromOrToNumeric} className="m-5">
          switch number to character
        </button>
      </div>
      <input className="m-5" value="" onFocus={() => showVkeyborad(false)} />
    </div>
  );
};

export default Home;
