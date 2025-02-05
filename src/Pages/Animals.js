import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DisplayAnimal from "../components/Card/Animals/DisplayAnimal";
import styles from "./Page.module.css";
import Error from "../components/Error/Error";
import Loading from "../components/Loading/Loading";

const Animals = () => {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);
  const [lastFinishedAnimal, setLastFinishedAnimal] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const memoizedFetchLetters = useMemo(() => {
    const fetchLetters = async () => {
      if (isFetched) return;
      setIsLoading(true);

      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch("http://127.0.0.1:8000/api/Animal/", {
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
        setAnimals(data);
        setIsFetched(true);
        setIsLoading(false);
      } catch (error) {
        setErrMsg(`Failed to fetch animals. Please try again later.`);
        console.error("Failed to fetch animals:", error.message);
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
        if (data.last_finished_animal !== undefined) {
          setLastFinishedAnimal(data.last_finished_animal);
        }
      } catch (error) {
        console.error("Failed to fetch user progress:", error.message);
      }
    };

    fetchUserProgress();
  }, []);
  const handleClick = (animal) => {
    navigate(`/animal/${animal.id}`, { state: { animals } });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={`${styles.container} ${styles["container_animal"]}`}>
          {errMsg && <Error errMsg={errMsg} />}
          {animals.map((animal) => (
            <div key={animal.id} onClick={() => handleClick(animal)}>
              <DisplayAnimal
                animal={animal}
                lastFinishedAnimal={lastFinishedAnimal}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Animals;
