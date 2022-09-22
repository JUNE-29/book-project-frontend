import React, { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import SearchBookList from "../searchBookList/searchBookList";
import styles from "./search.module.css";

const Search = ({ kakaoSearch }) => {
  const [booklist, setBooklist] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const navigate = useNavigate();
  const goToDetail = (book) => {
    navigate("/bookDetail", {
      state: {
        book: book,
      },
    });
  };

  const selectBook = (book) => {
    setSelectedBook(book);
    selectedBook && goToDetail(book);
  };

  const searchRef = useRef();
  const handleSearch = () => {
    const value = searchRef.current.value;
    if (!value) {
      return alert("검색어를 입력해주세요!");
    } else {
      kakaoSearch.search(value).then((booklist) => {
        setBooklist(booklist);
      });
    }
  };

  const onClick = () => {
    handleSearch();
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <Header />
      <div className={styles.search}>
        <input
          className={styles.input}
          ref={searchRef}
          type="search"
          placeholder="책 검색"
          onKeyPress={onKeyPress}
        />
        <button className={styles.button} type="submit" onClick={onClick}>
          <img
            className={styles.buttonImg}
            src="/icons/search.png"
            alt="search"></img>
        </button>
      </div>
      <div>
        <SearchBookList booklist={booklist} onBookClick={selectBook} />
      </div>
    </>
  );
};

export default Search;
