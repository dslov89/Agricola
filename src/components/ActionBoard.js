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
    if (farmData.currentTurn === farmData.turn % 4) {
      // updateFarmerCount((farmData.turn - 1) % 4);
      // updateFarmData();
      setIsTurn(true);
    } else {
      setIsTurn(false);
    }
  }, [farmData.currentTurn, farmData.round]);

  useEffect(() => {
    if (
      farmData.currentTurn === farmData.turn % 4 &&
      farmData.farmer_count[(farmData.turn - 1) % 4] != 0
    ) {
      updateFarmerCount((farmData.turn - 1) % 4);
      // updateFarmData();
      // setIsTurn(true);
    } else {
      // setIsTurn(true);
    }
  }, [farmData.currentTurn]);

  useEffect(() => {
    updateFarmData();
  }, [farmData.action]);

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

  const accumulatedActHandler = async (res, index, count) => {
    await updateAction(index, count);

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
      const res = {
        tree: farmData.action[0][1],
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

      console.log("덤불누름");
      // defaultActHandler(res, 0);
      accumulatedActHandler(res, 0, 1);
    } else {
      alert("이미 다른 플레이어가 선택한 버튼입니다.");
    }
  }

  //   수풀 버튼 클릭 시 실행할 함수
  async function bushHandler(event) {
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

      accumulatedActHandler(res, 1, 2);
    } else {
      alert("이미 다른 플레이어가 선택한 버튼입니다.");
    }
  }

  //   자원 시장 버튼 클릭 시 실행할 함수
  function resourceHandler(event) {
    if (farmData.action[2][0] === 0) {
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

      defaultActHandler(res, 2);
    } else {
      alert("이미 다른 플레이어가 선택한 버튼입니다.");
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

      accumulatedActHandler(res, 3, 2);
    } else {
      alert("이미 다른 플레이어가 선택한 버튼입니다.");
    }
  }

  //   교습 버튼 클릭 시 실행할 함수
  function teach1Handler(event) {
    // 내턴인지 확인
    if (farmData.action[4][0] === 0) {
      const res = {
        tree: 0,
        soil: 0,
        reed: 0,
        charcoal: 0,
        sheep: 0,
        pig: 0,
        cow: 0,
        grain: 0,
        vegetable: 0,
        food: -2,
      };

      defaultActHandler(res, 4);
    } else {
      alert("이미 다른 플레이어가 선택한 버튼입니다.");
    }
  }

  function theaterHandler(event) {
    if (farmData.action[5][0] === 0) {
      const res = {
        tree: 0,
        soil: 0,
        reed: 0,
        charcoal: 0,
        sheep: 0,
        pig: 0,
        cow: 0,
        grain: 0,
        vegetable: 0,
        food: farmData.action[5][1],
      };

      accumulatedActHandler(res, 5, 1);
    } else {
      alert("이미 다른 플레이어가 선택한 버튼입니다.");
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
    if (farmData.action[8][0] === 0) {
      const res = {
        tree: 0,
        soil: 0,
        reed: 0,
        charcoal: 0,
        sheep: 0,
        pig: 0,
        cow: 0,
        grain: 1,
        vegetable: 0,
        food: 0,
      };

      defaultActHandler(res, 8);
    } else {
      alert("이미 다른 플레이어가 선택한 버튼입니다.");
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
    if (farmData.action[10][0] === 0) {
      const res = {
        tree: 0,
        soil: 0,
        reed: 0,
        charcoal: 0,
        sheep: 0,
        pig: 0,
        cow: 0,
        grain: 0,
        vegetable: 0,
        food: -1,
      };

      defaultActHandler(res, 10);
    } else {
      alert("이미 다른 플레이어가 선택한 버튼입니다.");
    }
  }

  //   날품팔이 버튼 클릭 시 실행할 함수
  function goodsHandler(event) {
    if (farmData.action[11][0] === 0) {
      const res = {
        tree: 0,
        soil: 0,
        reed: 0,
        charcoal: 0,
        sheep: 0,
        pig: 0,
        cow: 0,
        grain: 0,
        vegetable: 0,
        food: 2,
      };

      defaultActHandler(res, 11);
    } else {
      alert("이미 다른 플레이어가 선택한 버튼입니다.");
    }
  }

  //   숲 버튼 클릭 시 실행할 함수
  function forestHandler(event) {
    if (farmData.action[12][0] === 0) {
      const res = {
        tree: farmData.action[12][1],
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

      accumulatedActHandler(res, 12, 3);
    } else {
      alert("이미 다른 플레이어가 선택한 버튼입니다.");
    }
  }

  //   흙 채굴장 버튼 클릭 시 실행할 함수
  function soilHandler(event) {
    if (farmData.action[13][0] === 0) {
      const res = {
        tree: 0,
        soil: farmData.action[13][1],
        reed: 0,
        charcoal: 0,
        sheep: 0,
        pig: 0,
        cow: 0,
        grain: 0,
        vegetable: 0,
        food: 0,
      };

      accumulatedActHandler(res, 13, 1);
    } else {
      alert("이미 다른 플레이어가 선택한 버튼입니다.");
    }
  }

  //    갈대밭 버튼 클릭 시 실행할 함수
  function reedHandler(event) {
    if (farmData.action[14][0] === 0) {
      const res = {
        tree: 0,
        soil: 0,
        reed: farmData.action[14][1],
        charcoal: 0,
        sheep: 0,
        pig: 0,
        cow: 0,
        grain: 0,
        vegetable: 0,
        food: 0,
      };

      accumulatedActHandler(res, 14, 1);
    } else {
      alert("이미 다른 플레이어가 선택한 버튼입니다.");
    }
  }

  //   낚시 버튼 클릭 시 실행할 함수
  function fishingHandler(event) {
    if (farmData.action[15][0] === 0) {
      const res = {
        tree: 0,
        soil: 0,
        reed: 0,
        charcoal: 0,
        sheep: 0,
        pig: 0,
        cow: 0,
        grain: 0,
        vegetable: 0,
        food: farmData.action[15][1],
      };

      accumulatedActHandler(res, 15, 1);
    } else {
      alert("이미 다른 플레이어가 선택한 버튼입니다.");
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

  //양 시장 클릭 시
  function sheepHandler() {
    // 내턴인지 확인
    if (isTurn) {
      //자원 획득 api
      //  보조 설비 카드 api
      //   턴 끝났으니 false로 변경
      const item = ["sheep"];
      const value = [1];
      setIsTurn(false);
    }
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
