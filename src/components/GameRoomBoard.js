import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { nameValue, sendingClient } from "../screen/Start";


const Gameroomboard = () => {
  const navigation = useNavigate();
  const [rooms, setRooms] = useState([]);

  function naviHandler() {
    navigation("/start");
  }
  
  const connectHandler = (roomId) => {
    sendingClient.current.connect({}, (message) => {
      localStorage.setItem("UUID", message.headers["user-name"]);
      sendingClient.current.subscribe(
        `/user/sub/game-room/` + roomId,
        (message) => {
          console.log("첫 구독");
          console.log(message.body);
          if (message.body !== "FULL") { //turn example
            sendingClient.current.subscribe(
              `/sub/game-room/` + roomId,
              (message) => {
                console.log(message.body);
              }
            );
            localStorage.setItem("turn", message.body[3]);
            console.log(localStorage.getItem("turn"));
            naviHandler();
          } else {
            alert("게임에 진입할 수 없습니다.");
          }
        },
        { gameRoomId: roomId }
      );
    }
    );
  };

  

  const sendHandler = (roomId) => {
    console.log("UUID >>");
    console.log(localStorage.getItem("UUID"));
    sendingClient.current.send(
      "/main-board/user/init",
      {},
      JSON.stringify({
        roomId: roomId,
        userId: localStorage.getItem("UUID"),
        action: [1, 2, 3],
        content: "hello",
      })
    );
    
  };

  const enterRoom = (roomId) => {
    connectHandler(roomId);
    setTimeout(() => {
      sendHandler(roomId);
    }, 300);
  };

  const createRoom = () => {
    axios.post("http://localhost:8080/game-rooms", null, {})
      .then(function (response) {
        setRooms((prevRooms) => [...prevRooms, response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getRooms = () => {
    axios.get("http://localhost:8080/game-rooms").then((response) => {
      console.log("getRooms");
      const roomData = response.data;
      const roomArray = roomData.map((gameroomid) => gameroomid.id);
      setRooms(roomArray);
    });
  }

  const checkRoomExists = async () => {
    let lastRoomId = 1;
    if (rooms.length !== 0) {
      lastRoomId = rooms[rooms.length - 1] + 1;
    }
    try {
      const response = await axios.get(
        `http://localhost:8080/game-rooms/${lastRoomId}`
      );
      if (response.data) {
        alert("중복된 방이 있습니다. 새로고침을 진행합니다.");
        getRooms();
      }
    } catch (error) {
      createRoom();
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  const checkRooms = () => {
    getRooms();
  }

  const handleCreateRoom = () => {
    checkRoomExists();
  };

  return (
    <div>
      <button onClick={checkRooms}>방 불러오기</button>
      <button onClick={handleCreateRoom}>방 생성하기</button>
      {rooms.map((ID) => (
        <div key={ID}>
          <h1>GameRoom {ID}</h1>
          <button onClick={() => enterRoom(ID)}>게임 입장</button>
        </div>
      ))}
    </div>
  );
};

export default Gameroomboard;
export { sendingClient };