import React, { useRef, useState } from "react";
import BookBasket from "../bookBasket/bookBasket";
import Header from "../header/header";
import ReadBooks from "../readBooks/readBooks";
import styles from "./books.module.css";

const Books = (props) => {
  const [books, setBooks] = useState([
    {
      id: "1",
      bookName: "하얼빈",
      author: "김훈",
      publisher: "문학동네",
      publish_date: "2022-08-03",
      summary:
        "‘우리 시대 최고의 문장가’ ‘작가들의 작가’로 일컬어지는 소설가 김훈의 신작 장편소설 『하얼빈』이 출간되었다. 『하얼빈』은 김훈이 작가로 활동하는 내내 인생 과업으로 삼아왔던 특별한 작품이다.",
      page: 120,
      rate: "9.7",
      isbn: "9788954699914(895469991X)",
    },
    {
      id: "2",
      bookName: "마흔에 읽는 니체",
      author: "장재형",
      publisher: "유노북스",
      publish_date: "2022-09-01",
      summary:
        "‘마흔, 인생의 중반에서 후반으로 넘어가는 과도기의 나이다. 사십 대에는 안정적인 삶을 살 줄 알았지만 여전히 불안정하다.",
      page: 200,
      rate: "5.3",
      isbn: "9791192300245(1192300246)",
    },
    {
      id: "3",
      bookName: "역행자",
      author: "자청",
      publisher: "웅진지식하우스",
      publish_date: "2022-05-30",
      summary:
        "오타쿠 흙수저에서 월 1억 자동 수익을 실현한 무자본 연쇄창업마,라이프해커 자청의 인생 역주행 공식 대공개!",
      page: 300,
      rate: "5.3",
      isbn: "9788901260716(8901260719)",
    },
  ]);
  const readBooks = useRef();
  const onShowReadbooks = () => {
    return (
      (readBooks.current.style.display = "block"),
      (bookBasket.current.style.display = "none")
    );
  };

  const bookBasket = useRef();
  const onShowBookBasket = () => {
    return (
      (bookBasket.current.style.display = "block"),
      (readBooks.current.style.display = "none")
    );
  };

  return (
    <>
      <Header />
      <section className={styles.books}>
        <div className={styles.header}>
          <span className={styles.menu} onClick={onShowReadbooks}>
            읽은 책
          </span>
          <span className={styles.menu} onClick={onShowBookBasket}>
            읽고 싶은 책
          </span>
        </div>
        <div className={styles.readBooks} ref={readBooks}>
          <ReadBooks books={books} />
        </div>
        <div className={styles.bookBasket} ref={bookBasket}>
          <BookBasket books={books} />
        </div>
      </section>
    </>
  );
};

export default Books;
