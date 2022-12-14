import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

const Navbar = (links) => {
  console.log(links);
  return (
    <nav className={styles.nav}>
      <Link to="/books" className={styles.menu}>
        서적
      </Link>
      <Link to="/bookReview" links={links} className={styles.menu}>
        감상문
      </Link>
      <Link to="/transcription" className={styles.menu}>
        필사함
      </Link>
      <Link to="/search" className={styles.menu}>
        책검색
      </Link>
      <span className={styles.hiddenMenu}>회원 정보 변경</span>
      <span className={styles.hiddenMenu}>로그아웃</span>
    </nav>
  );
};

export default Navbar;
