const myLibrary = [];

function Book(title, author, nPages, readStatus = 'not read yet'){
    this.title = title; 
    this.author = author;
    this.nPages = nPages;
    this.readStatus = readStatus;
    this.info = function(){
      return `${this.title} by ${this.author}, ${this.nPages} pages, ${this.readStatus}`;
    };
  }

function addBookToLibrary(title, author, nPages, readStatus = 'not read yet'){
    const book = new Book(title, author, nPages, readStatus);
    myLibrary.push(book);
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295);
addBookToLibrary('Norwegian Wood', 'Haruki Murakami', 296);
addBookToLibrary('1Q84', 'Haruki Murakami', 925);
addBookToLibrary('The City and Its Uncertain Walls', 'Haruki Murakami', 464);