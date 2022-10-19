import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./app.module.css";
import ReadBooks from "./components/readBooks/readBooks";
import BookDetail from "./routes/bookDetail/bookDetail";
import BookReview from "./routes/bookReview/bookReview";
import BookReviewAdd from "./routes/bookReviewAdd/bookReviewAdd";
import BookReviewDetail from "./routes/bookReviewDetail/bookReviewDetail";
import Books from "./routes/books/books";
import Login from "./routes/login/login";
import Search from "./routes/search/search";
import SearchBookDetail from "./routes/searchBookDetail/searchBookDetail";
import Signup from "./routes/signup/signup";

function App({ authService, kakaoSearch, backendAPI }) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login authService={authService} />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/books"
            element={
              <Books backendAPI={backendAPI} authService={authService} />
            }></Route>
          <Route
            path="/bookDetail"
            element={<BookDetail backendAPI={backendAPI} />}></Route>
          <Route
            path="/bookReview"
            element={<BookReview backendAPI={backendAPI} />}></Route>
          <Route
            path="/bookReviewWrite"
            element={<BookReviewAdd backendAPI={backendAPI} />}></Route>
          <Route
            path="/bookReviewDetail"
            element={<BookReviewDetail backendAPI={backendAPI} />}></Route>
          <Route
            path="/search"
            element={<Search kakaoSearch={kakaoSearch} />}></Route>
          <Route
            path="/searchBookDetail"
            element={<SearchBookDetail backendAPI={backendAPI} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
