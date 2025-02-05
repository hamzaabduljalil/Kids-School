import React from "react";
import styles from "./Box.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Box = (props) => {
  return (
    <div className={styles.box}>
      <FontAwesomeIcon icon={props.icon} className={styles.icon} />
      <p className={styles.text}> {props.text}</p>
      <button className={styles.button}>{props.button}</button>
    </div>
  );
};

export default Box;
