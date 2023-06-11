import { createContext, useState } from "react";

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [userData, setUserData] = useState({
    user1: {
      name: "User 1",
      tree: 15,
      soil: 15,
      reed: 15,
      charcoal: 15,
      sheep: 15,
      pig: 15,
      cow: 15,
      grain: 10,
      vegetable: 0,
      food: 0,
      farmer: 2,
      fence: 15,

      house: 15,
      main: [], // 내려놓은 카드들

      job: [],
      sub: [],
      farm_array: [
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "wood_room",
        "empty",
        "empty",
        "empty",
        "empty",
        "wood_room",
        "empty",
        "empty",
        "empty",
        "empty",
      ],
      farm_fence_array: [
        [0, 0, 0, 0, 0, 0], // 0번째줄 가로
        [0, 0, 0, 0, 0, 0], // 1번째줄 세로
        [0, 0, 0, 0, 0, 0], // 2번째줄 가로
        [0, 0, 0, 0, 0, 0], // 3번째줄 세로
        [0, 0, 0, 0, 0, 0], // 4번째줄 가로
        [0, 0, 0, 0, 0, 0], // 5번째줄
        [0, 0, 0, 0, 0, 0],
      ], // 6번째줄
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
      fence: 15,
      house: 15,
      main: [], // 내려놓은 카드들
      job: [],
      sub: [],
      farm_array: [
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "wood_room",
        "empty",
        "empty",
        "empty",
        "empty",
        "wood_room",
        "empty",
        "empty",
        "empty",
        "empty",
      ],
      farm_fence_array: [
        [0, 0, 0, 0, 0, 0], // 0번째줄 가로
        [0, 0, 0, 0, 0, 0], // 1번째줄 세로
        [0, 0, 0, 0, 0, 0], // 2번째줄 가로
        [0, 0, 0, 0, 0, 0], // 3번째줄 세로
        [0, 0, 0, 0, 0, 0], // 4번째줄 가로
        [0, 0, 0, 0, 0, 0], // 5번째줄
        [0, 0, 0, 0, 0, 0],
      ], // 6번째줄
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
      fence: 15,
      house: 15,
      main: [], // 내려놓은 카드들
      job: [],
      sub: [],
      farm_array: [
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "wood_room",
        "empty",
        "empty",
        "empty",
        "empty",
        "wood_room",
        "empty",
        "empty",
        "empty",
        "empty",
      ],
      farm_fence_array: [
        [0, 0, 0, 0, 0, 0], // 0번째줄 가로
        [0, 0, 0, 0, 0, 0], // 1번째줄 세로
        [0, 0, 0, 0, 0, 0], // 2번째줄 가로
        [0, 0, 0, 0, 0, 0], // 3번째줄 세로
        [0, 0, 0, 0, 0, 0], // 4번째줄 가로
        [0, 0, 0, 0, 0, 0], // 5번째줄
        [0, 0, 0, 0, 0, 0],
      ], // 6번째줄
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
      fence: 15,
      house: 15,
      main: [], // 내려놓은 카드들
      job: [],
      sub: [],
      farm_array: [
        "empty",
        "empty",
        "empty",
        "empty",
        "empty",
        "wood_room",
        "empty",
        "empty",
        "empty",
        "empty",
        "wood_room",
        "empty",
        "empty",
        "empty",
        "empty",
      ],
      farm_fence_array: [
        [0, 0, 0, 0, 0, 0], // 0번째줄 가로
        [0, 0, 0, 0, 0, 0], // 1번째줄 세로
        [0, 0, 0, 0, 0, 0], // 2번째줄 가로
        [0, 0, 0, 0, 0, 0], // 3번째줄 세로
        [0, 0, 0, 0, 0, 0], // 4번째줄 가로
        [0, 0, 0, 0, 0, 0], // 5번째줄
        [0, 0, 0, 0, 0, 0],
      ], // 6번째줄
    },
  });

  const values = {
    userData,
    setUserData,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
