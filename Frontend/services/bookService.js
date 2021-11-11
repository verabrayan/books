//const { restart } = require("nodemon")

class bookService{
    constructor(){
        this.URI = `/api/books`;
    }


    async getBooks() {
        const response = await fetch(this.URI);    
        const books = await response.json();
        return books;
    }

    async postBook(book) {
        const res = await fetch(this.URI, {
            method: 'POST',
            body: book
        });
        const data = await res.json();
        //console.log(data)
    }

    async deleteBook(bookId) {
        const res = await fetch(`${this.URI}/${bookId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'

            }
            
        });
        const data = await res.json();
        console.log(data);
    }
}
module.exports = bookService