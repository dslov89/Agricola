import "./FarmBoard.css";
import FarmBoard from "./FarnBoard";
import React, { useState } from "react";
import background from "../image/plow.png";
import land from "../asset/land.svg";
//import SockJS from 'sockjs-client';

function Farms({ data, setData }) {
  const [isTurn, setIsTurn] = useState(true);

  //농장 버튼을 클릭시
  function farmhendler(index) {
    //방 버튼을 눌렀을 때
    if (isTurn && data.player_array[6] === 1) {
      //유저가 클린한 방이 나무인 경우

      //유저가 클릭한 방이 돌인 경우

      //자원을 바꿔주고 다시 서버에 보내줌
      setData({ ...data, tree: data.tree + 1 });
      setData((prevState) => {
        const newArray = [...prevState.player_array];
        newArray[0] = 0;
        return { ...prevState, array: newArray };
      });

      setIsTurn(false);
    }

    //농지 버튼 클릭 시 가는 기능 - 밭 갈기
    if (isTurn && data.player_array[9] === 1) {
      //외양간, 울타리 집 짓기를 모두 포함
      if (data.farm[index] !== "empty") {
        alert("해당 방은 이미 예약되어 있습니다.");
        console.log("해당 방은 이미 예약되어 있습니다");
      } else {
        //빈 곳을 밭으로 바꿔줌 이미지

        const roomClass = `.room${Math.floor(index / 5) + 1}_${
          (index % 5) + 1
        }`;
        const roomElement = document.querySelector(roomClass);

        const redBox = document.createElement("div");
        redBox.style.width = "75px";
        redBox.style.height = "75px";
        //redBox.style.backgroundColor = 'white';
        redBox.style.backgroundImage = `url(${land})`;
        roomElement.appendChild(redBox);

        // 데이터
        const newData = { ...data };
        newData.farm[index] = "plow";
        setData(newData);
        // 개인이 가는 것을 종료 및 턴 종료
        setData((prevState) => {
          const newArray = [...prevState.player_array];
          newArray[1] = 0;
          return { ...prevState, array: newArray };
        });
        setIsTurn(false);
      }
    }
  }
  //외양간 설치 기능 -> 갔는지 확인

  //울타리 관련 기능

  //동물 키우는 것에 대한 로직

  return (
    <div className="farmContainer">
      <FarmBoard className="round" />
      <div className="Btn room1_1" onClick={() => farmhendler(0)}></div>
      <div className="Btn room1_2" onClick={() => farmhendler(1)}></div>
      <div className="Btn room1_3" onClick={() => farmhendler(2)}></div>
      <div className="Btn room1_4" onClick={() => farmhendler(3)}></div>
      <div className="Btn room1_5" onClick={() => farmhendler(4)}></div>

      <div className="Btn room2_1" onClick={() => farmhendler(5)}></div>
      <div className="Btn room2_2" onClick={() => farmhendler(6)}></div>
      <div className="Btn room2_3" onClick={() => farmhendler(7)}></div>
      <div className="Btn room2_4" onClick={() => farmhendler(8)}></div>
      <div className="Btn room2_5" onClick={() => farmhendler(9)}></div>

      <div className="Btn room3_1" onClick={() => farmhendler(10)}></div>
      <div className="Btn room3_2" onClick={() => farmhendler(11)}></div>
      <div className="Btn room3_3" onClick={() => farmhendler(12)}></div>
      <div className="Btn room3_4" onClick={() => farmhendler(13)}></div>
      <div className="Btn room3_5" onClick={() => farmhendler(14)}></div>
    </div>
  );
}

export default Farms;
