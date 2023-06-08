import styles from "./ScoreBoard.module.css";
import scoreBoard from "../asset/scoreboard.PNG";

function scoreboard({ setIsVisible }) {
  const closeBoard = () => {
    setIsVisible(false);
  };
    return (
      <div className={styles.container}>
        <img src={scoreBoard} />
        <button className={styles.close} onClick={closeBoard}>
          X
        </button>
      </div>
    );
  
}
export default scoreboard;
