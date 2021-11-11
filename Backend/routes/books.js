const {Router} = require('express');
const router = Router();
const book = require('../models/book');
const {unlink} = require('fs-extra')
const path = require('path')
router.get('/', async (req,res)=>{
    
    let books = await book.find();
    res.json(books)
    
});

router.post('/', async (req,res)=>{
    let {title,author,isbn}= req.body;
    const imagePath = '/uploads/' + req.file.filename;
    let newBook = new book({title,author,isbn,imagePath});
    await newBook.save();
    res.json({message: 'libro guardado'});
});

router.delete('/:id',async (req,res)=>{
    let Book= await book.findByIdAndDelete(req.params.id);
    unlink(path.resolve('./Backend/public'+ Book.imagePath))
    res.json({message: 'deleting'});

})

router.put('/:id',async (req,res)=>{
    let item = req.body;
    await book.findByIdAndUpdate(req.params.id,item);
    res.json({message:'item update'}); 
})

module.exports = router;