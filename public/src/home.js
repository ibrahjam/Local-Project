function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const borrowed = [];
  books.forEach((book) => {
    const borrows = book.borrows;
    borrows.forEach((borrow) => {
      if (borrow.returned === false) borrowed.push(book);
    });
  });
  return borrowed.length;
}
// Helper function
function Helper(books) {
  let result = books.sort((countA, countB) => (countA.count < countB.count ? 1: -1)).slice(0, 5);
  return result; 
}

function getMostCommonGenres(books) {
  const commonGenres = [];
  for (let book of books) {
    const genre = commonGenres.find((currentGenre) => currentGenre.name === book.genre);
    if (genre) { genre.count++; 
    } else { commonGenres.push({name: book.genre, count: 1});
    }
  }
  return Helper(commonGenres);
}

  let result = Object.keys(genres).map((genre) => {
    const obj = { name: genre, count: genres[genre] };
    return obj;
  });

  result.sort((genre1, genre2) => {
    return genre1.count > genre2.count ? -1 : 1;
  });
  return result.slice(0, -1);
}

function getMostPopularBooks(books) {
  const populars = books.reduce((acc, book) => {
    if (!acc[book.title]) {
      acc[book.title] = book.borrows.length;
    }
    return acc;
  }, {});

  let result = Object.keys(populars).map((pop) => {
    const obj = { name: pop, count: populars[pop] };
    return obj;
  });
  result.sort((book1, book2) => {
    return book1.count > book2.count ? -1 : 1;
  });
  return result.slice(0, 5);
}

function getMostPopularAuthors(books, authors)  {
  let allPopularAuthors = [];
  let allAuthors = books.reduce((acc, book) => {
    acc[book.authorId] ? (acc[book.authorId] += book.borrows.length) : (acc[book.authorId] = book.borrows.length);
    return acc;
  }, {});
  function findAuthorsNameById(authors, id) {
    let authorName = '';
    authors.forEach((author) => {
    if (author.id === id) { 
      authorName = `${author.name.first} ${author.name.last}`;
    }
  });
  return authorName;
  }
  for (const key in allAuthors) {
    const element = allAuthors[key];
    let newObj = {};
    newObj["name"] = findAuthorsNameById(authors, parseInt(key));
    newObj["count"] = element;
    allPopularAuthors.push(newObj);
  }
  let result = allPopularAuthors.sort((authorA,authorB) => {
    if (authorA.count > authorB.count) return -1;
    if (authorA.count < authorB.count) return 1;
    return 0;
  })
  return result.slice(0,5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
