class BackendAPI {
  constructor(request) {
    this.request = request;
  }

  async ReadMemberBooks() {
    const response = await this.request
      .get("memberBook", {
        params: {
          bookType: "DONE",
        },
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(response.data.data.content);
    return response.data.data.content.map((item) => ({
      ...item,
    }));
  }
}

export default BackendAPI;
