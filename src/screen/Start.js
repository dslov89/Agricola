import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./first.css";

export let nameValue = "";

function Start() {
  const navigation = useNavigate();

  function naviHandler() {
    navigation("/gameroomboard");
  }

  return (
    <div className="App">
      <header>
        <h1>Welcome to Agricola Game</h1>
      </header>
      <ul>
        <li>
          <button onClick={naviHandler}>입장</button>
        </li>
      </ul>
    </div>
  );
}

export default Start;
