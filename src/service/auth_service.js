class AuthService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async login(email, password) {
    await this.httpClient
      .post("auth/signin", {
        email: `${email}`,
        password: `${password}`,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("ACCESS_TOKEN", response.data.token);
          console.log(response.data.token);
        }
      })
      .catch((error) => {
        if (error.status === 403) {
          window.location.href = "/";
        }
      });
  }
}

export default AuthService;
