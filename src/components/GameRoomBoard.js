import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { nameValue, sendingClient } from "../screen/Start";

const Gameroomboard = () => {
  const navigation = useNavigate();
  const [rooms, setRooms] = useState([]);
  let roomID;

  function naviHandler() {
    navigation("/start");
  }

  const connectHandler = (roomId) => {
    sendingClient.current.connect({}, () => {
      sendingClient.current.subscribe(
        `/user/sub/game-room/` + roomId,
        (message) => {
          console.log(message.body);
          if (message.body !== "FULL") {
            //turn example
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
    });
  };

  const sendHandler = (roomId) => {
    sendingClient.current.send(
      "/main-board/user/init",
      {},
      JSON.stringify({
        roomId: roomId,
        userId: 2,
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
    axios
      .post("http://localhost:8080/game-rooms", null, {})
      .then(function (response) {
        console.log(response.data);
        roomID = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getRooms = () => {
    axios.get("http://localhost:8080/game-rooms").then((response) => {
      console.log("getRoom 쓰는중");
      console.log(response.data);
      console.log("룸 개수");
      const roomData = response.data;
      const roomArray = roomData.map((gameroomid) => gameroomid.id);
      setRooms(roomArray);
      console.log("룸 데이터");
      console.log(roomArray);
    });
  };

  const checkRoomExists = async () => {
    let lastRoomId = rooms[rooms.length - 1] + 1;
    let newRoomId = rooms.length + 1;
    try {
      const response = await axios.get(
        `http://localhost:8080/game-rooms/${lastRoomId}`
      );
      console.log(response.data);
      if (response.data) {
        console.log(`Room ${lastRoomId} already exists.`);
      }
    } catch (error) {
      console.log(error);
      console.log(lastRoomId);
      createRoom();
      setRooms((prevRooms) => [...prevRooms, newRoomId]);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  const checkRooms = () => {
    getRooms();
  };

  const handleCreateRoom = () => {
    checkRoomExists();
  };

  return (
    <div>
      <button onClick={checkRooms}>방 불러오기</button>
      <button onClick={handleCreateRoom}>방 생성하기</button>
      {rooms.map((newRoomId) => (
        <div key={newRoomId}>
          <h1>GameRoom {newRoomId}</h1>
          <button onClick={() => enterRoom(newRoomId)}>게임 입장</button>
          {/* <button onClick={() => connectHandler(newRoomId)}>게임 연결</button> */}
        </div>
      ))}
    </div>
  );
};

export default Gameroomboard;
export { sendingClient };
