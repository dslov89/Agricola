import { useContext, useEffect, useState } from "react";
import styles from "./CardBoard.module.css";
import { DataContext } from "../store/data-context";
import { UserContext } from "../store/user-context";
import { sendingClient } from "./GameRoomBoard";

function CardBoard({ userId }) {
  const { farmData, setFarmData } = useContext(DataContext);
  const { userData, setUserData } = useContext(UserContext);
  const { updateFarmerCount, updateFarmData, updateAction, updateAlways } =
    useContext(DataContext);
  const mainCardList = userData[`user${userId}`].main;
  const jobCardList = userData[`user${userId}`].job;
  const subCardList = userData[`user${userId}`].sub;
  const alwaysActHandler = async (res) => {
    // 턴 안넘기고 자원갱신만 하는 함수
    await updateAlways(farmData.turn); // 누른 놈 제외 갱신
    const farmer_cnt = farmData.farmer_count;
    farmer_cnt[(farmData.currentTurn + 3) % 4] -= 1;
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
      alwaysActHandler(res);
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
      alwaysActHandler(res);
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

  function soilKilnHandler() {
    // 메인설비 06.흙가마
    if (userData[`user${farmData.turn}`].grain > 0) {
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
        food: 5,
      };
      alwaysActHandler(res);
    } else {
      alert("보유한 자원이 부족합니다.");
    }
  }

  function charcoalKilnHandler() {
    // 메인설비 07.돌가마
    if (userData[`user${farmData.turn}`].grain > 0) {
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
        food: 4,
      };
      alwaysActHandler(res);
    } else {
      alert("보유한 자원이 부족합니다.");
    }
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
  const btn1 = {
    position: "absolute",
    bottom: "110px",
    right: "30px",
    fontSize: "0.8em",
  };

  const btn2 = {
    position: "absolute",
    bottom: "90px",
    right: "30px",
    fontSize: "0.8em",
  };

  const btn3 = {
    position: "absolute",
    bottom: "70px",
    right: "30px",
    fontSize: "0.8em",
  };

  const btn4 = {
    position: "absolute",
    bottom: "50px",
    right: "30px",
    fontSize: "0.8em",
  };

  const ImageWithButton = ({
    src,
    onClick1,
    onClick2,
    onClick3,
    onClick4,
    btn1,
    btn2,
    btn3,
    btn4,
    title1,
    title2,
    title3,
    title4,
  }) => (
    <div style={{ position: "relative", display: "inline-block" }}>
      <img src={src} className={styles.main} style={{ maxWidth: "100%" }} />
      <button style={btn1} onClick={onClick1}>
        {title1}
      </button>
      <button style={btn2} onClick={onClick2}>
        {title2}
      </button>
      <button style={btn3} onClick={onClick3}>
        {title3}
      </button>
      <button style={btn4} onClick={onClick4}>
        {title4}
      </button>
    </div>
  );

  const OneButton = ({ src, onClick1, btn1, title1 }) => (
    <div style={{ position: "relative", display: "inline-block" }}>
      <img src={src} className={styles.main} style={{ maxWidth: "100%" }} />
      <button style={btn1} onClick={onClick1}>
        {title1}
      </button>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        {mainCardList.map((imageName, index) => {
          const src = require("../asset/main/main" + `${imageName + 1}.png`); // Image file path and filename
          if (imageName === 0) {
            return (
              // <div
              //   key={index}
              //   style={{ position: "relative", display: "inline-block" }}

              // >
              //   <img
              //     src={src}
              //     className={styles.main}
              //     style={{ maxWidth: "100%" }}
              //   />
              //   <button
              //     style={{
              //       position: "absolute",
              //       bottom: "110px",
              //       right: "30px",
              //       fontSize: "0.8em",
              //     }}
              //     onClick={hwaroVegetableHandler}
              //   >
              //     야채
              //   </button>
              // </div>
              <ImageWithButton
                key={index}
                src={src}
                onClick1={hwaroVegetableHandler}
                btn1={btn1}
                title1="야채"
                onClick2={hwaroSheepHandler}
                btn2={btn2}
                title2="양"
                onClick3={hwaroPigHandler}
                btn3={btn3}
                title3="돼지"
                onClick4={hwaroCowHandler}
                btn4={btn4}
                title4="소"
              />
            );
          } else if (imageName === 1) {
            return (
              <ImageWithButton
                key={index}
                src={src}
                onClick1={hwaroVegetableHandler}
                btn1={btn1}
                title1="야채"
                onClick2={hwaroSheepHandler}
                btn2={btn2}
                title2="양"
                onClick3={hwaroPigHandler}
                btn3={btn3}
                title3="돼지"
                onClick4={hwaroCowHandler}
                btn4={btn4}
                title4="소"
              />
            );
          } else if (imageName === 2) {
            return (
              <ImageWithButton
                key={index}
                src={src}
                onClick1={hwaduckVegetableHandler}
                btn1={btn1}
                title1="야채"
                onClick2={hwaduckSheepHandler}
                btn2={btn2}
                title2="양"
                onClick3={hwaduckPigHandler}
                btn3={btn3}
                title3="돼지"
                onClick4={hwaduckCowHandler}
                btn4={btn4}
                title4="소"
              />
            );
          } else if (imageName === 3) {
            return (
              <ImageWithButton
                key={index}
                src={src}
                onClick1={hwaduckVegetableHandler}
                btn1={btn1}
                title1="야채"
                onClick2={hwaduckSheepHandler}
                btn2={btn2}
                title2="양"
                onClick3={hwaduckPigHandler}
                btn3={btn3}
                title3="돼지"
                onClick4={hwaduckCowHandler}
                btn4={btn4}
                title4="소"
              />
            );
          } else if (imageName === 4) {
            return (
              <OneButton
                key={index}
                src={src}
                onClick1={WellHandler}
                btn1={btn1}
                title1="우물"
              />
            );
          } else if (imageName === 5) {
            return (
              <div
                key={index}
                style={{ position: "relative", display: "inline-block" }}
              >
                <img
                  src={src}
                  className={styles.main}
                  style={{ maxWidth: "100%" }}
                />
              </div>
            );
          } else if (imageName === 6) {
            return (
              <div
                key={index}
                style={{ position: "relative", display: "inline-block" }}
              >
                <img
                  src={src}
                  className={styles.main}
                  style={{ maxWidth: "100%" }}
                />
              </div>
            );
          } else if (imageName === 7) {
            return (
              <OneButton
                key={index}
                src={src}
                onClick1={furnitureHandler}
                btn1={btn1}
                title1="가구 제작소"
              />
            );
          } else if (imageName === 8) {
            return (
              <OneButton
                key={index}
                src={src}
                onClick1={bowlHandler}
                btn1={btn1}
                title1="그릇 제작소"
              />
            );
          } else if (imageName === 9) {
            return (
              <OneButton
                key={index}
                src={src}
                onClick1={basketHandler}
                btn1={btn1}
                title1="바구니 제작소"
              />
            );
          }
        })}
      </div>

      <div>
        {jobCardList.map((imageName, index) => (
          <img
            key={index}
            src={require("../asset/job/j" + `${imageName}.png`)} // 이미지 파일의 경로와 파일 이름
            className={styles.sub}
          />
        ))}
      </div>
      <div>
        {subCardList.map((imageName, index) => (
          <img
            key={index}
            src={require("../asset/sub/s" + `${imageName}.png`)} // 이미지 파일의 경로와 파일 이름
            className={styles.sub}
          />
        ))}
      </div>
    </div>
  );
}

export default CardBoard;
