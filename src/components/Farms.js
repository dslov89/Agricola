import "./FarmBoard.css";
import FarmBoard from "./FarnBoard";
import React, { useState } from "react";
import background from "../image/plow.png";
import { nameValue, sendingClient } from "../screen/Start";

import woodroom from "../image/wood_room.png";
import soilroom from "../image/soil_room.png";
import rockroom from "../image/rock_room.png";
import house from "../image/house.png";
import sheep from "../image/sheep.png";

import land from "../asset/land.svg";
import SockJS from "sockjs-client";

function Farms({ data, setData }) {
  const [isTurn, setIsTurn] = useState(true);
  const [isGameFinished, setIsGameFinished] = useState(false);
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
  //농장 버튼을 클릭시
  function farmHandler(index) {
    // 외양간 설치
    if (isTurn && data.player_array[6] === 2) {
      if (data.farm[index] === "fence" || data.farm[index] === "empty") {
        //이름을 외양간으로 바꿔주기, 그 방
        const roomClass = `.room${Math.floor(index / 5) + 1}_${
          (index % 5) + 1
        }`;
        const roomElement = document.querySelector(roomClass);
        const redBox = document.createElement("div");
        redBox.style.margin = "30px";
        redBox.style.width = "35px";
        redBox.style.height = "35px";
        redBox.style.backgroundImage = `url(${house})`;
        roomElement.appendChild(redBox);
        setData({
          ...data,
          tree: data.tree - 2,
          player_array: { ...data.player_array, [6]: 0 },
        });
        data.farm[index] = "house";
        alert("외양간 하나 지음");
        setIsGameFinished(false); // 새로운 종료 버튼을 활성화
        setIsTurn(false);
      }
    }

    //방 버튼을 눌렀을 때
    if (isTurn && data.player_array[6] === 1) {
      setIsGameFinished(true); // 새로운 종료 버튼을 활성화

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
            } else {
              if (data.farm[index + dx[i]] === "empty") {
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
                      data.farm[index + dx[i]] === "wood_room" ||
                      data.farm[index + dx[i]] === "soil_room" ||
                      data.farm[index + dx[i]] === "rock_room"
                    ) {
                      const roomClass = `.room${Math.floor(index / 5) + 1}_${
                        (index % 5) + 1
                      }`;
                      const roomElement = document.querySelector(roomClass);
                      const redBox = document.createElement("div");
                      redBox.style.width = "75px";
                      redBox.style.height = "75px";
                      redBox.style.backgroundImage = `url(${woodroom})`;
                      roomElement.appendChild(redBox);
                      setData({
                        ...data,
                        tree: data.tree - 5,
                        reed: data.reed - 2,
                      });
                      data.farm[index] = "wood_room";
                      alert("우드방 하나 지음");
                      break;
                    }
                  }
                } else if (index === 9) {
                  if (dx[i] === -1 || dx[i] === -5 || dx[i] === 5) {
                    if (
                      data.farm[index + dx[i]] === "wood_room" ||
                      data.farm[index + dx[i]] === "soil_room" ||
                      data.farm[index + dx[i]] === "rock_room"
                    ) {
                      const roomClass = `.room${Math.floor(index / 5) + 1}_${
                        (index % 5) + 1
                      }`;
                      const roomElement = document.querySelector(roomClass);
                      const redBox = document.createElement("div");
                      redBox.style.width = "75px";
                      redBox.style.height = "75px";
                      redBox.style.backgroundImage = `url(${woodroom})`;
                      roomElement.appendChild(redBox);
                      setData({
                        ...data,
                        tree: data.tree - 5,
                        reed: data.reed - 2,
                      });
                      data.farm[index] = "wood_room";
                      alert("우드방 하나 지음");
                      break;
                    }
                  }
                }
              } else {
                if (
                  data.farm[index + dx[i]] === "wood_room" ||
                  data.farm[index + dx[i]] === "soil_room" ||
                  data.farm[index + dx[i]] === "rock_room"
                ) {
                  setData({
                    ...data,
                    tree: data.tree - 5,
                    reed: data.reed - 2,
                    player_array: { ...data.player_array, [6]: 2 },
                  });
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
        } else if (data.tree < 5 || data.reed < 2) {
          setData((prevState) => {
            const newArray = [...prevState.player_array];
            newArray[0] = 0;
            return { ...prevState, array: newArray };
          });
        }
        //여기서 턴을 종료하지 않고 외양간 설치 기능을 넣어준다.
        alert("외양간을 설치하거나 종료해주세요!");
      }
      //유저가 클릭한 방이 나무인 경우 -> 한번에 업그레이드
      else if (data.farm[index] === "wood_room") {
        const count_wood = data.farm.filter(
          (item) => item === "wood_room"
        ).length;
        if (data.clay >= 5 * count_wood && data.reed >= 2 * count_wood) {
          const roomIndices = []; // wood_room에 해당하는 인덱스를 저장할 배열

          // wood_room에 해당하는 인덱스 찾기
          data.farm.forEach((item, idx) => {
            if (item === "wood_room") {
              roomIndices.push(idx);
            }
          });

          // wood_room에 해당하는 인덱스 전체를 soil_room으로 변경
          roomIndices.forEach((idx) => {
            data.farm[idx] = "soil_room";
          });

          // 이미지 및 인덱스 변경
          roomIndices.forEach((idx) => {
            const roomClass = `.room${Math.floor(idx / 5) + 1}_${
              (idx % 5) + 1
            }`;
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
          setData({
            ...data,
            clay: data.clay - 5 * count_wood,
            reed: data.reed - 2 * count_wood,
            player_array: { ...data.player_array, [6]: 2 },
          });
          alert("흙방 지음");
          alert("외양간 짓거나, 종료해주세요.");
        } else {
          alert("자원이 부족");
        }
      }

      //유저가 클릭한 방이 흙인 경우
      else if (data.farm[index] === "soil_room") {
        const count_soil = data.farm.filter(
          (item) => item === "soil_room"
        ).length;
        if (data.clay >= 5 * count_soil && data.reed >= 2 * count_soil) {
          const roomIndices = []; // wood_room에 해당하는 인덱스를 저장할 배열

          // soil_room 해당하는 인덱스 찾기
          data.farm.forEach((item, idx) => {
            if (item === "soil_room") {
              roomIndices.push(idx);
            }
          });

          // soil_room 해당하는 인덱스 전체를 rock_room으로 변경
          roomIndices.forEach((idx) => {
            data.farm[idx] = "rock_room";
          });

          // 이미지 및 인덱스 변경
          roomIndices.forEach((idx) => {
            const roomClass = `.room${Math.floor(idx / 5) + 1}_${
              (idx % 5) + 1
            }`;
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
          setData({
            ...data,
            rock: data.rock - 5 * count_soil,
            reed: data.reed - 2 * count_soil,
            player_array: { ...data.player_array, [6]: 2 },
          });
          alert("돌방 지음");
          alert("외양간 짓거나, 종료해주세요.");
        } else {
          alert("자원이 부족");
        }
      }

      //유저가 클릭한 방이 돌인 경우
      else {
        setData({ ...data, player_array: { ...data.player_array, [6]: 2 } });
        alert("업그레이드 불가능, 외양간 짓거나, 종료해주세요.");
      }
    }

    //농지 버튼 클릭 시 가는 기능 - 밭 갈기 -> 자신의 턴이면서 action버튼의 9번째 인덱스가 1인 경우
    if (isTurn) {
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
      }
    }

    //울타리 설치 기능 -> 갔는지 확인\
    if (isTurn) {
      if (data.farm[index] === "empty" || data.farm[index] === "house") {
        //비어있거나 외양간만 있을 때 지을 수 있음
        const pre_indexSequence = [];
        // farm 배열 순회
        for (let i = 0; i < data.farm.length; i++) {
          if (data.farm[i] === "fence") {
            pre_indexSequence.push(i);
          }
        }
        // 클릭한 방의 인덱스를 fence로 바꿔줌 나무를 소비함
        let pre_count_ul = data.farm.filter((item) => item === "fence").length;
        let pre_x = getFenceCount(
          pre_count_ul,
          checkFenceSequence(data.farm, pre_indexSequence, pre_count_ul)
        );

        const newData = { ...data };
        newData.farm[index] = "fence";

        const indexSequence = [];
        // farm 배열 순회
        for (let i = 0; i < data.farm.length; i++) {
          if (data.farm[i] === "fence") {
            indexSequence.push(i);
          }
        }
        console.log(indexSequence); // 배열 내용 콘솔 출력

        let count_ul = data.farm.filter((item) => item === "fence").length;
        let x = getFenceCount(
          count_ul,
          checkFenceSequence(data.farm, indexSequence, count_ul)
        );

        if (data.tree >= x - pre_x) {
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

            if (data.farm_fence[0][index] === 1) {
              newData.farm_fence[0][index] = 0;
            } else if (data.farm_fence[0][index] === 0) {
              newData.farm_fence[0][index] = 1;
            }

            if (data.farm_fence[1][index] === 1) {
              newData.farm_fence[1][index] = 0;
            } else if (data.farm_fence[1][index] === 0) {
              newData.farm_fence[1][index] = 1;
            }

            if (data.farm_fence[2][index] === 1) {
              newData.farm_fence[2][index] = 0;
            } else if (data.farm_fence[2][index] === 0) {
              newData.farm_fence[2][index] = 1;
            }

            if (data.farm_fence[1][index + 1] === 1) {
              newData.farm_fence[1][index + 1] = 0;
            } else if (data.farm_fence[1][index + 1] === 0) {
              newData.farm_fence[1][index + 1] = 1;
            }

            if (newData.farm_fence[0][index] === 1) {
              fenceElement1.style.backgroundColor = "red";
            } else if (newData.farm_fence[0][index] === 0) {
              fenceElement1.style.backgroundColor = "";
            }

            if (newData.farm_fence[1][index] === 1) {
              fenceElement2.style.backgroundColor = "red";
            } else if (newData.farm_fence[1][index] === 0) {
              fenceElement2.style.backgroundColor = "";
            }

            if (newData.farm_fence[2][index] === 1) {
              fenceElement3.style.backgroundColor = "red";
            } else if (newData.farm_fence[0][index] === 0) {
              fenceElement3.style.backgroundColor = "";
            }

            if (newData.farm_fence[1][index + 1] === 1) {
              fenceElement4.style.backgroundColor = "red";
            } else if (newData.farm_fence[1][index + 1] === 0) {
              fenceElement4.style.backgroundColor = "";
            }
            fenceElement1.setAttribute("id", "fenceButton1");
            fenceElement2.setAttribute("id", "fenceButton2");
            fenceElement3.setAttribute("id", "fenceButton3");
            fenceElement4.setAttribute("id", "fenceButton4");
          } else if (index >= 5 && index <= 9) {
            // 업데이트
            index -= 5;

            // 업데이트
            if (data.farm_fence[2][index] === 1) {
              newData.farm_fence[2][index] = 0;
            } else if (data.farm_fence[2][index] === 0) {
              newData.farm_fence[2][index] = 1;
            }

            if (data.farm_fence[3][index] === 1) {
              newData.farm_fence[3][index] = 0;
            } else if (data.farm_fence[3][index] === 0) {
              newData.farm_fence[3][index] = 1;
            }

            if (data.farm_fence[4][index] === 1) {
              newData.farm_fence[4][index] = 0;
            } else if (data.farm_fence[4][index] === 0) {
              newData.farm_fence[4][index] = 1;
            }

            if (data.farm_fence[3][index + 1] === 1) {
              newData.farm_fence[3][index + 1] = 0;
            } else if (data.farm_fence[3][index + 1] === 0) {
              newData.farm_fence[3][index + 1] = 1;
            }
            //색깔변경
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

            if (newData.farm_fence[2][index] === 1) {
              fenceElement1.style.backgroundColor = "red";
            } else if (newData.farm_fence[2][index] === 0) {
              fenceElement1.style.backgroundColor = "";
            }

            if (newData.farm_fence[3][index] === 1) {
              fenceElement2.style.backgroundColor = "red";
            } else if (newData.farm_fence[3][index] === 0) {
              fenceElement2.style.backgroundColor = "";
            }

            if (newData.farm_fence[4][index] === 1) {
              fenceElement3.style.backgroundColor = "red";
            } else if (newData.farm_fence[4][index] === 0) {
              fenceElement3.style.backgroundColor = "";
            }

            if (newData.farm_fence[3][index + 1] === 1) {
              fenceElement4.style.backgroundColor = "red";
            } else if (newData.farm_fence[3][index + 1] === 0) {
              fenceElement4.style.backgroundColor = "";
            }
          } else {
            // 업데이트
            index -= 10;

            if (data.farm_fence[4][index] === 1) {
              newData.farm_fence[4][index] = 0;
            } else if (data.farm_fence[4][index] === 0) {
              newData.farm_fence[4][index] = 1;
            }

            if (data.farm_fence[5][index] === 1) {
              newData.farm_fence[5][index] = 0;
            } else if (data.farm_fence[5][index] === 0) {
              newData.farm_fence[5][index] = 1;
            }

            if (data.farm_fence[6][index] === 1) {
              newData.farm_fence[6][index] = 0;
            } else if (data.farm_fence[6][index] === 0) {
              newData.farm_fence[6][index] = 1;
            }

            if (data.farm_fence[5][index + 1] === 1) {
              newData.farm_fence[5][index + 1] = 0;
            } else if (data.farm_fence[5][index + 1] === 0) {
              newData.farm_fence[5][index + 1] = 1;
            }
            //색깔변경
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

            if (newData.farm_fence[4][index] === 1) {
              fenceElement1.style.backgroundColor = "red";
            } else if (newData.farm_fence[4][index] === 0) {
              fenceElement1.style.backgroundColor = "";
            }

            if (newData.farm_fence[5][index] === 1) {
              fenceElement2.style.backgroundColor = "red";
            } else if (newData.farm_fence[5][index] === 0) {
              fenceElement2.style.backgroundColor = "";
            }

            if (newData.farm_fence[6][index] === 1) {
              fenceElement3.style.backgroundColor = "red";
            } else if (newData.farm_fence[6][index] === 0) {
              fenceElement3.style.backgroundColor = "";
            }

            if (newData.farm_fence[5][index + 1] === 1) {
              fenceElement4.style.backgroundColor = "red";
            } else if (newData.farm_fence[5][index + 1] === 0) {
              fenceElement4.style.backgroundColor = "";
            }
          }

          setData(newData);
          //계산한 자원을 빼줌
          setData({ ...data, tree: data.tree - (x - pre_x) });
        } else {
          alert("자원이 부족합니다");
          const newData = { ...data };
          newData.farm[index] = "empty";
        }
        //다끝나면 farm_fence의 tree수를 계산해서 되면
        setIsGameFinished(true); // 새로운 종료 버튼을 활성화
      } else if (data.farm[index] === "fence") {
        //똑같은데 이제 1->0으로 바꿔주기 index에 해당하는 부분을 0-> 1
        setIsGameFinished(true); // 새로운 종료 버튼을 활성화
      }
      //여기서는 겉 울타리를 치고 안의 울타리를 치는 로직
      const fenceButtonElement1 = document.querySelector("#fenceButton1");
      fenceButtonElement1.disabled = true;
      const fenceButtonElement2 = document.querySelector("#fenceButton2");
      fenceButtonElement2.disabled = true;
      const fenceButtonElement3 = document.querySelector("#fenceButton3");
      fenceButtonElement3.disabled = true;
      const fenceButtonElement4 = document.querySelector("#fenceButton4");
      fenceButtonElement4.disabled = true;

      fenceButtonElement1.addEventListener("click", function () {
        setData((prevData) => {
          if (prevData.tree - 1 >= 0) {
            fenceButtonElement1.style.backgroundColor = "red";
            const updatedTree = prevData.tree - 1;
            return { ...prevData, tree: updatedTree };
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
            const updatedTree = prevData.tree - 1;
            return { ...prevData, tree: updatedTree };
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
            const updatedTree = prevData.tree - 1;
            return { ...prevData, tree: updatedTree };
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
            const updatedTree = prevData.tree - 1;
            return { ...prevData, tree: updatedTree };
          } else {
            alert("지을 수 없습니다.");
            return prevData;
          }
        });
      });
    }
    //동물 키우는 것에 대한 로직
    if (isTurn && data.player_array[19] === 1) {
      // 4라운드이기 때문에 양만 키우기 가능
      // 그렇지만 전체적인 코드를 짜겠습니다.
      // 조건은 방에는 동물 하나만 키울 수 있다.
      // 울타리에서는 2배 키우기 가능 -> fence에 있으면 4마리 가능
      if (data.farm[index] === "fence" || data.farm[index] === "house") {
        alert("hello");
      } else if (index === 5 || index === 10) {
        alert("hello");
      }
    }
  }
  //외양간 버튼

  // 새로운 종료 버튼 클릭시 게임 종료
  function handleFinishGame() {
    // main -> 자원 수들,
    // const jsonData = JSON.stringify({
    //   user_id: data.name,
    //   farm: data.farm,
    //   farm_fence: data,farm_fence,
    //   tree: data.tree, // 자원 다 보내기
    //   action: [0,1] //전체 다 보내기
    // });
    //defaultActHandler()

    console.log("default");

    //xhr.send(jsonData);
    //connection.send("http://localhost:8080/farm/update", {}, jsonData);

    setIsGameFinished(false); // 새로운 종료 버튼 비활성화
    setIsTurn(false); // 턴 초기화
  }

  return (
    <div>
      {isGameFinished && (
        <button className="finishButton" onClick={handleFinishGame}>
          종료
        </button>
      )}

      <div className="farmContainer">
        <FarmBoard className="round" />
        <div
          className={`Btn room1_1 ${data.fenceColor}`}
          onClick={() => farmHandler(0)}
        ></div>
        <div
          className={`Btn room1_2 ${data.fenceColor}`}
          onClick={() => farmHandler(1)}
        ></div>
        <div
          className={`Btn room1_3 ${data.fenceColor}`}
          onClick={() => farmHandler(2)}
        ></div>
        <div
          className={`Btn room1_4 ${data.fenceColor}`}
          onClick={() => farmHandler(3)}
        ></div>
        <div
          className={`Btn room1_5 ${data.fenceColor}`}
          onClick={() => farmHandler(4)}
        ></div>

        <div
          className={`Btn room2_1 ${data.fenceColor}`}
          onClick={() => farmHandler(5)}
        ></div>
        <div
          className={`Btn room2_2 ${data.fenceColor}`}
          onClick={() => farmHandler(6)}
        ></div>
        <div
          className={`Btn room2_3 ${data.fenceColor}`}
          onClick={() => farmHandler(7)}
        ></div>
        <div
          className={`Btn room2_4 ${data.fenceColor}`}
          onClick={() => farmHandler(8)}
        ></div>
        <div
          className={`Btn room2_5 ${data.fenceColor}`}
          onClick={() => farmHandler(9)}
        ></div>

        <div
          className={`Btn room3_1 ${data.fenceColor}`}
          onClick={() => farmHandler(10)}
        ></div>
        <div
          className={`Btn room3_2 ${data.fenceColor}`}
          onClick={() => farmHandler(11)}
        ></div>
        <div
          className={`Btn room3_3 ${data.fenceColor}`}
          onClick={() => farmHandler(12)}
        ></div>
        <div
          className={`Btn room3_4 ${data.fenceColor}`}
          onClick={() => farmHandler(13)}
        ></div>
        <div
          className={`Btn room3_5 ${data.fenceColor}`}
          onClick={() => farmHandler(14)}
        ></div>
      </div>

      

      <div className="farmContainer">
        <FarmBoard className="round" />
        <div
          className={`Btn room1_1 ${data.fenceColor}`}
          onClick={() => farmHandler(0)}
        ></div>
        <div
          className={`Btn room1_2 ${data.fenceColor}`}
          onClick={() => farmHandler(1)}
        ></div>
        <div
          className={`Btn room1_3 ${data.fenceColor}`}
          onClick={() => farmHandler(2)}
        ></div>
        <div
          className={`Btn room1_4 ${data.fenceColor}`}
          onClick={() => farmHandler(3)}
        ></div>
        <div
          className={`Btn room1_5 ${data.fenceColor}`}
          onClick={() => farmHandler(4)}
        ></div>

        <div
          className={`Btn room2_1 ${data.fenceColor}`}
          onClick={() => farmHandler(5)}
        ></div>
        <div
          className={`Btn room2_2 ${data.fenceColor}`}
          onClick={() => farmHandler(6)}
        ></div>
        <div
          className={`Btn room2_3 ${data.fenceColor}`}
          onClick={() => farmHandler(7)}
        ></div>
        <div
          className={`Btn room2_4 ${data.fenceColor}`}
          onClick={() => farmHandler(8)}
        ></div>
        <div
          className={`Btn room2_5 ${data.fenceColor}`}
          onClick={() => farmHandler(9)}
        ></div>

        <div
          className={`Btn room3_1 ${data.fenceColor}`}
          onClick={() => farmHandler(10)}
        ></div>
        <div
          className={`Btn room3_2 ${data.fenceColor}`}
          onClick={() => farmHandler(11)}
        ></div>
        <div
          className={`Btn room3_3 ${data.fenceColor}`}
          onClick={() => farmHandler(12)}
        ></div>
        <div
          className={`Btn room3_4 ${data.fenceColor}`}
          onClick={() => farmHandler(13)}
        ></div>
        <div
          className={`Btn room3_5 ${data.fenceColor}`}
          onClick={() => farmHandler(14)}
        ></div>
      </div>

      <div className="farmContainer">
        <FarmBoard className="round" />
        <div
          className={`Btn room1_1 ${data.fenceColor}`}
          onClick={() => farmHandler(0)}
        ></div>
        <div
          className={`Btn room1_2 ${data.fenceColor}`}
          onClick={() => farmHandler(1)}
        ></div>
        <div
          className={`Btn room1_3 ${data.fenceColor}`}
          onClick={() => farmHandler(2)}
        ></div>
        <div
          className={`Btn room1_4 ${data.fenceColor}`}
          onClick={() => farmHandler(3)}
        ></div>
        <div
          className={`Btn room1_5 ${data.fenceColor}`}
          onClick={() => farmHandler(4)}
        ></div>

        <div
          className={`Btn room2_1 ${data.fenceColor}`}
          onClick={() => farmHandler(5)}
        ></div>
        <div
          className={`Btn room2_2 ${data.fenceColor}`}
          onClick={() => farmHandler(6)}
        ></div>
        <div
          className={`Btn room2_3 ${data.fenceColor}`}
          onClick={() => farmHandler(7)}
        ></div>
        <div
          className={`Btn room2_4 ${data.fenceColor}`}
          onClick={() => farmHandler(8)}
        ></div>
        <div
          className={`Btn room2_5 ${data.fenceColor}`}
          onClick={() => farmHandler(9)}
        ></div>

        <div
          className={`Btn room3_1 ${data.fenceColor}`}
          onClick={() => farmHandler(10)}
        ></div>
        <div
          className={`Btn room3_2 ${data.fenceColor}`}
          onClick={() => farmHandler(11)}
        ></div>
        <div
          className={`Btn room3_3 ${data.fenceColor}`}
          onClick={() => farmHandler(12)}
        ></div>
        <div
          className={`Btn room3_4 ${data.fenceColor}`}
          onClick={() => farmHandler(13)}
        ></div>
        <div
          className={`Btn room3_5 ${data.fenceColor}`}
          onClick={() => farmHandler(14)}
        ></div>
      </div>

      <div className="farmContainer">
        <FarmBoard className="round" />
        <div
          className={`Btn room1_1 ${data.fenceColor}`}
          onClick={() => farmHandler(0)}
        ></div>
        <div
          className={`Btn room1_2 ${data.fenceColor}`}
          onClick={() => farmHandler(1)}
        ></div>
        <div
          className={`Btn room1_3 ${data.fenceColor}`}
          onClick={() => farmHandler(2)}
        ></div>
        <div
          className={`Btn room1_4 ${data.fenceColor}`}
          onClick={() => farmHandler(3)}
        ></div>
        <div
          className={`Btn room1_5 ${data.fenceColor}`}
          onClick={() => farmHandler(4)}
        ></div>

        <div
          className={`Btn room2_1 ${data.fenceColor}`}
          onClick={() => farmHandler(5)}
        ></div>
        <div
          className={`Btn room2_2 ${data.fenceColor}`}
          onClick={() => farmHandler(6)}
        ></div>
        <div
          className={`Btn room2_3 ${data.fenceColor}`}
          onClick={() => farmHandler(7)}
        ></div>
        <div
          className={`Btn room2_4 ${data.fenceColor}`}
          onClick={() => farmHandler(8)}
        ></div>
        <div
          className={`Btn room2_5 ${data.fenceColor}`}
          onClick={() => farmHandler(9)}
        ></div>

        <div
          className={`Btn room3_1 ${data.fenceColor}`}
          onClick={() => farmHandler(10)}
        ></div>
        <div
          className={`Btn room3_2 ${data.fenceColor}`}
          onClick={() => farmHandler(11)}
        ></div>
        <div
          className={`Btn room3_3 ${data.fenceColor}`}
          onClick={() => farmHandler(12)}
        ></div>
        <div
          className={`Btn room3_4 ${data.fenceColor}`}
          onClick={() => farmHandler(13)}
        ></div>
        <div
          className={`Btn room3_5 ${data.fenceColor}`}
          onClick={() => farmHandler(14)}
        ></div>
      </div>
    </div>
  );
}

export default Farms;
