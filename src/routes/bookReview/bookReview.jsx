import React, { useEffect } from "react";
import { useState } from "react";
import BookReviewList from "../../components/bookReviewList/bookReviewList";
import DoneBooksModal from "../../components/doneBooksModal/doneBooksModal";
import Header from "../../components/header/header";
import styles from "./bookReview.module.css";

const BookReview = ({ backendAPI }) => {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    backendAPI.getReviewList().then((data) => {
      setReviewList(data);
    });
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.buttonBox}>
          <button className={styles.button}> 감상문 쓰기 </button>
        </div>
        <section className={styles.ReviewList}>
          <BookReviewList reviewList={reviewList} />
        </section>
      </div>
    </>
  );
};
export default BookReview;
