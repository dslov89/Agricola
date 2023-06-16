import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { nameValue, sendingClient } from "../screen/Start";
import { DataContext } from "../store/data-context";
import { UserContext } from "../store/user-context";

const Gameroomboard = () => {
  const navigation = useNavigate();
  const [rooms, setRooms] = useState([]);
  let roomID;
  const { farmData, setFarmData } = useContext(DataContext);
  const { userData, setUserData } = useContext(UserContext);

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

          if (message.body === "FULL") {
            alert("정원 초과");
          } else {
            const initMsg = JSON.parse(message.body);
            // let jobCardValue = msg.jobCards; //message.body 내 jobCards value값
            // let subCardsValue = msg.subCards; //message.body 내 subCards value값
            // let turnValue = msg.turn; //message.body 내 turn value값

            setFarmData({
              ...farmData,
              // jobCards: initMsg.jobCards.map((item) => [item, 1]),
              // subCards: initMsg.subCards.map((item) => [item, 1]),
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
                if (msg.messageType === "INIT") {
                  setFarmData({
                    ...farmData,
                    round: msg.round,
                    roomId: msg.roomId,
                    messageType: msg.messageType,
                    // action: msg.action,
                    currentTurn: msg.currentTurn,
                    farmer_count: msg.farmer_count,
                    // jobCards: initMsg.jobCards.map((item) => [item, 1]),
                    // subCards: initMsg.subCards.map((item) => [item, 1]),
                    turn: initMsg.turn,
                  });
                } else if (msg.messageType === "RESOURCE") {
                  setFarmData({
                    ...farmData,
                    round: msg.round,
                    roomId: msg.roomId,
                    messageType: msg.messageType,
                    action: msg.action,
                    currentTurn: msg.currentTurn,
                    farmer_count: msg.farmer_count,
                    // jobCards: initMsg.jobCards.map((item) => [item, 1]),
                    // subCards: initMsg.subCards.map((item) => [item, 1]),
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
                    food: msg.food,
                    fence: msg.fence,
                  });
                } else if (msg.messageType === "CARD") {
                  setFarmData({
                    ...farmData,
                    round: msg.round,
                    roomId: msg.roomId,
                    messageType: msg.messageType,
                    action: msg.action,
                    currentTurn: msg.currentTurn,
                    farmer_count: msg.farmer_count,
                    // jobCards: initMsg.jobCards.map((item) => [item, 1]),
                    // subCards: initMsg.subCards.map((item) => [item, 1]),
                    turn: initMsg.turn,
                    cardType: msg.cardType,
                    cardIndex: msg.cardIndex,
                  });
                } else if (msg.messageType === "FARM") {
                  if (msg.currentTurn === 1) {
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      user4: {
                        ...prevUserData.user4,
                        farm_array: msg.building,
                        farm_fence_array: msg.fence,
                        round: msg.round,
                        roomId: msg.roomId,
                        messageType: msg.messageType,
                        action: msg.action,
                        currentTurn: msg.currentTurn,
                        farmer_count: msg.farmer_count,
                        turn: initMsg.turn,
                      },
                    }));
                  } else if (msg.currentTurn === 2) {
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      user1: {
                        ...prevUserData.user1,
                        farm_array: msg.building,
                        farm_fence_array: msg.fence,
                        round: msg.round,
                        roomId: msg.roomId,
                        messageType: msg.messageType,
                        action: msg.action,
                        currentTurn: msg.currentTurn,
                        farmer_count: msg.farmer_count,
                        turn: initMsg.turn,
                      },
                    }));
                  } else if (msg.currentTurn === 3) {
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      user2: {
                        ...prevUserData.user2,
                        farm_array: msg.building,
                        farm_fence_array: msg.fence,
                        round: msg.round,
                        roomId: msg.roomId,
                        messageType: msg.messageType,
                        action: msg.action,
                        currentTurn: msg.currentTurn,
                        farmer_count: msg.farmer_count,
                        turn: initMsg.turn,
                      },
                    }));
                  } else {
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      user3: {
                        ...prevUserData.user3,
                        farm_array: msg.building,
                        farm_fence_array: msg.fence,
                        round: msg.round,
                        roomId: msg.roomId,
                        messageType: msg.messageType,
                        action: msg.action,
                        currentTurn: msg.currentTurn,
                        farmer_count: msg.farmer_count,
                        turn: initMsg.turn,
                      },
                    }));
                  }
                }
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
        messageType: "INIT",
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
