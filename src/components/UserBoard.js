import "./UserBoard.css";
import { ReactComponent as User } from "../asset/user.svg";

function UserBoard() {
  return (
    <div className="text">
      {/* user정보 판 이미지 */}
      <User className="user" />
      {/* userName */}
      <h2 className="userName">User 1</h2>
      {/* 첫번쨰줄 자원 개수 */}
      <h2 className="tree tree1">0</h2>
      <h2 className="tree tree2">0</h2>
      <h2 className="tree tree3">0</h2>
      <h2 className="tree tree4">0</h2>
      {/* 두번쨰줄 자원 개수 */}
      <h2 className="tree5 tree1">0</h2>
      <h2 className="tree5 tree2">0</h2>
      <h2 className="tree5 tree3">0</h2>
      {/* 세번쨰줄 자원 개수 */}
      <h2 className="tree6 tree1">0</h2>
      <h2 className="tree6 tree2">0</h2>
      <h2 className="tree6 tree3">0</h2>
      {/* 네번쨰줄 자원 개수 */}
      <h2 className="tree7 ">0</h2>
      <h2 className="tree8 ">0</h2>
      <h2 className="tree9 ">0</h2>
    </div>
  );
}

export default UserBoard;
