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
const toggleBooksButton = document.querySelector("#toggle-books");
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
    const toggleReadButton = document.createElement("button");

    title.textContent = item.title;
    author.textContent = item.author;
    pages.textContent = item.pages;
    read.textContent = item.read ? "read" : "not read yet";

    toggleReadButton.innerText =
      read.textContent === "read" ? "mark unread" : "mark read";
    toggleReadButton.addEventListener("click", () => {
      const x = myLibrary.find(
        (item) =>
          item.title === title.textContent && item.author === author.textContent
      );

      console.table(x);
      if (read.textContent === "read") {
        read.textContent = "not read yet";
        toggleReadButton.innerText = "mark read";
        x.read = false;
      } else {
        read.textContent = "read";
        toggleReadButton.innerText = "mark unread";
        x.read = true;
      }
      console.table(x);
    });

    deleteBook.innerText = "Delete Book";
    deleteBook.addEventListener("click", () => {
      const updatedBookList = myLibrary.filter(
        (item) =>
          item.title !== title.textContent && item.author !== author.textContent
      );
      console.log(updatedBookList);
      myLibrary = updatedBookList;
      book.remove();
    });

    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pages);
    book.appendChild(read);
    book.appendChild(toggleReadButton);
    book.appendChild(deleteBook);

    booklist.appendChild(book);
    booklist.style.display = "";
  });
}

addBookToLibraryButton.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary();
  console.table(myLibrary);
  addBookForm.style.display = "none";
});

toggleBooksButton.addEventListener("click", () => {
  
  if(toggleBooksButton.innerText === "Show Books") {
    showBooks();
    toggleBooksButton.innerText = "Hide Books";
  } else {
    toggleBooksButton.innerText = "Show Books"
    booklist.style.display = "none";
  }
});

addNewBookButton.addEventListener("click", () => {
  addBookForm.style.display = "";
});
