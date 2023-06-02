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

  const values = { farmData, setFarmData, updateFarmerCount };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
}

export default DataContextProvider;
