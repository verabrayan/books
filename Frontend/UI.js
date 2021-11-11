const bookService = require('./services/bookService');
const bookSer = new bookService()

import { format } from 'timeago.js';
    

class UI{
    async renderBooks(){
        const books = await bookSer.getBooks()
        const booksCards =document.getElementById('books-cards')
        booksCards.innerHTML = ''
        books.forEach(book => {
            const div = document.createElement('div')
            div.className = ''
            div.innerHTML = `
            <div class="card m-2">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${book.imagePath}" class="img-fluid" alt="">
                </div>
                <div class="col-md-8">
                    <div class="card-block px-2">
                        <h4 class="card-title">${book.title}</h4>
                        <p class="card-text">${book.author}</p>
                        <a href="#" class="btn btn-danger delete" _id="${book._id}">X</a>
                    </div>
                </div>
            </div>
            <div class="card-footer w-100 text-muted">
              ${format(book.created_at)}
            </div>
          </div>
            `;
            booksCards.appendChild(div);
        });
        //console.log(books)
    }

    async addNewBook(book){
        await bookSer.postBook(book)
        this.clearBookForm()
        this.renderBooks()
    }

    clearBookForm(){
        document.getElementById('book-form').reset()
    }
    renderMessage(message, colorMessage, secondsToRemove){
        const div = document.createElement('div');
        // Styling the div
        div.className = `alert alert-${colorMessage} message`;
        // Adding Text to the div
        div.appendChild(document.createTextNode(message));
        // Puting in the documnet
        const container = document.querySelector('.col-md-4');
        const bookForm = document.querySelector('#book-form');
        container.insertBefore(div, bookForm);
        // Removing the div after some secconds
        setTimeout(() => {
          document.querySelector('.message').remove();
        }, secondsToRemove);

    }

    async deleteBook(bookId) {
        await bookSer.deleteBook(bookId)
        this.renderBooks()
      }
}
export default UI;