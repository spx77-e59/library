const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages= pages;
  this.read = read;
  this.info = function() {
    return read?
    `${title} by ${author}, ${pages} pages, read`:
    `${title} by ${author}, ${pages} pages, not read yet`
  }
}

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
const addBookToLibraryButton = document.querySelector("#addBooktoLibrary");


function addBookToLibrary() {
  myLibrary.push(new Book(title.value, author.value, pages.value, read.checked?"true":"false"));
}

addBookToLibraryButton.addEventListener("click", (e) =>{
  e.preventDefault();
  addBookToLibrary();
  console.table(myLibrary);
})