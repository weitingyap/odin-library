const myLibrary = [];

class Book{
  constructor(title, author, nPages, readStatus){
    this.title = title; 
    this.author = author;
    this.nPages = nPages;
    this.readStatus = readStatus;
  }

  get info(){
    return `${this.title} by ${this.author}, ${this.nPages} pages, ${this.readStatus}`;
  }
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

function displayBook(book){
  newRow = row.cloneNode();

  for (let prop in book){

    if (typeof book[prop] != 'function' && prop != 'id'){ // skip over object methods & id

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

for (let book of myLibrary){
  displayBook(book);
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

function deleteBookFromLibrary (title){
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
    deleteBookFromLibrary(title);
    event.target.parentNode.parentNode.remove(); // remove book row
  })
}

// add a book

addBookBtn = document.querySelector('#add-book-btn');
addBookDialog = document.querySelector('#add-book-dialog');
addBookFormBtn = document.querySelector('#add-book-form button[type="submit"]');
addBookTitle = document.querySelector('#add-book-form input[id="title"]');
addBookAuthor = document.querySelector('#add-book-form input[id="author"]');
addBookPages = document.querySelector('#add-book-form input[id="pages"]');
addBookReadStatus = document.querySelector('#add-book-form select[id="readStatus"]');

// opens add book dialog if button is clicked
addBookBtn.addEventListener('click', ()=>{addBookDialog.showModal()});

addBookFormBtn.addEventListener('click', (event)=>{
  event.preventDefault();
  addBookDialog.close([addBookTitle.value + '$' +
                       addBookAuthor.value + '$' +
                       addBookPages.value + '$' +
                       addBookReadStatus.value]
  );
});

addBookDialog.addEventListener('close', (event)=>{
  [title, author, nPages, readStatus] = addBookDialog.returnValue.split('$');
  console.log(title, author, nPages, readStatus);
  addBookToLibrary(title, author, nPages, readStatus);
  displayBook(myLibrary.at(-1));
});