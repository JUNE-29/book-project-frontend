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
    goToDetail(book);
    // const memberBookId = book.memberBookId;
    // backendAPI
    //   .getMemberBook(memberBookId)
    //   .then((bookInfo) => goToDetail(bookInfo));
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
      setBookList(data._embedded.memberBooks.map((item) => ({ ...item })));
      console.log(data);
      setTotalBooks(data.page.totalElements);
      // setEndPage(data.lastPage);
      // setHasNext(data.hasNext);
    });
  };

  // const moreReadDoneBooks = () => {
  //   ++page;
  //   backendAPI.ReadMemberBooks(DONE, page).then((data) => {
  //     const newBookList = data.content.map((item) => ({ ...item }));
  //     !endPage && setBookList((prev) => [...prev, ...newBookList]);
  //     setEndPage(data.lastPage);
  //     setHasNext(data.hasNext);
  //   });
  // };

  const readWillBooks = () => {
    backendAPI.GetWillBooks(links).then((data) => {
      setBookList(data._embedded.memberBooks.map((item) => ({ ...item })));
      setTotalBooks(data.page.totalElements);
      // setEndPage(data.lastPage);
      // setHasNext(data.hasNext);
    });
  };

  // const moreReadWillBooks = () => {
  //   ++page;
  //   backendAPI.ReadMemberBooks(WILL, page).then((data) => {
  //     const newBookList = data.content.map((item) => ({ ...item }));
  //     !endPage && setBookList((prev) => [...prev, ...newBookList]);
  //     setEndPage(data.lastPage);
  //     setHasNext(data.hasNext);
  //   });
  // };

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
            {/* {hasNext && (
              <button className={styles.button} onClick={moreReadDoneBooks}>
                더 불러오기
              </button>
            )} */}
          </div>
        </div>
        <div className={styles.bookBasket} ref={bookBasket}>
          <div className={styles.bookBasketBox}>
            <BookBasket
              totalBooks={totalBooks}
              bookList={bookList}
              onBookClick={onBookClick}
            />
            {/* {hasNext && (
              <button className={styles.button} onClick={moreReadWillBooks}>
                더 불러오기
              </button>
            )} */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Books;
