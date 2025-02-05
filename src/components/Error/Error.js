import React from "react";
import styles from "./Error.module.css";
const Error = (props) => {
  return (
    <div className={styles.div}>
      <span className={styles.span}>{props.errMsg}</span>
    </div>
  );
};

export default Error;
