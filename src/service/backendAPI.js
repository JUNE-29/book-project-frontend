class BackendAPI {
  constructor(request) {
    this.request = request;
    const book = null;
    const rate = 0;
    const doneDate = null;
    const bookType = null;
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

  sendbookData(book) {
    console.log(book);
    this.request
      .post("book", {
        isbn: `${book.isbn}`,
        title: `${book.title}`,
        summary: `${book.contents}`,
        author: `${book.authors}`,
        publisher: `${book.publisher}`,
        publishDate: `${book.datetime.slice(0, 10)}`,
        imageSrc: `${book.thumbnail}`,
      })
      .then((response) => {
        console.log(response);
        this.checkMemberBook(
          this.book,
          this.rate,
          this.doneDate,
          this.bookType
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
    console.log(book, bookType, rate, doneDate);

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
}

export default BackendAPI;
