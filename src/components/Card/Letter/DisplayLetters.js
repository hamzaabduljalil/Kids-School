import React, { useMemo } from "react";
import styles from "../Number/DisplayNumber.module.css";

const DisplayLetter = (props) => {
  const { lastFinishedLetter, letters } = props;
  const isDisabled = useMemo(() => {
    return lastFinishedLetter === null || lastFinishedLetter < letters;
  }, [lastFinishedLetter, letters]);

  return (
    <button
      className={`${styles.box} ${!isDisabled ? styles.active : ""}`}
      disabled={isDisabled}
    >
      <p className={styles.number}>{letters}</p>
    </button>
  );
};

export default DisplayLetter;
