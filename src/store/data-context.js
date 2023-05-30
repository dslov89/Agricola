import { createContext, useState } from "react";

export const DataContext = createContext();

function DataContextProvider({ children }) {
  const [farmData, setFarmData] = useState({
    roomId: 0,
    round: 0,
    currentTurn: 0,
    userId: 0,
    action: [],
    user1: [],
    user2: [],
    user3: [],
    user4: [],
    job: [],
    sub: [],
    main: [],
  });

  const values = { farmData, setFarmData };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
}

export default DataContextProvider;
