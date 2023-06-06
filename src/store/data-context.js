import { createContext, useState } from "react";

export const DataContext = createContext();

function DataContextProvider({ children }) {
  const [farmData, setFarmData] = useState({
    messageType: "",
    roomId: 0,
    round: 0,
    currentTurn: 5,
    farmer_count: [],
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

    jobCards: [],
    subCards: [],
    main: [],
  });

  const updateFarmerCount = (index) => {
    setFarmData((prevFarmData) => {
      const updatedFarmerCount = [...prevFarmData.farmer_count];
      updatedFarmerCount[index] = prevFarmData.farmer_count[index] - 1;
      return { ...prevFarmData, farmer_count: updatedFarmerCount };
    });
  };

  const updateFarmData = () => {
    // if (
    //   farmData.farmer_count.filter((count) => count === 1).length === 1 &&
    //   farmData.farmer_count.filter((count) => count === 0).length === 3
    // ) {
    if (
      // farmData.farmer_count.filter((count) => count === 1).length === 1 &&
      farmData.farmer_count.filter((count) => count === 0).length === 4
    ) {
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
        if (index === 1) {
          if (item[0] === 0) {
            return [item[0], item[1] + 2];
          }
        }
        if (index === 3 || index === 12) {
          if (item[0] === 0) {
            return [item[0], item[1] + 3];
          }
        }

        return [0, item[1]];
      });

      setFarmData((prevFarmData) => ({
        ...prevFarmData,
        round: prevFarmData.round + 1,
        farmer_count: [2, 2, 2, 2],
        action: modifiedFarmData,
      }));

      updateFarmerCount((farmData.turn - 1) % 4);
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

  const values = {
    farmData,
    setFarmData,
    updateFarmerCount,
    updateFarmData,
    updateAction,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
}

export default DataContextProvider;
