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

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const booklistElement = document.querySelector(".book-list");
const toggleBooksButton = document.querySelector("#toggle-books");
const addNewBookButton = document.querySelector("#addNewBook");
const addBookForm = document.querySelector(".addBookForm");
const cancelButton = document.createElement("button");

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

function addBookToLibrary() {
  myLibrary.unshift(
    new Book(
      titleInput.value,
      authorInput.value,
      pagesInput.value,
      readInput.checked ? true : false
    )
  );
}

function showBooks() {
  if (myLibrary.length === 0) {
    const messageElement = document.createElement("p");
    messageElement.textContent = "No books added. Add some books...";
    booklistElement.appendChild(messageElement);
    booklistElement.style.display = "";
  }
  myLibrary.forEach((item) => {
    const bookElement = document.createElement("li");
    const titleElement = document.createElement("p");
    const authorElement = document.createElement("p");
    const pagesElement = document.createElement("p");
    const readElement = document.createElement("p");
    const deleteBookButton = document.createElement("button");
    const toggleReadButton = document.createElement("button");

    titleElement.textContent = item.title;
    authorElement.textContent = item.author;
    pagesElement.textContent = item.pages;
    readElement.textContent = item.read ? "read" : "not read yet";

    toggleReadButton.innerText =
      readElement.textContent === "read" ? "mark unread" : "mark read";
    toggleReadButton.addEventListener("click", () => {
      const selectedBook = myLibrary.find(
        (item) =>
          item.title === titleElement.textContent &&
          item.author === authorElement.textContent
      );
      if (readElement.textContent === "read") {
        readElement.textContent = "not read yet";
        toggleReadButton.innerText = "mark read";
        selectedBook.read = false;
      } else {
        readElement.textContent = "read";
        toggleReadButton.innerText = "mark unread";
        selectedBook.read = true;
      }
    });
    deleteBookButton.style.backgroundColor = "rgb(184, 30, 30)";
    deleteBookButton.innerText = "Delete Book";
    deleteBookButton.addEventListener("click", () => {
      const updatedBookList = myLibrary.filter(
        (item) =>
          item.title !== title.textContent && item.author !== author.textContent
      );
      console.log(updatedBookList);
      myLibrary = updatedBookList;
      bookElement.remove();
    });

    bookElement.appendChild(titleElement);
    bookElement.appendChild(authorElement);
    bookElement.appendChild(pagesElement);
    bookElement.appendChild(readElement);
    bookElement.appendChild(toggleReadButton);
    bookElement.appendChild(deleteBookButton);

    booklistElement.appendChild(bookElement);
    booklistElement.style.display = "";
  });
}

addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  addBookForm.style.display = "none";
  cancelButton.remove();
  addBookForm.reset();

  while (booklistElement.firstChild) {
    booklistElement.removeChild(booklistElement.firstChild);
  }
  showBooks();
  toggleBooksButton.innerText = "Hide Books";
});

toggleBooksButton.addEventListener("click", () => {
  if (toggleBooksButton.innerText === "Show Books") {
    showBooks();
    toggleBooksButton.innerText = "Hide Books";
  } else {
    toggleBooksButton.innerText = "Show Books";
    booklistElement.style.display = "none";
    while (booklistElement.firstChild) {
      booklistElement.removeChild(booklistElement.firstChild);
    }
  }
});

addNewBookButton.addEventListener("click", () => {
  cancelButton.addEventListener("click", () => {
    addBookForm.style.display = "none";
    cancelButton.remove();
    addBookForm.reset();
  });
  cancelButton.innerText = "X";
  cancelButton.id = "cancel-btn";
  addBookForm.insertAdjacentElement("beforebegin", cancelButton);
  addBookForm.style.display = "";
});
