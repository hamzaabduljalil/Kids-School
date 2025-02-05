import React, { useMemo } from "react";
import styles from "../Number/DisplayNumber.module.css";

const DisplayAnimal = ({ lastFinishedAnimal, animal }) => {
  const isDisabled = useMemo(() => {
    return lastFinishedAnimal === null || lastFinishedAnimal < animal.id;
  }, [lastFinishedAnimal, animal.id]);
  return (
    <button
      className={`${styles.box} ${styles["box_animal"]} ${
        !isDisabled ? styles.active : ""
      }`}
      disabled={isDisabled}
    >
      <p className={styles.number}>{animal.animal}</p>
    </button>
  );
};

export default DisplayAnimal;
