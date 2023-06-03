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
      farmer: 0,
      fence: 0,
      house: 0,
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
      farmer: 0,
      fence: 0,
      house: 0,
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
      farmer: 0,
      fence: 0,
      house: 0,
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
      farmer: 0,
      fence: 0,
      house: 0,
    },
  });

  const values = {
    userData,
    setUserData,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
