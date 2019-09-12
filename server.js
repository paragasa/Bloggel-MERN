require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json({extended: true}))
connectDB()




//REST CALS
app.use('/api/categories', require('./routes/categories'));
app.use('/api/articles', require('./routes/articles'));
app.use('/api/article', require('./routes/article'))
app.use('/api/auth', require('./routes/auth'))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('Client/build'));
    app.get('*' ,(req, res) => {
        res.sendFile(path.join(__dirname, 'Client','build','index.html'));
    });
}

app.get('*', function(req, res){
    res.status(404).send({
        "404": "no content"
    });
  });



// LISTEN
app.listen(process.env.PORT || 4000,()=>{
    console.log(`App listening on port ${process.env.PORT}`) 
})










