import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookBasket from "../../components/bookBasket/bookBasket";
import Header from "../../components/header/header";
import ReadBooks from "../../components/readBooks/readBooks";
import styles from "./books.module.css";

const Books = ({ backendAPI, authService }) => {
  const [doneBookList, setDoneBookList] = useState([]);
  const [willBookList, setWillBookList] = useState([]);
  const [endPage, setEndPage] = useState(false);
  const [totalBooks, setTotalBooks] = useState(0);

  const navigater = useNavigate();
  const location = useLocation();
  const userData = location?.state?.userData;
  const [userToken, setUserToken] = useState(userData.token);
  const [links, setLinks] = useState(userData._links);

  useEffect(() => {
    if (userToken) {
      setUserToken(userToken);
      readDoneBooks();
    } else {
      navigater("/");
    }
  }, [userToken]);

  useEffect(() => {
    if (links) {
      setLinks(links);
    }
  }, [links]);

  const onBookClick = (book) => {
    backendAPI.DetailBook(book._links).then((bookInfo) => goToDetail(bookInfo));
  };

  const navigate = useNavigate();
  const goToDetail = (book) => {
    navigate("/bookDetail", {
      state: {
        book: book,
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
    setUserToken(null);
    authService.logout();
  };

  const readDoneBooks = () => {
    backendAPI.GetDoneBooks(links).then((data) => {
      setDoneBookList(data._embedded.memberBooks.map((item) => ({ ...item })));
      setTotalBooks(data.page.totalElements);
      setLinks(data._links);
      setEndPage(data.page.number + 1 === data.page.totalPages);
    });
  };

  const moreReadDoneBooks = () => {
    backendAPI.MoreDoneBooks(links).then((data) => {
      const newBookList = data._embedded.memberBooks.map((item) => ({
        ...item,
      }));
      !endPage && setDoneBookList((prev) => [...prev, ...newBookList]);
      setEndPage(data.page.number + 1 === data.page.totalPages);
    });
  };

  const readWillBooks = () => {
    backendAPI.GetWillBooks(links).then((data) => {
      console.log(data);
      setWillBookList(data._embedded.memberBooks.map((item) => ({ ...item })));
      setTotalBooks(data.page.totalElements);
      setLinks(data._links);
      setEndPage(data.page.number + 1 === data.page.totalPages);
    });
  };

  const moreReadWillBooks = () => {
    backendAPI.MoreDoneBooks(links).then((data) => {
      const newBookList = data._embedded.memberBooks.map((item) => ({
        ...item,
      }));
      !endPage && setWillBookList((prev) => [...prev, ...newBookList]);
      setEndPage(data.page.number + 1 === data.page.totalPages);
      console.log(endPage);
    });
  };

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
              bookList={doneBookList}
              onBookClick={onBookClick}
            />
            {!endPage && (
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
              bookList={willBookList}
              onBookClick={onBookClick}
            />
            {!endPage && (
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
