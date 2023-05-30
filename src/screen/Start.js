import { useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import * as SockJS from "sockjs-client";
import * as Stomp from "@stomp/stompjs";
import "./first.css";

export let nameValue = "";
export let sendingClient = null;

function sendClient(client) {
  sendingClient = client;
}

function Start() {
  const navigation = useNavigate();
  const client = useRef();

  function connectHandler() {
    client.current = Stomp.Stomp.over(() => {
      const sock = new SockJS("http://localhost:8080/enter");
      return sock;
    });
    sendClient(client);
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
          <button onClick={connectHandler}>입장</button>
        </li>
      </ul>
    </div>
  );
}
export default Start;
