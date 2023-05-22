import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as SockJS from "sockjs-client";
import * as Stomp from "@stomp/stompjs";
import axios from "axios";
import { useSyncExternalStore } from "react";
// import * as StompJs from '@stomp/stompjs';
// user 가 socket 통신 신청하면 유저한테 id 부여해주는거랑 게임방 들어갈 때 만약 인원수 4명이면 못들어가게 하고 그 이하면 들어가게 해주는 코드 작성

const Gameroomboard = () => {
  axios.post("http://localhost:8080/game-rooms", null, {
    params: {
      roomId: 1,
    },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  const client = useRef();
  const navigation = useNavigate();
  function naviHandler() {
    navigation("/start");
  }
  const connectHandler = () => {
    client.current = Stomp.Stomp.over(() => {
      const sock = new SockJS("http://localhost:8080/enter");
      return sock;
    });
    client.current.connect({}, () => {
      // callback 함수 설정, 대부분 여기에 sub 함수 씀
      client.current.subscribe(
        `/user/sub/game-room/1`,
        (message) => {
          console.log(message.body);
          if (message.body === "OK") {
            naviHandler();
          }
          else {
            alert("게임에 진입할 수 없습니다.");
          }
        },
        { gameRoomId: 1 }
      );
    });
  };

  const sendHandler = () => {
    // 서버에서 사람 없으면 "OK" 4명이면 "FULL"이런식으로 메세지 보낼꺼에요
    client.current.send(
      "/main-board/user/init",
      {},
      JSON.stringify({
        roomId: 1,
        userId: 2,
        action: [1, 2, 3],
        content: "hello",
      })
    );
  };

  const testHandler = () => {
    // game-room/id 구독하고 있는 사람들한테 전부 메세지 보내는거에요
    client.current.send(
      "/main-board/user/test",
      {},
      JSON.stringify({
        roomId: 1,
        userId: 2,
        action: [1, 2, 3],
        content: "hello",
      })
    );
  };

  return (
    <div>
      <h1>GameRoom</h1>
      <button onClick={connectHandler}>게임 연결</button>
      <button onClick={sendHandler}>게임 입장</button>
      <button onClick={testHandler}>test message</button>
    </div>
  );
};
export default Gameroomboard;