import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import home from "../../imgs/Home.png";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const img = new Image();
    img.src = home;
    img.onload = () => {
      setIsLoading(false);
    };
    return () => {
      img.onload = null;
    };
  }, [home]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <div className={styles.content}>
            <span className={styles.tagline}>EDUCATION SOLUTION</span>
            <h2 className={styles.title}>
              Best Kindergarten <br />
              <span className={styles.highlight}>Awesome Solution</span>
            </h2>
            <p className={styles.description}>
              Lorem Ipsum is simply dummy text of the printing typesetting
              industry. Lorem Ipsum has been.
            </p>
            <Link to="/chooseCard">
              <button className={styles.button}>Let`s start</button>
            </Link>
            <Link to="/changePassword">
              <button className={`${styles.button} ${styles.change}`}>
                Change Password
              </button>
            </Link>
          </div>
          <div className={styles.imageContainer}>
            <img
              className={styles.image}
              src={home}
              alt="Kindergarten illustration"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
