import React, { useRef } from "react";
import Navbar from "../navbar/navbar";
import styles from "./header.module.css";

const Header = ({ authService }) => {
  const downBox = useRef();
  let userNameBtnToggle = true;
  const onClick = () => {
    if (userNameBtnToggle) {
      downBox.current.style.display = "flex";
      userNameBtnToggle = !userNameBtnToggle;
    } else {
      downBox.current.style.display = "none";
      userNameBtnToggle = true;
    }
  };

  const onLogout = () => {
    authService.logout();
  };

  return (
    <header className={styles.header}>
      <img className={styles.logo} src="/images/logo.png" alt="logo" />
      <Navbar />
      <div className={styles.profile}>
        <span className={styles.userName} onClick={onClick}>
          사용자
        </span>
        <img
          className={styles.arrow}
          src="./icons/sort-down-solid.svg"
          alt="down arrow"></img>
        <div className={styles.downBox} ref={downBox}>
          <span className={styles.downMenu}>회원 정보 변경</span>
          <span className={styles.downMenu} onClick={onLogout}>
            로그아웃
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
