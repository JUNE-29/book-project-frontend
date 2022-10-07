import { ThirtyFpsSelectRounded } from "@mui/icons-material";

class BackendAPI {
  constructor(request) {
    this.request = request;
    const book = null;
    const rate = 0;
    const doneDate = null;
    const bookType = null;
  }

  async ReadMemberBooks(type, page) {
    const response = await this.request
      .get("memberBook", {
        params: {
          bookType: `${type}`,
          page: page,
          size: 10,
        },
      })
      .catch((error) => {
        console.log(error);
      });
    return response.data.content;
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

  async getMemberBook(book) {
    this.book = book;
    const response = await this.request
      .get(`memberBook/${book.memberBookId}`)
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
}

export default BackendAPI;
