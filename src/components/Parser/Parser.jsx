import React from "react";
import styles from "./Parser.module.css";
import "../../vars.css";

// props
export const Parser = ({ onSelection, selection }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Select a Parsing Option:</h2>
      <div className={styles.content}>
        <div className={styles.withApi}>
          <h3 className={styles.selecTitle}>With API:</h3>
          <p className={styles.description}>
            Parses both resume and job description for matching skills
          </p>
          <button
            className={styles.withApiBtn}
            style={{
              backgroundColor: selection === "api" ? "#706f6f" : "#adabab",
            }}
            onClick={() => {
              onSelection("api"); // notifies parent component of selection
            }}
          >
            Select
          </button>
        </div>
        <div className={styles.withoutApi}>
          <h3 className={styles.selecTitle}>Without API:</h3>
          <p className={styles.description}>
            Parses only job description for significant skills and job details
          </p>
          <button
            className={styles.withoutApiBtn}
            style={{
              backgroundColor: selection === "noapi" ? "#706f6f" : "#adabab",
            }}
            onClick={() => {
              onSelection("noapi"); // notifies parent component of selection
            }}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};
