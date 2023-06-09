import { createContext, useState } from "react";

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [userData, setUserData] = useState({
    user1: {
      name: "User 1",
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
      farmer: 2,
      fence: 0,
      house: 0,
      main: [1], // 내려놓은 카드들
      job: [],
      sub: [],
    },
    user2: {
      name: "User 2",
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
      farmer: 2,
      fence: 0,
      house: 0,
      main: [], // 내려놓은 카드들
      job: [],
      sub: [],
    },
    user3: {
      name: "User 3",
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
      farmer: 2,
      fence: 0,
      house: 0,
      main: [], // 내려놓은 카드들
      job: [],
      sub: [],
    },
    user4: {
      name: "User 4",
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
      farmer: 2,
      fence: 0,
      house: 0,
      main: [], // 내려놓은 카드들
      job: [],
      sub: [],
    },
  });

  const values = {
    userData,
    setUserData,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
