import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "../Number/DisplayNumberPage.module.css";
import Loading from "../../Loading/Loading";
import Error from "../../Error/Error";
import Slider from "../../Slide/Slider";

const DisplayAnimalPage = () => {
  const { animal } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const location = useLocation();
  const animals = location.state?.animals || [];

  useEffect(() => {
    const fetchAnimalsExamples = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          `http://127.0.0.1:8000/api/examples-animal/${animal}/`,
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
        setError(`Failed to fetch example number, ${error.message}`);
      }
    };

    fetchAnimalsExamples();
  }, []);

  const goToQuiz = () => {
    navigate(`/animal/${animal}/quiz`, { state: { animals } });
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
          <h2 className={styles.title}>{data.name}</h2>

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

export default DisplayAnimalPage;
