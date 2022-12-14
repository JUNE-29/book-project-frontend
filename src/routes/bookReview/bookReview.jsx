import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookReviewList from "../../components/bookReviewList/bookReviewList";
import DoneBooksModal from "../../components/doneBooksModal/doneBooksModal";
import Header from "../../components/header/header";
import styles from "./bookReview.module.css";

const BookReview = ({ backendAPI, links }) => {
  const [reviewList, setReviewList] = useState([]);
  const [doneBooks, setDoneBooks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [lastPage, setLastPage] = useState(false);

  console.log(links);
  const navigate = useNavigate();
  const goToAdd = (selectedBook) => {
    navigate("/bookReviewWrite", {
      state: {
        book: selectedBook,
      },
    });
  };
  const onAddBook = (selectedBook) => {
    selectedBook && goToAdd(selectedBook);
  };

  const showModal = () => {
    setModalOpen(true);
  };

  const DONE = "DONE";
  let page = 0;
  const moreDoneBooks = () => {
    ++page;
    backendAPI.ReadMemberBooks(DONE, page).then((book) => {
      const newDoneBooks = book.content.map((item) => ({ ...item }));
      !lastPage && setDoneBooks((prev) => [...prev, ...newDoneBooks]);
      setLastPage(book.lastPage);
      setHasNext(book.hasNext);
    });
  };

  const onReviewClick = (review) => {
    review && goToDetail(review);
  };
  const goToDetail = (review) => {
    navigate("/bookReviewDetail", {
      state: {
        review: review,
      },
    });
  };

  useEffect(() => {
    page = 0;
    // backendAPI.ReadMemberBooks(DONE, page).then((book) => {
    //   setDoneBooks(book.content.map((item) => ({ ...item })));
    //   setLastPage(book.lastPage);
    //   setHasNext(book.hasNext);
    // });
  }, []);

  useEffect(() => {
    // backendAPI.getReviewList().then((data) => {
    //   setReviewList(data._embedded.reviews);
    // });
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.buttonBox}>
          <button className={styles.button} onClick={showModal}>
            ????????? ??????
          </button>
          {modalOpen && (
            <DoneBooksModal
              doneBooks={doneBooks}
              setModalOpen={setModalOpen}
              hasNext={hasNext}
              moreDoneBooks={moreDoneBooks}
              onAddBook={onAddBook}
            />
          )}
        </div>
        <section className={styles.ReviewList}>
          <BookReviewList
            reviewList={reviewList}
            onReviewClick={onReviewClick}
          />
        </section>
      </div>
    </>
  );
};
export default BookReview;
