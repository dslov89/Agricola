import { useState } from "react";
import "../screen/Main.css";
import UserBoard from "./UserBoard";

function Users() {
  const [data, setData] = useState({
    name: "User 1",
    tree: 0,
    clay: 0,
    rock: 0,
    reed: 0,
    seed: 0,
    vegetable: 0,
    food: 0,
    sheep: 0,
    pig: 0,
    cow: 0,
    person: 0,
    fence: 0,
    house: 0,
  });

  //   여기에서 user 정보 받아와서 data로 각 user 정보 넘겨주기

  return (
    <div className="userContainer">
      <UserBoard data={data} />
      <UserBoard data={data} />
      <UserBoard data={data} />
      <UserBoard data={data} />
    </div>
  );
}

export default Users;
