class Kakao {
  constructor(kakaoClient) {
    this.kakaoClient = kakaoClient;
  }

  async search(value) {
    const response = await this.kakaoClient
      .get("search/book", {
        params: {
          query: value,
        },
      })
      .catch((error) => {
        console.log(error);
      });
    return response.data.documents.map((item) => ({
      ...item,
    }));
  }
}

export default Kakao;
