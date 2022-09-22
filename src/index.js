import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import axios from "axios";
import AuthService from "./service/auth_service";
import Kakao from "./service/kakao";

const root = ReactDOM.createRoot(document.getElementById("root"));
const kakaoClient = axios.create({
  baseURL: "https://dapi.kakao.com/v3",
  headers: {
    Authorization: `KakaoAK ` + `${process.env.REACT_APP_KAKAO_API_KEY}`,
  },
});
const kakaoSearch = new Kakao(kakaoClient);
root.render(
  <React.StrictMode>
    <App kakaoSearch={kakaoSearch} />
  </React.StrictMode>
);
