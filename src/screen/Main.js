import "./Main.css";
import ActionBoard from "../components/ActionBoard";
import Users from "../components/Users";
import Farms from "../components/Farms";
import { useState } from "react";

function Main() {
  const [data, setData] = useState({
    name: "User 1",
    tree: 10,
    clay: 10,
    rock: 10,
    reed: 6,
    seed: 0,
    vegetable: 0,
    food: 0,
    sheep: 0,
    pig: 0,
    cow: 0,
    person: 0,
    fence: 0,
    house: 0,

    round_array: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    player_array: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    farm: ['empty','empty','empty','empty','empty',
          'wood_room','empty','empty','empty','empty',
          'wood_room','empty','empty','empty','empty'],
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
        <Farms data={data} setData={setData} />
        {/* </div> */}
      </div>
    </div>
  );
}

export default Main;
