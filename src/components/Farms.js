import "./FarmBoard.css";
import FarmBoard from "./FarnBoard";
import React, { useContext, useState, useEffect, useMemo } from "react";
import plow from "../image/plow.png";
import { nameValue, sendingClient } from "../screen/Start";

import woodroom from "../image/wood_room.png";
import soilroom from "../image/soil_room.png";
import rockroom from "../image/rock_room.png";
import house from "../image/house.png";
import sheep from "../image/sheep.png";
import grain1 from "../image/seed.png";
import grain2 from "../image/grain2.png";
import grain3 from "../image/grain3.png";
import plow_grain1 from "../image/plow_grain1.png";
import plow_grain2 from "../image/plow_grain2.png";
import plow_grain3 from "../image/plow_grain3.png";

import vegetable from "../image/vegetable.png";
import plow_vegetable1 from "../image/plow_vegetable1.png";
import plow_vegetable2 from "../image/plow_vegetable2.png";

import land from "../asset/land.svg";
import SockJS from "sockjs-client";
import { DataContext } from "../store/data-context";
import { UserContext } from "../store/user-context";

function Farms({ data, setData }) {
  const [isTurn, setIsTurn] = useState(true);
  const [isTurnEnd, setIsTurnEnd] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isaniFinished, setisaniFinished] = useState(false);
  const [isbread, setisbread] = useState(false);
  const [isnobread, setisnobread] = useState(false);
  const [ishousegame, setIshousegame] = useState(false);
  const {
    farmData,
    setFarmData,
    updateFarmerCount,
    updateFarmData,
    updateAction,
  } = useContext(DataContext);
  const { userData, setUserData } = useContext(UserContext);
  const fist_setting = useMemo(() => {
    return { ...userData[`user${farmData.turn}`] };
  }, [farmData.currentTurn]);

  // 현재 자신의 턴인지
  useEffect(() => {
    if (
      farmData.currentTurn === farmData.turn % 4 &&
      farmData.farmer_count[(farmData.turn - 1) % 4] != 0
    ) {
      updateFarmData();
      setIsTurn(true);
    } else {
      setIsTurn(false);
    }
  }, [farmData.currentTurn]);

  const farmdefaulthandelr = async (res, index) => {
    await updateAction(index, 0);
    sendingClient.current.send(
      "/main-board/farm/update",
      {},
      JSON.stringify({
        messageType: "FARM",
        roomId: farmData.roomId,
        round: farmData.round,
        action: farmData.action,
        currentTurn: (farmData.currentTurn + 1) % 4,
        farmer_count: farmData.farmer_count,
        building: res.farm_array,
        fence: res.farm_fence_array,
      })
    );
    sendingClient.current.send(
      "/main-board/resource/update",
      {},
      JSON.stringify({
        messageType: "RESOURCE",
        roomId: farmData.roomId,
        round: farmData.round,
        action: farmData.action,
        currentTurn: (farmData.currentTurn + 1) % 4,
        farmer_count: farmData.farmer_count,
        tree: res.tree,
        soil: res.soil,
        reed: res.reed,
        charcoal: res.charcoal,
        sheep: res.sheep,
        pig: res.pig,
        cow: res.cow,
        grain: res.grain,
        vegetable: res.vegetable,
        food: res.food,
        fence: res.fence,
      })
    );

    console.log("default");
  };

  function farmHandler(index) {
    const getFenceCount = (count, SequenceCount) => {
      return 2 * count + 2 * SequenceCount;
    };

    const dx = [1, -1, 5, -5]; // 상하좌우로 연결된 방을 확인하기 위한 오프셋 배열

    const checkFenceSequence = (farm, indexSequence, count_ul) => {
      if (count_ul === 0) {
        return 0;
      } else {
        let visited = new Set(); // 방문한 인덱스를 저장하기 위한 Set
        let count = 0; // 연결된 방의 개수를 저장하는 변수

        const dfs = (index) => {
          if (index < 0 || index >= farm.length) {
            return; // 인덱스가 범위를 벗어나면 종료
          }

          if (farm[index] !== "fence" || visited.has(index)) {
            return; // 인덱스가 울타리가 아니거나 이미 방문한 경우 종료
          }

          visited.add(index); // 현재 인덱스를 방문 처리

          // 상하좌우 인덱스로 DFS 탐색
          for (let i = 0; i < dx.length; i++) {
            const nextIndex = index + dx[i]; // 다음 인덱스 계산

            dfs(nextIndex); // DFS 탐색
          }
        };

        // 모든 인덱스에 대해 탐색
        for (let i = 0; i < indexSequence.length; i++) {
          const index = indexSequence[i];

          if (visited.has(index)) {
            continue; // 이미 방문한 인덱스인 경우 건너뜀
          } else {
            count += 1; // 연결된 방의 개수 증가
            dfs(index); // DFS 탐색
          }
        }

        return count;
      }
    };
    //방 버튼을 눌렀을 때
    if (
      farmData.action[6][0] === (farmData.turn) &&
      farmData.action[6][1] === 6) {
      setIsGameFinished(true); // 새로운 종료 버튼을 활성화
      setIshousegame(true); // 외양간 버튼 활성화

      const dx = [1, -1, 5, -5];
      let i = 0;
      let cnt = 0;
      //유저가 클릭한 곳에 방이 없을 경우
      //wood room 하나 지어줌
      if (userData[`user${farmData.turn}`].farm_array[index] === "empty") {
        if (
          userData[`user${farmData.turn}`].tree >= 5 &&
          userData[`user${farmData.turn}`].reed >= 2
        ) {
          for (i = 0; i < 4; i++) {
            if (index + dx[i] < 0 || index + dx[i] > 14) {
              cnt += 1;
            } else {
              if (
                userData[`user${farmData.turn}`].farm_array[index + dx[i]] ===
                "empty"
              ) {
                cnt += 1;
                if (cnt > 1) {
                  alert("여기는 못지어요");
                  break;
                }
              }
              if (index === 4 || index === 9) {
                if (index === 4) {
                  if (dx[i] === -1 || dx[i] === 5) {
                    if (
                      userData[`user${farmData.turn}`].farm_array[
                        index + dx[i]
                      ] === "wood_room" ||
                      userData[`user${farmData.turn}`].farm_array[
                        index + dx[i]
                      ] === "soil_room" ||
                      userData[`user${farmData.turn}`].farm_array[
                        index + dx[i]
                      ] === "rock_room"
                    ) {
                      const roomClass = `.Btn.room${
                        Math.floor(index / 5) + 1
                      }_${(index % 5) + 1}`;
                      const roomElement = document.querySelector(roomClass);
                      roomElement.style.backgroundImage = `url(${woodroom})`;

                      const updatedUserData = { ...userData }; // userData 객체 복사
                      updatedUserData[`user${farmData.turn}`].farm_array[
                        index
                      ] = "wood_room"; // farm_array 업데이트
                      updatedUserData[`user${farmData.turn}`].tree -= 5;
                      updatedUserData[`user${farmData.turn}`].reed -= 2;
                      setUserData(updatedUserData);
                      updateAction(6, 0); // 업데이트된 action 상태를 업데이트하는 함수 호출                      alert("우드방 하나 지음");
                      break;
                    }
                  }
                } else if (index === 9) {
                  if (dx[i] === -1 || dx[i] === -5 || dx[i] === 5) {
                    if (
                      userData[`user${farmData.turn}`].farm_array[
                        index + dx[i]
                      ] === "wood_room" ||
                      userData[`user${farmData.turn}`].farm_array[
                        index + dx[i]
                      ] === "soil_room" ||
                      userData[`user${farmData.turn}`].farm_array[
                        index + dx[i]
                      ] === "rock_room"
                    ) {
                      const roomClass = `.Btn.room${
                        Math.floor(index / 5) + 1
                      }_${(index % 5) + 1}`;
                      const roomElement = document.querySelector(roomClass);
                      roomElement.style.backgroundImage = `url(${woodroom})`;

                      const updatedUserData = { ...userData }; // userData 객체 복사
                      updatedUserData[`user${farmData.turn}`].farm_array[
                        index
                      ] = "wood_room"; // farm_array 업데이트
                      updatedUserData[`user${farmData.turn}`].tree -= 5;
                      updatedUserData[`user${farmData.turn}`].reed -= 2;
                      setUserData(updatedUserData);

                      updateAction(6, 0); // 업데이트된 action 상태를 업데이트하는 함수 호출

                      alert("우드방 하나 지음");
                      break;
                    }
                  }
                }
              } else {
                if (
                  userData[`user${farmData.turn}`].farm_array[index + dx[i]] ===
                    "wood_room" ||
                  userData[`user${farmData.turn}`].farm_array[index + dx[i]] ===
                    "soil_room" ||
                  userData[`user${farmData.turn}`].farm_array[index + dx[i]] ===
                    "rock_room"
                ) {
                  const roomClass = `.Btn.room${Math.floor(index / 5) + 1}_${
                    (index % 5) + 1
                  }`;
                  const roomElement = document.querySelector(roomClass);
                  roomElement.style.backgroundImage = `url(${woodroom})`;

                  const updatedUserData = { ...userData }; // userData 객체 복사
                  updatedUserData[`user${farmData.turn}`].farm_array[index] =
                    "wood_room"; // farm_array 업데이트
                  updatedUserData[`user${farmData.turn}`].tree -= 5;
                  updatedUserData[`user${farmData.turn}`].reed -= 2;

                  setUserData(updatedUserData); // 업데이트된 userData 상태 설정

                  //끝냄
                  updateAction(6, 0);

                  alert("우드방 하나 지음");
                  break;
                }
              }
            }
          }
        } else if (
          userData[`user${farmData.turn}`].tree < 5 ||
          userData[`user${farmData.turn}`].reed < 2
        ) {
          alert("자원이 부족합니다. 외양간을 설치하거나 종료해주세요!");
        }
        //여기서 턴을 종료하지 않고 외양간 설치 기능을 넣어준다.
      }
      //유저가 클릭한 방이 나무인 경우 -> 한번에 업그레이드
      else if (
        userData[`user${farmData.turn}`].farm_array[index] === "wood_room"
      ) {
        const count_wood = userData[`user${farmData.turn}`].farm_array.filter(
          (item) => item === "wood_room"
        ).length;

        if (
          userData[`user${farmData.turn}`].soil >= 5 * count_wood &&
          userData[`user${farmData.turn}`].reed >= 2 * count_wood
        ) {
          const roomIndices = []; // wood_room에 해당하는 인덱스를 저장할 배열

          // wood_room에 해당하는 인덱스 찾기
          userData[`user${farmData.turn}`].farm_array.forEach((item, idx) => {
            if (item === "wood_room") {
              roomIndices.push(idx);
            }
          });

          // wood_room에 해당하는 인덱스 전체를 soil_room으로 변경
          roomIndices.forEach((idx) => {
            const updatedUserData = { ...userData }; // userData 객체 복사
            updatedUserData[`user${farmData.turn}`].farm_array[idx] =
              "soil_room"; // farm_array 업데이트
            setUserData(updatedUserData);
          });

          // 이미지 및 인덱스 변경
          roomIndices.forEach((idx) => {
            const roomClass = `.Btn.room${Math.floor(idx / 5) + 1}_${
              (idx % 5) + 1
            }`;
            const roomElement = document.querySelector(roomClass);
            roomElement.style.backgroundImage = `url(${soilroom})`;
          });
          const updatedUserData2 = { ...userData }; // userData 객체 복사
          updatedUserData2[`user${farmData.turn}`].soil -= 5 * count_wood;
          updatedUserData2[`user${farmData.turn}`].reed -= 2 * count_wood;
          setUserData(updatedUserData2);

          updateAction(6, 0);
          alert("흙방 지음");
          alert("외양간 짓거나, 종료해주세요.");
        } else {
          alert("자원이 부족");
        }
      }

      //유저가 클릭한 방이 흙인 경우
      else if (
        userData[`user${farmData.turn}`].farm_array[index] === "soil_room"
      ) {
        const count_soil = userData[`user${farmData.turn}`].farm_array.filter(
          (item) => item === "soil_room"
        ).length;
        if (
          userData[`user${farmData.turn}`].soil >= 5 * count_soil &&
          userData[`user${farmData.turn}`].reed >= 2 * count_soil
        ) {
          const roomIndices = []; // wood_room에 해당하는 인덱스를 저장할 배열

          // soil_room 해당하는 인덱스 찾기
          userData[`user${farmData.turn}`].farm_array.forEach((item, idx) => {
            if (item === "soil_room") {
              roomIndices.push(idx);
            }
          });

          // soil_room 해당하는 인덱스 전체를 rock_room으로 변경
          roomIndices.forEach((idx) => {
            const updatedUserData = { ...userData }; // userData 객체 복사
            updatedUserData[`user${farmData.turn}`].farm_array[idx] =
              "rock_room"; // farm_array 업데이트

            setUserData(updatedUserData);
          });

          // 이미지 및 인덱스 변경
          roomIndices.forEach((idx) => {
            const roomClass = `.room${Math.floor(idx / 5) + 1}_${
              (idx % 5) + 1
            }`;
            const roomElement = document.querySelector(roomClass);
            roomElement.style.backgroundImage = `url(${rockroom})`;
          });
          /// 바꿔야함
          const updatedUserData2 = { ...userData }; // userData 객체 복사
          updatedUserData2[`user${farmData.turn}`].charcoal -= 5 * count_soil;
          updatedUserData2[`user${farmData.turn}`].reed -= 2 * count_soil;
          setUserData(updatedUserData2);
          updateAction(6, 0);
          alert("돌방 지음");
          alert("외양간 짓거나, 종료해주세요.");
        } else {
          alert("자원이 부족");
        }
      }

      //유저가 클릭한 방이 돌인 경우
      else {
        alert("업그레이드 불가능, 외양간 짓거나, 종료해주세요.");
      }
    }

    //농지 버튼 클릭 시 가는 기능 - 밭 갈기 -> 자신의 턴이면서 action버튼의 9번째 인덱스가 1인 경우
    if (
      farmData.action[9][0] === (farmData.turn) &&
      farmData.action[9][1] === 9
    ) {

      if (userData[`user${farmData.turn}`].farm_array[index] !== "empty") {
        alert("해당 방은 이미 예약되어 있습니다.");
        console.log("해당 방은 이미 예약되어 있습니다");
      } else {
        const roomClass = `.Btn.room${Math.floor(index / 5) + 1}_${
          (index % 5) + 1
        }`;
        const roomElement = document.querySelector(roomClass);
        roomElement.style.backgroundImage = `url(${plow})`;
        //setuserdata로 바꾸기

        const updatedUserData = { ...userData }; // userData 객체 복사
        updatedUserData[`user${farmData.turn}`].farm_array[index] = "plow"; // farm_array 업데이트

        setUserData(updatedUserData); // 업데이트된 userData 상태 설정

        const res = {
          userid: farmData.turn,
          tree: 0,
          soil: 0,
          reed: 0,
          charcoal: 0,
          sheep: 0,
          pig: 0,
          cow: 0,
          grain: 0,
          vegetable: 0,
          food: 0,
          fence: 0,
          farm_array: userData[`user${farmData.turn}`].farm_array,
          farm_fence_array: userData[`user${farmData.turn}`].farm_fence_array,
        };
        
        farmdefaulthandelr(res, 9);

        if(userData[`user${farmData.turn}`].job.includes(17)) {
          const updatedAction = [...farmData.action]; // action 배열을 복사합니다.
          updatedAction[9][0] = 0; // 첫 번째 인덱스의 첫 번째 요소를 1로 변경합니다.
          updatedAction[9][1] = 0;
          setFarmData((prevFarmData) => ({
            ...prevFarmData,
            action: updatedAction, // 업데이트된 action 배열을 설정합니다.
          }));
        }
        //setIsTurnEnd(true);
      }
    }

    if (farmData.action[6][1] === 26) {
      // 여기서 울타리 로직할 때 farm이 아니라 fence array를 참고해볼 것
      if (
        userData[`user${farmData.turn}`].farm_array[index] === "fence" ||
        userData[`user${farmData.turn}`].farm_array[index] === "empty"
      ) {
        if (userData[`user${farmData.turn}`].tree >= 2) {
          //이름을 외양간으로 바꿔주기, 그 방
          const roomClass = `.Btn.room${Math.floor(index / 5) + 1}_${
            (index % 5) + 1
          }`;
          const roomElement = document.querySelector(roomClass);
          roomElement.style.backgroundImage = `url(${house})`;

          if (userData[`user${farmData.turn}`].farm_array[index] === "fence") {
            const updatedUserData = { ...userData }; // userData 객체 복사
            updatedUserData[`user${farmData.turn}`].farm_array[index] =
              "fence_house"; // farm_array 업데이트
            setUserData(updatedUserData);
          } else {
            const updatedUserData = { ...userData }; // userData 객체 복사
            updatedUserData[`user${farmData.turn}`].farm_array[index] = "house"; // farm_array 업데이트
            setUserData(updatedUserData);
          }
          const updatedUserData = { ...userData }; // userData 객체 복사
          updatedUserData[`user${farmData.turn}`].tree -= 2;
          setUserData(updatedUserData);

          //끝냄
          updateAction(6, 0);

          alert("외양간 하나 지음/ 종료해주세요");
        } else {
          alert("지을 수 없습니다.");
        }
      } else {
        alert("지을 수 없습니다");
      }
    }
    //양시장
    if(farmData.action[19][0] === (farmData.turn) && farmData.action[19][1] === 19) {
        
        const roomClass = `.Btn.room${Math.floor(index / 5) + 1}_${
          (index % 5) + 1
        }`;
        if(userData[`user${farmData.turn}`].farm_array[index] === "wood_room") {
          const roomElement = document.querySelector(roomClass);
          roomElement.style.backgroundImage = `url(${sheep})`;
          
          const newdate = {...userData};
          newdate[`user${farmData.turn}`].farm_array[index] = "sheep_room";
          setUserData(newdate);
        } else if(userData[`user${farmData.turn}`].farm_array[index] === "soil_room") {
          const roomElement = document.querySelector(roomClass);
          roomElement.style.backgroundImage = `url(${sheep})`;
          
          const newdate = {...userData};
          newdate[`user${farmData.turn}`].farm_array[index] = "sheep_room";
          setUserData(newdate);
        } else if(userData[`user${farmData.turn}`].farm_array[index] === "rock_room") {
          const roomElement = document.querySelector(roomClass);
          roomElement.style.backgroundImage = `url(${sheep})`;
          
          const newdate = {...userData};
          newdate[`user${farmData.turn}`].farm_array[index] = "sheep_room";
          setUserData(newdate);
        } else if(userData[`user${farmData.turn}`].farm_array[index] === "fence") {
          const roomElement = document.querySelector(roomClass);
          roomElement.style.backgroundImage = `url(${sheep})`;
          
          const newdate = {...userData};
          newdate[`user${farmData.turn}`].farm_array[index] = "sheep_fence";
          setUserData(newdate);
        } else if(userData[`user${farmData.turn}`].farm_array[index] === "house") {
          const roomElement = document.querySelector(roomClass);
          roomElement.style.backgroundImage = `url(${sheep})`;
          
          const newdate = {...userData};
          newdate[`user${farmData.turn}`].farm_array[index] = "sheep_house";
          setUserData(newdate);
        };
      
        
        
        const res = {
          userid: farmData.turn,
          tree: 0,
          soil: 0,
          reed: 0,
          charcoal: 0,
          sheep: 1,
          pig: 0,
          cow: 0,
          grain: 0,
          vegetable: 0,
          food: 0,
          fence: 0,
        };
        farmdefaulthandelr(res, 19);
    }

    // 울타리 짓기 로직
    if (
      farmData.action[17][0] === (farmData.turn) &&
      farmData.action[17][1] === 17
    ) {
      setIsGameFinished(true); // 새로운 종료 버튼을 활성화
      if (userData[`user${farmData.turn}`].fence > 0) {
        if (
          userData[`user${farmData.turn}`].farm_array[index] === "empty" ||
          userData[`user${farmData.turn}`].farm_array[index] === "house"
        ) {
          //비어있거나 외양간만 있을 때 지을 수 있음
          //모든 fence에 버튼 구현
          //alert("내부");

          const pre_indexSequence = [];
          // farm 배열 순회
          for (
            let i = 0;
            i < userData[`user${farmData.turn}`].farm_array.length;
            i++
          ) {
            if (userData[`user${farmData.turn}`].farm_array[i] === "fence") {
              pre_indexSequence.push(i);
            }
          }
          // 클릭한 방의 인덱스를 fence로 바꿔줌
          let pre_count_ul = userData[`user${farmData.turn}`].farm_array.filter(
            (item) => item === "fence"
          ).length;

          let pre_x = getFenceCount(
            pre_count_ul,
            checkFenceSequence(
              userData[`user${farmData.turn}`].farm_array,
              pre_indexSequence,
              pre_count_ul
            )
          );

          const newData = { ...userData };
          newData[`user${farmData.turn}`].farm_array[index] = "fence";
          setUserData(newData);
          const indexSequence = [];
          // farm 배열 순회
          for (
            let i = 0;
            i < userData[`user${farmData.turn}`].farm_array.length;
            i++
          ) {
            if (userData[`user${farmData.turn}`].farm_array[i] === "fence") {
              indexSequence.push(i);
            }
          }
          let count_ul = userData[`user${farmData.turn}`].farm_array.filter(
            (item) => item === "fence"
          ).length;

          let x = getFenceCount(
            count_ul,
            checkFenceSequence(
              userData[`user${farmData.turn}`].farm_array,
              indexSequence,
              count_ul
            )
          );

          if (userData[`user${farmData.turn}`].tree >= x - pre_x) {
            //alert("자원 있는 경우");

            if (index >= 0 && index <= 4) {
              // 업데이트
              const formattedIndex = (index + 1).toString().padStart(2, "0");
              const formattedIndex1 = (index + 2).toString().padStart(2, "0");
              const fenceElement1 = document.querySelector(
                `.fence.fenceRow1.fenceRow${formattedIndex}`
              );
              const fenceElement2 = document.querySelector(
                `.fenceCol.fenceCol1.fenceCol${formattedIndex}`
              );
              const fenceElement3 = document.querySelector(
                `.fence.fenceRow2.fenceRow${formattedIndex}`
              );
              const fenceElement4 = document.querySelector(
                `.fenceCol.fenceCol1.fenceCol${formattedIndex1}`
              );

              if (
                userData[`user${farmData.turn}`].farm_fence_array[0][index] ===
                1
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[0][index] = 0;
              } else if (
                userData[`user${farmData.turn}`].farm_fence_array[0][index] ===
                0
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[0][index] = 1;
              }

              if (
                userData[`user${farmData.turn}`].farm_fence_array[1][index] ===
                1
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[1][index] = 0;
              } else if (
                userData[`user${farmData.turn}`].farm_fence_array[1][index] ===
                0
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[1][index] = 1;
              }

              if (
                userData[`user${farmData.turn}`].farm_fence_array[2][index] ===
                1
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[2][index] = 0;
              } else if (
                userData[`user${farmData.turn}`].farm_fence_array[2][index] ===
                0
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[2][index] = 1;
              }

              if (
                userData[`user${farmData.turn}`].farm_fence_array[1][
                  index + 1
                ] === 1
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[1][
                  index + 1
                ] = 0;
              } else if (
                userData[`user${farmData.turn}`].farm_fence_array[1][
                  index + 1
                ] === 0
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[1][
                  index + 1
                ] = 1;
              }

              if (
                newData[`user${farmData.turn}`].farm_fence_array[0][index] === 1
              ) {
                fenceElement1.style.backgroundColor = "red";
              } else if (
                newData[`user${farmData.turn}`].farm_fence_array[0][index] === 0
              ) {
                fenceElement1.style.backgroundColor = "";
              }

              if (
                newData[`user${farmData.turn}`].farm_fence_array[1][index] === 1
              ) {
                fenceElement2.style.backgroundColor = "red";
              } else if (
                newData[`user${farmData.turn}`].farm_fence_array[1][index] === 0
              ) {
                fenceElement2.style.backgroundColor = "";
              }

              if (
                newData[`user${farmData.turn}`].farm_fence_array[2][index] === 1
              ) {
                fenceElement3.style.backgroundColor = "red";
              } else if (
                newData[`user${farmData.turn}`].farm_fence_array[0][index] === 0
              ) {
                fenceElement3.style.backgroundColor = "";
              }

              if (
                newData[`user${farmData.turn}`].farm_fence_array[1][
                  index + 1
                ] === 1
              ) {
                fenceElement4.style.backgroundColor = "red";
              } else if (
                newData[`user${farmData.turn}`].farm_fence_array[1][
                  index + 1
                ] === 0
              ) {
                fenceElement4.style.backgroundColor = "";
              }
              fenceElement1.setAttribute("id", "fenceButton1");
              fenceElement2.setAttribute("id", "fenceButton2");
              fenceElement3.setAttribute("id", "fenceButton3");
              fenceElement4.setAttribute("id", "fenceButton4");
            } else if (index >= 5 && index <= 9) {
              index -= 5;
              const formattedIndex = (index + 1).toString().padStart(2, "0");
              const formattedIndex1 = (index + 2).toString().padStart(2, "0");
              const fenceElement1 = document.querySelector(
                `.fence.fenceRow2.fenceRow${formattedIndex}`
              );
              const fenceElement2 = document.querySelector(
                `.fenceCol.fenceCol2.fenceCol${formattedIndex}`
              );
              const fenceElement3 = document.querySelector(
                `.fence.fenceRow3.fenceRow${formattedIndex}`
              );
              const fenceElement4 = document.querySelector(
                `.fenceCol.fenceCol2.fenceCol${formattedIndex1}`
              );

              if (
                userData[`user${farmData.turn}`].farm_fence_array[2][index] ===
                1
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[2][index] = 0;
              } else if (
                userData[`user${farmData.turn}`].farm_fence_array[2][index] ===
                0
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[2][index] = 1;
              }

              if (
                userData[`user${farmData.turn}`].farm_fence_array[3][index] ===
                1
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[3][index] = 0;
              } else if (
                userData[`user${farmData.turn}`].farm_fence_array[3][index] ===
                0
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[3][index] = 1;
              }

              if (
                userData[`user${farmData.turn}`].farm_fence_array[4][index] ===
                1
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[4][index] = 0;
              } else if (
                userData[`user${farmData.turn}`].farm_fence_array[4][index] ===
                0
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[4][index] = 1;
              }

              if (
                userData[`user${farmData.turn}`].farm_fence_array[3][
                  index + 1
                ] === 1
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[3][
                  index + 1
                ] = 0;
              } else if (
                userData[`user${farmData.turn}`].farm_fence_array[3][
                  index + 1
                ] === 0
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[3][
                  index + 1
                ] = 1;
              }

              if (
                newData[`user${farmData.turn}`].farm_fence_array[2][index] === 1
              ) {
                fenceElement1.style.backgroundColor = "red";
              } else if (
                newData[`user${farmData.turn}`].farm_fence_array[2][index] === 0
              ) {
                fenceElement1.style.backgroundColor = "";
              }

              if (
                newData[`user${farmData.turn}`].farm_fence_array[3][index] === 1
              ) {
                fenceElement2.style.backgroundColor = "red";
              } else if (
                newData[`user${farmData.turn}`].farm_fence_array[3][index] === 0
              ) {
                fenceElement2.style.backgroundColor = "";
              }

              if (
                newData[`user${farmData.turn}`].farm_fence_array[4][index] === 1
              ) {
                fenceElement3.style.backgroundColor = "red";
              } else if (
                newData[`user${farmData.turn}`].farm_fence_array[4][index] === 0
              ) {
                fenceElement3.style.backgroundColor = "";
              }

              if (
                newData[`user${farmData.turn}`].farm_fence_array[3][
                  index + 1
                ] === 1
              ) {
                fenceElement4.style.backgroundColor = "red";
              } else if (
                newData[`user${farmData.turn}`].farm_fence_array[3][
                  index + 1
                ] === 0
              ) {
                fenceElement4.style.backgroundColor = "";
              }
              fenceElement1.setAttribute("id", "fenceButton1");
              fenceElement2.setAttribute("id", "fenceButton2");
              fenceElement3.setAttribute("id", "fenceButton3");
              fenceElement4.setAttribute("id", "fenceButton4");
            } else {
              index -= 10;

              const formattedIndex = (index + 1).toString().padStart(2, "0");
              const formattedIndex1 = (index + 2).toString().padStart(2, "0");
              const fenceElement1 = document.querySelector(
                `.fence.fenceRow3.fenceRow${formattedIndex}`
              );
              const fenceElement2 = document.querySelector(
                `.fenceCol.fenceCol3.fenceCol${formattedIndex}`
              );
              const fenceElement3 = document.querySelector(
                `.fence.fenceRow4.fenceRow${formattedIndex}`
              );
              const fenceElement4 = document.querySelector(
                `.fenceCol.fenceCol3.fenceCol${formattedIndex1}`
              );

              if (
                userData[`user${farmData.turn}`].farm_fence_array[4][index] ===
                1
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[4][index] = 0;
              } else if (
                userData[`user${farmData.turn}`].farm_fence_array[4][index] ===
                0
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[4][index] = 1;
              }

              if (
                userData[`user${farmData.turn}`].farm_fence_array[5][index] ===
                1
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[5][index] = 0;
              } else if (
                userData[`user${farmData.turn}`].farm_fence_array[5][index] ===
                0
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[5][index] = 1;
              }

              if (
                userData[`user${farmData.turn}`].farm_fence_array[6][index] ===
                1
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[6][index] = 0;
              } else if (
                userData[`user${farmData.turn}`].farm_fence_array[6][index] ===
                0
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[6][index] = 1;
              }

              if (
                userData[`user${farmData.turn}`].farm_fence_array[5][
                  index + 1
                ] === 1
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[5][
                  index + 1
                ] = 0;
              } else if (
                userData[`user${farmData.turn}`].farm_fence_array[5][
                  index + 1
                ] === 0
              ) {
                newData[`user${farmData.turn}`].farm_fence_array[5][
                  index + 1
                ] = 1;
              }

              if (
                newData[`user${farmData.turn}`].farm_fence_array[4][index] === 1
              ) {
                fenceElement1.style.backgroundColor = "red";
              } else if (
                newData[`user${farmData.turn}`].farm_fence_array[4][index] === 0
              ) {
                fenceElement1.style.backgroundColor = "";
              }

              if (
                newData[`user${farmData.turn}`].farm_fence_array[5][index] === 1
              ) {
                fenceElement2.style.backgroundColor = "red";
              } else if (
                newData[`user${farmData.turn}`].farm_fence_array[5][index] === 0
              ) {
                fenceElement2.style.backgroundColor = "";
              }

              if (
                newData[`user${farmData.turn}`].farm_fence_array[6][index] === 1
              ) {
                fenceElement3.style.backgroundColor = "red";
              } else if (
                newData[`user${farmData.turn}`].farm_fence_array[6][index] === 0
              ) {
                fenceElement3.style.backgroundColor = "";
              }

              if (
                newData[`user${farmData.turn}`].farm_fence_array[5][
                  index + 1
                ] === 1
              ) {
                fenceElement4.style.backgroundColor = "red";
              } else if (
                newData[`user${farmData.turn}`].farm_fence_array[5][
                  index + 1
                ] === 0
              ) {
                fenceElement4.style.backgroundColor = "";
              }
              fenceElement1.setAttribute("id", "fenceButton1");
              fenceElement2.setAttribute("id", "fenceButton2");
              fenceElement3.setAttribute("id", "fenceButton3");
              fenceElement4.setAttribute("id", "fenceButton4");
            }
            const updatedUserData2 = { ...userData }; // userData 객체 복사
            updatedUserData2[`user${farmData.turn}`].tree -= x - pre_x;
            updatedUserData2[`user${farmData.turn}`].fence -= x - pre_x;
            setUserData(updatedUserData2);

            updateAction(17, 17);
          } else {
            alert("자원이 부족합니다");
            const newData3 = { ...userData };
            newData3[`user${farmData.turn}`].farm_array[index] = "empty";
            setUserData(newData3);
          }

          //다끝나면 farm_fence의 tree수를 계산해서 되면
        }
      } else {
        alert("울타리 지을 수 없어요!, 자원이 부족");
        console.log("불가능");
      }
      const fenceButtonElement1 = document.querySelector("#fenceButton1");
      const fenceButtonElement2 = document.querySelector("#fenceButton2");
      const fenceButtonElement3 = document.querySelector("#fenceButton3");
      const fenceButtonElement4 = document.querySelector("#fenceButton4");
      if (
        fenceButtonElement1 ||
        fenceButtonElement2 ||
        fenceButtonElement3 ||
        fenceButtonElement4
      ) {
        fenceButtonElement1.addEventListener("click", function () {
          setData((prevData) => {
            if (prevData.tree - 1 >= 0) {
              fenceButtonElement1.style.backgroundColor = "red";
              fenceButtonElement1.style.cursor = "pointer";
              const updatedTree = prevData.tree - 1;
              const newData = { ...prevData, tree: updatedTree }; // newData로 업데이트된 상태 생성
              return newData; // newData 반환
            } else {
              alert("지을 수 없습니다.");
              return prevData;
            }
          });
        });

        fenceButtonElement2.addEventListener("click", function () {
          setData((prevData) => {
            if (prevData.tree - 1 >= 0) {
              fenceButtonElement2.style.backgroundColor = "red";
              fenceButtonElement2.style.cursor = "pointer";
              const updatedTree = prevData.tree - 1;
              const newData = { ...prevData, tree: updatedTree }; // newData로 업데이트된 상태 생성
              return newData; // newData 반환
            } else {
              alert("지을 수 없습니다.");
              return prevData;
            }
          });
        });

        fenceButtonElement3.addEventListener("click", function () {
          setData((prevData) => {
            if (prevData.tree - 1 >= 0) {
              fenceButtonElement3.style.backgroundColor = "red";
              fenceButtonElement3.style.cursor = "pointer";
              const updatedTree = prevData.tree - 1;
              const newData = { ...prevData, tree: updatedTree }; // newData로 업데이트된 상태 생성
              return newData; // newData 반환
            } else {
              alert("지을 수 없습니다.");
              return prevData;
            }
          });
        });

        fenceButtonElement4.addEventListener("click", function () {
          setData((prevData) => {
            if (prevData.tree - 1 >= 0) {
              fenceButtonElement4.style.backgroundColor = "red";
              fenceButtonElement4.style.cursor = "pointer";
              const updatedTree = prevData.tree - 1;
              const newData = { ...prevData, tree: updatedTree }; // newData로 업데이트된 상태 생성
              return newData; // newData 반환
            } else {
              alert("지을 수 없습니다.");
              return prevData;
            }
          });
        });
      }
    }
    //곡식활용
    if(farmData.action[18][0] === (farmData.turn) && farmData.action[18][1] === 18) {
      setisbread(true);
      setIsGameFinished(true);

      if ((userData[`user${farmData.turn}`].farm_array[index] = "plow")) {
        let plow_count = userData[`user${farmData.turn}`].farm_array.filter(
          (item) => item === "plow"
        ).length;
        let grain_count = userData[`user${farmData.turn}`].grain;
        if (plow_count <= grain_count) {
          //이름은 바꿔준다.
          const roomIndices = []; // plow에 해당하는 인덱스를 저장할 배열

          userData[`user${farmData.turn}`].farm_array.forEach((item, idx) => {
            if (item === "plow") {
              roomIndices.push(idx);
            }
          });
          roomIndices.forEach((idx) => {
            const updatedUserData = { ...userData }; // userData 객체 복사
            updatedUserData[`user${farmData.turn}`].farm_array[idx] =
              "plow_grain3"; // farm_array 업데이트

            setUserData(updatedUserData);
            const roomClass = `.Btn.room${Math.floor(idx / 5) + 1}_${
              (idx % 5) + 1
            }`;
            const roomElement = document.querySelector(roomClass);
            const newdata = { ...userData };
            newdata[`user${farmData.turn}`].grain -= plow_count;
            setUserData(newdata);
            roomElement.style.marginTop = "-30px";
            roomElement.style.marginLeft = "-10px";
            roomElement.style.width = "85pxpx";
            roomElement.style.height = "105px";
            roomElement.style.backgroundImage = `url(${plow_grain3})`;
          });
          updateAction(18, 0);
          alert("곡식 뿌리기 완료. 빵굽기");
        } else {
          //grain 수 만큼
          const roomClass = `.Btn.room${Math.floor(index / 5) + 1}_${
            (index % 5) + 1
          }`;

          const updatedUserData = { ...userData }; // userData 객체 복사
          updatedUserData[`user${farmData.turn}`].farm_array[index] =
            "plow_grain3"; // farm_array 업데이트
          setUserData(updatedUserData);

          const roomElement = document.querySelector(roomClass);
          roomElement.style.backgroundImage = `url(${plow_grain3})`;
          const newdata = { ...userData };
          newdata[`user${farmData.turn}`].grain -= 1;
          setUserData(newdata);
          alert("씨부리기 하나 완료, 빵굽기 선택해요");
        }
      } else {
        alert("지을 수 없습니다");
      }
    }
  }
  //빵굽기
  function handlerbread() {
    let plow_count = userData[`user${farmData.turn}`].farm_array.filter(
      (item) => item === "plow_grain3"
    ).length;
    let grain_count = userData[`user${farmData.turn}`].grain;
    let check = grain_count - plow_count;
    if (check > 0) {
      if(userData[`user${farmData.turn}`].main.includes(6)) {
        const newdata = { ...userData};
        newdata[`user${farmData.turn}`].grain -= 1;
        newdata[`user${farmData.turn}`].food += 5;
        setUserData(newdata);
        alert("곡식 1개를 음식 5개로 바꿉니다. 종료해주세요");
        setisbread(false);
      } else if(userData[`user${farmData.turn}`].main.includes(7)) {
        const newdata = { ...userData};
        newdata[`user${farmData.turn}`].grain -= 1;
        newdata[`user${farmData.turn}`].food += 4;
        setUserData(newdata);
        alert("곡식 1개를 음식 4개로 바꿉니다.");
        if(farmData.action[18][1] === 19) {
          setisbread(false);
          alert("종료해주세요.");
          updateAction(18,0);
        }
        updateAction(18,19);
      }else if(userData[`user${farmData.turn}`].main.includes(3) || userData[`user${farmData.turn}`].main.includes(4)) {
        const newdata = { ...userData};
        newdata[`user${farmData.turn}`].grain -= 1;
        newdata[`user${farmData.turn}`].food += 3;
        setUserData(newdata);
        alert("곡식 1개를 음식 3개로 바꿉니다.");
      } else if(userData[`user${farmData.turn}`].main.includes(1) ||userData[`user${farmData.turn}`].main.includes(2)) {
        const newdata = { ...userData};
        newdata[`user${farmData.turn}`].grain -= 1;
        newdata[`user${farmData.turn}`].food += 2;
        setUserData(newdata);
        alert("곡식 1개를 음식 2개로 바꿉니다.");
      }       
    } else {
      alert("자원이 부족합니다. 종료해주세요");
    }
  }

  function househandler() {
    updateAction(6, 26); // 업데이트된 action 상태를 업데이트하는 함수 호출
    if(userData[`user${farmData.turn}`].sub.includes(23)) {
      const newdata = { ...userData };
      newdata[`user${farmData.turn}`].tree += 2;
      setUserData(newdata);
    }
    setIsGameFinished(true);
    setIshousegame(false);
  }

  //농장확장 및 외양간용 피니시 버튼
  function handleFinishGame() {
    const updatedUserData = { ...userData }; // userData 객체 복사
    const res = {
      userid: farmData.turn,
      tree: updatedUserData[`user${farmData.turn}`].tree - fist_setting.tree,
      soil: updatedUserData[`user${farmData.turn}`].soil - fist_setting.soil,
      reed: updatedUserData[`user${farmData.turn}`].reed - fist_setting.reed,
      charcoal: updatedUserData[`user${farmData.turn}`].charcoal - fist_setting.charcoal,
      sheep: updatedUserData[`user${farmData.turn}`].sheep - fist_setting.sheep,
      pig: updatedUserData[`user${farmData.turn}`].pig - fist_setting.pig,
      cow: updatedUserData[`user${farmData.turn}`].cow - fist_setting.cow,
      grain: updatedUserData[`user${farmData.turn}`].grain - fist_setting.grain,
      vegetable: updatedUserData[`user${farmData.turn}`].vegetable - fist_setting.vegetable,
      food: updatedUserData[`user${farmData.turn}`].food - fist_setting.food,
      fence: updatedUserData[`user${farmData.turn}`].fence - fist_setting.fence,
      farm_array: updatedUserData[`user${farmData.turn}`].farm_array,
      farm_fence_array: updatedUserData[`user${farmData.turn}`].farm_fence_array,
    };
    const update = { ...userData }; // userData 객체 사
    update[`user${farmData.turn}`].tree +=
      fist_setting.tree - update[`user${farmData.turn}`].tree;
    update[`user${farmData.turn}`].reed +=
      fist_setting.reed - update[`user${farmData.turn}`].reed;
    update[`user${farmData.turn}`].soil +=
      fist_setting.soil - update[`user${farmData.turn}`].soil;
    update[`user${farmData.turn}`].charcoal +=
      fist_setting.charcoal - update[`user${farmData.turn}`].charcoal;
    update[`user${farmData.turn}`].sheep +=
      fist_setting.sheep - update[`user${farmData.turn}`].sheep;
    update[`user${farmData.turn}`].pig +=
      fist_setting.pig - update[`user${farmData.turn}`].pig;
    update[`user${farmData.turn}`].cow +=
      fist_setting.cow - update[`user${farmData.turn}`].cow;
    update[`user${farmData.turn}`].grain +=
      fist_setting.grain - update[`user${farmData.turn}`].grain;
    update[`user${farmData.turn}`].vegetable +=
      fist_setting.vegetable - update[`user${farmData.turn}`].vegetable;
    update[`user${farmData.turn}`].food +=
      fist_setting.food - update[`user${farmData.turn}`].food;
    update[`user${farmData.turn}`].fence +=
      fist_setting.fence - update[`user${farmData.turn}`].fence;
    setUserData(update);

    if (farmData.action[6][0] === (farmData.turn)) {
      farmdefaulthandelr(res, 6); //농장확장일 경우
      if(userData[`user${farmData.turn}`].job.includes(18)) {
        const updatedAction = [...farmData.action]; // action 배열을 복사합니다.
        updatedAction[6][0] = 0; // 첫 번째 인덱스의 첫 번째 요소를 1로 변경합니다.
        updatedAction[6][1] = 0;
        setFarmData((prevFarmData) => ({
          ...prevFarmData,
          action: updatedAction, // 업데이트된 action 배열을 설정합니다.
        }));
      }
    } else if (farmData.action[9][0] === (farmData.turn)) {
      //농지일 경우
      farmdefaulthandelr(res, 9); 
    } else if (farmData.action[17][0] === (farmData.turn)) {
      //울타리
      farmdefaulthandelr(res, 17);
    } else if(farmData.action[18][0] === (farmData.turn)) {
      //곡식활용
      farmdefaulthandelr(res, 18);
    }
    setisbread(false);
    setIshousegame(false);
    setIsGameFinished(false); // 새로운 종료 버튼 비활성화
  }

  return (
    <div>
      {isbread && (
        <button className="bread" onClick={handlerbread}>
          빵굽기
        </button>
      )}

      {isGameFinished && (
        <button className="finishButton" onClick={handleFinishGame}>
          종료
        </button>
      )}


      {ishousegame && (
        <button className="houseButton" onClick={househandler}>
          외양간
        </button>
      )}

      <div className="farmContainer">
        <FarmBoard className="round" />

        {userData[`user${farmData.turn}`].farm_array.map((state, index) => (
          <div
            key={index}
            className={`Btn room${Math.floor(index / 5) + 1}_${
              (index % 5) + 1
            } ${data.fenceColor}`}
            style={{ display: "inline-block" }}
            onClick={() => farmHandler(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Farms;
