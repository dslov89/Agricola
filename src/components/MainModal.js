import { useContext, useEffect, useState } from "react";
import mainsulbi from "../asset/mainsulbi.png";
import styles from "./MainModal.module.css";
import { DataContext } from "../store/data-context";
import { sendingClient } from "./GameRoomBoard";
import { UserContext } from "../store/user-context";

function MainModal({ setIsVisible, isVisible, isMain, setIsMain, setIsSub }) {
  const { farmData, setFarmData } = useContext(DataContext);
  const { userData, setUserData } = useContext(UserContext);
  const closeModal = () => {
    setIsVisible(false);
  };
  const mainSulbi = farmData.main;
  const [clickedIndex, setClickedIndex] = useState(null);

  function mainHandler(index) {
    setClickedIndex(index);
    // // updateSubCard(index);
    // const updatedMain = [...farmData.main]; // action 배열을 복사합니다.

    // updatedMain[index] = 0;
    // setFarmData((prevFarmData) => ({
    //   ...prevFarmData,
    //   main: updatedMain, // 업데이트된 action 배열을 설정합니다.
    // }));
  }

  const sendCard = () => {
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
        cardIndex: clickedIndex,
      })
    );
    setIsMain(false);
    setIsSub(false);
    setIsVisible(false);
  };

  useEffect(() => {
    myCardCheck();
  }, [farmData.currentTurn, farmData.action]);

  function myCardCheck() {
    setFarmData((prevFarmData) => {
      // 원래 배열 - 초기화된
      const notUpdatedMainCards = [...prevFarmData.main];
      // 내가 가진 카드
      const main1 = userData.user1.main;
      const main2 = userData.user2.main;
      const main3 = userData.user3.main;
      const main4 = userData.user4.main;

      const updatedMainCards = notUpdatedMainCards.map((value, index) => {
        if (
          main1.includes(index + 1) ||
          main2.includes(index + 1) ||
          main3.includes(index + 1) ||
          main4.includes(index + 1)
        ) {
          return 0;
        } else {
          return value;
        }
      });

      return {
        ...prevFarmData,
        main: updatedMainCards,
      };
    });
  }

  return (
    <div className={styles.container}>
      <img src={mainsulbi} />
      <button className={styles.close} onClick={closeModal}>
        X
      </button>
      {isMain && <button onClick={sendCard}>보내기</button>}
      {mainSulbi[0] &&
        (isMain ? (
          <img
            src={require("../asset/main/main1.png")}
            className={styles.main1}
            onClick={() => mainHandler(0)}
            style={{
              border: clickedIndex === 0 ? "4px solid red" : "0px solid black",
            }}
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
            style={{
              border: clickedIndex === 1 ? "4px solid red" : "0px solid black",
            }}
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
            style={{
              border: clickedIndex === 2 ? "4px solid red" : "0px solid black",
            }}
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
            style={{
              border: clickedIndex === 3 ? "4px solid red" : "0px solid black",
            }}
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
            style={{
              border: clickedIndex === 4 ? "4px solid red" : "0px solid black",
            }}
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
            style={{
              border: clickedIndex === 5 ? "4px solid red" : "0px solid black",
            }}
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
            style={{
              border: clickedIndex === 6 ? "4px solid red" : "0px solid black",
            }}
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
            style={{
              border: clickedIndex === 7 ? "4px solid red" : "0px solid black",
            }}
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
            style={{
              border: clickedIndex === 8 ? "4px solid red" : "0px solid black",
            }}
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
            style={{
              border: clickedIndex === 9 ? "4px solid red" : "0px solid black",
            }}
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
