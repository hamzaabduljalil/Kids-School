import React from "react";
import styles from "./Page.module.css";
import DisplayVideo from "../components/Card/Video/DisplayVideo";
import { useNavigate } from "react-router-dom";
const Video = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(`/video/${path}`);
  };

  return (
    <>
      <div className={`${styles.container} ${styles["container_animal"]}`}>
        <div
          onClick={() => {
            handleClick("Letters");
          }}
        >
          <DisplayVideo title={"Letter"} />
        </div>
        <div
          onClick={() => {
            handleClick("Numbers");
          }}
        >
          <DisplayVideo title={"Number"} />
        </div>
        <div
          onClick={() => {
            handleClick("Animals");
          }}
        >
          <DisplayVideo title={"Animals"} />
        </div>
      </div>
    </>
  );
};

export default Video;
