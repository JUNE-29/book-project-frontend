import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "./app.module.css";
import Books from "./components/books/books";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/books" element={<Books />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
