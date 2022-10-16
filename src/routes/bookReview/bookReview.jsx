import React, { useEffect } from "react";
import { useState } from "react";
import BookReviewList from "../../components/bookReviewList/bookReviewList";
import DoneBooksModal from "../../components/doneBooksModal/doneBooksModal";
import Header from "../../components/header/header";
import styles from "./bookReview.module.css";

const BookReview = ({ backendAPI }) => {
  const [reviewList, setReviewList] = useState([]);
  const [doneBooks, setDoneBooks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    // showdoneBooks();
    setModalOpen(true);
  };

  const DONE = "DONE";
  let page = 0;
  // const showdoneBooks = () => {
  //   backendAPI.ReadMemberBooks(DONE, page).then((book) => {
  //     setDoneBooks(book);
  //   });
  // };

  useEffect(() => {
    page = 0;
    backendAPI.ReadMemberBooks(DONE, page).then((book) => {
      setDoneBooks(book);
    });
  }, []);

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
          <button className={styles.button} onClick={showModal}>
            감상문 쓰기
          </button>
          {modalOpen && (
            <DoneBooksModal doneBooks={doneBooks} setModalOpen={setModalOpen} />
          )}
        </div>
        <section className={styles.ReviewList}>
          <BookReviewList reviewList={reviewList} />
        </section>
      </div>
    </>
  );
};
export default BookReview;
