require('./styles/styles.css')
import UI from './UI.js';
//import bookService from './services/bookService'



document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    ui.renderBooks();
  });

document.getElementById('book-form')
  .addEventListener('submit',e =>{
      let title = document.getElementById('title').value
      let author = document.getElementById('author').value
      let isbn = document.getElementById('isbn').value
      let image = document.getElementById('image').files
      //console.log(title,author,isbn)

      const formData = new FormData();
      formData.append('image',image[0])
      formData.append('title',title)
      formData.append('author',author)
      formData.append('isbn',isbn)

      const ui = new UI()
      ui.addNewBook(formData)
      ui.renderMessage('Nuevo Libro Agregado', 'success', 3000)
      
      
      e.preventDefault()
})

document.getElementById('books-cards')
  .addEventListener('click', e =>{
    if (e.target.classList.contains('delete')) {
      let ui = new UI();
      //console.log(e.target.getAttribute('_id'))
      ui.deleteBook(e.target.getAttribute('_id'));
      ui.renderMessage('Libro Eliminado', 'danger', 3000)
      
    }
    e.preventDefault()
})