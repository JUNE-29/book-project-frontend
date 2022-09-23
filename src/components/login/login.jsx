import React from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";

const Login = ({ authService }) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    authService.login(email, password);
    goToBook();
  };

  const navigate = useNavigate();
  const goToBook = () => {
    navigate("/books");
  };

  return (
    <section className={styles.main}>
      <div className={styles.imageBox}>
        <img
          className={styles.image}
          src="/images/main_page_image.jpg"
          alt="books"></img>
      </div>
      <div className={styles.loginBox}>
        <img className={styles.logo} src="/images/logo.png" alt="logo"></img>
        <p className={styles.copy}>서비스 이용을 위해 로그인 해주세요.</p>
        <form className={styles.loginForm}>
          <input
            ref={emailRef}
            type="text"
            className={styles.input}
            placeholder="이메일"
          />
          <input
            ref={passwordRef}
            type="password"
            className={styles.input}
            placeholder="비밀번호"
          />
          <div className={styles.linkBox}>
            <Link to="/signup" className={styles.links}>
              아이디 찾기
            </Link>
            <span className={styles.links}>비밀번호 찾기</span>
            <span className={styles.links}>회원가입</span>
          </div>
          <div className={styles.loginButton}>
            <button className={styles.button} onClick={onSubmit}>
              로그인
            </button>
            <p className={styles.copy}>또는</p>
            <button className={styles.button}>SNS로그인</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
