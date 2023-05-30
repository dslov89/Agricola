import "./UserBoard.css";
import { ReactComponent as User } from "../asset/user.svg";

function UserBoard({ data }) {
  return (
    <div className="text">
      {/* user정보 판 이미지 */}
      <User className="user" />
      {/* userName */}
      <h2 className="userName">{data.name[0]}</h2>
      {/* 첫번쨰줄 자원 개수 */}
      <h2 className="tree tree1">{data.tree}</h2>
      <h2 className="tree tree2">{data.clay}</h2>
      <h2 className="tree tree3">{data.rock}</h2>
      <h2 className="tree tree4">{data.reed}</h2>
      {/* 두번쨰줄 자원 개수 */}
      <h2 className="tree5 tree1">{data.seed}</h2>
      <h2 className="tree5 tree2">{data.vegetable}</h2>
      <h2 className="tree5 tree3">{data.food}</h2>
      {/* 세번쨰줄 자원 개수 */}
      <h2 className="tree6 tree1">{data.sheep}</h2>
      <h2 className="tree6 tree2">{data.pig}</h2>
      <h2 className="tree6 tree3">{data.cow}</h2>
      {/* 네번쨰줄 자원 개수 */}
      <h2 className="tree7 ">{data.person}</h2>
      <h2 className="tree8 ">{data.fence}</h2>
      <h2 className="tree9 ">{data.house}</h2>
    </div>
  );
}

export default UserBoard;
