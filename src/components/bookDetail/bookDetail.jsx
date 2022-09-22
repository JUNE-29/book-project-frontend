import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookDetail = () => {
  const location = useLocation();
  const book = location.state.book;

  return (
    <>
      <h1>책 정보 자세히보기</h1>
      <img src={book.thumbnail}></img>
      <p>{book.title}</p>
      <span>{book.authors}</span>
      <span>{book.publisher}</span>
      <span>{book.datetime}</span>
      <p>{book.contents}</p>
      <button>추가하기</button>
    </>
  );
};

export default BookDetail;
