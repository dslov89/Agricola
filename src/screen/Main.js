import "./Main.css";
import ActionBoard from "../components/ActionBoard";
import Users from "../components/Users";
import Farms from "../components/Farms";
import { useState } from "react";
import CardBoard from "../components/CardBoard";

function Main() {
  const [data, setData] = useState({
    name: ["User 1", "User 2", "User 3", "User 4"],
    tree: 20,
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

    round_array: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    player_array: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],

    farm: [
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

    farm_fence: [
      [0, 0, 0, 0, 0, 0], // 0번째줄 가로
      [0, 0, 0, 0, 0, 0], // 1번째줄 세로
      [0, 0, 0, 0, 0, 0], // 2번째줄 가로
      [0, 0, 0, 0, 0, 0], // 3번째줄 세로
      [0, 0, 0, 0, 0, 0], // 4번째줄 가로
      [0, 0, 0, 0, 0, 0], // 5번째줄
      [0, 0, 0, 0, 0, 0],
    ], // 6번째줄
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
        {/* <div style={{ flexDirection: "column" }}> */}
        <div>
          <Farms data={data} setData={setData} />
        </div>
        <div style={{ position: "relative" }}>
          <h1 style={{ position: "absolute", top: "0px", zIndex: 99 }}>
            ㅗㅑㅗㅑ
          </h1>
          <Farms data={data} setData={setData} />
        </div>
        <Farms data={data} setData={setData} />
        <Farms data={data} setData={setData} />
        {/* <Farms data={data} setData={setData} />
        <Farms data={data} setData={setData} />
        <Farms data={data} setData={setData} /> */}
        {/* <CardBoard /> */}
        {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default Main;
