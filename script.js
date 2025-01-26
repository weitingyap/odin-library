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
