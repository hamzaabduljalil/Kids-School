import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./Quiz.module.css";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
const QuizAnimals = () => {
  const { animal } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [quizTitle, setQuizTitle] = useState(null);
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [pass, setPass] = useState(false);
  const [error, setError] = useState(null);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);
  const optionArray = [Option1, Option2, Option3, Option4];

  const location = useLocation();
  const animals = location.state?.animals || [];

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch("http://127.0.0.1:8000/api/quizzes/", {
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

        const filteredQuizzes = data.filter(
          (quiz) => quiz.quiz_Animal === +animal
        );

        if (filteredQuizzes.length > 0) {
          const title = filteredQuizzes.flatMap((quiz) => quiz.title_Quiz);
          setQuizTitle(title);
        }

        if (filteredQuizzes.length > 0) {
          const allQuestions = filteredQuizzes.flatMap(
            (quiz) => quiz.questions
          );
          setQuizData(allQuestions);
        } else {
          setQuizData(null);
          setError(`No quizzes available for number ${animal}`);
        }
      } catch (err) {
        setError(`Failed to fetch quiz data, ${err.message}`);
      }
    };

    fetchQuizData();
  }, [animal]);

  useEffect(() => {
    if (quizData) {
      setPass(score >= quizData.length / 2);

      const fetchNumberProgress = async () => {
        try {
          const token = localStorage.getItem("access_token");
          const response = await fetch(
            `http://127.0.0.1:8000/api/user-animal-progress/${animal}/`,
            {
              method: "PUT",
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
        } catch (error) {
          console.error("Failed to fetch user progress:", error.message);
        }
      };

      fetchNumberProgress();
    }
  }, [score, quizData]);

  const reset = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
    setPass(false);

    optionArray.forEach((option) => {
      if (option.current) {
        option.current.classList.remove(styles.wrong, styles.correct);
      }
    });
  };

  const checkAns = (e, selectedIndex) => {
    if (!lock && quizData && quizData[index] && quizData[index].options) {
      const options = quizData[index].options;
      const selectedOption = options[selectedIndex];

      if (selectedOption.is_correct) {
        e.currentTarget.classList.add(styles.correct);
        setScore((prev) => prev + 1);
      } else {
        e.currentTarget.classList.add(styles.wrong);

        const correctOptionIndex = options.findIndex(
          (option) => option.is_correct
        );
        if (correctOptionIndex !== -1) {
          optionArray[correctOptionIndex]?.current.classList.add(
            styles.correct
          );
        }
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === quizData.length - 1) {
        setResult(true);
        return;
      }

      optionArray.forEach((option) => {
        if (option.current) {
          option.current.classList.remove(styles.correct, styles.wrong);
        }
      });

      setIndex((prevIndex) => prevIndex + 1);
      setLock(false);
    }
  };

  const nextAnimal = +animal + 1;
  let path;
  if (nextAnimal > animals.length) {
    path = `/animal/1`;
  } else {
    path = `/animal/${nextAnimal}`;
  }

  if (error) {
    return <Error errMsg={error} />;
  }

  return (
    <>
      {!quizData ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <h1>Quiz for Animal {quizTitle}</h1>
          {result ? (
            <>
              <h2>
                You scored {score} out of {quizData.length}
              </h2>
              {pass ? (
                <Link to={path}>
                  <button className={styles.button}>Next Animal</button>
                </Link>
              ) : (
                <button className={styles.button} onClick={reset}>
                  Reset
                </button>
              )}
            </>
          ) : (
            quizData[index] && (
              <>
                <h2>
                  {index + 1}. {quizData[index].text_Question}
                </h2>
                <ul>
                  {quizData[index].options.map((option, idx) => (
                    <li
                      key={idx}
                      ref={optionArray[idx]}
                      onClick={(e) => checkAns(e, idx)}
                    >
                      <img
                        src={option.image}
                        alt={`Option ${idx + 1}`}
                        className={styles.optionImage}
                      />
                    </li>
                  ))}
                </ul>
                <button onClick={next} className={styles.button}>
                  Next
                </button>
                <div className={styles.index}>
                  {index + 1} of {quizData.length} questions
                </div>
              </>
            )
          )}
        </div>
      )}
    </>
  );
};

export default QuizAnimals;
