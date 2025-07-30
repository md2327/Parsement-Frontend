import React, { useState, useContext, createContext } from "react";
import styles from "./Accuracybar.module.css";
import { CircularProgressbar } from "react-circular-progressbar";

export const AccuracyContext = createContext();
export const AccuracyContextProvider = ({ children }) => {
  const [accuracy, setAccuracy] = useState(0);
  const [accuracyApi, setAccuracyApi] = useState(false);
  return (
    <AccuracyContext.Provider
      value={{ accuracy, setAccuracy, accuracyApi, setAccuracyApi }}
    >
      {children}
    </AccuracyContext.Provider>
  );
};

export const Accuracybar = () => {
  const { accuracy, accuracyApi } = useContext(AccuracyContext);

  // show component if API has been used and accuracy is not undefined
  if (!accuracyApi || accuracy === undefined) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        This is a percentage bar based on the matching results between your
        resume and job description. Check below to find a text summary of the
        parsed information. Please understand that miscalculations are possible.
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>Matching Accuracy:</h3>
        <div className={styles.accuracyBar}>
          <CircularProgressbar
            value={accuracy}
            text={`${accuracy}%`}
            variant="determinate"
          />
        </div>
      </div>
    </div>
  );
};
