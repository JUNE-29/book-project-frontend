import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookBasket from "../../components/bookBasket/bookBasket";
import Header from "../../components/header/header";
import ReadBooks from "../../components/readBooks/readBooks";
import styles from "./books.module.css";

const Books = ({ backendAPI, authService }) => {
  const [bookList, setBookList] = useState([]);
  const [endPage, setEndPage] = useState(false);
  const [totalBooks, setTotalBooks] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const navigater = useNavigate();
  const location = useLocation();
  const locationState = location?.state?.token;
  const [userToken, setUserToken] = useState(locationState);

  const onBookClick = (book) => {
    backendAPI.getMemberBook(book).then((bookInfo) => goToDetail(bookInfo));
  };

  const navigate = useNavigate();
  const goToDetail = (bookInfo) => {
    navigate("/bookDetail", {
      state: {
        book: bookInfo,
      },
    });
  };

  const readBooks = useRef();
  const onShowReadbooks = () => {
    readDoneBooks();
    return (
      (bookBasket.current.style.display = "none"),
      (readBooks.current.style.display = "block")
    );
  };

  const bookBasket = useRef();
  const onShowBookBasket = () => {
    readWillBooks();
    return (
      (bookBasket.current.style.display = "block"),
      (readBooks.current.style.display = "none")
    );
  };

  const onLogout = () => {
    authService.logout();
    setUserToken(null);
  };

  const DONE = "DONE";
  let page = 0;
  const readDoneBooks = () => {
    page = 0;
    backendAPI.ReadMemberBooks(DONE, page).then((data) => {
      setBookList(data.content.map((item) => ({ ...item })));
      setEndPage(data.lastPage);
      setTotalBooks(data.totalElements);
      setHasNext(data.hasNext);
    });
  };

  const moreReadDoneBooks = () => {
    ++page;
    backendAPI.ReadMemberBooks(DONE, page).then((data) => {
      const newBookList = data.content.map((item) => ({ ...item }));
      !endPage && setBookList((prev) => [...prev, ...newBookList]);
      setEndPage(data.lastPage);
      setHasNext(data.hasNext);
    });
  };

  const WILL = "WILL";
  const readWillBooks = () => {
    backendAPI.ReadMemberBooks(WILL).then((data) => {
      setBookList(data.content.map((item) => ({ ...item })));
      setEndPage(data.lastPage);
      setTotalBooks(data.totalElements);
      setHasNext(data.hasNext);
    });
  };

  const moreReadWillBooks = () => {
    ++page;
    backendAPI.ReadMemberBooks(WILL, page).then((data) => {
      const newBookList = data.content.map((item) => ({ ...item }));
      !endPage && setBookList((prev) => [...prev, ...newBookList]);
      setEndPage(data.lastPage);
      setHasNext(data.hasNext);
    });
  };

  useEffect(() => {
    if (userToken) {
      setUserToken(userToken);
      readDoneBooks();
    } else {
      navigater("/");
    }
  }, [userToken]);

  return (
    <>
      <Header onLogout={onLogout} />
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
          <div className={styles.readBooksBox}>
            <ReadBooks
              totalBooks={totalBooks}
              bookList={bookList}
              onBookClick={onBookClick}
            />
            {hasNext && (
              <button className={styles.button} onClick={moreReadDoneBooks}>
                더 불러오기
              </button>
            )}
          </div>
        </div>
        <div className={styles.bookBasket} ref={bookBasket}>
          <div className={styles.bookBasketBox}>
            <BookBasket
              totalBooks={totalBooks}
              bookList={bookList}
              onBookClick={onBookClick}
            />
            {hasNext && (
              <button className={styles.button} onClick={moreReadWillBooks}>
                더 불러오기
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Books;
