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
    sendingClient.current.connect({}, () => {
      sendingClient.current.subscribe(
        `/user/sub/game-room/` + roomId,
        (message) => {
          console.log("첫 구독");
          console.log(message.body);
          if (message.body === "FULL") {
            alert("정원 초과");
          } else {
            let msg = JSON.parse(message.body);
            let jobCardValue = msg.jobCards; //message.body 내 jobCards value값
            let subCardsValue = msg.subCards; //message.body 내 subCards value값
            let turnValue = msg.turn; //message.body 내 turn value값
            console.log(msg.enter);
            // console.log(msg.enter);
            // enter는 true일 때만 입장
            // cards와 turn은 state에 저장
            //turn example
            sendingClient.current.subscribe(
              `/sub/game-room/` + roomId,
              (message) => {
                //4때 다 뿌림
                console.log("두번째 구독");
                console.log(message.body);
              }
            );
            naviHandler();
          }
        },
        { gameRoomId: roomId }
      );
    }
    );
  };

  

  const sendHandler = (roomId) => {
    sendingClient.current.send(
      "/main-board/user/init", //카드 초기 설정
      {},
      JSON.stringify({
        roomId: roomId,
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