import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./DisplayNumberPage.module.css";
import Loading from "../../Loading/Loading";
import Error from "../../Error/Error";
import Slider from "../../Slide/Slider";
const DisplayNumberPage = () => {
  const { number } = useParams();
  const Num = Number(number) + 1;
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  let NumberWriting;
  switch (+number) {
    case 0:
      NumberWriting = "Zero";
      break;
    case 1:
      NumberWriting = "One";
      break;
    case 2:
      NumberWriting = "Two";
      break;
    case 3:
      NumberWriting = "Three";
      break;
    case 4:
      NumberWriting = "Four";
      break;
    case 5:
      NumberWriting = "Five";
      break;
    case 6:
      NumberWriting = "Six";
      break;
    case 7:
      NumberWriting = "Seven";
      break;
    case 8:
      NumberWriting = "Eight";
      break;
    case 9:
      NumberWriting = "Nine";
      break;
    default:
      NumberWriting = "Number not supported";
      break;
  }

  useEffect(() => {
    const fetchNumberExamples = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          `http://127.0.0.1:8000/api/examples-number/${Num}/`,
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
        setError("Failed to fetch number example");
        console.error("Error fetching data:", error.message);
      }
    };

    fetchNumberExamples();
  }, [Num]);

  const goToQuiz = () => {
    navigate(`/number/${number}/quiz`);
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
          <h2 className={styles.title}>
            Number: {number} ({NumberWriting})
          </h2>
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

export default DisplayNumberPage;
