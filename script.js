let myLibrary = [
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    pages: 214,
    read: true,
  },
  {
    title: "1984",
    author: "George Orwell",
    pages: 328,
    read: false,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
    read: true,
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: 180,
    read: false,
  },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    pages: 635,
    read: true,
  },
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return read
      ? `${title} by ${author}, ${pages} pages, read`
      : `${title} by ${author}, ${pages} pages, not read yet`;
  };
}

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
const addBookToLibraryButton = document.querySelector("#addBooktoLibrary");
const booklist = document.querySelector(".book-list");
const showBooksButton = document.querySelector("#show-books");
const addNewBookButton = document.querySelector("#addNewBook");
const addBookForm = document.querySelector(".addBookForm");

function addBookToLibrary() {
  myLibrary.push(
    new Book(
      title.value,
      author.value,
      pages.value,
      read.checked ? true : false
    )
  );
}

function showBooks() {
  myLibrary.forEach((item) => {
    const book = document.createElement("li");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const read = document.createElement("p");
    const deleteBook = document.createElement("button");

    title.textContent = item.title;
    author.textContent = item.author;
    pages.textContent = item.pages;
    read.textContent = item.read ? "read" : "not read yet";

    deleteBook.innerText = "Delete Book";
    deleteBook.addEventListener("click", () => {
      const updatedBookList = myLibrary.filter(
        (item) => item.title !== title.textContent && item.author !== author.textContent
      );
      console.log(updatedBookList);
      myLibrary = updatedBookList;
      book.remove();
    });

    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(read);
    book.appendChild(deleteBook);

    booklist.appendChild(book);
  });
}

addBookToLibraryButton.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary();
  console.table(myLibrary);
  addBookForm.style.display = "none";
});

showBooksButton.addEventListener("click", showBooks);

addNewBookButton.addEventListener("click", () => {
  addBookForm.style.display = "";
});
