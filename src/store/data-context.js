import { createContext, useState } from "react";

export const DataContext = createContext();

function DataContextProvider({ children }) {
  const [farmData, setFarmData] = useState({
    messageType: "",
    roomId: 0,
    round: 0,
    currentTurn: 0,
    farmer_count: [],
    turn: 0,
    action: [[]],
    user1: [],
    user2: [],
    user3: [],
    user4: [],
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
    if (
      farmData.farmer_count.filter((count) => count === 1).length === 1 &&
      farmData.farmer_count.filter((count) => count === 0).length === 3
    ) {
      setFarmData((prevFarmData) => ({
        ...prevFarmData,
        round: prevFarmData.round + 1,
        farmer_count: [2, 2, 2, 2],
      }));
    }
  };

  const updateAction = async (index, count) => {
    const updatedAction = [...farmData.action]; // action 배열을 복사합니다.
    updatedAction[index][0] = 1; // 첫 번째 인덱스의 첫 번째 요소를 1로 변경합니다.
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
