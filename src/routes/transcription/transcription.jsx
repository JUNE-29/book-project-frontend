import React from "react";
import { useState } from "react";
import Header from "../../components/header/header";
import styles from "./transcription.module.css";

const Transcription = (props) => {
  const [transcriptions, setTransCription] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.buttonBox}>
          <button className={styles.button} onClick={showModal}>
            필사하기
          </button>
        </div>
        <h1>Transcription</h1>
      </div>
    </>
  );
};
export default Transcription;
