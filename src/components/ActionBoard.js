import { useContext, useEffect, useState } from "react";
import { ReactComponent as Board } from "../asset/roundCard.svg";
import "./ActionBoard.css";

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
import redplayer from "../image/farmer_red.png";
import yellowplayer from "../image/farmer_yellow.png";
import greenplayer from "../image/farmer_green.png";
import blueplayer from "../image/farmer_blue.png";

function ActionBoard({ data, setData }) {
  const [isTurn, setIsTurn] = useState(false);
  const [mainModalVisible, setMainModalVisible] = useState(false);
  const [subModalVisible, setSubModalVisible] = useState(false);
  const [mainSulbi, setMainSulbi] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);

  const {
    farmData,
    setFarmData,
    updateFarmerCount,
    updateFarmData,
    updateAction,
  } = useContext(DataContext);
  const { userData, setUserData } = useContext(UserContext);
  const [isSub, setIsSub] = useState(false);
  const [isJob, setIsJob] = useState(false);

  // 현재 자신의 턴인지
  useEffect(() => {
    if (farmData.currentTurn === farmData.turn % 4) {
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
    } else {
    }
    // cardAddHandler();
  }, [farmData.currentTurn]);

  useEffect(() => {
    updateFarmData();
  }, [farmData.action]);

  useEffect(() => {
    if (farmData.currentTurn - 1 === farmData.turn % 4) {
      if (farmData.cardType === "JOB") {
        setFarmData((prevFarmData) => {
          const updatedJobCards = prevFarmData.jobCards.map((jobCard) => {
            if (jobCard[0] === farmData.cardIndex) {
              return [farmData.cardIndex, 0];
            }
            return jobCard;
          });
          return { ...prevFarmData, jobCards: updatedJobCards };
        });
      }
    }
  }, [farmData.cardIndex]);

  // function cardAddHandler() {
  //   if (farmData.messageType === "CARD") {
  //     // if(farmData.currentTurn===(farmData.turn+1)%4){
  //     // }
  //     // 카드면 현재턴의 어딘가에 저장하기
  //     if (farmData.currentTurn === 1) {
  //       if (farmData.cardType === "MAIN") {
  //         setUserData((prevUserData) => ({
  //           ...prevUserData,
  //           user4: {
  //             ...prevUserData.user4,
  //             main: [...prevUserData.user4.main, farmData.cardIndex],
  //           },
  //         }));
  //       } else if (farmData.cardType === "JOB") {
  //         setUserData((prevUserData) => ({
  //           ...prevUserData,
  //           user4: {
  //             ...prevUserData.user4,
  //             job: [...prevUserData.user4.job, farmData.cardIndex],
  //           },
  //         }));
  //       } else {
  //         setUserData((prevUserData) => ({
  //           ...prevUserData,
  //           user4: {
  //             ...prevUserData.user4,
  //             sub: [...prevUserData.user4.sub, farmData.cardIndex],
  //           },
  //         }));
  //       }
  //     } else if (farmData.currentTurn === 2) {
  //       if (farmData.cardType === "MAIN") {
  //         setUserData((prevUserData) => ({
  //           ...prevUserData,
  //           user1: {
  //             ...prevUserData.user1,
  //             main: [...prevUserData.user1.main, farmData.cardIndex],
  //           },
  //         }));
  //       } else if (farmData.cardType === "JOB") {
  //         setUserData((prevUserData) => ({
  //           ...prevUserData,
  //           user1: {
  //             ...prevUserData.user1,
  //             job: [...prevUserData.user1.job, farmData.cardIndex],
  //           },
  //         }));
  //       } else {
  //         setUserData((prevUserData) => ({
  //           ...prevUserData,
  //           user1: {
  //             ...prevUserData.user1,
  //             sub: [...prevUserData.user1.sub, farmData.cardIndex],
  //           },
  //         }));
  //       }
  //     } else if (farmData.currentTurn === 3) {
  //       if (farmData.cardType === "MAIN") {
  //         setUserData((prevUserData) => ({
  //           ...prevUserData,
  //           user2: {
  //             ...prevUserData.user2,
  //             main: [...prevUserData.user2.main, farmData.cardIndex],
  //           },
  //         }));
  //       } else if (farmData.cardType === "JOB") {
  //         setUserData((prevUserData) => ({
  //           ...prevUserData,
  //           user2: {
  //             ...prevUserData.user2,
  //             job: [...prevUserData.user2.job, farmData.cardIndex],
  //           },
  //         }));
  //       } else {
  //         setUserData((prevUserData) => ({
  //           ...prevUserData,
  //           user2: {
  //             ...prevUserData.user2,
  //             sub: [...prevUserData.user2.sub, farmData.cardIndex],
  //           },
  //         }));
  //       }
  //     } else {
  //       if (farmData.cardType === "MAIN") {
  //         setUserData((prevUserData) => ({
  //           ...prevUserData,
  //           user3: {
  //             ...prevUserData.user3,
  //             main: [...prevUserData.user3.main, farmData.cardIndex],
  //           },
  //         }));
  //       } else if (farmData.cardType === "JOB") {
  //         setUserData((prevUserData) => ({
  //           ...prevUserData,
  //           user3: {
  //             ...prevUserData.user3,
  //             job: [...prevUserData.user3.job, farmData.cardIndex],
  //           },
  //         }));
  //       } else {
  //         setUserData((prevUserData) => ({
  //           ...prevUserData,
  //           user3: {
  //             ...prevUserData.user3,
  //             sub: [...prevUserData.user3.sub, farmData.cardIndex],
  //           },
  //         }));
  //       }
  //     }
  //   }
  // }

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

  const notTurnHandler = async (res, index) => {
    await updateAction(index, 0);

    sendingClient.current.send(
      "/main-board/resource/update",
      {},
      JSON.stringify({
        messageType: "RESOURCE",
        roomId: farmData.roomId,
        round: farmData.round,
        action: farmData.action,
        currentTurn: farmData.currentTurn,
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
  };

  //   덤블 버튼 클릭 시 실행할 함수
  function dumbleHandler() {
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

      accumulatedActHandler(res, 0, 1);
    } else {
      alert("이미 다른 플레이어가 선택한 버튼입니다.");
    }
  }

  //   수풀 버튼 클릭 시 실행할 함수
  async function bushHandler() {
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
  function resourceHandler() {
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
  function clayHandler() {
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
  function teach1Handler() {
    // 내턴인지 확인
    if (farmData.action[4][0] === 0) {
      if (userData[`user${farmData.turn}`].food >= 2) {
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

        notTurnHandler(res, 4);
        setIsJob(true);
      } else {
        alert("식량이 부족합니다");
      }
    } else {
      alert("이미 다른 플레이어가 선택한 버튼입니다.");
    }
  }

  // 유랑극단 버튼 클릭 시 실행할 함수
  function theaterHandler() {
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
  function farmExtendHandler() {
    // 내턴인지 확인

    if (isTurn) {
    }
  }

  //   회합 장소 버튼 클릭 시 실행할 함수
  function spaceHandler() {
    //  유저 없는 지 확인
    if (farmData.action[7][0] === 0) {
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
        food: 0,
      };

      defaultActHandler(res, 7);
      //보조 설비 카드 창 활성화
    } else {
      alert("이미 다른 플레이어가 선택한 버튼입니다.");
    }
  }

  //   곡식 종자 버튼 클릭 시 실행할 함수
  function grainHandler() {
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
  function farmlandHandler() {
    // 내턴인지 확인

    if (isTurn) {
      //const userId = getCurrentUserId();
      //updateActions(9, 1, userId);
    }
  }

  //   교습2 버튼 클릭 시 실행할 함수
  function teach2Handler() {
    if (farmData.action[10][0] === 0) {
      if (userData[`user${farmData.turn}`].food >= 1) {
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

        notTurnHandler(res, 10);
        setIsJob(true);
      } else {
        alert("식량이 부족합니다");
      }
    } else {
      alert("이미 다른 플레이어가 선택한 버튼입니다.");
    }
  }

  //   날품팔이 버튼 클릭 시 실행할 함수
  function goodsHandler() {
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
  function forestHandler() {
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
  function soilHandler() {
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
  function reedHandler() {
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
  function fishingHandler() {
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
  }
  function cardBtn2Handler() {
    setSubModalVisible(true);
    // cardSubscribe();
  }

  //설비 클릭 시
  function facilityHandler() {}

  //울타리 클릭 시
  function fenceHandler() {
    if (isTurn) {
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

  const checkOtherPlayer = (index) => {
    if (farmData.action[index][0] !== 0) {
      if (farmData.action[index][0] === 1) {
        return <img src={redplayer} />;
      } else if (farmData.action[index][0] === 2) {
        return <img src={yellowplayer} />;
      } else if (farmData.action[index][0] === 3) {
        return <img src={greenplayer} />;
      } else if (farmData.action[index][0] === 4) {
        return <img src={blueplayer} />;
      }
    }
  };

  const btnStyle = {
    width: "55px",
    height: "58px",
    top: "0px",
    left: "0px",
    position: "absolute",
  };

  const btnStyle2 = {
    width: "55px",
    height: "58px",
    top: "0px",
    left: "50px",
    position: "absolute",
  };

  const btnStyle3 = {
    width: "55px",
    height: "58px",
    top: "0px",
    left: "70px",
    position: "absolute",
  };

  const moveOtherPlayer = (index) => {
    if (index === 1 || index === 5)
      return <div style={btnStyle2}>{checkOtherPlayer(index)}</div>;
    else if (index === 12 || index === 14)
      return <div style={btnStyle3}>{checkOtherPlayer(index)}</div>;
    else return <div style={btnStyle}>{checkOtherPlayer(index)}</div>;
  };

  return (
    <div className="boardContainer">
      <Board className="round" />
      {isTurn && (
        <h2 style={{ position: "absolute", top: "-75px", left: "160px" }}>
          Your Turn!
        </h2>
      )}
      {/* 덤블 버튼 */}
      {isTurn ? (
        <div className="actionBtn dumble" onClick={dumbleHandler}>
          {moveOtherPlayer(0)}
        </div>
      ) : (
        <div className="player dumble">{moveOtherPlayer(0)}</div>
      )}

      {/* 수풀 버튼 */}
      {isTurn ? (
        <div className="actionBtn bush" onClick={bushHandler}>
          {moveOtherPlayer(1)}
        </div>
      ) : (
        <div className="player bush">{moveOtherPlayer(1)}</div>
      )}

      {/* 자원 시장 버튼 */}
      {isTurn ? (
        <div className="actionBtn resource" onClick={resourceHandler}>
          {moveOtherPlayer(2)}
        </div>
      ) : (
        <div className="player resource">{moveOtherPlayer(2)}</div>
      )}

      {/* 점토 채굴장 버튼 */}
      {isTurn ? (
        <div className="actionBtn clay" onClick={clayHandler}>
          {moveOtherPlayer(3)}
        </div>
      ) : (
        <div className="player clay">{moveOtherPlayer(3)}</div>
      )}

      {/* 교습1 버튼 */}
      {isTurn ? (
        <div className="actionBtn teach1" onClick={teach1Handler}>
          {moveOtherPlayer(4)}
        </div>
      ) : (
        <div className="player teach1">{moveOtherPlayer(4)}</div>
      )}

      {/* 유랑극당 버튼 */}
      {isTurn ? (
        <div className="actionBtn theater" onClick={theaterHandler}>
          {moveOtherPlayer(5)}
        </div>
      ) : (
        <div className="player theater">{moveOtherPlayer(5)}</div>
      )}

      {/* 농장 확장 버튼 */}
      {isTurn ? (
        <div
          className="actionBtn actionBtn2 farmExtend"
          onClick={farmExtendHandler}
        >
          {moveOtherPlayer(6)}
        </div>
      ) : (
        <div className="player actionBtn2 farmExtend">{moveOtherPlayer(6)}</div>
      )}

      {/* 회합 장소 버튼 */}
      {isTurn ? (
        <div className="actionBtn actionBtn2 space" onClick={spaceHandler}>
          {moveOtherPlayer(7)}
        </div>
      ) : (
        <div className="player actionBtn2 space">{moveOtherPlayer(7)}</div>
      )}

      {/* 곡식 종자 버튼 */}
      {isTurn ? (
        <div className="actionBtn actionBtn2 grain" onClick={grainHandler}>
          {moveOtherPlayer(8)}
        </div>
      ) : (
        <div className="player actionBtn2 grain">{moveOtherPlayer(8)}</div>
      )}

      {/* 농지 버튼 */}
      {isTurn ? (
        <div className="actionBtn actionBtn2 clay" onClick={clayHandler}>
          {moveOtherPlayer(9)}
        </div>
      ) : (
        <div className="player actionBtn2 clay">{moveOtherPlayer(9)}</div>
      )}

      {/* 교습2 버튼 */}
      {isTurn ? (
        <div className="actionBtn actionBtn2 teach1" onClick={teach2Handler}>
          {moveOtherPlayer(10)}
        </div>
      ) : (
        <div className="player actionBtn2 teach1">{moveOtherPlayer(10)}</div>
      )}

      {/* 날품팔이 버튼 */}
      {isTurn ? (
        <div className="actionBtn actionBtn2 theater" onClick={goodsHandler}>
          {moveOtherPlayer(11)}
        </div>
      ) : (
        <div className="player actionBtn2 theater">{moveOtherPlayer(11)}</div>
      )}

      {/* 숲 버튼 */}
      {isTurn ? (
        <div className="actionBtn actionBtn3 forest" onClick={forestHandler}>
          {moveOtherPlayer(12)}
        </div>
      ) : (
        <div className="player actionBtn3 forest">{moveOtherPlayer(12)}</div>
      )}

      {/* 흙 채굴장 버튼 */}
      {isTurn ? (
        <div className="actionBtn actionBtn3 clay" onClick={soilHandler}>
          {moveOtherPlayer(13)}
        </div>
      ) : (
        <div className="player actionBtn3 clay">{moveOtherPlayer(13)}</div>
      )}

      {/* 갈대밭 버튼 */}
      {isTurn ? (
        <div className="actionBtn actionBtn3 teach1" onClick={reedHandler}>
          {moveOtherPlayer(14)}
        </div>
      ) : (
        <div className="player actionBtn3 teach1">{moveOtherPlayer(14)}</div>
      )}

      {/* 낚시 버튼 */}
      {isTurn ? (
        <div className="actionBtn actionBtn3 theater" onClick={fishingHandler}>
          {moveOtherPlayer(15)}
        </div>
      ) : (
        <div className="player actionBtn3 theater">{moveOtherPlayer(15)}</div>
      )}

      <div className="cardBtn1" onClick={cardBtn1Handler}></div>
      {mainModalVisible && (
        <MainModal setIsVisible={setMainModalVisible} mainSulbi={mainSulbi} />
      )}
      <div className="cardBtn2" onClick={cardBtn2Handler}></div>
      {subModalVisible && (
        <SubModal
          setIsVisible={setSubModalVisible}
          subSulbi={farmData.subCards}
          jobCard={farmData.jobCards}
          isJob={isJob}
          isSub={isSub}
          setIsJob={setIsJob}
          setIsSub={setIsSub}
        />
      )}
      {farmData.round >= 2 && (
        <Facility className="facilityBtn" onClick={facilityHandler} />
      )}
      {/* <Facility className="facilityBtn" /> */}
      {farmData.round >= 3 && (
        <Fence className="facilityBtn2" onClick={roundGrainHandler} />
      )}
      {farmData.round >= 4 && (
        <Grain className="facilityBtn3" onClick={fenceHandler} />
      )}
      {farmData.round >= 5 && (
        <Sheep className="facilityBtn4" onClick={sheepHandler} />
      )}
    </div>
  );
}

export default ActionBoard;
