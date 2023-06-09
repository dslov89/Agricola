import { useContext, useEffect, useState } from "react";
import "../screen/Main.css";
import UserBoard from "./UserBoard";
import { DataContext } from "../store/data-context";
import { UserContext } from "../store/user-context";

function Users() {
  //   여기에서 user 정보 받아와서 data로 각 user 정보 넘겨주기
  const { farmData } = useContext(DataContext);
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    userDataUpdate();
    cardAddHandler();
    // farmerUpdate();
  }, [farmData.currentTurn]);

  useEffect(() => {
    if (farmData.food === -1 || farmData.food === -2) {
      userDataUpdate();
    }
  }, [farmData.food, farmData.messageType]);

  useEffect(() => {
    farmerUpdate();
  }, [farmData.round]);
  function cardAddHandler() {
    if (farmData.messageType === "CARD") {
      // if(farmData.currentTurn===(farmData.turn+1)%4){
      // }
      // 카드면 현재턴의 어딘가에 저장하기
      if (farmData.currentTurn === 1) {
        if (farmData.cardType === "MAIN") {
          setUserData((prevUserData) => ({
            ...prevUserData,
            user4: {
              ...prevUserData.user4,
              main: [...prevUserData.user4.main, farmData.cardIndex],
            },
          }));
        } else if (farmData.cardType === "JOB") {
          setUserData((prevUserData) => ({
            ...prevUserData,
            user4: {
              ...prevUserData.user4,
              job: [...prevUserData.user4.job, farmData.cardIndex],
            },
          }));
        } else {
          setUserData((prevUserData) => ({
            ...prevUserData,
            user4: {
              ...prevUserData.user4,
              sub: [...prevUserData.user4.sub, farmData.cardIndex],
            },
          }));
        }
      } else if (farmData.currentTurn === 2) {
        if (farmData.cardType === "MAIN") {
          setUserData((prevUserData) => ({
            ...prevUserData,
            user1: {
              ...prevUserData.user1,
              main: [...prevUserData.user1.main, farmData.cardIndex],
            },
          }));
        } else if (farmData.cardType === "JOB") {
          setUserData((prevUserData) => ({
            ...prevUserData,
            user1: {
              ...prevUserData.user1,
              job: [...prevUserData.user1.job, farmData.cardIndex],
            },
          }));
        } else {
          setUserData((prevUserData) => ({
            ...prevUserData,
            user1: {
              ...prevUserData.user1,
              sub: [...prevUserData.user1.sub, farmData.cardIndex],
            },
          }));
        }
      } else if (farmData.currentTurn === 3) {
        if (farmData.cardType === "MAIN") {
          setUserData((prevUserData) => ({
            ...prevUserData,
            user2: {
              ...prevUserData.user2,
              main: [...prevUserData.user2.main, farmData.cardIndex],
            },
          }));
        } else if (farmData.cardType === "JOB") {
          setUserData((prevUserData) => ({
            ...prevUserData,
            user2: {
              ...prevUserData.user2,
              job: [...prevUserData.user2.job, farmData.cardIndex],
            },
          }));
        } else {
          setUserData((prevUserData) => ({
            ...prevUserData,
            user2: {
              ...prevUserData.user2,
              sub: [...prevUserData.user2.sub, farmData.cardIndex],
            },
          }));
        }
      } else {
        if (farmData.cardType === "MAIN") {
          setUserData((prevUserData) => ({
            ...prevUserData,
            user3: {
              ...prevUserData.user3,
              main: [...prevUserData.user3.main, farmData.cardIndex],
            },
          }));
        } else if (farmData.cardType === "JOB") {
          setUserData((prevUserData) => ({
            ...prevUserData,
            user3: {
              ...prevUserData.user3,
              job: [...prevUserData.user3.job, farmData.cardIndex],
            },
          }));
        } else {
          setUserData((prevUserData) => ({
            ...prevUserData,
            user3: {
              ...prevUserData.user3,
              sub: [...prevUserData.user3.sub, farmData.cardIndex],
            },
          }));
        }
      }
    }
  }

  async function userDataUpdate() {
    const userId = farmData.currentTurn;

    if (userId === 0) {
      await setUserData((prevUserData) => ({
        ...prevUserData,
        user3: {
          ...prevUserData.user3,
          tree: prevUserData.user3.tree + farmData.tree,
          soil: prevUserData.user3.soil + farmData.soil,
          reed: prevUserData.user3.reed + farmData.reed,
          charcoal: prevUserData.user3.charcoal + farmData.charcoal,
          sheep: prevUserData.user3.sheep + farmData.sheep,
          pig: prevUserData.user3.pig + farmData.pig,
          cow: prevUserData.user3.cow + farmData.cow,
          grain: prevUserData.user3.grain + farmData.grain,
          vegetable: prevUserData.user3.vegetable + farmData.vegetable,
          food: prevUserData.user3.food + farmData.food,

          house: prevUserData.user3.house + farmData.house,
          farmer: farmData.farmer_count[2],
        },
      }));
    } else if (userId === 1) {
      await setUserData((prevUserData) => ({
        ...prevUserData,
        user4: {
          ...prevUserData.user4,
          tree: prevUserData.user4.tree + farmData.tree,
          soil: prevUserData.user4.soil + farmData.soil,
          reed: prevUserData.user4.reed + farmData.reed,
          charcoal: prevUserData.user4.charcoal + farmData.charcoal,
          sheep: prevUserData.user4.sheep + farmData.sheep,
          pig: prevUserData.user4.pig + farmData.pig,
          cow: prevUserData.user4.cow + farmData.cow,
          grain: prevUserData.user4.grain + farmData.grain,
          vegetable: prevUserData.user4.vegetable + farmData.vegetable,
          food: prevUserData.user4.food + farmData.food,

          house: prevUserData.user4.house + farmData.house,
          farmer: farmData.farmer_count[3],
        },
      }));
    } else if (userId === 2) {
      await setUserData((prevUserData) => ({
        ...prevUserData,
        user1: {
          ...prevUserData.user1,
          tree: prevUserData.user1.tree + farmData.tree,
          soil: prevUserData.user1.soil + farmData.soil,
          reed: prevUserData.user1.reed + farmData.reed,
          charcoal: prevUserData.user1.charcoal + farmData.charcoal,
          sheep: prevUserData.user1.sheep + farmData.sheep,
          pig: prevUserData.user1.pig + farmData.pig,
          cow: prevUserData.user1.cow + farmData.cow,
          grain: prevUserData.user1.grain + farmData.grain,
          vegetable: prevUserData.user1.vegetable + farmData.vegetable,
          food: prevUserData.user1.food + farmData.food,

          house: prevUserData.user1.house + farmData.house,
          farmer: farmData.farmer_count[0],
        },
      }));
    } else {
      await setUserData((prevUserData) => ({
        ...prevUserData,
        user2: {
          ...prevUserData.user2,
          tree: prevUserData.user2.tree + farmData.tree,
          soil: prevUserData.user2.soil + farmData.soil,
          reed: prevUserData.user2.reed + farmData.reed,
          charcoal: prevUserData.user2.charcoal + farmData.charcoal,
          sheep: prevUserData.user2.sheep + farmData.sheep,
          pig: prevUserData.user2.pig + farmData.pig,
          cow: prevUserData.user2.cow + farmData.cow,
          grain: prevUserData.user2.grain + farmData.grain,
          vegetable: prevUserData.user2.vegetable + farmData.vegetable,

          food: prevUserData.user2.food + farmData.food,
          house: prevUserData.user2.house + farmData.house,
          farmer: farmData.farmer_count[1],
        },
      }));
    }
  }

  function farmerUpdate() {
    setUserData((prev) => ({
      ...prev,
      user1: {
        ...prev.user1,
        farmer: 2,
      },
      user2: {
        ...prev.user2,
        farmer: 2,
      },
      user3: {
        ...prev.user3,
        farmer: 2,
      },
      user4: {
        ...prev.user4,
        farmer: 2,
      },
    }));
  }

  return (
    <div className="userContainer">
      <UserBoard data={userData.user1} />
      <UserBoard data={userData.user2} />
      <UserBoard data={userData.user3} />
      <UserBoard data={userData.user4} />
    </div>
  );
}

export default Users;
