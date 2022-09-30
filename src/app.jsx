import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./app.module.css";
import Books from "./components/books/books";
import Login from "./components/login/login";
import Search from "./components/search/search";
import SearchBookDetail from "./components/searchBookDetail/searchBookDetail";
import Signup from "./components/signup/signup";

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
