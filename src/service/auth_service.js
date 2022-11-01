class AuthService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async login(email, password) {
    const response = await this.httpClient
      .post("auth/signin", {
        email: `${email}`,
        password: `${password}`,
      })
      .catch((error) => {
        // if (error.status === 403) {
        //   window.location.href = "/";
        // }
        console.log(error);
      });

    localStorage.setItem("ACCESS_TOKEN", response.data.token);
    return response.data;
  }

  logout() {
    localStorage.removeItem("ACCESS_TOKEN");
    return;
  }
}

export default AuthService;
