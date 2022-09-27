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
        }
      })
      .catch((error) => {
        // if (error.status === 403) {
        //   window.location.href = "/";
        // }
        console.log(error);
      });
  }

  logout() {
    localStorage.removeItem("ACCESS_TOKEN");
    return;
  }
}

export default AuthService;
