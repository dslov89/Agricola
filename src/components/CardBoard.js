import { useContext, useEffect, useState } from "react";
import styles from "./CardBoard.module.css";
import { DataContext } from "../store/data-context";
import { UserContext } from "../store/user-context";

function CardBoard({ userId }) {
  const { farmData, setFarmData } = useContext(DataContext);
  const { userData, setUserData } = useContext(UserContext);

  const mainCardList = userData[`user${userId}`].main;
  const jobCardList = userData[`user${userId}`].job;
  const subCardList = userData[`user${userId}`].sub;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        {mainCardList.map((imageName, index) => (
          <img
            key={index}
            src={require("../asset/main/main" + `${imageName + 1}.png`)} // 이미지 파일의 경로와 파일 이름
            className={styles.main}
          />
        ))}
      </div>
      <div>
        {jobCardList.map((imageName, index) => (
          <img
            key={index}
            src={require("../asset/job/j" + `${imageName}.png`)} // 이미지 파일의 경로와 파일 이름
            className={styles.sub}
          />
        ))}
      </div>
      <div>
        {subCardList.map((imageName, index) => (
          <img
            key={index}
            src={require("../asset/sub/s" + `${imageName}.png`)} // 이미지 파일의 경로와 파일 이름
            className={styles.sub}
          />
        ))}
      </div>
    </div>
  );
}

export default CardBoard;
