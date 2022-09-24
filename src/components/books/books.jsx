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
  const locationState = location.state.token;
  const [userToken, setUserToken] = useState(locationState);
  const [books, setBooks] = useState([]);
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

  const onLogout = () => {
    authService.logout();
    setUserToken(null);
  };

  useEffect(() => {
    if (!userToken) {
      return;
    }
    backendAPI.ReadMemberBooks().then((book) => setBooks(book));
  }, [userToken]);

  useEffect(() => {
    if (userToken) {
      setUserToken(userToken);
    } else {
      navigater("/");
    }
  });

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
