import styles from "./Begging.css";
import Begging from "../asset/begging.PNG";

function begging() {
  return (
    <div className={styles.container}>
      <img src={Begging} />
    </div>
  );
}
export default begging;