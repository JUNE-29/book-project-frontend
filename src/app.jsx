import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./app.module.css";
import BookDetail from "./components/bookDetail/bookDetail";
import Books from "./components/books/books";
import Login from "./components/login/login";
import Search from "./components/search/search";
import Signup from "./components/signup/signup";

function App({ authService, kakaoSearch }) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/books" element={<Books />}></Route>
          <Route
            path="/search"
            element={<Search kakaoSearch={kakaoSearch} />}></Route>
          <Route path="/bookDetail" element={<BookDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
