import { useContext, useEffect, useState } from "react";
import { ReactComponent as Board } from "../asset/roundCard.svg";
import "./ActionBoard.css";
import * as SockJS from "sockjs-client";
import * as Stomp from "@stomp/stompjs";
import "./FarmBoard.css";
import axios from "axios";
import { nameValue, sendingClient } from "../screen/Start";
import styles from "./Begging.css";
import Begging from "../asset/begging.PNG";
import { ReactComponent as Land } from "../asset/land.svg";
import { ReactComponent as Fence } from "../asset/fence.svg";
import { ReactComponent as Grain } from "../asset/grain.svg";
import { ReactComponent as Sheep } from "../asset/sheep.svg";
import { ReactComponent as Facility } from "../asset/facility.svg";
import ScoreBoard from "./ScoreBoard";
import MainModal from "./MainModal";
import SubModal from "./SubModal";
import { DataContext } from "../store/data-context";
import { UserContext } from "../store/user-context";
import redplayer from "../image/farmer_red.png";
import yellowplayer from "../image/farmer_yellow.png";
import greenplayer from "../image/farmer_green.png";
import blueplayer from "../image/farmer_blue.png";
import plow_grain2 from "../image/plow_grain2.png";
import beg from "../image/beg.png";

function ActionBoard({ data, setData }) {
  const [isTurn, setIsTurn] = useState(false);
  const [mainModalVisible, setMainModalVisible] = useState(false);
  const [subModalVisible, setSubModalVisible] = useState(false);
  // const [mainSulbi, setMainSulbi] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const [begging, setBegging] = useState();
  const [scoreBoardVisible, setScoreBoardVisible] = useState(false);
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
    updateAlways,
  } = useContext(DataContext);
  const { userData, setUserData } = useContext(UserContext);
  const [isSub, setIsSub] = useState(false);
  const [isJob, setIsJob] = useState(false);
  const [isMain, setIsMain] = useState(false);
  const [isBake, setIsBake] = useState(false);

  // 현재 자신의 턴인지
  useEffect(() => {
    if (farmData.currentTurn === farmData.turn % 4 && farmData.round != 0) {
      setIsTurn(true);
    } else {
      setIsTurn(false);
    }
  }, [farmData.currentTurn, farmData.round]);

  useEffect(() => {
    if (
      farmData.currentTurn === farmData.turn % 4 && // 내 턴이면서
      farmData.farmer_count[(farmData.turn - 1) % 4] != 0 // 농부수가 남아있으면
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
    // 턴 안넘기고 자원갱신만 하는 함수
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
          charcoal:prevUserData[`user${farmData.turn}`].charcoal + res.charcoal,
          sheep: prevUserData[`user${farmData.turn}`].sheep + res.sheep,
          pig: prevUserData[`user${farmData.turn}`].pig + res.pig,
          cow: prevUserData[`user${farmData.turn}`].cow + res.cow,
          grain: prevUserData[`user${farmData.turn}`].grain + res.grain,
          vegetable:prevUserData[`user${farmData.turn}`].vegetable + res.vegetable,
          food: prevUserData[`user${farmData.turn}`].food + res.food,
        },
      }));
    }

    console.log("always");
  };

  const harvestActHandler = async (res) => {
    await updateAlways(farmData.turn); // 누른 놈 제외 갱신
    const farmer_cnt = farmData.farmer_count;
    farmer_cnt[(farmData.currentTurn + 3) % 4] -= 0;
    sendingClient.current.send(
      "/main-board/resource/update",
      {},
      JSON.stringify({
        messageType: "RESOURCE",
        roomId: farmData.roomId,
        action: farmData.action,
        round: farmData.round,
        currentTurn: farmData.currentTurn % 4,
        farmer_count: farmer_cnt,
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
  const alwaysActHandler2 = async (res) => {
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

  function returnBakeDiv() {
    return (
      <div
        style={{
          position: "absolute",
          top: "-75px",
          left: "400px",
          zIndex: "9999",
        }}
      >
        <button onClick={hwaroVegetableHandler}>화로-야채</button>
        <button onClick={hwaroPigHandler}>화로-돼지</button>
        <button onClick={hwaroSheepHandler}>화로-양</button>
        <button onClick={hwaroCowHandler}>화로-소</button>
        <button onClick={hwaroBakeHandler}>화로-빵굽기</button>
        <button onClick={hwaduckVegetableHandler}>화덕-야채</button>
        <button onClick={hwaduckPigHandler}>화덕-돼지</button>
        <button onClick={hwaduckSheepHandler}>화덕-양</button>
        <button onClick={hwaduckCowHandler}>화덕-소</button>
        <button onClick={hwaduckBakeHandler}>화덕-빵굽기</button>
        <button onClick={WellHandler}>우물</button>
        <button onClick={furnitureHandler}>가구 제작소</button>
        <button onClick={bowlHandler}>그릇 제작소</button>
        <button onClick={basketHandler}>바구니 제작소</button>
      </div>
    );
  }

  function hwaduckVegetableHandler() {
    if (userData[`user${farmData.turn}`].vegetable > 0) {
      // 자원 갖고 있는 지 확인
      const res = {
        tree: 0,
        soil: 0,
        reed: 0,
        charcoal: 0,
        sheep: 0,
        pig: 0,
        cow: 0,
        grain: 0,
        vegetable: -1,
        food: 3,
      };
      alwaysActHandler(res);
    } else {
      alert("보유한 자원이 부족합니다.");
    }
  }

  function hwaduckPigHandler() {
    if (userData[`user${farmData.turn}`].pig > 0) {
      // 자원 갖고 있는 지 확인
      const res = {
        tree: 0,
        soil: 0,
        reed: 0,
        charcoal: 0,
        sheep: 0,
        pig: -1,
        cow: 0,
        grain: 0,
        vegetable: 0,
        food: 3,
      };
      alwaysActHandler(res);
    } else {
      alert("보유한 자원이 부족합니다.");
    }
  }

  function hwaduckSheepHandler() {
    if (userData[`user${farmData.turn}`].sheep > 0) {
      // 자원 갖고 있는 지 확인
      const res = {
        tree: 0,
        soil: 0,
        reed: 0,
        charcoal: 0,
        sheep: -1,
        pig: 0,
        cow: 0,
        grain: 0,
        vegetable: 0,
        food: 2,
      };
      // alwaysActHandler(res);
      harvestActHandler(res);
    } else {
      alert("보유한 자원이 부족합니다.");
    }
  }

  function hwaduckCowHandler() {
    if (userData[`user${farmData.turn}`].cow > 0) {
      // 자원 갖고 있는 지 확인
      const res = {
        tree: 0,
        soil: 0,
        reed: 0,
        charcoal: 0,
        sheep: 0,
        pig: 0,
        cow: -1,
        grain: 0,
        vegetable: 0,
        food: 4,
      };
      alwaysActHandler2(res);
    } else {
      alert("보유한 자원이 부족합니다.");
    }
  }

  function hwaduckBakeHandler() {
    if (userData[`user${farmData.turn}`].vegetable > 0) {
      // 자원 갖고 있는 지 확인
      const res = {
        tree: 0,
        soil: 0,
        reed: 0,
        charcoal: 0,
        sheep: 0,
        pig: 0,
        cow: 0,
        grain: -1,
        vegetable: 0,
        food: 3,
      };
      alwaysActHandler(res);
    } else {
      alert("보유한 자원이 부족합니다.");
    }
  }

  function hwaroVegetableHandler() {
    if (userData[`user${farmData.turn}`].vegetable > 0) {
      // 자원 갖고 있는 지 확인
      const res = {
        tree: 0,
        soil: 0,
        reed: 0,
        charcoal: 0,
        sheep: 0,
        pig: 0,
        cow: 0,
        grain: 0,
        vegetable: -1,
        food: 2,
      };
      alwaysActHandler(res);
    } else {
      alert("보유한 자원이 부족합니다.");
    }
  }

  function hwaroPigHandler() {
    if (userData[`user${farmData.turn}`].pig > 0) {
      // 자원 갖고 있는 지 확인
      const res = {
        tree: 0,
        soil: 0,
        reed: 0,
        charcoal: 0,
        sheep: 0,
        pig: -1,
        cow: 0,
        grain: 0,
        vegetable: 0,
        food: 2,
      };
      alwaysActHandler(res);
    } else {
      alert("보유한 자원이 부족합니다.");
    }
  }

  function hwaroSheepHandler() {
    if (userData[`user${farmData.turn}`].sheep > 0) {
      // 자원 갖고 있는 지 확인
      const res = {
        tree: 0,
        soil: 0,
        reed: 0,
        charcoal: 0,
        sheep: -1,
        pig: 0,
        cow: 0,
        grain: 0,
        vegetable: 0,
        food: 2,
      };
      alwaysActHandler(res);
    } else {
      alert("보유한 자원이 부족합니다.");
    }
  }

  function hwaroCowHandler() {
    if (userData[`user${farmData.turn}`].cow > 0) {
      // 자원 갖고 있는 지 확인
      const res = {
        tree: 0,
        soil: 0,
        reed: 0,
        charcoal: 0,
        sheep: 0,
        pig: 0,
        cow: -1,
        grain: 0,
        vegetable: 0,
        food: 3,
      };
      alwaysActHandler(res);
    } else {
      alert("보유한 자원이 부족합니다.");
    }
  }

  function hwaroBakeHandler() {
    if (userData[`user${farmData.turn}`].vegetable > 0) {
      // 자원 갖고 있는 지 확인
      const res = {
        tree: 0,
        soil: 0,
        reed: 0,
        charcoal: 0,
        sheep: 0,
        pig: 0,
        cow: 0,
        grain: -1,
        vegetable: 0,
        food: 2,
      };
      alwaysActHandler(res);
    } else {
      alert("보유한 자원이 부족합니다.");
    }
  }




  function checkRoomCount() {
    const roomArray = userData[`user${farmData.turn}`].farm_array;
    const roomCounts = {
      wood_room: 0,
      rock_room: 0,
      soil_room: 0,
      empty: 0,
      plow_grain1: 0,
      plow_grain2: 0,
      plow_grain3: 0, 
      plow_vegetable1: 0,
      plow_vegetable2: 0,
    };
    roomArray.forEach((item) => {
      if (roomCounts.hasOwnProperty(item)) {
        roomCounts[item]++;
      }
    });
    return roomCounts;
  }

  function job03Handler(item) {
    // 직업 03. 가축상인
    if (userData[`user${farmData.turn}`].food > 0) {
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
      if (item === "sheep") res.sheep += 1;
      else if (item === "pig") res.pig += 1;
      else if (item === "cow") res.cow += 1;

      alwaysActHandler(res);
    } else {
      alert("보유한 자원이 부족합니다.");
    }
  }



  function job24Handler() {
    // 직업 24. 상담가
    const res = {
      tree: 0,
      soil: 0,
      reed: 0,
      charcoal: 0,
      sheep: 2,
      pig: 0,
      cow: 0,
      grain: 0,
      vegetable: 0,
      food: 0,
    };
    alwaysActHandler(res);
  }


  



  function sub04Handler() {
    // 보조 04. 다진 흙
    const res = {
      tree: 0,
      soil: 1, // 울타리 칠 때 나무 대신 흙 가능
      reed: 0,
      charcoal: 0,
      sheep: 0,
      pig: 0,
      cow: 0,
      grain: 0,
      vegetable: 0,
      food: 0,
    };
    alwaysActHandler(res);
  }

  function sub11Handler() {
    // 보조 11. 베틀
    const sheepCnt = userData[`user${farmData.turn}`].sheep;
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
    if (sheepCnt === 1) res.food += 1;
    else if (sheepCnt === 4) res.food += 2;
    else if (sheepCnt === 7) res.food += 3;

    alwaysActHandler(res);
  }

  function sub14Handler() {
    // 보조 14. 빵삽
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
      food: 1,
    };
    alwaysActHandler(res);
  }

  function sub15Handler() {
    // 보조 15. 삼포식 농법
    const roomCounts = checkRoomCount();
    if (
      (roomCounts.plow_grain1 > 0 || roomCounts.plow_grain2 > 0 || roomCounts.plow_grain3) &&
      (roomCounts.plow_vegetable1 > 0 || roomCounts.plow_vegetable2 ) &&
      (roomCounts.empty > 1)
    ) {
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
    }
  }


  function sub28Handler() {
    // 보조 28. 흙판
    const leftSoilCnt = userData[`user${farmData.turn}`].soil;
    leftSoilCnt = Math.floor(leftSoilCnt / 2);
    const res = {
      tree: 0,
      soil: leftSoilCnt,
      reed: 0,
      charcoal: 0,
      sheep: 0,
      pig: 0,
      cow: 0,
      grain: 0,
      vegetable: 0,
      food: 0,
    };
    alwaysActHandler(res);
  }

  const [well, setWell] = useState([]);
  function WellHandler() {
    if (farmData.round === 3 && well.length === 0) {
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
        food: 1,
      };
      harvestActHandler(res);
      setWell((prevWell) => [...prevWell, 1]);
      console.log("well round 3");
    } else if (farmData.round === 4 && well.length === 0) {
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
      harvestActHandler(res);
      setWell((prevWell) => [...prevWell, 1]);
      console.log("well round 4");
    } else {
      alert("이제 그만");
    }
  }

  function furnitureHandler() {
    if (farmData.round === 5) {
      if (userData[`user${farmData.turn}`].tree >= 1) {
        const res = {
          tree: -1,
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
        harvestActHandler(res);
      } else {
        alert("보유한 자원이 부족합니다.");
      }
    } else {
      alert("수확 때 사용 가능합니다.");
    }
  }

  function bowlHandler() {
    if (farmData.round === 5) {
      if (userData[`user${farmData.turn}`].soil >= 1) {
        const res = {
          tree: 0,
          soil: -1,
          reed: 0,
          charcoal: 0,
          sheep: 0,
          pig: 0,
          cow: 0,
          grain: 0,
          vegetable: 0,
          food: 2,
        };
        harvestActHandler(res);
      } else {
        alert("보유한 자원이 부족합니다.");
      }
    } else {
      alert("수확 때 사용 가능합니다.");
    }
  }

  function basketHandler() {
    if (farmData.round === 5) {
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
          food: 2,
        };
        harvestActHandler(res);
      } else {
        alert("보유한 자원이 부족합니다.");
      }
    } else {
      alert("수확 때 사용 가능합니다.");
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
      if (userData[`user${farmData.turn}`].job.includes(15)) {
        // 직업 15. 창고 관리인
        if (
          window.confirm(
            "예 : 흙 한개를 추가로 가져옵니다. 아니오 : 곡식 1개를 추가로 가져옵니다."
          )
        ) {
          res.soil += 1;
        } else {
          res.grain += 1;
        }
      }

      if (userData[`user${farmData.turn}`].job.includes(17)) {
        // 직업 18. 보조 경직자
        if (window.confirm("밭 1개를 일구시겠습니까?")) {
          // 밭 일구기 로직
        } else {
          console.log("밭 안 일굼");
        }
      }

      if (userData[`user${farmData.turn}`].job.includes(18)) {
        // 직업 18. 오두막집 살이
        if (window.confirm("방을 짓거나 고치시겠습니까?")) {
          // 방 고치기 로직
        } else {
          console.log("안고침");
        }
      }

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

        alwaysActHandler2(res);
        updateAction(4, 0);
        setIsJob(true);
        setSubModalVisible(true);
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
      setSubModalVisible(true);
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

        alwaysActHandler2(res);
        updateAction(10, 0);
        setIsJob(true);
        setSubModalVisible(true);
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
        // 직업 16. 농번기 일꾼
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
      setSubModalVisible(true);
      setMainModalVisible(true);
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
        // 아무도 곡식 활용 안 눌렀으면

        const mainCard = userData[`user${farmData.turn}`].main;
        if (
          mainCard.includes(1) ||
          mainCard.includes(2) ||
          mainCard.includes(3) || // 해당 메인설비들 내려놨으면 빵굽기 가능
          mainCard.includes(4) ||
          mainCard.includes(6) ||
          mainCard.includes(7)
        ) {
          // 1,2 : 화로 //3,4 : 화덕// 6 : 흙가마// 7: 돌가마
          // (사진 이름으로 인덱스 매겼어요)
          if (window.confirm("빵굽기를 하시겠습니까?")) {
            setIsBake(true); //  이 놈 true 되면 보유하고 있는 메인 설비 목록 띄워주기
            // 각 조건에 따라서 빵굽기 해줘야 함
            // 보유하고 있는 메인 설비 클릭 가능하게 해주면 되지 않을까 생각 중
          } else {
            // 빵 안구우니까 곡식 활용만 하고 넘겨주기
          }
        }

        // 직업 관련 로직
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
      if (userData[`user${farmData.turn}`].job.includes(3)) {
        // 직업 03. 가축상인
        if (
          window.confirm(
            "가축 상인(음식 1개 내고 양 1개 받기) 효과를 사용하시겠습니까?"
          )
        ) {
          job03Handler("sheep");
        } else {
          console.log("가축 상인 효과 사용 안함");
        }
      }

      updateAction(19, 19);
    } else {
      alert("갈 수 없습니다");
    }
  }
  //수확

function harvest_family() {
  //
  if (userData[`user${farmData.turn}`].farmer === 2) {
    // console.log(farmData.currentTurn);
    // console.log(farmData.turn);
    // console.log(userData[`user${farmData.turn}`].farmer);
    if (
      userData[`user${farmData.turn}`].food >=
      userData[`user${farmData.turn}`].farmer * 2
    ) {
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
        food: userData[`user${farmData.turn}`].farmer * 2 * -1,
      };
      defaultActHandler(res, 21);
    } else {
      if (
        userData[`user${farmData.turn}`].food <
        userData[`user${farmData.turn}`].farmer * 2
      ) {

        if (farmData.turn === 1) {
          alert("구걸하세요! 식량 부족");
          setBegging(1);
        } else if (farmData.turn === 2) {
          alert("구걸하세요! 식량 부족");
          setBegging(2);
        } else if (farmData.turn === 3) {
          alert("구걸하세요! 식량 부족");
          setBegging(3);
        } else {
          alert("구걸하세요! 식량 부족");
          setBegging(4);
        }

      }
    }
  } else {
    alert("이미 가족 부양을 완료 하였습니다.");
  }
}

  function harvest_grain() {
    let grain3_count = userData[`user${farmData.turn}`].farm_array.filter((item) => item === "plow_grain3").length;
    let grain2_count = userData[`user${farmData.turn}`].farm_array.filter((item) => item === "plow_grain2").length;
    let grain1_count = userData[`user${farmData.turn}`].farm_array.filter((item) => item === "plow_grain1").length;

    if (userData[`user${farmData.turn}`].farmer === 1) {
      if (grain3_count>0 || grain2_count>0 || grain1_count>0) {
        if(grain3_count>0) {
          const roomIndices = []; // plow에 해당하는 인덱스를 저장할 배열
  
          userData[`user${farmData.turn}`].farm_array.forEach((item, idx) => {
            if (item === "plow_grain3") {
              roomIndices.push(idx);
            }
          });
          roomIndices.forEach((idx) => {
            const updatedUserData = { ...userData }; // userData 객체 복사
            updatedUserData[`user${farmData.turn}`].farm_array[idx] = "plow_grain2"; // farm_array 업데이트

            setUserData(updatedUserData);
            const roomClass = `.Btn.room${Math.floor(idx / 5) + 1}_${
              (idx % 5) + 1
            }`;

            const res = {
              tree: 0,
              soil: 0,
              reed: 0,
              charcoal: 0,
              sheep: 0,
              pig: 0,
              cow: 0,
              grain: grain3_count,
              vegetable: 0,
              food: 0,
            }
            
            const roomElement = document.querySelector(roomClass);
            
            roomElement.style.marginTop = "-30px";
            roomElement.style.marginLeft = "-10px";
            roomElement.style.width = "100pxpx";
            roomElement.style.height = "120px";
            roomElement.style.backgroundImage = `url(${plow_grain2})`;
            defaultActHandler(res, 22);

          });
        };
      } else {
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
        }
        alert("작물 거두기를 할 수 없습니다.");
        defaultActHandler(res, 22);
      }
    } else {
      alert("가족 부양 부터 하세요.");
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
      {isBake && returnBakeDiv()}
      {returnBakeDiv()}
      <Board className="round" />
      {isTurn && farmData.round < 6 && (
        <h2 style={{ position: "absolute", top: "-75px", left: "160px" }}>
          Your Turn!
        </h2>
      )}
      {farmData.round === 5 && (
        <h2 style={{ position: "absolute", top: "-75px", left: "300px" }}>
          Harvest
        </h2>
      )}
      {farmData.round === 6 && (
        <h2 style={{ position: "absolute", top: "-75px", left: "160px" }}>
          Game Over!
        </h2>
      )}
      {farmData.round === 6 && scoreBoardVisible && (
        <ScoreBoard setIsVisible={setScoreBoardVisible} />
      )}
      {/* 덤블 버튼 */}
      {isTurn && farmData.round < 5 ? (
        <div className="actionBtn dumble" onClick={dumbleHandler}>
          {moveOtherPlayer(0)}
        </div>
      ) : (
        <div className="player dumble">{moveOtherPlayer(0)}</div>
      )}
      {/* 수풀 버튼 */}
      {isTurn && farmData.round < 5 ? (
        <div className="actionBtn bush" onClick={bushHandler}>
          {moveOtherPlayer(1)}
        </div>
      ) : (
        <div className="player bush">{moveOtherPlayer(1)}</div>
      )}
      {/* 자원 시장 버튼 */}
      {isTurn && farmData.round < 5 ? (
        <div className="actionBtn resource" onClick={resourceHandler}>
          {moveOtherPlayer(2)}
        </div>
      ) : (
        <div className="player resource">{moveOtherPlayer(2)}</div>
      )}
      {/* 점토 채굴장 버튼 */}
      {isTurn && farmData.round < 5 ? (
        <div className="actionBtn clay" onClick={clayHandler}>
          {moveOtherPlayer(3)}
        </div>
      ) : (
        <div className="player clay">{moveOtherPlayer(3)}</div>
      )}
      {/* 교습1 버튼 */}
      {isTurn && farmData.round < 5 ? (
        <div className="actionBtn teach1" onClick={teach1Handler}>
          {moveOtherPlayer(4)}
        </div>
      ) : (
        <div className="player teach1">{moveOtherPlayer(4)}</div>
      )}
      {/* 유랑극당 버튼 */}
      {isTurn && farmData.round < 5 ? (
        <div className="actionBtn theater" onClick={theaterHandler}>
          {moveOtherPlayer(5)}
        </div>
      ) : (
        <div className="player theater">{moveOtherPlayer(5)}</div>
      )}
      {/* 농장 확장 버튼 */}
      {isTurn && farmData.round < 5 ? (
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
      {isTurn && farmData.round < 5 ? (
        <div className="actionBtn actionBtn2 space" onClick={spaceHandler}>
          {moveOtherPlayer(7)}
        </div>
      ) : (
        <div className="player actionBtn2 space">{moveOtherPlayer(7)}</div>
      )}
      {/* 곡식 종자 버튼 */}
      {isTurn && farmData.round < 5 ? (
        <div className="actionBtn actionBtn2 grain" onClick={grainHandler}>
          {moveOtherPlayer(8)}
        </div>
      ) : (
        <div className="player actionBtn2 grain">{moveOtherPlayer(8)}</div>
      )}
      {/* 농지 버튼 */}
      {isTurn && farmData.round < 5 ? (
        <div className="actionBtn actionBtn2 clay" onClick={farmlandHandler}>
          {moveOtherPlayer(9)}
        </div>
      ) : (
        <div className="player actionBtn2 clay">{moveOtherPlayer(9)}</div>
      )}
      {/* 교습2 버튼 */}
      {isTurn && farmData.round < 5 ? (
        <div className="actionBtn actionBtn2 teach1" onClick={teach2Handler}>
          {moveOtherPlayer(10)}
        </div>
      ) : (
        <div className="player actionBtn2 teach1">{moveOtherPlayer(10)}</div>
      )}
      {/* 날품팔이 버튼 */}
      {isTurn && farmData.round < 5 ? (
        <div className="actionBtn actionBtn2 theater" onClick={goodsHandler}>
          {moveOtherPlayer(11)}
        </div>
      ) : (
        <div className="player actionBtn2 theater">{moveOtherPlayer(11)}</div>
      )}
      {/* 숲 버튼 */}
      {isTurn && farmData.round < 5 ? (
        <div className="actionBtn actionBtn3 forest" onClick={forestHandler}>
          {moveOtherPlayer(12)}
        </div>
      ) : (
        <div className="player actionBtn3 forest">{moveOtherPlayer(12)}</div>
      )}
      {/* 흙 채굴장 버튼 */}
      {isTurn && farmData.round < 5 ? (
        <div className="actionBtn actionBtn3 clay" onClick={soilHandler}>
          {moveOtherPlayer(13)}
        </div>
      ) : (
        <div className="player actionBtn3 clay">{moveOtherPlayer(13)}</div>
      )}
      {/* 갈대밭 버튼 */}
      {isTurn && farmData.round < 5 ? (
        <div className="actionBtn actionBtn3 teach1" onClick={reedHandler}>
          {moveOtherPlayer(14)}
        </div>
      ) : (
        <div className="player actionBtn3 teach1">{moveOtherPlayer(14)}</div>
      )}
      {/* 낚시 버튼 */}
      {isTurn && farmData.round < 5 ? (
        <div className="actionBtn actionBtn3 theater" onClick={fishingHandler}>
          {moveOtherPlayer(15)}
        </div>
      ) : (
        <div className="player actionBtn3 theater">{moveOtherPlayer(15)}</div>
      )}
      {/*수확 버튼*/}
      {isTurn && farmData.round === 5 && (
        <button className="harvest_familyBtn" onClick={harvest_family}>
          가족 부양
        </button>
      )}
      {isTurn && farmData.round === 5 && (
        <button className="harvest_grainBtn" onClick={harvest_grain}>
          작물 뿌려주기
        </button>
      )}
      <div className="cardBtn1" onClick={cardBtn1Handler}></div>
      {mainModalVisible && (
        <MainModal
          setIsVisible={setMainModalVisible}
          isVisible={mainModalVisible}
          isMain={isMain}
          setIsMain={setIsMain}
          setIsSub={setIsSub}
        />
      )}
      <div className="cardBtn2" onClick={cardBtn2Handler}></div>
      {subModalVisible && (
        <SubModal
          setIsVisible={setSubModalVisible}
          setIsMainVisible={setMainModalVisible}
          subSulbi={farmData.subCards}
          jobCard={farmData.jobCards}
          isJob={isJob}
          isSub={isSub}
          setIsJob={setIsJob}
          setIsMain={setIsMain}
          setIsSub={setIsSub}
        />
      )}

      {farmData.round >= 0 &&
        (isTurn && farmData.round < 5 ? (
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
        (isTurn && farmData.round < 5 ? (
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
        (isTurn && farmData.round < 5 ? (
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
        (isTurn && farmData.round < 5 ? (
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
      {begging === 1 && (
        <img
          src={Begging}
          style={{
            width: "100px",
            height: "auto",
            position: "absolute",
            top: "3px",
            left: "1650px",
          }}
        />
      )}
      {begging === 2 && (
        <div className={styles.container}>
          <img
            src={Begging}
            style={{
              width: "100px",
              height: "auto",
              position: "absolute",
              top: "245px",
              left: "1650px",
            }}
          />
        </div>
      )}
      {begging === 3 && (
        <div className={styles.container}>
          <img
            src={Begging}
            style={{
              width: "100px",
              height: "auto",
              position: "absolute",
              top: "487px",
              left: "1650px",
            }}
          />
        </div>
      )}
      {begging === 4 && (
        <div className={styles.container}>
          <img
            src={Begging}
            style={{
              width: "100px",
              height: "auto",
              position: "absolute",
              top: "729px",
              left: "1650px",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ActionBoard;
