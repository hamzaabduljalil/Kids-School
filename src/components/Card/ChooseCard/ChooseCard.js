import React from "react";
import Box from "./Box";
import styles from "./ChooseCard.module.css";
import { Link, Outlet } from "react-router-dom";
import { faA, faListOl, faHorse } from "@fortawesome/free-solid-svg-icons";
const ChooseCard = () => {
  return (
    <div className={styles.container}>
      <Link to="/Letters">
        <Box
          title={"Letters"}
          text={
            " Lorem Ipsum is simply dummy text of the printing typesetting industry."
          }
          icon={faA}
          button={"go to the Letters"}
        />
      </Link>
      <Link to="/Number">
        <Box
          title={"Number"}
          text={
            " Lorem Ipsum is simply dummy text of the printing typesetting industry."
          }
          icon={faListOl}
          button={"go to the Number"}
        />
      </Link>
      <Link to="/Animals">
        <Box
          title={"Animals"}
          text={
            " Lorem Ipsum is simply dummy text of the printing typesetting industry."
          }
          icon={faHorse}
          button={"go to the Animals"}
        />
      </Link>
    </div>
  );
};

export default ChooseCard;
