const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const bookDisplay = document.getElementById('book-display');
  bookDisplay.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Автор:</strong> ${book.author}</p>
      <p><strong>Страниц:</strong> ${book.pages}</p>
      <p><strong>Статус:</strong> ${book.read ? 'Прочитано' : 'Не прочитано'}</p>
      <div class="book-actions">
        <button onclick="toggleRead(${index})" class="btn">Изменить статус</button>
        <button onclick="removeBook(${index})" class="btn-cancel">Удалить</button>
      </div>
    `;
    bookDisplay.appendChild(bookCard);
  });
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function toggleRead(index) {
  myLibrary[index].read = !myLibrary[index].read;
  displayBooks();
}

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('new-book-btn').addEventListener('click', () => {
    document.getElementById('book-form').showModal();
  });

  document.getElementById('cancel-btn').addEventListener('click', () => {
    document.getElementById('book-form').close();
  });

  document.querySelector('#book-form form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    
    addBookToLibrary(title, author, pages, read);

    e.target.reset();
    document.getElementById('book-form').close();
  });
});