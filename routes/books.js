const express = require('express');
const Books = require('../models/books');
const expressAsyncHandler = require('express-async-handler');
const router = express.Router();


router.post('/create/book',expressAsyncHandler(async(req,res)=>{
    const BooksObject = new Books({
        Title: req.body.Title,
        Publication: req.body.Publication,
        Author: req.body.Author,
        category: req.body.category,
        cost: req.body.cost,
        publishedAt: req.body.publishedAt,
        isBestSeller: req.body.isBestSeller ? req.body.isBestSeller :false,
    }) 
    const books = await BooksObject.save();
    res.send(books);
}));
// Get all the books that are written by multiple authors
router.get('/books/list',(req,res)=>{
    Books.find({}).exec((error,books)=>{
        if(error)return res.status(400).json({error})
        if(books){
            res.status(200).json({books})
        }
    })
})

// Read - Get all the books by J.K Rowling and Stephen King
router.get('/booksby/author',(req,res)=>{
    var names = { $or:[{Author:'J.k Rowling'},{Author:'Stephen King'}] }
    Books.find(names).exec((error,books)=>{
        if(error)return res.status(400).json({error})
        if(books){
            res.status(200).json({books})
        }
    })
    
})

// Get all the book that were published in 2018, but before 2020.

router.get('/booksby/publishedAt',(req,res)=>{
    Books.find({ publishedAt:2018}).exec((error,books)=>{
        if(error)return res.status(400).json({error})
        if(books){
            res.status(200).json({books})
        }
    })
})

// router.get('/cost',(req,res)=>{
//     var price = []
//     price = {books:{ $all:['cost']}}
//     Books.find(price).exec((error,book)=>{
//         if(error)return res.status(400).json({error})
//         if(book){
//             res.status(200).json({book})
//         }
//     })
// })


// - Delete lord of the rings from library
router.delete('/books_delete/:id',(req,res)=>{
    const id = req.params.id;

    Books.findByIdAndDelete(id).then(books=>{
        if(!books)
        return res.status(404).send({
            message: 'Book not found'
        })
        if(books)
        return res.send({ message:"deleted successfully"})
    }).catch(error=>{
        res.status(500).send({ message:error.message})
    })
})

//Update the cost of all the books from "Fiction" category and increase it by 100Rs.
router.put('/', (req,res)=>{
    if(!req.body){
        return res.status(400).send({ message:'cannot be empty'});
    }
    const searchField = category ? {category:{$regex: searchField,$options:'$i'}}:{};
    Books.find(searchField,req.body,{ useFindAndModify: false }).then(data=>{
        if(!data){
            return res.status(400).send({message:"cannot update"})
        }
        else {
            res.send(data)
        }
    }).catch(err =>{
        res.send(err)
    })
})

module.exports=router;
