let myLibrary = [];

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const booklistElement = document.querySelector(".book-list");
const toggleBooksButton = document.querySelector("#toggle-books");
const addNewBookButton = document.querySelector("#addNewBook");
const addBookForm = document.querySelector(".addBookForm");
const cancelButton = document.createElement("button");

const titleErrorSpan = document.querySelector("#title + span.error");
const authorErrorSpan = document.querySelector("#author + span.error");
const pagesErrorSpan = document.querySelector("#pages + span.error");

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  info = function () {
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
    messageElement.classList = "no-books";
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
      const selectedBookIndex = myLibrary.findIndex(
        (item) =>
          item.title === titleElement.textContent &&
          item.author === authorElement.textContent
      );
      if (selectedBookIndex !== -1) {
        myLibrary.splice(selectedBookIndex, 1);
      }
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

//form input validation

function showTitleError() {
  if (titleInput.validity.valueMissing) {
    titleErrorSpan.textContent = "You need to enter a title";
  }
  if (titleInput.validity.tooLong) {
    titleErrorSpan.textContent = `Title should not exceed ${titleInput.maxLength} characters. You entered ${titleInput.value.length}.`;
  }
}

function showAuthorError() {
  if (authorInput.validity.valueMissing) {
    authorErrorSpan.textContent = "You need to enter an author";
  }
  if (authorInput.validity.tooLong) {
    authorErrorSpan.textContent = `Author name should not exceed ${authorInput.maxLength} characters. You entered ${authorInput.value.length}.`;
  }
  if (authorInput.validity.patternMismatch) {
    authorErrorSpan.textContent = "Invalid author name";
  }
}

function showPagesError() {
  if (pagesInput.validity.valueMissing) {
    pagesErrorSpan.textContent = "You need to enter a page number";
  }
  if (pagesInput.validity.rangeUnderflow) {
    pagesErrorSpan.textContent = `Minimum number of pages should be ${pagesInput.min}. You entered ${pagesInput.value}.`;
  }
  if (pagesInput.validity.rangeOverflow) {
    pagesErrorSpan.textContent = `Maximum number of pages should be ${pagesInput.max}. You entered ${pagesInput.value}.`;
  }
}

titleInput.addEventListener("input", () => {
  if (titleInput.validity.valid) {
    titleErrorSpan.textContent = "";
  } else {
    showTitleError();
  }
});

authorInput.addEventListener("input", () => {
  if (authorInput.validity.valid) {
    authorErrorSpan.textContent = "";
  } else {
    showAuthorError();
  }
});

pagesInput.addEventListener("input", () => {
  if (pagesInput.validity.valid) {
    pagesErrorSpan.textContent = "";
  } else {
    showPagesError();
  }
});

addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!titleInput.validity.valid) {
    showTitleError();
  }

  if (!authorInput.validity.valid) {
    showAuthorError();
  }
  if (!pagesInput.validity.valid) {
    showPagesError();
  }
  if (
    titleInput.validity.valid &&
    authorInput.validity.valid &&
    pagesInput.validity.valid
  ) {
    addBookToLibrary();
    addBookForm.style.display = "none";
    cancelButton.remove();
    addBookForm.reset();

    while (booklistElement.firstChild) {
      booklistElement.removeChild(booklistElement.firstChild);
    }
    showBooks();
    toggleBooksButton.innerText = "Hide Books";
  }
});
