import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DisplayLettersPage.module.css";
import Loading from "../../Loading/Loading";
import Error from "../../Error/Error";
import Slider from "../../Slide/Slider";

const DisplayLettersPage = () => {
  const { letter } = useParams();
  const Lett = letter.charCodeAt() - 96;
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLettersExamples = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          `http://127.0.0.1:8000/api/examples-letter/${Lett}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            setError("Data not found!");
            return;
          }
          throw new Error(
            `HTTP Error: ${response.status} ${response.statusText}`
          );
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError("Failed to fetch example number");
        console.error("Failed to fetch example number:", error.message);
      }
    };

    fetchLettersExamples();
  }, [Lett]);

  const goToQuiz = () => {
    navigate(`/letter/${letter}/quiz`);
  };

  if (error) {
    return <Error errMsg={error} />;
  }

  return (
    <>
      {!data ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <h2 className={styles.title}>Letter: {letter.toUpperCase()}</h2>
          <h4 className={styles.subtitle}>
            <span>Example:</span> {data.name}
          </h4>

          <Slider
            slides={[
              {
                content: (
                  <div className={styles.slide}>
                    <img
                      src={data.image}
                      alt={data.name}
                      className={styles.image}
                    />
                  </div>
                ),
              },
              {
                content: (
                  <div className={styles.slide}>
                    <audio src={data.sound} controls className={styles.audio} />
                  </div>
                ),
              },
              {
                content: (
                  <div className={styles.slide}>
                    <button className={styles.button} onClick={goToQuiz}>
                      Take a Quiz
                    </button>
                  </div>
                ),
              },
            ]}
          />
        </div>
      )}
    </>
  );
};

export default DisplayLettersPage;
