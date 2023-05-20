import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./first.css";

export let nameValue = "";

function Start() {
  const navigation = useNavigate();

  function naviHandler() {
    navigation("/gameroomboard");
  }

  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
    nameValue = event.target.value;
  };

  return (
    <div className="App">
      <header>
        <h1>Welcome to Agricola Game</h1>
      </header>
      <ul>
        <li>
          <input
            type="text"
            placeholder="아이디 입력하세요."
            value={name}
            onChange={handleChange}
          />
          <button onClick={naviHandler}>입장</button>
        </li>
      </ul>
    </div>
  );
}

export default Start;
