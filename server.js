const express = require('express');
const mongoose = require('mongoose');
// const env = require('dotenv');

const app = express();

const PORT = process.env.PORT || 3000;
// ================================================================= database connetion ===========================================================
const db = require('./config/keys').MongoURI
mongoose.connect(db,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true})
.then(()=>console.log('database connection established'))
.catch(error=>console.log(error.message));

// =================================================================== middlewares ================================================================

app.use(express.json())
app.use(express.urlencoded({extended:true}));

// =================================================================== routes =====================================================================
const booksRoutes = require('./routes/books.js')


app.use('/api',booksRoutes)



app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message});
  })

app.listen(PORT,()=>console.log(`server up and running at ${PORT}`));