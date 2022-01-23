function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const result = [];
  const borrowedBooks = books.filter(book => !book.borrows[0].returned);
  const returnedBooks = books.filter(book => book.borrows[0].returned);
  result.push(borrowedBooks);
  result.push(returnedBooks);
  return result
}

function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  const result = []
  borrows.forEach(borrow => {
    if (result.length >= 10) return;
    const borrower = accounts.find(account => account.id === borrow.id);
    const formattBorrow = {
      ...borrow,
      ...borrower,
    };
    result.push(formattBorrow);
  });
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
