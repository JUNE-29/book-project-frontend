class BackendAPI {
  constructor(request, backReq) {
    this.request = request;
    this.backReq = backReq;
    const book = null;
    const rate = 0;
    const doneDate = null;
    const bookType = null;
  }

  async ReadMemberBooks(type) {
    const response = await this.request
      .get("memberBooks", {
        params: {
          bookType: `${type}`,
        },
      })
      .catch((error) => {
        console.log(error);
      });

    return response.data;
  }

  async GetDoneBooks(links) {
    const response = await this.backReq
      .get(`${links._memberBooksDone.href}`)
      .catch((error) => {
        console.log(error);
      });
    return response.data;
  }

  async MoreDoneBooks(links) {
    console.log(links);
    const response = await this.backReq
      .get(`${links.next.href}`)
      .catch((error) => {
        console.log(error);
      });
    return response.data;
  }

  async GetWillBooks(links) {
    const response = await this.backReq
      .get(`${links._memberBooksWill.href}&size=3`)
      .catch((error) => {
        console.log(error);
      });
    return response.data;
  }

  async DetailBook(links) {
    const response = await this.backReq
      .get(`${links.detail.href}`)
      .catch((error) => {
        console.log(error);
      });
    return response.data;
  }

  sendbookData(book) {
    const datetime =
      book.datetime.length > 10 ? book.datetime.slice(0, 10) : book.datetime;
    this.request
      .post("book", {
        isbn: `${book.isbn}`,
        title: `${book.title}`,
        summary: `${book.contents}`,
        author: `${book.authors}`,
        publisher: `${book.publisher}`,
        publishDate: `${datetime}`,
        imageSrc: `${book.thumbnail}`,
      })
      .then((response) => {
        console.log(response);
        this.checkMemberBook(
          this.book,
          this.bookType,
          this.rate,
          this.doneDate
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  checkMemberBook(book, bookType, rate, doneDate) {
    this.book = book;
    this.rate = rate;
    this.doneDate = doneDate;
    this.bookType = bookType;

    this.request
      .post("memberBook", {
        isbn: book.isbn,
        rate: rate,
        doneDate: doneDate,
        bookType: bookType,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        this.sendbookData(book);
      });
  }

  async getMemberBook(memberBookId) {
    //this.book = book;
    const response = await this.request
      .get(`memberBook/${memberBookId}`)
      .catch((error) => {
        console.log(error);
      });
    return response.data.content;
  }

  async removeMemberBook(memberBookId) {
    const response = await this.request
      .delete(`memberBook/${memberBookId}`)
      .catch((error) => {
        console.log(error);
      });
    return response;
  }

  async getReviewList() {
    const response = await this.request.get(`reviews`).catch((error) => {
      console.log(error);
    });
    console.log(response);
    return response.data;
    //return response.data.map((item) => ({ ...item }));
  }

  async addReview(review) {
    const response = await this.request
      .post(`review`, {
        memberBookId: review.memberBookId,
        title: review.title,
        content: review.content,
        emoji: review.emoji,
      })
      .catch((error) => {
        console.log(error);
      });

    return response.status;
  }

  async getReviewDetail(reviewId) {
    const response = await this.request
      .get(`review/${reviewId}`)
      .catch((error) => {
        console.log(error);
      });

    return response.data.content;
  }
}

export default BackendAPI;
