import { useContext, useEffect } from "react";
import mainsulbi from "../asset/mainsulbi.png";
import styles from "./MainModal.module.css";
import { DataContext } from "../store/data-context";
import { sendingClient } from "./GameRoomBoard";

function MainModal({ setIsVisible, isMain, setIsMain }) {
  const { farmData, setFarmData } = useContext(DataContext);
  const closeModal = () => {
    setIsVisible(false);
  };
  const mainSulbi = farmData.main;

  function mainHandler(index) {
    // updateSubCard(index);
    const updatedMain = [...farmData.main]; // action 배열을 복사합니다.

    updatedMain[index] = 0;
    setFarmData((prevFarmData) => ({
      ...prevFarmData,
      main: updatedMain, // 업데이트된 action 배열을 설정합니다.
    }));

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
        cardType: "MAIN",
        cardIndex: index,
      })
    );
    setIsMain(false);
  }

  return (
    <div className={styles.container}>
      <img src={mainsulbi} />
      <button className={styles.close} onClick={closeModal}>
        X
      </button>
      {mainSulbi[0] &&
        (isMain ? (
          <img
            src={require("../asset/main/main1.png")}
            className={styles.main1}
            onClick={() => mainHandler(0)}
          />
        ) : (
          <img
            src={require("../asset/main/main1.png")}
            className={styles.main1}
          />
        ))}
      {mainSulbi[1] &&
        (isMain ? (
          <img
            src={require("../asset/main/main2.png")}
            className={styles.main2}
            onClick={() => mainHandler(1)}
          />
        ) : (
          <img
            src={require("../asset/main/main2.png")}
            className={styles.main2}
          />
        ))}
      {mainSulbi[2] &&
        (isMain ? (
          <img
            src={require("../asset/main/main3.png")}
            className={styles.main3}
            onClick={() => mainHandler(2)}
          />
        ) : (
          <img
            src={require("../asset/main/main3.png")}
            className={styles.main3}
          />
        ))}
      {mainSulbi[3] &&
        (isMain ? (
          <img
            src={require("../asset/main/main4.png")}
            className={styles.main4}
            onClick={() => mainHandler(3)}
          />
        ) : (
          <img
            src={require("../asset/main/main4.png")}
            className={styles.main4}
          />
        ))}
      {mainSulbi[4] &&
        (isMain ? (
          <img
            src={require("../asset/main/main5.png")}
            className={styles.main5}
            onClick={() => mainHandler(4)}
          />
        ) : (
          <img
            src={require("../asset/main/main5.png")}
            className={styles.main5}
          />
        ))}
      {mainSulbi[5] &&
        (isMain ? (
          <img
            src={require("../asset/main/main6.png")}
            className={styles.main6}
            onClick={() => mainHandler(5)}
          />
        ) : (
          <img
            src={require("../asset/main/main6.png")}
            className={styles.main6}
          />
        ))}
      {mainSulbi[6] &&
        (isMain ? (
          <img
            src={require("../asset/main/main7.png")}
            className={styles.main7}
            onClick={() => mainHandler(6)}
          />
        ) : (
          <img
            src={require("../asset/main/main7.png")}
            className={styles.main7}
          />
        ))}
      {mainSulbi[7] &&
        (isMain ? (
          <img
            src={require("../asset/main/main8.png")}
            className={styles.main8}
            onClick={() => mainHandler(7)}
          />
        ) : (
          <img
            src={require("../asset/main/main8.png")}
            className={styles.main8}
          />
        ))}
      {mainSulbi[8] &&
        (isMain ? (
          <img
            src={require("../asset/main/main9.png")}
            className={styles.main9}
            onClick={() => mainHandler(8)}
          />
        ) : (
          <img
            src={require("../asset/main/main9.png")}
            className={styles.main9}
          />
        ))}
      {mainSulbi[9] &&
        (isMain ? (
          <img
            src={require("../asset/main/main10.png")}
            className={styles.main10}
            onClick={() => mainHandler(9)}
          />
        ) : (
          <img
            src={require("../asset/main/main10.png")}
            className={styles.main10}
          />
        ))}
    </div>
  );
}

export default MainModal;
