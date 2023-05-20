import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as SockJS from "sockjs-client";
import * as Stomp from "@stomp/stompjs";
import axios from "axios";
import { nameValue } from "../screen/Start";
// import * as StompJs from '@stomp/stompjs';



const Gameroomboard = () => {
  const navigation = useNavigate();
  function naviHandler() {
    navigation("/start");
  }
  const client = useRef();
  const connectHandler = (roomNumber) => {
    client.current = Stomp.Stomp.over(() => {
      const sock = new SockJS("http://localhost:8080/enter");
      return sock;
    });
    client.current.connect({}, () => {
      // callback 함수 설정, 대부분 여기에 sub 함수 씀
      client.current.subscribe(`/sub/game-room/` + roomNumber, (message) => {
        console.log(message.body);
      });
      console.log("connected");
    });
  };
  
  const sendHandler = () => {
    client.current.send(
      "/main-board/card/enroll",
      {},
      JSON.stringify({
        User_ID: nameValue,
      })
    );
  };

  return (
    <div>
      <h1>GameRoom 1</h1>
      <button onClick={() => connectHandler('room1')}>connect</button>
      <button onClick={naviHandler}>next</button>
      <button onClick={sendHandler}>send message</button>
      <br/>
      <h1>GameRoom 2</h1>
      <button onClick={() => connectHandler('room2')}>connect</button>
      <button onClick={naviHandler}>next</button>
      <button onClick={sendHandler}>send message</button>
      <h1>GameRoom 3</h1>
      <button onClick={() => connectHandler('room3')}>connect</button>
      <button onClick={naviHandler}>next</button>
      <button onClick={sendHandler}>send message</button>
      <h1>GameRoom 4</h1>
      <button onClick={() => connectHandler('room4')}>connect</button>
      <button onClick={naviHandler}>next</button>
      <button onClick={sendHandler}>send message</button>
    </div>
  );
};
export default Gameroomboard;