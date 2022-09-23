import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import axios from "axios";
import AuthService from "./service/auth_service";
import Kakao from "./service/kakao";
import BackendAPI from "./service/backendAPI";

const root = ReactDOM.createRoot(document.getElementById("root"));
const accessToken = localStorage.getItem("ACCESS_TOKEN");
const backendURL = `${process.env.REACT_APP_BACKEND_URL}`;
const request = axios.create({
  baseURL: backendURL,
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
const backendAPI = new BackendAPI(request);
root.render(
  <React.StrictMode>
    <App
      kakaoSearch={kakaoSearch}
      authService={authService}
      backendAPI={backendAPI}
    />
  </React.StrictMode>
);
