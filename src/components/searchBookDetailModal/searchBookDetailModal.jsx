import React, { useRef } from "react";
import { HeartRating } from "../rating/rating";
import styles from "./searchBookDetailModal.module.css";

const SearchBookDetailModal = ({ setModalOpen, addDoneBook }) => {
  const dateRef = useRef();
  let rate = null;
  const close = () => {
    setModalOpen(false);
  };
  const getRateValue = (rateValue) => {
    rate = rateValue;
  };
  const onClick = () => {
    const doneDate = dateRef.current.value;
    if (doneDate === "") {
      alert("다 읽은 날짜를 입력해주세요!");
      return;
    } else if (rate === 0) {
      alert("책에 대한 점수를 입력해주세요!");
      return;
    }
    addDoneBook(rate, doneDate);
    setModalOpen(false);
    alert("해당 책을 서재에 담았습니다!");
  };

  return (
    <div className={styles.container}>
      <button className={styles.close} onClick={close}>
        <span className="material-symbols-outlined">close</span>
      </button>
      <div className={styles.title}>
        <h2>읽은 책에 담기</h2>
      </div>
      <div className={styles.contents}>
        <span className={styles.text}>다 읽은 날짜:</span>
        <input className={styles.date} ref={dateRef} type="date" />
        <div className={styles.rate}>
          <HeartRating getRateValue={getRateValue} />
        </div>
      </div>
      <button className={styles.button} onClick={onClick}>
        서재에 담기
      </button>
    </div>
  );
};

export default SearchBookDetailModal;
