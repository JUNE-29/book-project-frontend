import React from "react";

const SearchBookItem = ({ book, onBookClick }) => {
  return (
    <li onClick={() => onBookClick(book)}>
      <img src={book.thumbnail} alt="thumbnail"></img>
      <div>
        <p>{book.title}</p>
        <p>{book.authors}</p>
        <p>{book.contents}</p>
      </div>
    </li>
  );
};

export default SearchBookItem;
