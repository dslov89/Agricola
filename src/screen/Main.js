import "./Main.css";

import ActionBoard from "../components/ActionBoard";
import Users from "../components/Users";

import Farms from "../components/Farms";

function Main() {
  return (
    <div className="backGround">
      <div className="backGround2">
        <div className="header">
          <h1 className="headerText">Agricola with AGORA </h1>
        </div>
        <div className="board">
          {/*  행동 판*/}
          <ActionBoard />
          {/* 유저 정보판 */}
          <Users />
        </div>
        <Farms />
        {/* </div> */}
      </div>
    </div>
  );
}

export default Main;
