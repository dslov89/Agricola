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
  const connectHandler = () => {
    client.current = Stomp.Stomp.over(() => {
      const sock = new SockJS("http://localhost:8080/enter");
      return sock;
    });
    client.current.connect({}, () => {
      // callback 함수 설정, 대부분 여기에 sub 함수 씀
      client.current.subscribe(`/sub/gameRoom/id`, (message) => {
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
      <h1>GameRoom</h1>
      <button onClick={connectHandler}>connect</button>
      <button onClick={naviHandler}>next</button>
      <button onClick={sendHandler}>send message</button>
    </div>
  );
};
export default Gameroomboard;