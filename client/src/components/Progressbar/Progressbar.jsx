import "../../vars.css";
import React, { useState, useEffect } from "react";
import styles from "./Progressbar.module.css";

// props
export const Progressbar = ({
  fileUploaded,
  textFilled,
  selection,
  onShowResults,
}) => {
  const [progress, setProgress] = useState(0); // for progress being filled
  const [isLoading, setIsLoading] = useState(false); // for progress bar
  const [selected, setIsSelected] = useState(false); // for parsing option

  // check if resume is uploaded and job description is filled
  const checkRequirements = () => {
    if (fileUploaded && textFilled && selection) {
      setIsLoading(true);
      setIsSelected(true); // if true, send signal to start scan
    } else {
      alert(
        "Please upload a resume, fill in the job description, and select a parsing option"
      ); // error handling
    }
  };

  // progress bar animation
  useEffect(() => {
    if (progress < 100 && isLoading) {
      setTimeout(() => setProgress((prev) => prev + 1), 70);
    }
    if (progress === 100 && isLoading) {
      onShowResults(); // notifies parent component
    }
  }, [progress, isLoading]);

  // progress bar color based on progress
  const progressColor = () => {
    if (progress === 0) {
      return "darkgray"; // grey at 0%
    } else if (progress > 0 && progress <= 20) {
      return "#c70d0dff"; // red at <20
    } else if (progress > 20 && progress <= 50) {
      return "#eeca00ff"; // yellow <50
    } else {
      return "var(--color-btn)"; // green at >50
    }
  };

  return (
    <section>
      <div className={styles.scanContent}>
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{
              width: `${progress}%`,
              backgroundColor: progressColor(),
            }}
          >
            {progress}%
          </div>
        </div>
        <button className={styles.scanBtn} onClick={checkRequirements}>
          Begin Scan
        </button>
      </div>
    </section>
  );
};
