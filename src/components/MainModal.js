import { useContext, useEffect, useState } from "react";
import mainsulbi from "../asset/mainsulbi.png";
import styles from "./MainModal.module.css";
import { DataContext } from "../store/data-context";
import { sendingClient } from "./GameRoomBoard";
import { UserContext } from "../store/user-context";

function MainModal({ setIsVisible, isVisible, isMain, setIsMain, setIsSub }) {
  const { farmData, setFarmData, updateAlways } = useContext(DataContext);
  const { userData, setUserData } = useContext(UserContext);
  const closeModal = () => {
    setIsVisible(false);
  };
  const mainSulbi = farmData.main;
  const [clickedIndex, setClickedIndex] = useState(null);

  function mainHandler(index) {
    setClickedIndex(index);
  }

  const sendCard = () => {
    // 자원 체크
    if (checkResource()) {
      console.log("카드 메시지 보내기 전");
      setTimeout(() => {
        sendCardMessage();
      }, 300);
      console.log("카드 메시지 보내기 후");
    }
  };

  const checkResource = () => {
    let canSend = false;
    // 주요 설비 각 조건들
    switch (clickedIndex) {
      case 0:
        if (userData[`user${farmData.turn}`].soil < 3) {
          alert("check your resource");
        } else {
          sendResourceMessage([["soil", 3]]);
          canSend = true;
        }
        break;
      case 1:
        if (userData[`user${farmData.turn}`].soil < 3) {
          alert("check your resource");
        } else {
          sendResourceMessage([["soil", 3]]);
          canSend = true;
        }
        break;
      case 2:
        if (userData[`user${farmData.turn}`].soil < 4) {
          alert("check your resource");
        } else {
          sendResourceMessage([["soil", 4]]);
          canSend = true;
        }
        break;
      case 3:
        if (userData[`user${farmData.turn}`].soil < 5) {
          alert("check your resource");
        } else {
          sendResourceMessage([["soil", 5]]);
          canSend = true;
        }
        break;
      case 4:
        if (
          userData[`user${farmData.turn}`].tree < 1 ||
          userData[`user${farmData.turn}`].charcoal < 3
        ) {
          alert("check your resource");
        } else {
          sendResourceMessage([
            ["tree", 3],
            ["charcoal", 3],
          ]);
          canSend = true;
        }
        break;
      case 5:
        if (
          userData[`user${farmData.turn}`].soil < 3 ||
          userData[`user${farmData.turn}`].charcoal < 1
        ) {
          alert("check your resource");
        } else {
          if(window.confirm("빵굽기를 하시겠습니까?"))
          {
            console.log("굽죠 뭐");
            sendResourceMessage([
              ["food", -5],
              ["grain", 1],
              ["soil", 3],
              ["charcoal", 1],
            ]);
          } else {
            console.log("안 구워요")
            sendResourceMessage([
              ["soil", 3],
              ["charcoal", 1],
            ]);
          }
          canSend = true;

        }
        break;
      case 6:
        if (
          userData[`user${farmData.turn}`].soil < 1 ||
          userData[`user${farmData.turn}`].charcoal < 3
        ) {
          alert("check your resource");
        } else {
          if(window.confirm("빵굽기를 하시겠습니까?"))
          {
            console.log("굽죠 뭐");
            sendResourceMessage([
              ["food", -4],
              ["grain", 1],
              ["charcoal", 3],
              ["soil", 1],
            ]);
          } else {
            console.log("안 구워요")
            sendResourceMessage([
              ["charcoal", 3],
              ["soil", 1],
            ]);
          }
          canSend = true;
      
        }
        break;
      case 7:
        if (
          userData[`user${farmData.turn}`].tree < 2 ||
          userData[`user${farmData.turn}`].charcoal < 2
        ) {
          alert("check your resource");
        } else {
          sendResourceMessage([
            ["tree", 2],
            ["charcoal", 2],
          ]);
          canSend = true;
        }
        break;
      case 8:
        if (
          userData[`user${farmData.turn}`].soil < 2 ||
          userData[`user${farmData.turn}`].charcoal < 2
        ) {
          alert("check your resource");
        } else {
          sendResourceMessage([
            ["soil", 2],
            ["charcoal", 2],
          ]);
          canSend = true;
        }
        break;
      case 9:
        if (
          userData[`user${farmData.turn}`].reed < 2 ||
          userData[`user${farmData.turn}`].charcoal < 2
        ) {
          alert("check your resource");
        } else {
          sendResourceMessage([
            ["reed", 2],
            ["charcoal", 2],
          ]);
          canSend = true;
        }
        break;
    }
    if (canSend) {
      return true;
    }
  };
  const sendResourceMessage = (resources) => {
    updateAlways(farmData.turn);
    //턴 안바뀌게 보내야함
    let message = {
      messageType: "RESOURCE",
      roomId: farmData.roomId,
      round: farmData.round,
      action: farmData.action,
      currentTurn: farmData.currentTurn % 4,
      farmer_count: farmData.farmer_count,
      tree: farmData.tree,
      soil: farmData.soil,
      reed: farmData.reed,
      charcoal: farmData.charcoal,
      sheep: farmData.sheep,
      pig: farmData.pig,
      cow: farmData.cow,
      grain: farmData.grain,
      vegetable: farmData.vegetable,
      food: farmData.food,
    };
    //배열로 들어온 자원들(카드 조건) 뺀거 update

    for (let i = 0; i < resources.length; i++) {
      message[resources[i][0]] += -resources[i][1];
    }
    //카드 조건 확인

    //send
    sendingClient.current.send(
      "/main-board/resource/update",
      {},
      JSON.stringify(message)
    );
    if (farmData.action[20][1] === farmData.turn) {
      // 누른 사람은 갱신이 안되어있으므로 따로 갱신해줌
      setUserData((prevUserData) => ({
        ...prevUserData,
        [`user${farmData.turn}`]: {
          ...prevUserData[`user${farmData.turn}`],
          tree: prevUserData[`user${farmData.turn}`].tree + message.tree,
          soil: prevUserData[`user${farmData.turn}`].soil + message.soil,
          reed: prevUserData[`user${farmData.turn}`].reed + message.reed,
          charcoal:
            prevUserData[`user${farmData.turn}`].charcoal + message.charcoal,
          sheep: prevUserData[`user${farmData.turn}`].sheep + message.sheep,
          pig: prevUserData[`user${farmData.turn}`].pig + message.pig,
          cow: prevUserData[`user${farmData.turn}`].cow + message.cow,
          grain: prevUserData[`user${farmData.turn}`].grain + message.grain,
          vegetable:
            prevUserData[`user${farmData.turn}`].vegetable + message.vegetable,
          food: prevUserData[`user${farmData.turn}`].food + message.food,
        },
      }));
    }
  };
  const sendCardMessage = () => {
    setTimeout(1000);
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
  const checkJobCard = (resoure, count) => {
    //숙련 벽돌공
    if (
      resoure == "charcoal" &&
      userData[`user${farmData.turn}`].job.includes(5)
    ) {
      let house_count = 0;
      for (
        let i = 0;
        i < userData[`user${farmData.turn}`].farm_array.length;
        i++
      ) {
        let building_type = userData[`user${farmData.turn}`].farm_array[i];

        if (
          building_type == "wood_room" ||
          building_type == "soil_room" ||
          building_type == "rock_room"
        ) {
          house_count = house_count + 1;
        }
      }
      return count - house_count + 2 >= 0 ? count - house_count + 2 : 0;
    } else {
      return count;
    }
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
          main1.includes(index) ||
          main2.includes(index) ||
          main3.includes(index) ||
          main4.includes(index)
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
