import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import SearchBookList from "../../components/searchBookList/searchBookList";
import styles from "./search.module.css";

const Search = ({ kakaoSearch }) => {
  const [booklist, setBooklist] = useState([]);
  const [target, setTarget] = useState(null);
  const [page, setPage] = useState(1);
  const [endPage, setEndPage] = useState(false);
  const [searchword, setSearchWord] = useState();

  const navigate = useNavigate();
  const goToDetail = (book) => {
    navigate("/searchBookDetail", {
      state: {
        book: book,
      },
    });
  };

  const selectBook = (book) => {
    book && goToDetail(book);
  };

  const onClick = () => {
    handleSearch();
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const searchRef = useRef();
  const handleSearch = () => {
    const value = searchRef.current.value;
    setSearchWord(value);
    if (!value) {
      return alert("검색어를 입력해주세요!");
    } else {
      kakaoSearch.search(value, page).then((data) => {
        setBooklist(data.documents.map((item) => ({ ...item })));
        setEndPage(data.meta.is_end);
      });
    }
  };

  const moreSearch = () => {
    kakaoSearch.search(searchword, page).then((data) => {
      const newArrays = data.documents.map((item) => ({ ...item }));
      setBooklist((prev) => [...prev, ...newArrays]);
      setEndPage(data.meta.is_end);
    });
  };

  useEffect(() => {
    searchword && moreSearch();
  }, [page]);

  const obsCallback = (entries, observer) => {
    if (entries[0].isIntersecting) {
      !endPage && setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    let observer = new IntersectionObserver(obsCallback, { threshold: 0.5 });
    if (target) {
      observer.observe(target);
    }
    return () => {
      observer.disconnect();
    };
  }, [target]);

  return (
    <>
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
        <SearchBookList
          target={setTarget}
          booklist={booklist}
          onBookClick={selectBook}
        />
      </div>
    </>
  );
};

export default Search;
