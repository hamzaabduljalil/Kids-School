import React, { useMemo } from "react";
import styles from "./DisplayNumber.module.css";

const DisplayNumber = React.memo(({ number, lastFinishedNumber }) => {
  const isDisabled = useMemo(() => {
    return lastFinishedNumber === null || lastFinishedNumber < number;
  }, [lastFinishedNumber, number]);

  return (
    <button
      className={`${styles.box} ${!isDisabled ? styles.active : ""}`}
      disabled={isDisabled}
    >
      <p className={styles.number}>{number}</p>
    </button>
  );
});

export default DisplayNumber;
