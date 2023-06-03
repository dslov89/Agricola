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
          setFarmData({ ...farmData, userId: message });

          console.log("첫 구독");
          console.log(message.body);
          const initMsg = JSON.parse(message.body);
          if (!initMsg.enter) {
            alert("정원 초과");
          } else {
            // let jobCardValue = msg.jobCards; //message.body 내 jobCards value값
            // let subCardsValue = msg.subCards; //message.body 내 subCards value값
            // let turnValue = msg.turn; //message.body 내 turn value값
            console.log(initMsg.jobCards + "job");
            setFarmData({
              ...farmData,
              jobCards: initMsg.jobCards,
              subCards: initMsg.subCards,
              turn: initMsg.turn,
            });

            // console.log(msg.enter);
            // enter는 true일 때만 입장
            // cards와 turn은 state에 저장

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
                  messageType: msg.messageType,
                  action: msg.action,
                  currentTurn: msg.currentTurn,
                  farmer_count: msg.farmer_count,
                  jobCards: initMsg.jobCards,
                  subCards: initMsg.subCards,
                  turn: initMsg.turn,
                });
                if (msg.messageType === "RESOURCE") {
                  setFarmData({
                    ...farmData,
                    round: msg.round,
                    roomId: msg.roomId,
                    messageType: msg.messageType,
                    action: msg.action,
                    currentTurn: msg.currentTurn,
                    farmer_count: msg.farmer_count,
                    jobCards: initMsg.jobCards,
                    subCards: initMsg.subCards,
                    turn: initMsg.turn,
                    tree: msg.tree,
                    soil: msg.soil,
                    reed: msg.reed,
                    charcoal: msg.charcoal,
                    sheep: msg.sheep,
                    pig: msg.pig,
                    cow: msg.cow,
                    grain: msg.grain,
                    vegetable: msg.vegetable,
                  });
                  // const userId = msg.currentTurn;
                  // if (userId === 0) {
                  //   setFarmData((farmData) => ({
                  //     ...farmData,
                  //     user3: {
                  //       ...farmData.user3,
                  //       tree: farmData.user3.tree + msg.tree,
                  //       soil: farmData.user3.soil + msg.soil,
                  //       reed: farmData.user3.reed + msg.reed,
                  //       charcoal: farmData.user3.charcoal + msg.charcoal,
                  //       sheep: farmData.user3.sheep + msg.sheep,
                  //       pig: farmData.user3.pig + msg.pig,
                  //       cow: farmData.user3.cow + msg.cow,
                  //       grain: farmData.user3.grain + msg.grain,
                  //       vegetable: farmData.user3.vegetable + msg.vegetable,
                  //       food: farmData.user3.food + msg.food,
                  //       farmer: msg.farmer_count[2],
                  //     },
                  //     round: msg.round,
                  //     roomId: msg.roomId,
                  //     messageType: msg.messageType,
                  //     action: msg.action,
                  //     currentTurn: msg.currentTurn,
                  //     farmer_count: msg.farmer_count,
                  //     jobCards: initMsg.jobCards,
                  //     subCards: initMsg.subCards,
                  //     turn: initMsg.turn,
                  //   }));
                  // } else if (userId === 1) {
                  //   setFarmData((farmData) => ({
                  //     ...farmData,
                  //     user4: {
                  //       ...farmData.user4,
                  //       tree: farmData.user4.tree + msg.tree,
                  //       soil: farmData.user4.soil + msg.soil,
                  //       reed: farmData.user4.reed + msg.reed,
                  //       charcoal: farmData.user4.charcoal + msg.charcoal,
                  //       sheep: farmData.user4.sheep + msg.sheep,
                  //       pig: farmData.user4.pig + msg.pig,
                  //       cow: farmData.user4.cow + msg.cow,
                  //       grain: farmData.user4.grain + msg.grain,
                  //       vegetable: farmData.user4.vegetable + msg.vegetable,
                  //       food: farmData.user4.food + msg.food,
                  //       farmer: msg.farmer_count[3],
                  //     },
                  //     round: msg.round,
                  //     roomId: msg.roomId,
                  //     messageType: msg.messageType,
                  //     action: msg.action,
                  //     currentTurn: msg.currentTurn,
                  //     farmer_count: msg.farmer_count,
                  //     jobCards: initMsg.jobCards,
                  //     subCards: initMsg.subCards,
                  //     turn: initMsg.turn,
                  //   }));
                  // } else if (userId === 2) {
                  //   setFarmData((farmData) => ({
                  //     ...farmData,
                  //     user1: {
                  //       ...farmData.user1,
                  //       tree: farmData.user1.tree + msg.tree,
                  //       soil: farmData.user1.soil + msg.soil,
                  //       reed: farmData.user1.reed + msg.reed,
                  //       charcoal: farmData.user1.charcoal + msg.charcoal,
                  //       sheep: farmData.user1.sheep + msg.sheep,
                  //       pig: farmData.user1.pig + msg.pig,
                  //       cow: farmData.user1.cow + msg.cow,
                  //       grain: farmData.user1.grain + msg.grain,
                  //       vegetable: farmData.user1.vegetable + msg.vegetable,
                  //       food: farmData.user1.food + msg.food,
                  //       farmer: msg.farmer_count[0],
                  //     },
                  //     round: msg.round,
                  //     roomId: msg.roomId,
                  //     messageType: msg.messageType,
                  //     action: msg.action,
                  //     currentTurn: msg.currentTurn,
                  //     farmer_count: msg.farmer_count,
                  //     jobCards: initMsg.jobCards,
                  //     subCards: initMsg.subCards,
                  //     turn: initMsg.turn,
                  //   }));
                  // } else {
                  //   setFarmData((farmData) => ({
                  //     ...farmData,
                  //     user2: {
                  //       ...farmData.user2,
                  //       tree: farmData.user2.tree + msg.tree,
                  //       soil: farmData.user2.soil + msg.soil,
                  //       reed: farmData.user2.reed + msg.reed,
                  //       charcoal: farmData.user2.charcoal + msg.charcoal,
                  //       sheep: farmData.user2.sheep + msg.sheep,
                  //       pig: farmData.user2.pig + msg.pig,
                  //       cow: farmData.user2.cow + msg.cow,
                  //       grain: farmData.user2.grain + msg.grain,
                  //       vegetable: farmData.user2.vegetable + msg.vegetable,
                  //       food: farmData.user2.food + msg.food,
                  //       farmer: msg.farmer_count[1],
                  //     },
                  //     round: msg.round,
                  //     roomId: msg.roomId,
                  //     messageType: msg.messageType,
                  //     action: msg.action,
                  //     currentTurn: msg.currentTurn,
                  //     farmer_count: msg.farmer_count,
                  //     jobCards: initMsg.jobCards,
                  //     subCards: initMsg.subCards,
                  //     turn: initMsg.turn,
                  //   }));
                  // }
                }
                console.log(farmData);
              }
            );

            naviHandler();
          }
        },
        { gameRoomId: roomId }
      );
    });
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
    // setTimeout(() => {
    //   sendHandler2();
    // }, 300);
  };

  const createRoom = () => {
    axios
      .post("http://localhost:8080/game-rooms", null, {})
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
  };

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
  };

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
