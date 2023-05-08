import { ReactComponent as Farm } from "../asset/farm.svg";

import "./Main.css";
import UserBoard from "../components/UserBoard";
import ActionBoard from "../components/ActionBoard";

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
          <div className="userContainer">
            <UserBoard />
            <UserBoard />
            <UserBoard />
            <UserBoard />
          </div>
        </div>
        <div className="farmContainer">
          <div>
            <Farm />
            <Farm />
          </div>
          <div className="farm">
            <Farm />
            <Farm />
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Main;
