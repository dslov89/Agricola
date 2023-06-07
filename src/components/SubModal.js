import styles from "./SubModal.module.css";

function SubModal({ setIsVisible, subSulbi, jobCard }) {
  const closeModal = () => {
    setIsVisible(false);
  };
  console.log(subSulbi[0]);

  return (
    <div className={styles.container}>
      <button className={styles.close} onClick={closeModal}>
        X
      </button>
      {subSulbi[0][1] && (
        <img
          src={require("../asset/sub/s" + `${subSulbi[0][0]}` + ".png")}
          className={styles.sub1}
        />
      )}
      {subSulbi[1][1] && (
        <img
          src={require("../asset/sub/s" + `${subSulbi[1][0]}` + ".png")}
          className={styles.sub2}
        />
      )}
      {subSulbi[2][1] && (
        <img
          src={require("../asset/sub/s" + `${subSulbi[2][0]}` + ".png")}
          className={styles.sub3}
        />
      )}
      {subSulbi[3][1] && (
        <img
          src={require("../asset/sub/s" + `${subSulbi[3][0]}` + ".png")}
          className={styles.sub4}
        />
      )}
      {subSulbi[4][1] && (
        <img
          src={require("../asset/sub/s" + `${subSulbi[4][0]}` + ".png")}
          className={styles.sub5}
        />
      )}
      {subSulbi[5][1] && (
        <img
          src={require("../asset/sub/s" + `${subSulbi[5][0]}` + ".png")}
          className={styles.sub6}
        />
      )}
      {subSulbi[6][1] && (
        <img
          src={require("../asset/sub/s" + `${subSulbi[6][0]}` + ".png")}
          className={styles.sub7}
        />
      )}
      {jobCard[0][1] && (
        <img
          src={require("../asset/job/j" + `${jobCard[0][0]}` + ".png")}
          className={styles.job1}
        />
      )}
      {jobCard[1][1] && (
        <img
          src={require("../asset/job/j" + `${jobCard[1][0]}` + ".png")}
          className={styles.job2}
        />
      )}
      {jobCard[2][1] && (
        <img
          src={require("../asset/job/j" + `${jobCard[2][0]}` + ".png")}
          className={styles.job3}
        />
      )}
      {jobCard[3][1] && (
        <img
          src={require("../asset/job/j" + `${jobCard[3][0]}` + ".png")}
          className={styles.job4}
        />
      )}
      {jobCard[4][1] && (
        <img
          src={require("../asset/job/j" + `${jobCard[4][0]}` + ".png")}
          className={styles.job5}
        />
      )}
      {jobCard[5][1] && (
        <img
          src={require("../asset/job/j" + `${jobCard[5][0]}` + ".png")}
          className={styles.job6}
          // onClick={() => console.log("hi")}
        />
      )}
      {jobCard[6][1] && (
        <img
          src={require("../asset/job/j" + `${jobCard[6][0]}` + ".png")}
          className={styles.job7}
        />
      )}
    </div>
  );
}

export default SubModal;
