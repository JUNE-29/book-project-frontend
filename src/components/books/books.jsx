import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookBasket from "../bookBasket/bookBasket";
import Header from "../header/header";
import ReadBooks from "../readBooks/readBooks";
import styles from "./books.module.css";

const Books = ({ backendAPI, authService }) => {
  const navigater = useNavigate();
  const location = useLocation();
  const locationState = location?.state?.token;
  const [userToken, setUserToken] = useState(locationState);
  const [bookList, setBookList] = useState([]);
  const readBooks = useRef();
  const onShowReadbooks = () => {
    readDoneBooks();
    return (
      (readBooks.current.style.display = "block"),
      (bookBasket.current.style.display = "none")
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

  const readDoneBooks = () => {
    const done = "DONE";
    backendAPI.ReadMemberBooks(done).then((book) => setBookList(book));
  };

  const readWillBooks = () => {
    const will = "WILL";
    backendAPI.ReadMemberBooks(will).then((book) => setBookList(book));
  };

  // useEffect(() => {
  //   if (!userToken) {
  //     return;
  //   }
  //   readDoneBooks();
  // }, [userToken]);

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
          <ReadBooks bookList={bookList} />
        </div>
        <div className={styles.bookBasket} ref={bookBasket}>
          <BookBasket books={bookList} />
        </div>
      </section>
    </>
  );
};

export default Books;
