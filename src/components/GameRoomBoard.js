import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as SockJS from "sockjs-client";
import * as Stomp from "@stomp/stompjs";
import axios from "axios";
import { nameValue } from "../screen/Start";

const Gameroomboard = () => {
  const client = useRef();
  const navigation = useNavigate();
  const [rooms, setRooms] = useState([]);

  function naviHandler() {
    navigation("/start");
  }

  const connectHandler = (roomId) => {
    client.current = Stomp.Stomp.over(() => {
      const sock = new SockJS("http://localhost:8080/enter");
      return sock;
    });
    client.current.connect({}, () => {
      client.current.subscribe(
        `/user/sub/game-room/`+ roomId,
        (message) => {
          console.log(message.body);
          if (message.body === "OK") {
            naviHandler();
          } else {
            alert("게임에 진입할 수 없습니다.");
          }
        },
        { gameRoomId: roomId }
      );
    });
  };

  const sendHandler = (roomId) => {
    client.current.send(
      "/main-board/user/init",
      {},
      JSON.stringify({
        roomId: roomId,
        userId: nameValue,
        action: [1, 2, 3],
        content: "hello",
      })
    );
  };

  const testHandler = (roomId) => {
    client.current.send(
      "/main-board/user/test",
      {},
      JSON.stringify({
        roomId: roomId,
        userId: nameValue,
        action: [1, 2, 3],
        content: "hello",
      })
    );
  };

  const createRoom = (roomId) => {
    axios
      .post("http://localhost:8080/game-rooms", null, {
        params: {
          roomId: roomId,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 방 목록 불러와서 중복되는 방 있으면 생성하지 않음(현재 이대로 하면 방이 생성이 안됨,,)

  // useEffect(() => {
  //   if (rooms.length > 0) {
  //     const lastRoomId = rooms[rooms.length - 1];
  //     axios
  //       .get(`http://localhost:8080/game-rooms/${lastRoomId}`)
  //       .then(function (response) {
  //         const roomExists = response.data.length > 0;
  //         if (roomExists) {
  //           console.log(`Room ${lastRoomId} already exists.`);
  //         } else {
  //           createRoom(lastRoomId);
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
  // }, [rooms]);

  useEffect(() => {
    if (rooms.length > 0) {
      createRoom(rooms[rooms.length - 1]);
    }
  }, [rooms]);

  const handleCreateRoom = () => {
    const newRoomId = rooms.length + 1;
    setRooms((prevRooms) => [...prevRooms, newRoomId]);
  };

  return (
    <div>
      <button onClick={handleCreateRoom}>방 생성하기</button>
      {rooms.map((roomId) => (
        <div key={roomId}>
          <h1>GameRoom {roomId}</h1>
          <button onClick={() => connectHandler(roomId)}>게임 연결</button>
          <button onClick={() => sendHandler(roomId)}>게임 입장</button>
          <button onClick={() => testHandler(roomId)}>test message</button>
        </div>
      ))}
    </div>
  );
};

export default Gameroomboard;
