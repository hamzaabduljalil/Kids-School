import React from "react";
import styles from "../Number/DisplayNumber.module.css";
const DisplayVideo = (props) => {
  return (
    <button
      className={`${styles.box} ${styles["box_animal"]} ${styles.active}`}
    >
      <p className={styles.video}>{props.title}</p>
    </button>
  );
};

export default DisplayVideo;
