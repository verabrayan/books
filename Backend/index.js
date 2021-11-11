
if(process.env.NODE_ENV == 'development'){
    require('dotenv').config();
    console.log(process.env.NODE_ENV)
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors')

//inicializacion
const app = express();
require('./dataBase');

//settings
app.set('port',process.env.PORT||3000);

//middlewares
app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination:path.join(__dirname,'public/uploads'),
    filename(req,file,cb){
        cb(null,new Date().getTime()+path.extname(file.originalname));

    }
})
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/books',require('./routes/books'));

//static files volvemos publica la capeta public que es lo que se va mostrar en el front
app.use(express.static(path.join(__dirname,'public')));

//start server
app.listen(app.get('port'),()=>{
    console.log('server on port',app.get('port'));
})