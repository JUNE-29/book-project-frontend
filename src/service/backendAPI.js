class BackendAPI {
  constructor(request) {
    this.request = request;
  }

  async ReadMemberBooks(type) {
    const response = await this.request
      .get("memberBook", {
        params: {
          bookType: `${type}`,
        },
      })
      .catch((error) => {
        console.log(error);
      });
    return response.data.content.content.map((item) => ({
      ...item,
    }));
  }
}

export default BackendAPI;
