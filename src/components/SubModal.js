import styles from "./SubModal.module.css";
import { nameValue, sendingClient } from "../screen/Start";
import { useContext, useEffect } from "react";
import { DataContext } from "../store/data-context";
import { UserContext } from "../store/user-context";

function SubModal({
  setIsVisible,
  subSulbi,
  jobCard,
  isSub,
  isJob,
  setIsJob,
  setIsSub,
}) {
  const {
    farmData,
    setFarmData,
    updateFarmerCount,
    updateFarmData,
    updateAction,
    updateSubCard,
    updateJobCard,
  } = useContext(DataContext);

  const { userData, setUserData } = useContext(UserContext);

  const closeModal = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    console.log(farmData.jobCards);
    myCardCheck();
  }, [farmData.currentTurn]);

  function myCardCheck() {
    setFarmData((prevFarmData) => {
      // 원래 배열 - 초기화된
      const notUpdatedJobCards = [...prevFarmData.jobCards];
      // 내가 가진 카드
      const myjob = userData[`user${farmData.turn}`].job;

      console.log(myjob);

      const updatedJobCards = notUpdatedJobCards.map((innerArray) => {
        if (myjob.includes(innerArray[0])) {
          innerArray[1] = 0;
        }
        return innerArray;
      });

      console.log(updatedJobCards);

      return { ...prevFarmData, jobCards: updatedJobCards };
    });
  }

  function jobCardHandler(index, cardId) {
    updateJobCard(index);
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
        cardIndex: cardId,
      })
    );
    setIsJob(false);
  }

  function subCardHandler(index, cardId) {
    updateSubCard(index);
    console.log(farmData.subCards);
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
        cardType: "SUB",
        cardIndex: cardId,
      })
    );
    setIsSub(false);
  }

  return (
    <div className={styles.container}>
      <button className={styles.close} onClick={closeModal}>
        X
      </button>
      {subSulbi[0][1] &&
        (isSub ? (
          <img
            src={require("../asset/sub/s" + `${subSulbi[0][0]}` + ".png")}
            className={styles.sub1}
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
