import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import axios from "axios";
import AuthService from "./service/auth_service";
import Kakao from "./service/kakao";
import BackendAPI from "./service/backendAPI";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Books from "./routes/books/books";
import BookDetail from "./routes/bookDetail/bookDetail";
import BookReview from "./routes/bookReview/bookReview";
import BookReviewAdd from "./routes/bookReviewAdd/bookReviewAdd";
import BookReviewDetail from "./routes/bookReviewDetail/bookReviewDetail";
import Transcription from "./routes/transcription/transcription";
import Search from "./routes/search/search";
import SearchBookDetail from "./routes/searchBookDetail/searchBookDetail";
import NotFound from "./routes/NotFound";
import Login from "./routes/login/login";

const root = ReactDOM.createRoot(document.getElementById("root"));
const accessToken = localStorage.getItem("ACCESS_TOKEN");
const backendURL = `${process.env.REACT_APP_BACKEND_URL}`;
const request = axios.create({
  baseURL: backendURL,
  headers: {
    Authorization: `Bearer ` + `${accessToken}`,
  },
});

const backReq = axios.create({
  headers: {
    Authorization: `Bearer ` + `${accessToken}`,
  },
});

const kakaoClient = axios.create({
  baseURL: "https://dapi.kakao.com/v3",
  headers: {
    Authorization: `KakaoAK ` + `${process.env.REACT_APP_KAKAO_API_KEY}`,
  },
});
const httpClient = axios.create({
  baseURL: backendURL,
});
const kakaoSearch = new Kakao(kakaoClient);
const authService = new AuthService(httpClient);
const backendAPI = new BackendAPI(request, backReq);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App authService={authService} />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/", element: <Books /> },
      { path: "/books", element: <Books /> },
      { path: "/bookDetail", element: <BookDetail /> },
      { path: "/bookReview", element: <BookReview /> },
      { path: "/bookReviewWrite", element: <BookReviewAdd /> },
      { path: "/bookReviewDetail", element: <BookReviewDetail /> },
      { path: "/transcription", element: <Transcription /> },
      { path: "/search", element: <Search kakaoSearch={kakaoSearch} /> },
      { paht: "/searchBookDetail", element: <SearchBookDetail /> },
    ],
  },
  {
    path: "/login",
    element: <Login authService={authService} />,
    errorElement: <NotFound />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
