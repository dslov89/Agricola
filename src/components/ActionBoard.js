import { useContext, useEffect, useState } from "react";
import { ReactComponent as Board } from "../asset/roundCard.svg";
import "./ActionBoard.css";
import farmer from "../image/farmer.png";

import * as SockJS from "sockjs-client";
import * as Stomp from "@stomp/stompjs";
import "./FarmBoard.css";
import axios from "axios";
import { nameValue, sendingClient } from "../screen/Start";

import { ReactComponent as Land } from "../asset/land.svg";
import { ReactComponent as Fence } from "../asset/fence.svg";
import { ReactComponent as Grain } from "../asset/grain.svg";
import { ReactComponent as Sheep } from "../asset/sheep.svg";
import { ReactComponent as Facility } from "../asset/facility.svg";
import MainModal from "./MainModal";
import SubModal from "./SubModal";
import { DataContext } from "../store/data-context";
import { UserContext } from "../store/user-context";

function ActionBoard({ data, setData }) {
  const [isTurn, setIsTurn] = useState(false);
  const [mainModalVisible, setMainModalVisible] = useState(false);
  const [subModalVisible, setSubModalVisible] = useState(false);
  const [mainSulbi, setMainSulbi] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const [subSulbi, setSubSulbi] = useState([
    { id: 1, isHas: 1 },
    { id: 2, isHas: 1 },
    { id: 3, isHas: 1 },
    { id: 4, isHas: 1 },
    { id: 5, isHas: 1 },
    { id: 6, isHas: 1 },
    { id: 7, isHas: 1 },
  ]);
  const [jobCard, setJobCard] = useState([
    { id: 1, isHas: 1 },
    { id: 2, isHas: 1 },
    { id: 3, isHas: 1 },
    { id: 4, isHas: 1 },
    { id: 5, isHas: 1 },
    { id: 6, isHas: 1 },
    { id: 7, isHas: 1 },
  ]);
  const {
    farmData,
    setFarmData,
    updateFarmerCount,
    updateFarmData,
    updateAction,
  } = useContext(DataContext);
  const { userData, setUserData } = useContext(UserContext);
  const [roundNum, setRoundNum] = useState(farmData.round);

  // 현재 자신의 턴인지
  useEffect(() => {
    if (
      farmData.currentTurn === farmData.turn % 4 &&
      farmData.farmer_count[(farmData.turn - 1) % 4] != 0
    ) {
      updateFarmerCount((farmData.turn - 1) % 4);
      updateFarmData();

      setIsTurn(true);
    } else {
      setIsTurn(false);
    }
  }, [farmData.currentTurn]);

  // index는 액션버튼 순서 0부터
  const defaultActHandler = async (res, index) => {
    await updateAction(index, 0);
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
      })
    );
    console.log("default");
  };

  // const defaultActHandler = (item, value, cardIndex) => {
  //   sendingClient.current.send(
  //     "/main-board/resource/update",
  //     {},
  //     JSON.stringify({
  //       Resoure_ID: item,
  //       quantity: value,
  //       turn: 0,
  //       count: 1,
  //       card: cardIndex,
  //     })
  //   );
  //   console.log("default");
  // };

  const accumulatedActHandler = async (res, index) => {
    await updateAction(index, 0);
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
      })
    );
    console.log("accumulated");
  };
  // const accumulatedActHandler = (item, value, cardIndex) => {
  //   sendingClient.current.send(
  //     "/main-board/resource/update",
  //     {},
  //     JSON.stringify({
  //       Resoure_ID: item,
  //       quantity: value,
  //       turn: 0,
  //       card: cardIndex,
  //       count: 1,
  //     })
  //   );
  //   console.log("accumulated");
  // };

  //   덤블 버튼 클릭 시 실행할 함수
  function dumbleHandler(event) {
    if (farmData.action[0][0] === 0) {
      // 내턴인지 확인
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ["tree"];
      const value = [1];
      const res = {
        tree: 1,
        soil: 0,
        reed: 0,
        charcoal: 0,
        sheep: 0,
        pig: 0,
        cow: 0,
        grain: 0,
        vegetable: 0,
        food: 0,
      };
      // accumulatedActHandler(item, value, 0);
      // movePlayer(button, event);
      // axios
      //   .post(`https://localhost:8080/main-board/resource/update`, {
      //     resource_id: 1,
      //     User: nameValue,
      //     quantity: 3,
      //   })
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
      console.log("덤불누름");
      // defaultActHandler(res, 0);
      accumulatedActHandler(res, 0);
    }

    // setIsTurn(false);
    // }
  }

  //   수풀 버튼 클릭 시 실행할 함수
  function bushHandler(event) {
    // 다른 유저가 action 칸 가 있는지 확인
    if (farmData.action[1][0] === 0) {
      const res = {
        tree: farmData.action[1][1],
        soil: 0,
        reed: 0,
        charcoal: 0,
        sheep: 0,
        pig: 0,
        cow: 0,
        grain: 0,
        vegetable: 0,
        food: 0,
      };

      defaultActHandler(res, 1);
      // // 내턴인지 확인
      // if (isTurn) {
      //   const button = event.target;
      //   //자원 획득 api
      //   //  보조 설비 카드 api
      //   //   턴 끝났으니 false로 변경
      //   const item = ["tree"];
      //   const value = [2];
      //   accumulatedActHandler(item, value, 1);
      //   movePlayer(button, event);
      //   setIsTurn(false);
      // }
    }
  }

  //   자원 시장 버튼 클릭 시 실행할 함수
  function resourceHandler(event) {
    const res = {
      tree: 0,
      soil: 0,
      reed: 1,
      charcoal: 1,
      sheep: 0,
      pig: 0,
      cow: 0,
      grain: 0,
      vegetable: 0,
      food: 1,
    };
    accumulatedActHandler(res, 2);

    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경

      setData({
        ...data,
        reed: data.reed + 1,
        rock: data.rock + 1,
        food: data.food + 1,
      });
      const item = ["reed", "rock", "food"];
      const value = [1, 1, 1];
      defaultActHandler(item, value, 2);
      movePlayer(button, event);
      setIsTurn(false);
    }
  }

  //   점토 채쿨장 버튼 클릭 시 실행할 함수
  function clayHandler(event) {
    if (farmData.action[3][0] === 0) {
      const res = {
        tree: 0,
        soil: farmData.action[3][1],
        reed: 0,
        charcoal: 0,
        sheep: 0,
        pig: 0,
        cow: 0,
        grain: 0,
        vegetable: 0,
        food: 0,
      };

      defaultActHandler(res, 3);
    }
    // 내턴인지 확인
    // if (isTurn) {
    //   const button = event.target;
    //   //자원 획득 api
    //   //  보조 설비 카드 api
    //   //   턴 끝났으니 false로 변경
    //   const item = ["clay"];
    //   const value = [2];
    //   accumulatedActHandler(item, value, 3);
    //   movePlayer(button, event);
    //   setIsTurn(false);
    // }
  }

  //   교습 버튼 클릭 시 실행할 함수
  function teach1Handler(event) {
    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ["food"];
      const value = [-2];
      defaultActHandler(item, value, 4);
      movePlayer(button, event);
      setIsTurn(false);
    }
  }

  //   유랑극단 버튼 클릭 시 실행할 함수
  function theaterHandler(event) {
    if (isTurn) {
      const button = event.target;
      const item = ["food"];
      const value = [1];
      accumulatedActHandler(item, value, 5);
      movePlayer(button, event);
      setIsTurn(false);
    }
  }

  // 농장 확장 버튼 클릭 시 실행할 함수
  function farmExtendHandler(event) {
    // 내턴인지 확인

    if (isTurn) {
      const button = event.target;
      movePlayer(button, event);
    }
  }

  //   회합 장소 버튼 클릭 시 실행할 함수
  function spaceHandler(event) {
    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      movePlayer(button, event);
      setIsTurn(false);
    }
  }

  //   곡식 종자 버튼 클릭 시 실행할 함수
  function grainHandler(event) {
    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ["seed"];
      const value = [-2];
      defaultActHandler(item, value, 8);
      movePlayer(button, event);
      setData({ ...data, seed: data.seed + 1 });
      setIsTurn(false);
    }
  }

  //=농지 버튼 클릭 시 실행할 함수
  function farmlandHandler(event) {
    // 내턴인지 확인

    if (isTurn) {
      const button = event.target;
      movePlayer(button, event);
      //const userId = getCurrentUserId();
      //updateActions(9, 1, userId);
    }
  }

  //   교습2 버튼 클릭 시 실행할 함수
  function teach2Handler(event) {
    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ["food"];
      const value = [-1];
      defaultActHandler(item, value, 10);
      movePlayer(button, event);
      setIsTurn(false);
    }
  }

  //   날품팔이 버튼 클릭 시 실행할 함수
  function goodsHandler(event) {
    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ["food"];
      const value = [2];
      defaultActHandler(item, value, 11);
      movePlayer(button, event);
      setData({ ...data, food: data.food + 1 });
      setIsTurn(false);
    }
  }

  //   숲 버튼 클릭 시 실행할 함수
  function forestHandler(event) {
    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ["tree"];
      const value = [3];
      accumulatedActHandler(item, value, 12);
      movePlayer(button, event);
      setIsTurn(false);
    }
  }

  //   흙 채굴장 버튼 클릭 시 실행할 함수
  function soilHandler(event) {
    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ["clay"];
      const value = [1];
      accumulatedActHandler(item, value, 13);
      movePlayer(button, event);
      setIsTurn(false);
    }
  }

  //    갈대밭 버튼 클릭 시 실행할 함수
  function reedHandler(event) {
    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ["reed"];
      const value = [1];
      accumulatedActHandler(item, value, 14);
      movePlayer(button, event);
      setIsTurn(false);
    }
  }

  //   낚시 버튼 클릭 시 실행할 함수
  function fishingHandler(event) {
    // 내턴인지 확인
    if (isTurn) {
      const button = event.target;
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ["food"];
      const value = [1];
      accumulatedActHandler(item, value, 15);
      movePlayer(button, event);
      setIsTurn(false);
    }
  }
  function cardBtn1Handler() {
    setMainModalVisible(true);
    console.log(farmData.round);
    console.log(roundNum);
    console.log(farmData.userId);
    sendHandler();
  }
  function cardBtn2Handler() {
    setSubModalVisible(true);
    // cardSubscribe();
  }

  // const cardSubscribe = () => {
  //   sendingClient.current.subscribe(
  //     `/main-board/card/update/` + farmData.roomId,
  //     (message) => {
  //       console.log(message.body + "여기야 여기");
  //       const msg = JSON.parse(message.body);

  //       // setFarmData({
  //       //   ...farmData,
  //       //   round: msg.round,
  //       //   roomId: msg.roomId,
  //       // });
  //     }
  //   );
  // };
  //설비 클릭 시
  function facilityHandler() {}

  //울타리 클릭 시
  function fenceHandler(event) {
    if (isTurn) {
      const button = event.target;
      movePlayer(button, event);
      //갔는지 확인은 어떻게 하지?
    }
  }

  //곡식 활용 클릭 시
  function roundGrainHandler() {
    if (isTurn) {
      console.log("123123123");
      setIsTurn(false);
    }
  }

  // 플레이어 이동
  // function movePlayer(btn, event) {
  //   const button = btn;
  //   const buttonRect = button.getBoundingClientRect();
  //   const x = event.clientX - buttonRect.left;
  //   const y = event.clientY - buttonRect.top;
  //   const redBox = document.createElement("div");
  //   redBox.style.width = "55px";
  //   redBox.style.height = "58px";
  //   redBox.style.transform = `translateX(${x - 10}px) translateY(${y - 10}px)`;
  //   redBox.style.backgroundImage = `url(${farmer})`;
  //   button.appendChild(redBox);
  // }

  // const movePlayer = (btn, event, index) => {
  //   const button = btn;
  //   const buttonRect = button.getBoundingClientRect();
  //   const x = event.clientX - buttonRect.left;
  //   const y = event.clientY - buttonRect.top;
  //   const redBox = document.createElement("div");
  //   redBox.style.width = "55px";
  //   redBox.style.height = "58px";
  //   redBox.style.transform = `translateX(${x - 10}px) translateY(${y - 10}px)`;
  //   console.log("나 움직였어요 ㅎ_ㅎ");
  //   if (farmData.action[index][0] === 1)
  //     redBox.style.backgroundImage = `url(${redplayer})`;
  //   else if (farmData.action[index][0] === 2)
  //     redBox.style.backgroundImage = `url(${blueplayer})`;
  //   else if (farmData.action[index][0] === 3)
  //     redBox.style.backgroundImage = `url(${greenplayer})`;
  //   else if (farmData.action[index][0] === 4)
  //     redBox.style.backgroundImage = `url(${yellowplayer})`;
  //   button.appendChild(redBox);
  // };

  useEffect(() => {}, [farmData.action]);

  //양 시장 클릭 시
  function sheepHandler() {
    // 내턴인지 확인
    if (isTurn) {
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ["sheep"];
      const value = [1];
      accumulatedActHandler(item, value, 19);

      setIsTurn(false);
    }
  }

  // 플레이어 이동
  function movePlayer(btn, event) {
    const button = btn;
    const buttonRect = button.getBoundingClientRect();
    const x = event.clientX - buttonRect.left;
    const y = event.clientY - buttonRect.top;
    const redBox = document.createElement("div");
    redBox.style.width = "55px";
    redBox.style.height = "58px";
    redBox.style.transform = `translateX(${x - 10}px) translateY(${y - 10}px)`;
    redBox.style.backgroundImage = `url(${farmer})`;
    button.appendChild(redBox);
  }

  const sendHandler = () => {
    console.log(farmData.roomId);
    console.log(farmData);
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

  return (
    <div className="boardContainer">
      <Board className="round" />
      {isTurn && (
        <h2 style={{ position: "absolute", top: "-75px", left: "160px" }}>
          Your Turn!
        </h2>
      )}
      {/* <div style={{ position: "relative" }}> */}
      {/* 덤블 버튼 */}
      {isTurn && (
        <div className="actionBtn dumble" onClick={dumbleHandler}></div>
      )}

      {/* 수풀 버튼 */}
      {isTurn && <div className="actionBtn bush" onClick={bushHandler}></div>}

      {/* 자원 시장 버튼 */}
      {isTurn && (
        <div className="actionBtn resource" onClick={resourceHandler}></div>
      )}
      {/* 점토 채굴장 버튼 */}
      {isTurn && <div className="actionBtn clay" onClick={clayHandler}></div>}
      {/* 교습1 버튼 */}
      {isTurn && (
        <div className="actionBtn teach1" onClick={teach1Handler}></div>
      )}
      {/* 유랑극당 버튼 */}
      {isTurn && (
        <div className="actionBtn theater" onClick={theaterHandler}></div>
      )}
      {/* 농장 확장 버튼 */}
      {isTurn && (
        <div
          className="actionBtn actionBtn2 farmExtend"
          onClick={farmExtendHandler}
        ></div>
      )}
      {/* 회합 장소 버튼 */}
      {isTurn && (
        <div
          className="actionBtn   actionBtn2 space"
          onClick={spaceHandler}
        ></div>
      )}
      {/* 곡식 종자 버튼 */}
      {isTurn && (
        <div
          className="actionBtn  actionBtn2 grain"
          onClick={grainHandler}
        ></div>
      )}
      {/* 농지 버튼 */}
      {isTurn && (
        <div
          className="actionBtn  actionBtn2  clay"
          onClick={farmlandHandler}
        ></div>
      )}
      {/* 교습2 버튼 */}
      {isTurn && (
        <div
          className="actionBtn actionBtn2  teach1"
          onClick={teach2Handler}
        ></div>
      )}
      {/* 날품팔이 버튼 */}
      {isTurn && (
        <div
          className="actionBtn actionBtn2  theater"
          onClick={goodsHandler}
        ></div>
      )}
      {/* 숲 버튼 */}
      {isTurn && (
        <div
          className="actionBtn  actionBtn3 forest"
          onClick={forestHandler}
        ></div>
      )}
      {/* 흙 채굴장 버튼 */}
      {isTurn && (
        <div
          className="actionBtn  actionBtn3  clay"
          onClick={soilHandler}
        ></div>
      )}
      {/* 갈대밭 버튼 */}
      {isTurn && (
        <div
          className="actionBtn actionBtn3  teach1"
          onClick={reedHandler}
        ></div>
      )}
      {/* 낚시 버튼 */}
      {isTurn && (
        <div
          className="actionBtn actionBtn3  theater"
          onClick={fishingHandler}
        ></div>
      )}
      <div className="cardBtn1" onClick={cardBtn1Handler}></div>
      {mainModalVisible && (
        <MainModal setIsVisible={setMainModalVisible} mainSulbi={mainSulbi} />
      )}
      <div className="cardBtn2" onClick={cardBtn2Handler}></div>
      {subModalVisible && (
        <SubModal
          setIsVisible={setSubModalVisible}
          subSulbi={subSulbi}
          jobCard={jobCard}
        />
      )}
      {farmData.round >= 2 && (
        <Facility className="facilityBtn" onClick={facilityHandler} />
      )}
      {/* <Facility className="facilityBtn" /> */}
      {farmData.round >= 3 && (
        <Grain className="facilityBtn2" onClick={roundGrainHandler} />
      )}
      {farmData.round >= 4 && (
        <Fence className="facilityBtn3" onClick={fenceHandler} />
      )}
      {farmData.round >= 5 && (
        <Sheep className="facilityBtn4" onClick={sheepHandler} />
      )}
    </div>
  );
}

export default ActionBoard;
