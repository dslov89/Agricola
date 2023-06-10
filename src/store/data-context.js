import { createContext, useState } from "react";

export const DataContext = createContext();

function DataContextProvider({ children }) {
  const [farmData, setFarmData] = useState({
    messageType: "",
    roomId: 0,
    round: 1,
    currentTurn: 5,
    farmer_count: [2, 2, 2, 2],
    turn: 0,
    action: [
      [0, 1],
      [0, 2],
      [0, 0],
      [0, 2],
      [0, 0],

      [0, 1],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],

      [0, 0],
      [0, 0],
      [0, 3],
      [0, 1],
      [0, 1],

      [0, 1],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 1],

      [0, 0],
      [0, 0], //가족부양
      [0, 0], //작물뿌려주기
      
    ],

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
    farmer: 0,
    fence: 0,
    house: 0,

    jobCards: [[]],
    subCards: [[]],
    main: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  });

  const updateFarmerCount = (index) => {
    setFarmData((prevFarmData) => {
      const updatedFarmerCount = [...prevFarmData.farmer_count];
      updatedFarmerCount[index] = prevFarmData.farmer_count[index] - 1;
      return { ...prevFarmData, farmer_count: updatedFarmerCount };
    });
  };

  // 갱신
  const updateFarmData = () => {
    if (farmData.farmer_count.filter((count) => count === 0).length === 4) {
      const modifiedFarmData = farmData.action.map((item, index) => {
        if (
          index === 0 ||
          index === 5 ||
          index === 13 ||
          index === 14 ||
          index === 15 ||
          index === 17
        ) {
          if (item[0] === 0) {
            return [item[0], item[1] + 1];
          }
        }
        if (index === 1 || index === 3) {
          if (item[0] === 0) {
            return [item[0], item[1] + 2];
          }
        }

        if (index === 12) {
          if (item[0] === 0) {
            return [item[0], item[1] + 3];
          }
        }

        return [0, item[1]];
      });
      let currentTurn = farmData.currentTurn;
      if (farmData.action[7][0] !== 0) {
        currentTurn = farmData.action[7][0] % 4;
      }

      setFarmData((prevFarmData) => ({
        ...prevFarmData,
        round: prevFarmData.round + 1,
        farmer_count: [2, 2, 2, 2],
        action: modifiedFarmData,
        currentTurn: currentTurn,
      }));

      updateFarmerCount((farmData.currentTurn + 3) % 4);
    }
  };

  const updateAction = async (index, count) => {
    const updatedAction = [...farmData.action]; // action 배열을 복사합니다.
    updatedAction[index][0] = farmData.turn; // 첫 번째 인덱스의 첫 번째 요소를 1로 변경합니다.
    updatedAction[index][1] = count;
    await setFarmData((prevFarmData) => ({
      ...prevFarmData,
      action: updatedAction, // 업데이트된 action 배열을 설정합니다.
    }));
  };

  const updateJobCard = (index) => {
    const updatedCard = [...farmData.jobCards]; // action 배열을 복사합니다.

    updatedCard[index][1] = 0;
    setFarmData((prevFarmData) => ({
      ...prevFarmData,
      jobCards: updatedCard, // 업데이트된 action 배열을 설정합니다.
    }));
  };

  const updateSubCard = (index) => {
    const updatedCard = [...farmData.subCards]; // action 배열을 복사합니다.

    updatedCard[index][1] = 0;
    setFarmData((prevFarmData) => ({
      ...prevFarmData,
      subCards: updatedCard, // 업데이트된 action 배열을 설정합니다.
    }));
  };
  const updateAlways = async (id) => {
    const updatedAlways = [...farmData.action];
    updatedAlways[20][1] = id;
    updatedAlways[20][0] += 1; // 배열 변경함
    console.log("업뎃하니까 갱신해주세요");
    await setFarmData((prevFarmData) => ({
      ...prevFarmData,
      action: updatedAlways,
    }));
  };

  const values = {
    farmData,
    setFarmData,
    updateFarmerCount,
    updateFarmData,
    updateAction,
    updateJobCard,
    updateSubCard,
    updateAlways,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
}

export default DataContextProvider;
