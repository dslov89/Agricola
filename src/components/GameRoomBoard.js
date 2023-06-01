import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { nameValue, sendingClient } from "../screen/Start";
import { DataContext } from "../store/data-context";

const Gameroomboard = () => {
  const navigation = useNavigate();
  const [rooms, setRooms] = useState([]);
  let roomID;
  const { farmData, setFarmData } = useContext(DataContext);

  function naviHandler() {
    navigation("/start");
  }

  const sendHandler2 = () => {
    console.log(farmData.roomId);
    sendingClient.current.send(
      "/main-board/card/update",
      {},
      JSON.stringify({
        roomId: farmData.roomId,
        round: 1,
        action: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        currentTurn: 1,
        turnArray: [
          [0, 1],
          [1, 2],
        ],
        job: [
          [1, 1],
          [2, 1],
          [3, 1],
        ],
        main: [
          [1, 1],
          [2, 1],
          [3, 1],
        ],
        sub: [
          [1, 1],
          [2, 1],
          [3, 1],
        ],
      })
    );
  };

  const connectHandler = (roomId) => {
    sendingClient.current.connect({}, () => {
      sendingClient.current.subscribe(
        `/user/sub/game-room/` + roomId,
        (message) => {
          console.log(message.body + "이 메세지는 user-id ex)1,2,3,4같은거");
          setFarmData({ ...farmData, userId: message });
          if (message.body !== "FULL") {
            //turn example
            sendingClient.current.subscribe(
              `/sub/game-room/` + roomId,
              (message) => {
                console.log(message.body + "여기야 여기");
                const msg = JSON.parse(message.body);
                setFarmData({
                  ...farmData,
                  round: msg.round,
                  roomId: msg.roomId,
                });
              }
            );
            // localStorage.setItem("turn", message.body[3]);
            console.log(message.body[3]);
            setFarmData({ ...farmData, userId: message.body[3] });
            // console.log(localStorage.getItem("turn"));
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
        messageType:'INIT',
        roomId: roomId,
        round:0,
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
    // setTimeout(() => {
    //   sendHandler2();
    // }, 300);
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
