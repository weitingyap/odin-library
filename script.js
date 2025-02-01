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
    book.id = myLibrary.length - 1;
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295);
addBookToLibrary('Norwegian Wood', 'Haruki Murakami', 296, 'read');
addBookToLibrary('1Q84', 'Haruki Murakami', 925);
addBookToLibrary('The City and Its Uncertain Walls', 'Haruki Murakami', 464);

// populate table with existing books in library

table = document.querySelector("#library-books tbody");
row = document.createElement("tr");
cell = document.createElement("td");

readBtn = document.createElement("input"); // checkbox to toggle read status
readBtn.setAttribute("type", "checkbox");
readBtn.classList.add('read-check');

deleteBtn = document.createElement("button"); // button to delete books
deleteBtn.type = 'button';
deleteBtn.classList.add('delete-btn');

for (let book of myLibrary){

  newRow = row.cloneNode();

  for (let prop in book){
    if (prop != 'info' && prop != 'id'){ // skip over object methods & id
      newCell = cell.cloneNode();
      if (prop === 'readStatus') {        // insert read status checkbox
        newReadBtn = readBtn.cloneNode();
        newReadBtn.checked = book.readStatus === 'read' ? true : false;
        newCell.appendChild(newReadBtn);
      } else {                            // remaining text/number based properties
        newCell.innerText = book[prop];
      }
      newRow.appendChild(newCell);
    }
  }

  // add delete button to row
  newCell = cell.cloneNode();
  newDeleteBtn = deleteBtn.cloneNode(true);
  newCell.appendChild(newDeleteBtn);
  newRow.appendChild(newCell);

  // append row
  table.appendChild(newRow);
}

// update book's read status based on checkbox toggle

Book.prototype.updateStatus = function () {
  this.readStatus = this.readStatus === 'read' ? 'not read yet' : 'read';
};

readChecks = document.querySelectorAll(".read-check");

for (let check of readChecks){
  check.addEventListener('change', (event)=>{
    title = event.target.parentNode.parentNode.firstChild.innerText;
    for (let book of myLibrary){
      if (book.title === title) {
        book.updateStatus();
        break;
      }
    }
  });
}

// delete book on click 

function deleteBook (title){
  for (let id = 0; id < myLibrary.length; id++){
    if (myLibrary[id].title === title){
      myLibrary.splice(id, 1);
      return;
    }
  }
}

deleteBtns = document.querySelectorAll('.delete-btn');
for (const btn of deleteBtns){
  btn.addEventListener('click', (event) => {
    title = event.target.parentNode.parentNode.firstChild.innerText;
    deleteBook(title);
  })
}