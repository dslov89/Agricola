import styles from "./SubModal.module.css";
import { nameValue, sendingClient } from "../screen/Start";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../store/data-context";
import { UserContext } from "../store/user-context";
import { isVisible } from "@testing-library/user-event/dist/utils";

function SubModal({
  setIsVisible,
  setIsMainVisible,
  subSulbi,
  jobCard,
  isSub,
  isJob,
  setIsJob,
  setIsSub,
  setIsMain,
}) {
  const {
    farmData,
    setFarmData,
    updateFarmerCount,
    updateFarmData,
    updateAction,
    updateSubCard,
    updateJobCard,
    updateAlways,
  } = useContext(DataContext);

  const { userData, setUserData } = useContext(UserContext);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [clickedCardId, setClickedCardId] = useState(null);

  const closeModal = () => {
    setIsVisible(false);
  };

  const closeModal2 = () => {
    sendingClient.current.send(
      "/main-board/resource/update",
      {},
      JSON.stringify({
        messageType: "RESOURCE",
        roomId: farmData.roomId,
        action: farmData.action,
        round: farmData.round,
        currentTurn: (farmData.currentTurn + 1) % 4,
        farmer_count: farmData.farmer_count,
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
      })
    );
    setIsVisible(false);
  };

  useEffect(() => {
    myCardCheck();
  }, [farmData.currentTurn, farmData.food, farmData.action]);

  function myCardCheck() {
    setFarmData((prevFarmData) => {
      // 원래 배열 - 초기화된
      const notUpdatedJobCards = [...prevFarmData.jobCards];
      // 내가 가진 카드
      const myjob = userData[`user${farmData.turn}`].job;

      const updatedJobCards = notUpdatedJobCards.map((innerArray) => {
        if (myjob.includes(innerArray[0])) {
          innerArray[1] = 0;
        }
        return innerArray;
      });

      const notUpdatedSubCards = [...prevFarmData.subCards];
      // 내가 가진 카드
      const mysub = userData[`user${farmData.turn}`].sub;

      console.log(mysub);

      const updatedSubCards = notUpdatedSubCards.map((innerArray) => {
        if (mysub.includes(innerArray[0])) {
          innerArray[1] = 0;
        }
        return innerArray;
      });

      return {
        ...prevFarmData,
        jobCards: updatedJobCards,
        subCards: updatedSubCards,
      };
    });
  }

  function jobCardHandler(index, cardId) {
    // updateJobCard(index);
    setClickedIndex(index);
    setClickedCardId(cardId);
  }
  const sendJobCard = () => {
    console.log(farmData.jobCards);
    setIsVisible(false);

    sendingClient.current.send(
      "/main-board/card/update",
      {},
      JSON.stringify({
        messageType: "CARD",
        roomId: farmData.roomId,
        round: farmData.round,
        action: farmData.action,
        currentTurn: (farmData.currentTurn + 1) % 4,
        farmer_count: farmData.farmer_count,
        cardType: "JOB",
        cardIndex: clickedCardId,
      })
    );
    setIsJob(false);
  };

  function subCardHandler(index, cardId) {
    // updateSubCard(index);
    console.log(farmData.subCards);
    setClickedIndex(index);
    setClickedCardId(cardId);
  }

  const alwaysActHandler2 = async (res) => {
    await updateAlways(farmData.turn); // 누른 놈 제외 갱신
    setIsVisible(false);
    setIsMainVisible(false);
    setIsSub(false);
    setIsMain(false);
    sendingClient.current.send(
      "/main-board/resource/update",
      {},
      JSON.stringify({
        messageType: "RESOURCE",
        roomId: farmData.roomId,
        action: farmData.action,
        round: farmData.round,
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

    okaySend();
    console.log("always");
  };

  const sendSubCard = () => {
    // 흙 1개
    if (clickedCardId === 1 || clickedCardId === 9 || clickedCardId === 18) {
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
          food: 0,
        };
        // notTurnHandler(res);
        alwaysActHandler2(res);
        // okaySend();
      } else {
        alert("자원이 부족합니다");
      }
      // 나무 1개
    } else if (
      clickedCardId === 3 ||
      clickedCardId === 13 ||
      clickedCardId === 26
    ) {
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
          food: 0,
        };
        // notTurnHandler(res);
        alwaysActHandler2(res);
        // okaySend();
      } else {
        alert("자원이 부족합니다");
      }
      // 나무 2개
    } else if (clickedCardId === 5) {
      if (userData[`user${farmData.turn}`].tree >= 2) {
        const res = {
          tree: -2,
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
        // notTurnHandler(res);
        alwaysActHandler2(res);
        // okaySend();
      } else {
        alert("자원이 부족합니다");
      }
    }
    // 나무 2개, 직업 2개
    else if (clickedCardId === 6) {
      if (
        userData[`user${farmData.turn}`].tree >= 2 &&
        userData[`user${farmData.turn}`].job.length === 2
      ) {
        const res = {
          tree: -2,
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
        // notTurnHandler(res);
        alwaysActHandler2(res);
        // okaySend();
      } else {
        alert("자원이 부족합니다");
      }
    }
    // 나무 1개, 직업 2개
    else if (clickedCardId === 12) {
      if (
        userData[`user${farmData.turn}`].tree >= 1 &&
        userData[`user${farmData.turn}`].job.length === 2
      ) {
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
          food: 0,
        };
        // notTurnHandler(res);
        alwaysActHandler2(res);
        // okaySend();
      } else {
        alert("자원이 부족합니다");
      }
      // 식량 2개
    } else if (clickedCardId === 4 || clickedCardId === 28) {
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
        // notTurnHandler(res);
        alwaysActHandler2(res);
        // okaySend();
      } else {
        alert("자원이 부족합니다");
      }
      // 식량 1개
    } else if (clickedCardId === 25) {
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
        // notTurnHandler(res);
        alwaysActHandler2(res);
        // okaySend();
      } else {
        alert("자원이 부족합니다");
      }
      // 식량 1개, 직업 3개
    } else if (clickedCardId === 10) {
      if (
        userData[`user${farmData.turn}`].food >= 1 &&
        userData[`user${farmData.turn}`].job.length === 3
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
          food: -1,
        };
        // notTurnHandler(res);]
        alwaysActHandler2(res);
        // okaySend();
      } else {
        alert("자원이 부족합니다");
      }
      // 갈대 1개, 직업 3개
    } else if (clickedCardId === 14) {
      if (
        userData[`user${farmData.turn}`].reed >= 1 &&
        userData[`user${farmData.turn}`].job.length === 3
      ) {
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
          food: 0,
        };
        // notTurnHandler(res);
        alwaysActHandler2(res);
        // okaySend();
      } else {
        alert("자원이 부족합니다");
      }
      // 나무 1개, 직업 3개 이하
    } else if (clickedCardId === 17) {
      if (
        userData[`user${farmData.turn}`].tree >= 1 &&
        userData[`user${farmData.turn}`].job.length <= 3
      ) {
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
          food: 0,
        };
        // notTurnHandler(res);
        alwaysActHandler2(res);
        // okaySend();
      } else {
        alert("자원이 부족합니다");
      }
      // 돌 2개, 직업 3개 이하
    } else if (clickedCardId === 17) {
      if (
        userData[`user${farmData.turn}`].charcoal >= 2 &&
        userData[`user${farmData.turn}`].job.length <= 3
      ) {
        const res = {
          tree: 0,
          soil: 0,
          reed: 0,
          charcoal: -2,
          sheep: 0,
          pig: 0,
          cow: 0,
          grain: 0,
          vegetable: 0,
          food: 0,
        };
        // notTurnHandler(res);
        alwaysActHandler2(res);
        // okaySend();
      } else {
        alert("자원이 부족합니다");
      }
      // 나무 1개, 직업 2개
    } else if (clickedCardId === 20) {
      if (
        userData[`user${farmData.turn}`].tree >= 1 &&
        userData[`user${farmData.turn}`].job.length === 2
      ) {
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
          food: 0,
        };
        // notTurnHandler(res);
        alwaysActHandler2(res);
        // okaySend();
      } else {
        alert("자원이 부족합니다");
      }

      // 나무 2개, 직업 1개
    } else if (clickedCardId === 24) {
      if (
        userData[`user${farmData.turn}`].tree >= 2 &&
        userData[`user${farmData.turn}`].job.length === 1
      ) {
        const res = {
          tree: -2,
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
        // notTurnHandler(res);
        alwaysActHandler2(res);
        // okaySend();
      } else {
        alert("자원이 부족합니다");
      }
    }
    // 직업 3개
    else if (clickedCardId === 15) {
      if (userData[`user${farmData.turn}`].job.length === 3) {
        okaySend();
      } else {
        alert("직업이 3개여야 합니다");
      }
    }
    // 흙 5개 있는지만 확인
    else if (clickedCardId === 11) {
      if (userData[`user${farmData.turn}`].soil >= 5) {
        okaySend();
      } else {
        alert("흙 5개 필요");
      }
    }
    // 나무 1개, 흙 1개
    else if (clickedCardId === 16 || clickedCardId === 19) {
      if (
        userData[`user${farmData.turn}`].soil >= 1 &&
        userData[`user${farmData.turn}`].tree >= 1
      ) {
        const res = {
          tree: -1,
          soil: -1,
          reed: 0,
          charcoal: 0,
          sheep: 0,
          pig: 0,
          cow: 0,
          grain: 0,
          vegetable: 0,
          food: 0,
        };
        // notTurnHandler(res);
        alwaysActHandler2(res);
        // okaySend();
      } else {
        alert("자원이 부족합니다");
      }
    }
    // 나무 1개, 돌 1개
    else if (clickedCardId === 2) {
      if (
        userData[`user${farmData.turn}`].tree >= 1 &&
        userData[`user${farmData.turn}`].charcoal >= 1
      ) {
        const res = {
          tree: -1,
          soil: 0,
          reed: 0,
          charcoal: -1,
          sheep: 0,
          pig: 0,
          cow: 0,
          grain: 0,
          vegetable: 0,
          food: 0,
        };
        // notTurnHandler(res);
        alwaysActHandler2(res);
        // okaySend();
      } else {
        alert("자원이 부족합니다");
      }
    }
    // 곡식 1개
    else if (clickedCardId === 8) {
      if (userData[`user${farmData.turn}`].grain >= 1) {
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
          food: 0,
        };
        // notTurnHandler(res);
        alwaysActHandler2(res);
        // okaySend();
      } else {
        alert("자원이 부족합니다");
      }
    }
    // 갈대 1개
    else if (clickedCardId === 21) {
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
          food: 0,
        };
        // notTurnHandler(res);
        alwaysActHandler2(res);
        // okaySend();
      } else {
        alert("자원이 부족합니다");
      }
    }
    // 갈대 1개
    else if (clickedCardId === 22) {
      if (userData[`user${farmData.turn}`].sheep >= 1) {
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
          food: 0,
        };
        // notTurnHandler(res);
        alwaysActHandler2(res);
        // okaySend();
      } else {
        alert("자원이 부족합니다");
      }
    }
    // 흙 2개, 음식 2개
    else if (clickedCardId === 7) {
      if (
        userData[`user${farmData.turn}`].food >= 2 &&
        userData[`user${farmData.turn}`].soil >= 2
      ) {
        const res = {
          tree: 0,
          soil: -2,
          reed: 0,
          charcoal: 0,
          sheep: 0,
          pig: 0,
          cow: 0,
          grain: 0,
          vegetable: 0,
          food: -2,
        };
        // notTurnHandler(res);
        alwaysActHandler2(res);
        // okaySend();
      } else {
        alert("자원이 부족합니다");
      }
    } else {
      okaySend();
      setIsVisible(false);
      setIsMainVisible(false);
      setIsSub(false);
      setIsMain(false);
    }
  };

  function okaySend() {
    sendingClient.current.send(
      "/main-board/card/update",
      {},
      JSON.stringify({
        messageType: "CARD",
        roomId: farmData.roomId,
        round: farmData.round,
        action: farmData.action,
        currentTurn: (farmData.currentTurn + 1) % 4,
        farmer_count: farmData.farmer_count,
        cardType: "SUB",
        cardIndex: clickedCardId,
      })
    );
  }

  return (
    <div className={styles.container}>
      {/* 그냥 카드창 띄울때 */}
      {!isSub && (
        <button className={styles.close} onClick={closeModal}>
          X
        </button>
      )}
      {/* 회합장소나 설비를 갔지만 가져오지 않았을 때 턴만 넘겨주는  */}
      {isSub && (
        <button className={styles.close} onClick={closeModal2}>
          X
        </button>
      )}

      {isSub && (
        <button className={styles.close2} onClick={sendSubCard}>
          보내기
        </button>
      )}
      {isJob && (
        <button className={styles.close2} onClick={sendJobCard}>
          보내기
        </button>
      )}
      {subSulbi[0][1] &&
        (isSub ? (
          <img
            src={require("../asset/sub/s" + `${subSulbi[0][0]}` + ".png")}
            className={styles.sub1}
            style={{
              border:
                clickedIndex === 0 ? "4px solid red" : " 4px solid #ffffff",
            }}
            onClick={() => subCardHandler(0, subSulbi[0][0])}
          />
        ) : (
          <img
            src={require("../asset/sub/s" + `${subSulbi[0][0]}` + ".png")}
            className={styles.sub1}
          />
        ))}
      {subSulbi[1][1] &&
        (isSub ? (
          <img
            src={require("../asset/sub/s" + `${subSulbi[1][0]}` + ".png")}
            className={styles.sub2}
            onClick={() => subCardHandler(1, subSulbi[1][0])}
            style={{
              border:
                clickedIndex === 1 ? "4px solid red" : " 4px solid #ffffff",
            }}
          />
        ) : (
          <img
            src={require("../asset/sub/s" + `${subSulbi[1][0]}` + ".png")}
            className={styles.sub2}
          />
        ))}
      {subSulbi[2][1] &&
        (isSub ? (
          <img
            src={require("../asset/sub/s" + `${subSulbi[2][0]}` + ".png")}
            className={styles.sub3}
            onClick={() => subCardHandler(2, subSulbi[2][0])}
            style={{
              border:
                clickedIndex === 2 ? "4px solid red" : " 4px solid #ffffff",
            }}
          />
        ) : (
          <img
            src={require("../asset/sub/s" + `${subSulbi[2][0]}` + ".png")}
            className={styles.sub3}
          />
        ))}
      {subSulbi[3][1] &&
        (isSub ? (
          <img
            src={require("../asset/sub/s" + `${subSulbi[3][0]}` + ".png")}
            className={styles.sub4}
            onClick={() => subCardHandler(3, subSulbi[3][0])}
            style={{
              border:
                clickedIndex === 3 ? "4px solid red" : " 4px solid #ffffff",
            }}
          />
        ) : (
          <img
            src={require("../asset/sub/s" + `${subSulbi[3][0]}` + ".png")}
            className={styles.sub4}
          />
        ))}
      {subSulbi[4][1] &&
        (isSub ? (
          <img
            src={require("../asset/sub/s" + `${subSulbi[4][0]}` + ".png")}
            className={styles.sub5}
            onClick={() => subCardHandler(4, subSulbi[4][0])}
            style={{
              border:
                clickedIndex === 4 ? "4px solid red" : " 4px solid #ffffff",
            }}
          />
        ) : (
          <img
            src={require("../asset/sub/s" + `${subSulbi[4][0]}` + ".png")}
            className={styles.sub5}
          />
        ))}
      {subSulbi[5][1] &&
        (isSub ? (
          <img
            src={require("../asset/sub/s" + `${subSulbi[5][0]}` + ".png")}
            className={styles.sub6}
            onClick={() => subCardHandler(5, subSulbi[5][0])}
            style={{
              border:
                clickedIndex === 5 ? "4px solid red" : " 4px solid #ffffff",
            }}
          />
        ) : (
          <img
            src={require("../asset/sub/s" + `${subSulbi[5][0]}` + ".png")}
            className={styles.sub6}
          />
        ))}
      {subSulbi[6][1] &&
        (isSub ? (
          <img
            src={require("../asset/sub/s" + `${subSulbi[6][0]}` + ".png")}
            className={styles.sub7}
            onClick={() => subCardHandler(6, subSulbi[6][0])}
            style={{
              border:
                clickedIndex === 6 ? "4px solid red" : " 4px solid #ffffff",
            }}
          />
        ) : (
          <img
            src={require("../asset/sub/s" + `${subSulbi[6][0]}` + ".png")}
            className={styles.sub7}
          />
        ))}
      {jobCard[0][1] &&
        (isJob ? (
          <img
            src={require("../asset/job/j" + `${jobCard[0][0]}` + ".png")}
            className={styles.job1}
            onClick={() => jobCardHandler(0, jobCard[0][0])}
            style={{
              border:
                clickedIndex === 0 ? "4px solid red" : " 4px solid #ffffff",
            }}
          />
        ) : (
          <img
            src={require("../asset/job/j" + `${jobCard[0][0]}` + ".png")}
            className={styles.job1}
          />
        ))}
      {jobCard[1][1] &&
        (isJob ? (
          <img
            src={require("../asset/job/j" + `${jobCard[1][0]}` + ".png")}
            className={styles.job2}
            onClick={() => jobCardHandler(1, jobCard[1][0])}
            style={{
              border:
                clickedIndex === 1 ? "4px solid red" : " 4px solid #ffffff",
            }}
          />
        ) : (
          <img
            src={require("../asset/job/j" + `${jobCard[1][0]}` + ".png")}
            className={styles.job2}
          />
        ))}
      {jobCard[2][1] &&
        (isJob ? (
          <img
            src={require("../asset/job/j" + `${jobCard[2][0]}` + ".png")}
            className={styles.job3}
            onClick={() => jobCardHandler(2, jobCard[2][0])}
            style={{
              border:
                clickedIndex === 2 ? "4px solid red" : " 4px solid #ffffff",
            }}
          />
        ) : (
          <img
            src={require("../asset/job/j" + `${jobCard[2][0]}` + ".png")}
            className={styles.job3}
          />
        ))}
      {jobCard[3][1] &&
        (isJob ? (
          <img
            src={require("../asset/job/j" + `${jobCard[3][0]}` + ".png")}
            className={styles.job4}
            onClick={() => jobCardHandler(3, jobCard[3][0])}
            style={{
              border:
                clickedIndex === 3 ? "4px solid red" : " 4px solid #ffffff",
            }}
          />
        ) : (
          <img
            src={require("../asset/job/j" + `${jobCard[3][0]}` + ".png")}
            className={styles.job4}
          />
        ))}
      {jobCard[4][1] &&
        (isJob ? (
          <img
            src={require("../asset/job/j" + `${jobCard[4][0]}` + ".png")}
            className={styles.job5}
            onClick={() => jobCardHandler(4, jobCard[4][0])}
            style={{
              border:
                clickedIndex === 4 ? "4px solid red" : " 4px solid #ffffff",
            }}
          />
        ) : (
          <img
            src={require("../asset/job/j" + `${jobCard[4][0]}` + ".png")}
            className={styles.job5}
          />
        ))}
      {jobCard[5][1] &&
        (isJob ? (
          <img
            src={require("../asset/job/j" + `${jobCard[5][0]}` + ".png")}
            className={styles.job6}
            onClick={() => jobCardHandler(5, jobCard[5][0])}
            style={{
              border:
                clickedIndex === 5 ? "4px solid red" : " 4px solid #ffffff",
            }}
          />
        ) : (
          <img
            src={require("../asset/job/j" + `${jobCard[5][0]}` + ".png")}
            className={styles.job6}
          />
        ))}
      {jobCard[6][1] &&
        (isJob ? (
          <img
            src={require("../asset/job/j" + `${jobCard[6][0]}` + ".png")}
            className={styles.job7}
            onClick={() => jobCardHandler(6, jobCard[6][0])}
            style={{
              border:
                clickedIndex === 6 ? "4px solid red" : " 4px solid #ffffff",
            }}
          />
        ) : (
          <img
            src={require("../asset/job/j" + `${jobCard[6][0]}` + ".png")}
            className={styles.job7}
          />
        ))}
    </div>
  );
}

export default SubModal;
