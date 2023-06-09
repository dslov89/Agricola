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
import ScoreBoard from "./ScoreBoard";
import MainModal from "./MainModal";
import SubModal from "./SubModal";
import begging from "../asset/begging.PNG";
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
  // const [mainSulbi, setMainSulbi] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);

  const [scoreBoardVisible, setScoreBoardVisible] = useState(true);
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
    updateFarmerCount_harvest,
    updateFarmData,
    updateAction,
    updateAlways,
  } = useContext(DataContext);
  const { userData, setUserData } = useContext(UserContext);
  const [isSub, setIsSub] = useState(false);
  const [isJob, setIsJob] = useState(false);
  const [isMain, setIsMain] = useState(false);

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
      console.log("됨");
    } else {
      console.log("뭐냐");
      console.log(farmData.currentTurn);
      console.log(farmData.turn);
      console.log(farmData.farmer_count[(farmData.turn - 1) % 4]);
    }
  }, [farmData.currentTurn]);

  useEffect(() => {
    updateFarmData();
  }, [farmData.action]);

  // useEffect(() => {
  //   if (farmData.currentTurn - 1 === farmData.turn % 4) {
  //     if (farmData.cardType === "JOB") {
  //       setFarmData((prevFarmData) => {
  //         const updatedJobCards = prevFarmData.jobCards.map((jobCard) => {
  //           if (jobCard[0] === farmData.cardIndex) {
  //             return [farmData.cardIndex, 0];
  //           }
  //           return jobCard;
  //         });
  //         return { ...prevFarmData, jobCards: updatedJobCards };
  //       });
  //     }
  //   }
  // }, [farmData.cardIndex]);

  useEffect(() => {
    if (farmData.cardType === "MAIN") {
      const updatedAction = [...farmData.main];

      updatedAction[farmData.cardIndex] = 0;

      setFarmData((prevFarmData) => ({
        ...prevFarmData,
        main: updatedAction,
      }));
    }
  }, [farmData.currentTurn]);

  const alwaysActHandler = async (res) => {
    await updateAlways(farmData.turn); // 누른 놈 제외 갱신

    sendingClient.current.send(
      "/main-board/resource/update",
      {},
      JSON.stringify({
        messageType: "RESOURCE",
        roomId: farmData.roomId,
        action: farmData.action,
        round: farmData.round,
        currentTurn: farmData.currentTurn % 4,
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
    if (farmData.action[20][1] === farmData.turn) {
      // 누른 사람은 갱신이 안되어있으므로 따로 갱신해줌
      setUserData((prevUserData) => ({
        ...prevUserData,
        [`user${farmData.turn}`]: {
          ...prevUserData[`user${farmData.turn}`],
          tree: prevUserData[`user${farmData.turn}`].tree + res.tree,
          soil: prevUserData[`user${farmData.turn}`].soil + res.soil,
          reed: prevUserData[`user${farmData.turn}`].reed + res.reed,
          charcoal:
            prevUserData[`user${farmData.turn}`].charcoal + res.charcoal,
          sheep: prevUserData[`user${farmData.turn}`].sheep + res.sheep,
          pig: prevUserData[`user${farmData.turn}`].pig + res.pig,
          cow: prevUserData[`user${farmData.turn}`].cow + res.cow,
          grain: prevUserData[`user${farmData.turn}`].grain + res.grain,
          vegetable:
            prevUserData[`user${farmData.turn}`].vegetable + res.vegetable,
          food: prevUserData[`user${farmData.turn}`].food + res.food,
        },
      }));
    }

    console.log("always");
  };

  function hwaduckHandler() {
    if (true) {
      // 화덕 갖고있는지 확인
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
        food: 3,
      };

      alwaysActHandler(res);
    } else {
      alert("너 화덕 안갖고 있어");
    }
  }

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
      if (userData[`user${farmData.turn}`].job.includes(9))
        // 직업 09. 나무꾼
        res.tree += 1;

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

      if (userData[`user${farmData.turn}`].job.includes(9))
        //직업 09. 나무꾼

        res.tree += 1;

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

      if (userData[`user${farmData.turn}`].job.includes(20)) {
        // 직업 20. 마술사
        res.tree += 1;
        res.grain += 1;
      }

      accumulatedActHandler(res, 5, 1);
    } else {
      alert("이미 다른 플레이어가 선택한 버튼입니다.");
    }
  }

  // 농장 확장 버튼 클릭 시 실행할 함수
  function farmExtendHandler() {
    // 내턴인지 확인

    if (farmData.action[6][0] === 0) {
      if (
        userData[`user${farmData.turn}`].tree >= 5 &&
        userData[`user${farmData.turn}`].reed >= 2
      ) {
        updateAction(6, 6);
      } else {
        alert("식량이 부족합니다");
      }
    } else {
      alert("이미 다른 플레이어가 선택한 버튼입니다.");
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

      notTurnHandler(res, 7);
      setIsSub(true);
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
      if (userData[`user${farmData.turn}`].sub.includes(2))
        // 보조 02. 곡식용 삽
        res.grain += 1;
      if (userData[`user${farmData.turn}`].job.includes(1))
        // 직업 01. 장작 채집자
        res.tree += 1;
      if (userData[`user${farmData.turn}`].job.includes(2))
        // 직업 02. 채소 장수
        res.vegetable += 1;

      defaultActHandler(res, 8);
    } else {
      alert("이미 다른 플레이어가 선택한 버튼입니다.");
    }
  }

  //=농지 버튼 클릭 시 실행할 함수
  function farmlandHandler() {
    if (farmData.action[9][0] === 0) {
      if (userData[`user${farmData.turn}`].job.includes(1)) {
        // 직업 01. 장작 채집자)
        const update = { ...userData };
        update[`user${farmData.turn}`].tree += 1;
        setUserData(update); //
      }
      updateAction(9, 9);
    } else {
      alert("이미 다른 플레이어가 선택한 버튼입니다.");
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

      if (userData[`user${farmData.turn}`].sub.includes(16))
        // 보조 16. 양토 채굴장
        res.soil += 3;
      if (userData[`user${farmData.turn}`].job.includes(16))
        // 직업 09. 농번기 일꾼
        res.grain += 1;

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
      if (userData[`user${farmData.turn}`].job.includes(9))
        // 직업 09. 나무꾼
        res.tree += 1;
      if (userData[`user${farmData.turn}`].job.includes(19))
        // 직업 19. 지질학자
        res.soil += 1;

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
      if (userData[`user${farmData.turn}`].job.includes(19))
        // 직업 19. 지질학자
        res.soil += 1;

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

      if (userData[`user${farmData.turn}`].sub.includes(26))
        // 보조 26. 통나무배
        res.charcoal += 1;

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
  function facilityHandler() {
    if (farmData.action[16][0] === 0) {
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
      notTurnHandler(res, 16);
      setIsSub(true);
      setIsMain(true);
    } else {
      alert("이미 다른 플레이어가 선택한 버튼입니다.");
    }
  }

  //울타리 클릭 시
  function fenceHandler() {
    if (farmData.action[17][0] === 0) {
      if (userData[`user${farmData.turn}`].tree >= 4 && farmData.round <= 1) {
        updateAction(17, 17);
      } else if (
        userData[`user${farmData.turn}`].tree >= 1 &&
        farmData.round >= 2
      ) {
        updateAction(17, 17);
      } else {
        alert("자원 부족");
      }
      alert("굳굳");
    } else {
      alert("갈 수 없습니다.");
    }
  }

  //곡식 활용 클릭 시
  function roundGrainHandler() {
    let plow_count = userData[`user${farmData.turn}`].farm_array.filter(
      (item) => item === "plow"
    ).length;
    if (
      plow_count > 0 &&
      (userData[`user${farmData.turn}`].grain > 0 ||
        userData[`user${farmData.turn}`].vegetable > 0)
    ) {
      if (farmData.action[18][0] === 0) {
        if (userData[`user${farmData.turn}`].job.includes(1)) {
          // 직업 01. 장작 채집자
          const newdata = { ...userData };
          newdata[`user${farmData.turn}`].tree += 1;
          setUserData(newdata);
        }
        updateAction(18, 18);
      } else {
        alert("갈 수 없습니다.");
      }
    } else {
      alert("농지가 없습니다.");
    }
  }

  //양 시장 클릭 시
  function sheepHandler() {
    // 내턴인지 확인
    if (farmData.action[19][0] === 0) {
      const userda = { ...userData };
      userda[`user${farmData.turn}`].sheep += 1;
      setUserData(userda);

      updateAction(19, 19);
    } else {
      alert("갈 수 없습니다");
    }
  }
  //수확
  function harvest() {
    let a = 20;
    let b = 1;
    console.log(b);
    if (b < 5) {
      if (
        userData[`user${farmData.turn}`].food >=
        userData[`user${farmData.turn}`].farmer * 2
      ) {
      }
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

  function main10() {
    //수확 때
    if (farmData.round > 6) {
      if (userData[`user${farmData.turn}`].reed >= 1) {
        const res = {
          tree: 0,
          soil: 0,
          reed: -1,
          charcoal: 0,
          sheep: 0,
          pig: 0,
          cow: 0,
          grain: 0,
          vegetable: 0,
          food: 3,
        };
        defaultActHandler(res);
      } else {
        alert("갈대 자원이 부족합니다.");
      }
    } else {
      alert("수확 때 가능합니다.");
    }
  }

  const moveOtherPlayer = (index) => {
    if (index === 1 || index === 5)
      return <div style={btnStyle2}>{checkOtherPlayer(index)}</div>;
    else if (index === 12 || index === 14)
      return <div style={btnStyle3}>{checkOtherPlayer(index)}</div>;
    else return <div style={btnStyle}>{checkOtherPlayer(index)}</div>;
  };

  return (
    <div className="boardContainer">
      <div
        style={{
          position: "absolute",
          top: "-75px",
          left: "400px",
          zIndex: "9999",
        }}
      >
        <button onClick={hwaduckHandler}>화덕</button>
      </div>

      <Board className="round" />
      {isTurn && farmData.round < 7 && (
        <h2 style={{ position: "absolute", top: "-75px", left: "160px" }}>
          Your Turn!
        </h2>
      )}

      {farmData.round === 6 && (
        <h2 style={{ position: "absolute", top: "-75px", left: "300px" }}>
          Harvest
        </h2>
      )}
      {farmData.round === 7 && (
        <h2 style={{ position: "absolute", top: "-75px", left: "160px" }}>
          Game Over!
        </h2>
      )}

      {farmData.round === 7 && scoreBoardVisible && (
        <ScoreBoard setIsVisible={setScoreBoardVisible} />
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
        <div className="actionBtn actionBtn2 clay" onClick={farmlandHandler}>
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

      {/*수확 버튼*/}
      {isTurn && (farmData.round === 6 || farmData.round === 7) && (
        <button className="harvestBtn" onClick={harvest}>
          수확
        </button>
      )}

      <div className="cardBtn1" onClick={cardBtn1Handler}></div>
      {mainModalVisible && (
        <MainModal
          setIsVisible={setMainModalVisible}
          isMain={isMain}
          setIsMain={setIsMain}
        />
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

      {farmData.round >= 1 &&
        (isTurn ? (
          <button
            className="actionBtn roundBtn1"
            onClick={() => facilityHandler(16)}
          >
            {moveOtherPlayer(16)}
            <Facility className="facilityBtn1" />
          </button>
        ) : (
          <button className="player roundBtn1">
            {moveOtherPlayer(16)}
            <Facility className="facilityBtn1" />
          </button>
        ))}

      {farmData.round >= 2 &&
        (isTurn ? (
          <button
            className="actionBtn roundBtn2"
            onClick={() => fenceHandler(17)}
          >
            {moveOtherPlayer(17)}
            <Fence className="facilityBtn1" />
          </button>
        ) : (
          <button className="player roundBtn2">
            {moveOtherPlayer(17)}
            <Fence className="facilityBtn1" />
          </button>
        ))}

      {farmData.round >= 3 &&
        (isTurn ? (
          <button
            className="actionBtn roundBtn3"
            onClick={() => roundGrainHandler(18)}
          >
            {moveOtherPlayer(18)}
            <Grain className="facilityBtn1" />
          </button>
        ) : (
          <button className="player roundBtn3">
            {moveOtherPlayer(18)}
            <Grain className="facilityBtn1" />
          </button>
        ))}

      {farmData.round >= 4 &&
        (isTurn ? (
          <button
            className="actionBtn roundBtn4"
            onClick={() => sheepHandler(19)}
          >
            {moveOtherPlayer(19)}
            <Sheep className="facilityBtn1" />
          </button>
        ) : (
          <button className="player roundBtn4">
            {moveOtherPlayer(19)}
            <Sheep className="facilityBtn1" />
          </button>
        ))}
    </div>
  );
}

export default ActionBoard;
