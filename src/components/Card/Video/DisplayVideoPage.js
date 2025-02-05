import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Loading/Loading";
import Error from "../../Error/Error";
import styles from "./DisplayVideoPage.module.css";

const DisplayVideoPage = () => {
  const { Path } = useParams();
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLettersExamples = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Token is missing!");
        return;
      }
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/videos/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

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
        const filteredQuizzes = result.filter((video) => video.title === Path);

        if (filteredQuizzes.length > 0) {
          const allVideos = filteredQuizzes.flatMap(
            (video) => video.video_file
          );
          setVideos(allVideos);
        } else {
          setError("No videos found for this letter");
        }
      } catch (error) {
        setError(`Failed to fetch videos: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLettersExamples();
  }, []);

  if (error) {
    return <Error errMsg={error} />;
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          {videos.length > 0 ? (
            videos.map((videoUrl, index) => (
              <div key={index}>
                <div className={styles.videoWrapper}>
                  <video
                    src={`http://127.0.0.1:8000/${videoUrl}`}
                    controls
                    className={styles.videoPlayer}
                  />
                </div>
                <hr></hr>
              </div>
            ))
          ) : (
            <p className={styles.noVideos}>No videos available.</p>
          )}
        </div>
      )}
    </>
  );
};

export default DisplayVideoPage;
