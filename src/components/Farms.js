import "./FarmBoard.css";
import FarmBoard from "./FarnBoard";
import React, { useState } from "react";
import background from "../image/plow.png";

import woodroom from "../image/wood_room.png";
import soilroom from "../image/soil_room.png";
import rockroom from "../image/rock_room.png";

import land from "../asset/land.svg";
import SockJS from 'sockjs-client';

function Farms({ data, setData }) {
  const [isTurn, setIsTurn] = useState(true);

  //농장 버튼을 클릭시
  function farmhendler(index) {
    //방 버튼을 눌렀을 때
    if (isTurn && data.player_array[6] === 1) {

      const dx = [1, -1, 5, -5];
      let i = 0;
      let cnt = 0;
      //유저가 클릭한 곳에 방이 없을 경우
      //wood room 하나 지어줌
      if (data.farm[index] === "empty") {
        if (data.tree >= 5 && data.reed >= 2) {
          for (i = 0; i < 4; i++) {
            if (index + dx[i] < 0 || index + dx[i] > 14) {
              cnt += 1;
            }
            else {
              if (data.farm[index+dx[i]] === "empty") {
                cnt += 1;
                if (cnt > 1) {
                  alert("여기는 못지어요");
                  break;
                }
              }
              if (index === 4 || index === 9) {
                if (index === 4) {
                  if (dx[i] === -1 || dx[i] === 5) {
                    if (data.farm[index + dx[i]] === "wood_room" || data.farm[index + dx[i]] === "soil_room" || data.farm[index + dx[i]] === "rock_room") {
                      const roomClass = `.room${Math.floor(index / 5) + 1}_${(index % 5) + 1}`;
                      const roomElement = document.querySelector(roomClass);
                      const redBox = document.createElement("div");
                      redBox.style.width = "75px";
                      redBox.style.height = "75px";
                      redBox.style.backgroundImage = `url(${woodroom})`;
                      roomElement.appendChild(redBox);
                      setData({ ...data, tree: data.tree - 5, reed: data.reed - 2 });
                      data.farm[index] = "wood_room";
                      alert("우드방 하나 지음");
                      break;
                    }
                  }
                }
                else if (index === 9) {
                  if (dx[i] === -1 || dx[i] === -5 || dx[i] === 5) {
                    if (data.farm[index + dx[i]] === "wood_room" || data.farm[index + dx[i]] === "soil_room" || data.farm[index + dx[i]] === "rock_room") {
                      const roomClass = `.room${Math.floor(index / 5) + 1}_${
                        (index % 5) + 1
                      }`;
                      const roomElement = document.querySelector(roomClass);
                      const redBox = document.createElement("div");
                      redBox.style.width = "75px";
                      redBox.style.height = "75px";
                      redBox.style.backgroundImage = `url(${woodroom})`;
                      roomElement.appendChild(redBox);
                      setData({ ...data, tree: data.tree - 5, reed: data.reed - 2 });
                      data.farm[index] = "wood_room";
                      alert("우드방 하나 지음");
                      break;
                    }
                  }
                }
              }
              else {
                if (data.farm[index + dx[i]] === "wood_room" || data.farm[index + dx[i]] === "soil_room" || data.farm[index + dx[i]] === "rock_room") {
                  setData({ ...data, tree: data.tree - 5, reed: data.reed - 2, });
                  const roomClass = `.room${Math.floor(index / 5) + 1}_${
                    (index % 5) + 1
                  }`;
                  const roomElement = document.querySelector(roomClass);
                  const redBox = document.createElement("div");
                  redBox.style.width = "75px";
                  redBox.style.height = "75px";
                  redBox.style.backgroundImage = `url(${woodroom})`;
                  roomElement.appendChild(redBox);
                  data.farm[index] = "wood_room";
                  alert("우드방 하나 지음");
                  break;
                }
              }
            }
          }
        }
        else if (data.tree < 5 || data.reed < 2) {
          setData((prevState) => {
            const newArray = [...prevState.player_array];
            newArray[0] = 0;
            return { ...prevState, array: newArray };
          });
          setIsTurn(false);
        }
      }
      //유저가 클릭한 방이 나무인 경우 -> 한번에 업그레이드
      else if (data.farm[index] === 'wood_room') {
        const count_wood = data.farm.filter(item => item === 'wood_room').length;
        if (data.clay >= 5*count_wood && data.reed >= 2*count_wood) {
          const roomIndices = []; // wood_room에 해당하는 인덱스를 저장할 배열

          // wood_room에 해당하는 인덱스 찾기
          data.farm.forEach((item, idx) => {
            if (item === 'wood_room') {
              roomIndices.push(idx);
            }
          });

          // wood_room에 해당하는 인덱스 전체를 soil_room으로 변경
          roomIndices.forEach((idx) => {
            data.farm[idx] = 'soil_room';
          });

          // 이미지 및 인덱스 변경
          roomIndices.forEach((idx) => {
            const roomClass = `.room${Math.floor(idx / 5) + 1}_${(idx % 5) + 1}`;
            const roomElement = document.querySelector(roomClass);
            const redBox = document.createElement("div");
            redBox.style.width = "75px";
            redBox.style.height = "75px";
            redBox.style.backgroundImage = `url(${soilroom})`;
            redBox.style.position = "absolute";
            redBox.style.top = "0";
            redBox.style.left = "0";
            roomElement.appendChild(redBox);
          });
          setData({ ...data, clay: data.clay - 5*count_wood, reed: data.reed - 2*count_wood});
          alert("흙방 지음");

          setData((prevState) => {
            const newArray = [...prevState.player_array];
            newArray[0] = 0;
            return { ...prevState, array: newArray };
          });
          setIsTurn(false);

        }
        else {
          alert("자원이 부족");
        }
      }
      
      //유저가 클릭한 방이 흙인 경우
      else if (data.farm[index] === 'soil_room') {
        const count_soil = data.farm.filter(item => item === 'soil_room').length;
        if (data.clay >= 5*count_soil && data.reed >= 2*count_soil) {
          const roomIndices = []; // wood_room에 해당하는 인덱스를 저장할 배열

          // soil_room 해당하는 인덱스 찾기
          data.farm.forEach((item, idx) => {
            if (item === 'soil_room') {
              roomIndices.push(idx);
            }
          });

          // soil_room 해당하는 인덱스 전체를 rock_room으로 변경
          roomIndices.forEach((idx) => {
            data.farm[idx] = 'rock_room';
          });

          // 이미지 및 인덱스 변경
          roomIndices.forEach((idx) => {
            const roomClass = `.room${Math.floor(idx / 5) + 1}_${(idx % 5) + 1}`;
            const roomElement = document.querySelector(roomClass);
            const redBox = document.createElement("div");
            redBox.style.width = "75px";
            redBox.style.height = "75px";
            redBox.style.backgroundImage = `url(${rockroom})`;
            redBox.style.position = "absolute";
            redBox.style.top = "0";
            redBox.style.left = "0";
            roomElement.appendChild(redBox);
          });
          setData({ ...data, rock: data.rock - 5*count_soil, reed: data.reed - 2*count_soil});
          alert("돌방 지음");

          setData((prevState) => {
            const newArray = [...prevState.player_array];
            newArray[0] = 0;
            return { ...prevState, array: newArray };
          });
          setIsTurn(false);

        }
        else {
          alert("자원이 부족");
        }
      }

      //유저가 클릭한 방이 돌인 경우
      else{
        alert("더 이상 업그레이드 불가 합니다.")
      }

      //자원을 바꿔주고 다시 서버에 보내줌
      // setData((prevState) => {
      //   const newArray = [...prevState.player_array];
      //   newArray[0] = 0;
      //   return { ...prevState, array: newArray };
      // });
      
      
    } 

    //농지 버튼 클릭 시 가는 기능 - 밭 갈기
    if (isTurn && data.player_array[9] === 1) {
      //외양간, 울타리 집 짓기를 모두 포함

      if(data.farm[index] !== 'empty') {
        alert('해당 방은 이미 예약되어 있습니다.');
        console.log("해당 방은 이미 예약되어 있습니다")


      } else {
        //빈 곳을 밭으로 바꿔줌 이미지

        const roomClass = `.room${Math.floor(index / 5) + 1}_${
          (index % 5) + 1
        }`;
        const roomElement = document.querySelector(roomClass);

        const redBox = document.createElement("div");
        redBox.style.width = "75px";
        redBox.style.height = "75px";

        redBox.style.backgroundImage = `url(${background})`;


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

    //외양간 설치 기능 -> 갔는지 확인\
    if(isTurn && data.player_array[18] === 1 ){

      setIsTurn(false);
    }
  }

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
