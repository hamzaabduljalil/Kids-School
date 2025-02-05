import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DisplayNumber from "../components/Card/Number/DisplayNumber";
import styles from "./Page.module.css";
import Loading from "../components/Loading/Loading";
import Error from "../components/Error/Error";
const Number = () => {
  const navigate = useNavigate();
  const [lastFinishedNumber, setLastFinishedNumber] = useState(null);
  const [numbers, setNumbers] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const memoizedFetchNumbers = useMemo(() => {
    const fetchNumbers = async () => {
      if (isFetched) return;
      setIsLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch("http://127.0.0.1:8000/api/Number/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        setNumbers(data.map((item) => item.number));
        setIsFetched(true);
        setIsLoading(false);
      } catch (error) {
        setErrMsg(`Failed to fetch numbers. Please try again later.`);

        console.error("Failed to fetch numbers:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    return fetchNumbers;
  }, [isFetched]);

  useEffect(() => {
    memoizedFetchNumbers();
  }, [memoizedFetchNumbers]);

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          "http://127.0.0.1:8000/api/user-progress/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        if (data.last_finished_number !== undefined) {
          setLastFinishedNumber(data.last_finished_number);
        }
      } catch (error) {
        console.error("Failed to fetch user progress:", error.message);
      }
    };

    fetchUserProgress();
  }, []);

  const handleClick = (number) => {
    navigate(`/number/${number}`);
  };
  useEffect(() => {
    setErrMsg("");
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          {errMsg && <Error errMsg={errMsg} />}
          {numbers.map((num) => (
            <div key={num} onClick={() => handleClick(num)}>
              <DisplayNumber
                number={num}
                lastFinishedNumber={lastFinishedNumber}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Number;
