/*class Book {
constructor(author,title) {
  this.author = author;
  this.title = title;
}
addBook = (book) => {
bookList.push(book);
};

}*/

const AddButton = document.querySelector('#addBtn');
const bookTitle = document.querySelector('#title').value;
const bookAuthor = document.querySelector('#author').value;
const book = {author: bookAuthor, title: bookTitle};
const bookList = [];
console.log(bookList);
console.log('Helllllllllo');
const addBook = (e) => {
  if(bookTitle != "" && bookAuthor != "") {
    e.preventDefault();
  alert('hi');
  console.log(bookTitle);
  bookList.push(book);
  console.log(bookList);
}
else{
  console.log("Value is empty");
}

}

AddButton.addEventListener('click', addBook);
