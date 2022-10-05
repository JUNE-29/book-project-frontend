class Kakao {
  constructor(kakaoClient) {
    this.kakaoClient = kakaoClient;
  }

  async search(value, page) {
    const response = await this.kakaoClient
      .get("search/book", {
        params: {
          query: value,
          page: page,
        },
      })
      .catch((error) => {
        console.log(error);
      });
    return response.data;
  }
}

export default Kakao;
