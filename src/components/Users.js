import { useState } from "react";
import "../screen/Main.css";
import UserBoard from "./UserBoard";

function Users({ data, setData }) {
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
