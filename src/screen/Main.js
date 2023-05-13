import "./Main.css";

import ActionBoard from "../components/ActionBoard";
import Users from "../components/Users";

import Farms from "../components/Farms";
import { useState } from "react";

function Main() {
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
  return (
    <div className="backGround">
      <div className="backGround2">
        <div className="header">
          <h1 className="headerText">Agricola with AGORA </h1>
        </div>
        <div className="board">
          {/*  행동 판*/}
          <ActionBoard data={data} setData={setData} />
          {/* 유저 정보판 */}
          <Users data={data} setData={setData} />
        </div>
        <Farms />
        {/* </div> */}
      </div>
    </div>
  );
}

export default Main;
