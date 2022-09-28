/* eslint-disable max-classes-per-file */
const submitBtn = document.querySelector('#add');
const showmessage = document.querySelector('.errormsg');
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Add Data to local storage
class store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(author) {
    const books = store.getBooks();
    books.forEach((book, index) => {
      if (book.author === author.toString()) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Add Elements to UI
class UI {
  static displayBooks() {
    const books = store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const listSection = document.querySelector('#section');
    const item = document.createElement('ul');
    item.style = 'list-style-type:none; display:flex; gap: 20px;';
    item.innerHTML = `
<li>${book.title}</li>
<li>${book.author}</li>
<li><a href="#" class="delete">X</a></li>
`;
    listSection.appendChild(item);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

// Event: Display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event: Add to book list
submitBtn.addEventListener('click', () => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  if (title === '' || author === '') {
    showmessage.innerHTML = '<h3 style=\'color:red;\' class=\'alert\'>Please fill in all values</h3>';
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
  } else {
  // Instatiate book because book class is not static
    const book = new Book(title, author);
    UI.addBookToList(book);
    store.addBook(book);
    UI.clearFields();
  }
});

// Remove from Book List

document.querySelector('#section').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});
