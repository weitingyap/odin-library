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

// populate table with existing books in library

table = document.querySelector("#library-books tbody");
row = document.createElement("tr");
cell = document.createElement("td");

for (let book of myLibrary){
  newRow = row.cloneNode();
  for (let prop in book){
    if (typeof book[prop] != 'function'){ // skip over object methods
      newCell = cell.cloneNode();
      newCell.innerText = book[prop];
      newRow.appendChild(newCell);
    }
  }
  table.appendChild(newRow);
}