import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/header";
import MemberBookDetail from "../../components/memberBookDetail/memberBookDetail";
import ReviewDetail from "../../components/reviewDetail/reviewDetail";
import Button from "../../components/button/button";
import styles from "./bookReviewDetail.module.css";

const BookReviewDetail = ({ backendAPI }) => {
  const [book, setBook] = useState();
  const [reviewDetail, setReviewDetail] = useState();
  const location = useLocation();
  const review = location.state.review;

  useEffect(() => {
    const memberBookId = review.memberBookId;
    backendAPI.getMemberBook(memberBookId).then((bookInfo) => {
      setBook(bookInfo);
    });
  }, [review]);

  useEffect(() => {
    const reviewId = review.reviewId;
    backendAPI.getReviewDetail(reviewId).then((review) => {
      setReviewDetail(review);
    });
  }, [review]);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <section>{book && <MemberBookDetail book={book} />}</section>
        <section>
          {reviewDetail && (
            <ReviewDetail book={book} reviewDetail={reviewDetail} />
          )}
        </section>
        <div className={styles.button}>
          <Button text="삭제하기" />
        </div>
      </div>
    </>
  );
};

export default BookReviewDetail;
