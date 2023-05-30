import mainsulbi from "../asset/mainsulbi.png";
import styles from "./MainModal.module.css";

function MainModal({ setIsVisible, mainSulbi }) {
  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <div className={styles.container}>
      <img src={mainsulbi} />
      <button className={styles.close} onClick={closeModal}>
        X
      </button>
      {mainSulbi[0] && (
        <img
          src={require("../asset/main/main1.png")}
          className={styles.main1}
        />
      )}
      {mainSulbi[1] && (
        <img
          src={require("../asset/main/main2.png")}
          className={styles.main2}
        />
      )}
      {mainSulbi[2] && (
        <img
          src={require("../asset/main/main3.png")}
          className={styles.main3}
        />
      )}
      {mainSulbi[3] && (
        <img
          src={require("../asset/main/main4.png")}
          className={styles.main4}
        />
      )}
      {mainSulbi[4] && (
        <img
          src={require("../asset/main/main5.png")}
          className={styles.main5}
        />
      )}
      {mainSulbi[5] && (
        <img
          src={require("../asset/main/main6.png")}
          className={styles.main6}
        />
      )}
      {mainSulbi[6] && (
        <img
          src={require("../asset/main/main7.png")}
          className={styles.main7}
        />
      )}
      {mainSulbi[7] && (
        <img
          src={require("../asset/main/main8.png")}
          className={styles.main8}
        />
      )}
      {mainSulbi[8] && (
        <img
          src={require("../asset/main/main9.png")}
          className={styles.main9}
        />
      )}
      {mainSulbi[9] && (
        <img
          src={require("../asset/main/main10.png")}
          className={styles.main10}
        />
      )}
    </div>
  );
}

export default MainModal;