import { useContext, useEffect, useState } from "react";
import styles from "./CardBoard.module.css";
import { DataContext } from "../store/data-context";

function CardBoard() {
  const { farmData, setFarmData } = useContext(DataContext);
  const [main1, setMain1] = useState(10);
  //   const job = [
  //     [1, 0],
  //     [2, 1],
  //     [3, 0],
  //   ];
  //   const sub = [
  //     [1, 0],
  //     [2, 1],
  //     [3, 0],
  //   ];
  //   const main = [
  //     [1, 0],
  //     [2, 1],
  //     [3, 0],
  //   ];

  useEffect(() => {
    setMain1(farmData.main[0]);
    console.log(farmData.main[0]);
  }, [farmData.main]);
  return (
    <div>
      <div>
        {main1 !== 10 && (
          <img
            //   src={require("../asset/sub/s" + `${subSulbi[0].id}` + ".png")}
            // src={require("../asset/main/main" + `${main1}` + ".png")}
            src={require("../asset/main/main1.png")}
            className={styles.main}
          />
        )}
        <img
          //   src={require("../asset/sub/s" + `${subSulbi[0].id}` + ".png")}
          src={require("../asset/main/main1.png")}
          className={styles.main}
        />
      </div>
      <div>
        <img
          //   src={require("../asset/sub/s" + `${subSulbi[0].id}` + ".png")}
          src={require("../asset/main/main1.png")}
          className={styles.main}
        />
        <img
          //   src={require("../asset/sub/s" + `${subSulbi[0].id}` + ".png")}
          src={require("../asset/main/main1.png")}
          className={styles.main}
        />
      </div>
    </div>
  );
}

export default CardBoard;
