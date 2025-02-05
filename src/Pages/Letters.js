import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DisplayLetter from "../components/Card/Letter/DisplayLetters";
import styles from "./Page.module.css";
import Error from "../components/Error/Error";
import Loading from "../components/Loading/Loading";

const Letters = () => {
  const navigate = useNavigate();
  const [letters, setLetters] = useState([]);
  const [lastFinishedLetter, setLastFinishedLetter] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const memoizedFetchLetters = useMemo(() => {
    const fetchLetters = async () => {
      if (isFetched) return;
      setIsLoading(true);

      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch("http://127.0.0.1:8000/api/letters/", {
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
        setLetters(data.map((item) => item.letter));
        setIsFetched(true);
        setIsLoading(false);
      } catch (error) {
        setErrMsg(`Failed to fetch Letters. Please try again later.`);

        console.error("Failed to fetch letters:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    return fetchLetters;
  }, [isFetched]);

  useEffect(() => {
    memoizedFetchLetters();
  }, [memoizedFetchLetters]);

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
        if (data.last_finished_letter !== undefined) {
          setLastFinishedLetter(data.last_finished_letter);
        }
      } catch (error) {
        console.error("Failed to fetch user progress:", error.message);
      }
    };

    fetchUserProgress();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, []);

  const handleClick = (letter) => {
    navigate(`/letter/${letter.toLowerCase()}`);
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          {errMsg && <Error errMsg={errMsg} />}
          {letters.map((letter) => (
            <div key={letter} onClick={() => handleClick(letter)}>
              <DisplayLetter
                letters={letter}
                lastFinishedLetter={lastFinishedLetter}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Letters;
